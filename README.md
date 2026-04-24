# Real Time 3D XR Visualization Project The Robot in the Kitchen

The goal of the project is to create a complete interactive Three.js scene containing a simplified kitchen environment and a humanoid robot. Across the exercises, the project develops from a static 3D scene into an animated and XR-ready tele-operation system where robot arm movement can be driven using VR controllers.

## Project Overview

The project is implemented using:

- **Three.js** for 3D rendering
- **WebGL** through the Three.js renderer
- **WebXR** for VR/AR interaction
- **OrbitControls** for desktop camera navigation
- **lil-gui** for debugging and interactive parameter control
- Custom modular JavaScript functions collected in `kitchen-utils.js`

## Repository Structure

```
Real-Time-3D-XR-Visualization-Project-The-Robot-In-The-Kitchen/
├── ex1_settingupthekitchenenvironment.html
├── ex2_thehumanoidrobot.html
├── ex3_lightingandshadows.html
├── ex4_animationandinteraction.html
├── ex5_teleoperationinVRMR.html
│
├── js/
│   └── kitchen-utils.js
│
├── assets/
│   └── wood_floor1.jpg
│   └── white_tiles.jpg
│   └── pink_tiles.jpg
│   └── wood.jpg
│   └── pizza.png
│   └── beige_wall.jpg
│
└── README.md
```
