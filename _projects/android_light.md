---
title: "android-light"
date: 2025-01-25
status: "archived"
description: "lightweight alternative for android compilation"
tech: ["c++", "cmake", "imgui", "ndk", "xml"]
github: "https://github.com/l0puh/android_light"
---
# light android

## overview

lightweight alternative for android application development and compilation, completely **bypassing the need for the full android studio ide**.
include  **native development kit (ndk) support** for integrating c/c++ code and a **custom xml editor** to simplify the creation of basic application structures and ui layouts.

## features

*   **standalone android compilation:** compile `.apk` files directly from your project source, without requiring android studio. 
*   **full ndk support:** enabling the compilation and linking of native libraries into android applications.
*   **custom xml editor:** lightweight xml editor to edit the layouts

## usage
### create a template
```sh 
sh setup.sh --name your_name --domain your_domain --version your_android_version
```
it ensures that all needed libraries and tools are installed, and creates a template folder to code your app in.
```sh
usage: setup.sh [options]

options:
  --name name        specify the name
  --domain domain    specify the domain
  --version version  specify the android version (34 by default)
  --help             show this help message
```
### compilation and running of application 
```sh
sh run.sh
```
it compiles the code and runs it on your android device.

### run the editor
to create and edit new layouts, use the editor, located in ``editor`` folder.
compile and run it with 
```sh
sh run.sh
```
## preview
![](https://github.com/user-attachments/assets/c8579eff-950b-48a9-b00b-f3304e7cc376)


##  license

this project is licensed under the MIT license 
