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
# Exercise 1 — Setting Up the Kitchen Environment

The first exercise creates the base kitchen scene.

### Implemented features:
Three.js scene initialization
Perspective camera
WebGL renderer
Shadow map support
Floor using PlaneGeometry
Two walls using BoxGeometry
Kitchen counter using BoxGeometry
Physically based materials using MeshStandardMaterial
Texture mapping for floor, walls, and counter
Two objects on the counter:
a wooden cutting board
a pizza using a PNG texture

This exercise establishes the environment where the robot will later be placed.

## Example Result

![Exercise 1 Screenshot](./assets/ex1_screenshot.png)

# Exercise 2 — Humanoid Robot and Hierarchical Modeling

The second exercise adds a simplified humanoid robot.

### Implemented features:

Robot root group using THREE.Group
Oval torso using a scaled sphere
Head using SphereGeometry
Wheeled base for simplified robot locomotion
Two arms built with hierarchical modeling
Shoulder and elbow joints implemented as THREE.Group pivot nodes
Upper arm, forearm, and hand attached as child objects
Correct parent-child hierarchy so that rotating the shoulder moves the full arm
Correct elbow hierarchy so that rotating the elbow moves the forearm and hand
AxesHelper added to shoulder and elbow joints for visual debugging
Shoulder caps added to visually smooth the connection between torso and arms

# Exercise 3 — Lighting and Shadows

The third exercise improves scene realism using lights, shadows, and material controls.

### Implemented features:

Ambient light to avoid fully black shadows
Spotlight above the kitchen counter to simulate a ceiling lamp
Shadow casting enabled on the main light
Shadow map size adjustment
Shadow bias adjustment to reduce artifacts
Soft shadow rendering using THREE.PCFSoftShadowMap
Robot and objects configured to cast shadows
Floor and counter configured to receive shadows
Materials based on MeshStandardMaterial
lil-gui controls for:
light intensity
light position
robot material roughness
robot material metalness
robot color
object positions

This exercise helps improve depth perception, which is especially important for VR scenes.

# Exercise 4 — Animation and Interaction

The fourth exercise animates the robot using forward kinematics.

### Implemented features:

Forward kinematics animation using Math.sin(Date.now())
Smooth waving or chopping motion of the robot arms
Shoulder and elbow rotations animated over time
OrbitControls for inspecting the hierarchy from different camera angles
GUI controls for:
enabling/disabling automatic animation
manually controlling shoulder angle
manually controlling elbow angle

This exercise demonstrates how parent-child transformations allow the arm to move naturally through joint rotations.

# Exercise 5 — Tele-operation in VR/MR

The final exercise adds WebXR support and controller-based tele-operation.

### Implemented features:

WebXR enabled using:
renderer.xr.enabled = true;
VR mode enabled using VRButton
AR/MR mode enabled using ARButton
Controller input accessed with:
const controller1 = renderer.xr.getController(0);
const controller2 = renderer.xr.getController(1);
Controllers added to the scene
Remote-control mapping mode:
controller rotation drives shoulder and elbow rotations
Inverse kinematics mode:
controller position is used as the target for the robot hand
shoulder and elbow angles are calculated using a 2-link analytical IK solution
the Law of Cosines is used to calculate joint angles
Wall transparency for mixed reality mode
Solid counter/table preserved for the robot workspace
Minimal GUI for XR debugging:
switching between IK and remote control mode
adjusting wall opacity

The IK system treats the robot arm as a two-link chain:

Shoulder → Upper Arm → Elbow → Forearm → Hand

The controller position becomes the target position for the robot hand, and the solver computes the required shoulder and elbow angles.

# VR / AR / MR Support

For VR testing, it is usually easier to test the VRButton first.
For MR/AR testing, use the ARButton; in this mode, the kitchen walls are transparent while the table remains solid.

The AR/MR mode depends on device and browser support. When using the emulator, passthrough behavior may not look exactly like it would on a real XR headset.

