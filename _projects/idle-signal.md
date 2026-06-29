---
title: "idle signal"
date: 2025-02-07
status: "archived"
description: "3D graphics engine"
tech: ["c++", "opengl", "glfw", "openal", "bullet3", "imgui", "assimp", "glm"]
github: "https://github.com/L0puh/idle_signal"
image: "https://github.com/L0puh/idle_signal/blob/master/media/1.png?raw=true"
---

# 3d engine in opengl

## overview

3d engine built using opengl from scratch for linux. it includes a basic map editor and supports loading 3d models, dynamic lighting, collision detection and etc.

## features

- **audio** with `openal`
- **imgui** debug windows
- **animation**
    - sprite animation
    - skeletal animation
- **basic map editor**
  - drawing static objects
  - adding entities via json configuration
- **entity system**
  - pickups
  - separate collision detection
- **random terrain generation**
- **model loading**
- **postprocessing effects**
  - pixelated (low-poly) view
  - noise overlay
  - illuminance color adjustment
  - fog effects
  - dynamic lighting
    - flashlight
    - multiple light sources
- **text rendering**
- **collision detection** using `bullet3` physics engine

## libraries used

- opengl, glad, glfw (graphics and window/context management)
- glm (mathematics)
- imgui (debugging and ui)
- stb_image (image loading)
- assimp (model importing)
- bullet3 (physics and collision detection)
- openal (audio)
- spdlog (loging)

## setup & run
compile and run by: `./run.sh`


![Screenshot 1](https://github.com/L0puh/idle_signal/blob/master/media/3.png?raw=true) 
![Screenshot 2](https://github.com/L0puh/idle_signal/blob/master/media/2.png?raw=true)

# related projects 

- some of my experiments with opengl - [engine](https://github.com/L0puh/engine)
- 2D game from scratch (no engine) - [space](https://github.com/L0puh/space)
