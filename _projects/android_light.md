---
title: "android-light"
date: 2025-01-25
status: "archived"
description: "lightweight alternative for android compilation"
tech: ["c++", "cmake", "imgui", "ndk", "xml"]
github: "https://github.com/l0puh/android_light"
---
# lightweight android 
lightweight way to compile android application without installing tons of software (i.e. android studio IDE). 
it supports NDK and simple xml editor for adding minimal forms to apps. all things happen in the terminal.

some of the tools are kind of outdated, so it works only for demos at the moment.

## features

- standalone android compilation, no android studio
- ndk support
- xml editor 


## usage
to create template of an app 
```sh 
sh setup.sh --name your_name --domain your_domain --version your_android_version
```
to compile and run the app (android device plugged in) 
```sh
sh run.sh
```

# editor 
to create and edit new layouts, use the editor, located in ``editor`` folder.
compile and run it with (from editor directory)
```sh
sh run.sh
```
## Preview
<img width="887"  alt="image" src="https://github.com/user-attachments/assets/c8579eff-950b-48a9-b00b-f3304e7cc376" />



##  License

This project is licensed under the MIT License.

