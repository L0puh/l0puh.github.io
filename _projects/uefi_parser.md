---
title: "uefi-parser"
date: 2026-01-23"
status: "archived"
description: "uefi images parser"
tech: ["c++", "Makefile", "sql", "openssl"]
github: "https://github.com/L0puh/uefi_parser"
image: "https://github.com/L0puh/uefi_parser/blob/master/media/showcase.png?raw=true"
---


# UEFI parser

## info
current functionality:
- parse info 
- compare two files
- check boot guard
- write message to paddings (free space)
- store parsed data in database 

## setup
1. make sure to download required libs: 
```bash
# arch Linux
sudo pacman -S fmt sqlite openssl
# ubuntu\debian
sudo apt install libfmt-dev libsqlite3-dev libssl-dev
# macos
brew install fmt sqlite openssl
```
2. compile the app with:
```bash
make
```
## usage
```bash
./build/uefitool --help 
USAGE
  ./build/uefitool --parse <file.bin>
  ./build/uefitool --check_guard <file.bin>
  ./build/uefitool --compare <a.bin> <b.bin>
  ./build/uefitool --write <file.bin> <msg>
  ./build/uefitool              (interactive)
```


- [see showcase #1](https://github.com/user-attachments/assets/9d76d41b-b5cf-42a4-a8a4-0117cebe046f)
- [see showcase #2](https://github.com/user-attachments/assets/2f93f38f-2f86-4ebe-b45e-8116bb08e189)

![](https://github.com/user-attachments/assets/93a456ba-e8a9-4dd8-8c41-3e18bd344061)


## resources:
- specs: 
   - [uefi.org](https://uefi.org/specifications)
   - [uefi.org/pi](https://uefi.org/specs/PI/1.9/V3_Code_Definitions.html)
- reference: [uefitool](https://github.com/LongSoft/UEFITool)
- bootguard: [bootguard](https://trmm.net/Bootguard/)

## libs used:
- [fmt](https://github.com/fmtlib/fmt)
- [sqlite3](https://sqlite.org/c3ref/sqlite3.html)
- [openssl](https://github.com/openssl/openssl) 

