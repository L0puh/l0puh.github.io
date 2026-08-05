---
title: "experiments with isolation on blue pill"
date: 2026-08-04
description: "bare-metal supervisor for a cortex-M3 system"
tags: ["bare-metal", "c", "cortex-m3", "embedded"]
---

> these are notes i gathered while working on my project - [aether](https://l0puh.github.io/projects/aether/)

![](/assets/media/preview.png)
# intro
i got an idea to build a semi-hypervisor, or rather, a supervisor, for a cortex-M3 system (i've chosen blue pill because it's cheap and because i have tons of them). its CPU doesn't have TrustZone, memory management unit or the capabilities needed to recreate a fully functioning hypervisor like there are for general-purpose operating systems. more precisely, i was curious how to provide isolation for such microcontrollers in the absence of all listed features.

naturally i stumbled into the MPU and the two execution modes (handler and thread) together with privileged and unprivileged execution, with privileged code reachable only through the SVC instruction (supervisor call instruction). 

with those features equipped there is a visible architecture for isolation, along with a supervisor that hands out revocable access to hardware.

## but first, why on earth would we need to isolate blue pill?

when firmware stops being a static thing, some trusted blob is needed to protect it. it happens if the application is flashed / updated *after* the board has shipped, or if it's allowed to talk to peripherals that can brick or damage the device, or even if the application is expected to keep running reliably even when a bug corrupts its own state, and so on.

## some stuff you need to know before touching MPU and SVC

cortex-M3's MPU is a region-based protection unit, it supports up to 8 regions, each with a power-of-two size (from 32B to 4G), its own access permissions (no access / read-only / read-write, per privilege level), an execute-never (XN) bit, and memory type attributes. these regions can again be split into 8 sub-regions to carve holes out of a block. since there is no translation, every protected region has to be at a fixed physical address (the linker script has to reflect this layout too). if an application violates permissions, it results in a hard fault (or `memmanage` fault first, if enabled).

the processor supports privileged and unprivileged execution. thread mode can run at either level, while handler mode always executes privileged. it also provides two stack pointers (MSP and PSP), with thread mode selecting between them through the `CONTROL` register. code running unprivileged cannot touch the `CONTROL` register, cannot reconfigure the MPU, and cannot mask interrupts. the only way back into privileged code is an exception, either a fault or a supervisor call. this system call looks like this: `SVC #n`. the processor enters the SVC exception handler, the handler can recover the SVC immediate (`#n`) from the instruction that triggered the exception and dispatch the requested service.

put those together, and the mechanism resembles the isolation a "real" OS gives a userspace process.

# the architecture

to go hardcore, i didn't use CMSIS or HAL and went only with bare-metal, burying myself in manuals.

the implementation itself looks like a bunch of components sealed together. two main blocks - bootloader-supervisor and an application module which is flashed during runtime and embedded into the system.
each block has its own flash memory and RAM, protected by the MPU.
application talks with bootloader by sending calls.

![](/assets/media/aether%20-%20diagram2.png)

bootloader-supervisor - the privileged half, it owns the vector table, MPU, watchdog, and all the hardware. it boots first, sets up isolation, and only then hands control to the application.

application module - flashed independently, at runtime, after the supervisor is already initialized. it runs unprivileged, in its own flash region, RAM region, and stack. it can only reach the peripherals the supervisor has explicitly granted. the application doesn't get its own vector table (though, cortex m3 supports relocating the vector table through `VTOR`) — interrupts remain routed through the supervisor's table. bootloader either handles it itself or forwards it to the application (as with calls).

that's how the bootloader is started after the initialization:

```c
void start_bootloader(bool is_after_reset)
{
   ret res; 
   app_desc_t* desc = NULL;

   while (!is_app_exists(&desc) && !fetch_app()) {
      //... sleep 
   }

   if (desc != NULL) {
      if (is_after_reset) {
         res = preinit_periph(desc->manifest);
	     //... reset 
      }
      
      run_app(desc);
   }
}
```


each app is "patched" with additional information, provided within an app description structure at a known offset; it includes a signature to identify the app, a pointer to the application's entry point in memory, size, CRC, version, and the manifest. the manifest holds the list of peripherals and capabilities this application is allowed to use. patching happens at build time; afterward the description isn't accessible, so the manifest can't be changed at runtime.

```c
typedef struct PACKED _app_desc {
   u32 magic;
   u32 entry;
   u32 size;
   app_manifest_t manifest;
   u16 crc16;
   u8 version;
} app_desc_t;
```


handing control to the application is the moment of dropping privileges, so it has to happen in an order that can't be interrupted halfway: enable the MPU, set up the application's stack pointer (switch to PSP), set the `nPRIV` bit in `CONTROL` as the actual privilege drop, and only then branch to the application's entry point.

here's how it happens in two stages, where the first one switches the stack pointer, clears interrupt masks.
```asm
enter_app:
    @ r0 = psp value
    @ r1 = entry point

    push  {r4, lr}
    mov   r4, r1

    msr   psp, r0
    isb

    mov   r3, #0
    msr   primask, r3
    msr   basepri, r3
    cpsie i

    mrs   r3, control
    orr   r3, r3, #2
    msr   control, r3
    isb

    bx    r4
```

and the second drops privileges and branches to the entry point.

```asm
app_start:
    mrs   r0, control
    orr   r0, r0, #1
    msr   control, r0
    isb

    bl    main

    movs  r0, #0
    svc   #2
    b     .
```


similarly, on exit, privileges are restored
```asm
exit_landing:
    mrs   r0, control
    bic.w r0, r0, #2
    msr   control, r0
    isb
    bl    bootloader_exit_hook
    b     .

```

the supervisor periodically checks on the running application through the indepeartchitecturendent watchdog — this can be done with a systick hook. the health of the application can be assured in many ways. one of them is to check the last time of peripheral access, or watchdog kicks coming from the app.

```c
// example of such systick hook 
void tick_hook(void) 
{
   if (get_system_ticks() - last_tick < TICK_HOOK_MS){
      return;
   }

   last_tick = get_system_ticks();

   if (is_iwdg_enabled() && is_app_healthy()){
      DEBUG_PRINT("app is healthy, kicking watchdog!");
      watchdog_kick();
   } else if (is_iwdg_enabled()) {
      ERROR_PRINT("app is unhealthy!");
   }
}
```

the whole process looks like this: 


![](/assets/media/aether%20-%20diagram.png)


# conclusion 
all being said, the model holds for the case it was built for - an app corrupting itself or reaching for a peripheral it wasn't handed. however, it doesn't address every isolation problem encountered in embedded system (in fact, [few RTOSs adopt the MPU](https://arxiv.org/pdf/1908.03638)), nor does it protect against DMA bypasses, physical attacks or fault injections - those should be handled separately. as such, it's rather good engineering hygiene against a well-behaved but buggy app.

> _"The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."_


