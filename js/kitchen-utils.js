// kitchen-utils.js
// Reusable functions for 3D kitchen scenes with Three.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Global variables
let scene, camera, renderer, controls;
let floorTexture, backWallTexture, leftWallTexture, counterTexture, woodTexture, pizzaTexture;

// Scene, camera, renderer setup
export function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  camera.position.set(5, 5, 10); 
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); 

  // OrbitControls setup
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = false;
}

// Directional light for shadows and depth
export function initLighting() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

// Advanced lighting setup with ambient and spotlight (ex3)
export function setupLightingandShadows() {
  // Enable soft shadows for better realism
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Ambient light - soft overall lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Spotlight - main light source "ceiling lamp" effect
  const spotlight = new THREE.SpotLight(0xffffff, 1);
  spotlight.position.set(0, 5, 0);
  spotlight.angle = Math.PI / 4;
  spotlight.penumbra = 0.2;
  spotlight.decay = 2;
  spotlight.distance = 10;
  spotlight.castShadow = true;
  
  // Shadow properties for better quality
  spotlight.shadow.mapSize.set(1024, 1024);
  spotlight.shadow.bias = -0.0001;

  // Target the robot's torso for better lighting
  spotlight.target.position.set(-0.5, 1, 0);
  scene.add(spotlight);
  scene.add(spotlight.target);

  return { ambientLight, spotlight };
}

// Load all textures
export function loadTextures() {
  const textureLoader = new THREE.TextureLoader();

  floorTexture = textureLoader.load('./assets/wood_floor1.jpg');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);
  
  backWallTexture = textureLoader.load('./assets/beige_wall.jpg');
  backWallTexture.wrapS = THREE.RepeatWrapping;
  backWallTexture.wrapT = THREE.RepeatWrapping;
  backWallTexture.repeat.set(5, 5); 

  leftWallTexture = textureLoader.load('./assets/white_tiles.jpg');
  leftWallTexture.wrapS = THREE.RepeatWrapping; 
  leftWallTexture.wrapT = THREE.RepeatWrapping;
  leftWallTexture.repeat.set(1, 1); 

  counterTexture = textureLoader.load('./assets/pink_tiles.jpg');
  counterTexture.wrapS = THREE.RepeatWrapping;  
  counterTexture.wrapT = THREE.RepeatWrapping;
  counterTexture.repeat.set(1, 1);

  woodTexture = textureLoader.load('./assets/wood.jpg');
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;

  pizzaTexture = textureLoader.load('./assets/pizza.png');
}

// Create ground and walls
export function createRoom() {
  const kitchen = new THREE.Group();
  scene.add(kitchen);

  // Ground plane
  const groundGeo = new THREE.PlaneGeometry(8, 8);
  const groundMat = new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 0.8 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground); 
  
  // Walls
  const wallHeight = 5;
  const roomSize = 8;
  const wallThickness = 0.2;
  const backwallMat = new THREE.MeshStandardMaterial({ map: backWallTexture, side: THREE.DoubleSide });
  const leftwallMat = new THREE.MeshStandardMaterial({ map: leftWallTexture, side: THREE.DoubleSide });
  
  // Back wall
  const backWallGeo = new THREE.BoxGeometry(roomSize, wallHeight, wallThickness);
  const backWall = new THREE.Mesh(backWallGeo, backwallMat);
  backWall.position.set(0, wallHeight / 2, -roomSize / 2 + wallThickness / 2);
  backWall.receiveShadow = true;
  scene.add(backWall);
  
  // Left wall
  const leftWallGeo = new THREE.BoxGeometry(wallThickness, wallHeight, roomSize);
  const leftWall = new THREE.Mesh(leftWallGeo, leftwallMat);
  leftWall.position.set(-roomSize / 2 + wallThickness / 2, wallHeight / 2, 0);
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  return { ground, backWall, leftWall, backwallMat, leftwallMat };
}

// Create kitchen objects
export function createObjects() {
  const counterGeo = new THREE.BoxGeometry(5, 2, 1.5);
  const counterMat = new THREE.MeshStandardMaterial({ map: counterTexture });
  const counter = new THREE.Mesh(counterGeo, counterMat);
  counter.position.set(-0.5, 1, 0);
  counter.receiveShadow = true;
  counter.castShadow = true;
  scene.add(counter);

  // Cutting board
  const boardGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.03, 32);
  const boardMat = new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.8});
  const cuttingBoard = new THREE.Mesh(boardGeo, boardMat);
  cuttingBoard.position.set(-1, 2.0015, 0);
  cuttingBoard.castShadow = true;
  cuttingBoard.receiveShadow = true;
  scene.add(cuttingBoard);

  // Pizza
  const pizzaMat = new THREE.MeshStandardMaterial({ map: pizzaTexture, transparent: true });
  const pizzaGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.03, 32);
  const pizza = new THREE.Mesh(pizzaGeo, pizzaMat);
  pizza.position.set(-1, 2.007, 0);
  pizza.castShadow = true;
  pizza.receiveShadow = true;
  scene.add(pizza);

  return { counter, cuttingBoard, pizza };
}

// Create robot with arms and wheels
export function createRobot() {
  const robot = new THREE.Group();
  scene.add(robot);
  robot.scale.set(0.8, 0.8, 0.8); // Scale robot
  
  // Create the robot's torso
  const torso = new THREE.Mesh( new THREE.SphereGeometry(1, 32, 32), 
  new THREE.MeshStandardMaterial({ color: 0xff8fab }));
  torso.scale.set(1, 1.5, 0.6);
  torso.position.set(-0.5, 2.5, -2);
  torso.castShadow = true;
  torso.receiveShadow = true;
  robot.add(torso);

  // Create the robot's head
  const head = new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64), 
  new THREE.MeshStandardMaterial({ color: 0xff8fab }));
  head.position.set(0, 1.5, 0);
  head.castShadow = true;
  head.receiveShadow = true;
  torso.add(head);   

  // Create robot's arms
  function createArm(side = 1) {
    const shoulder = new THREE.Group();
    shoulder.position.set(1.1 * side, 0.6, 0); // right/left side of torso at shoulder height
    shoulder.rotation.z = 0.25 * side; // Rotate slightly
    shoulder.add(new THREE.AxesHelper(0.3));
    torso.add(shoulder);

    const shoulderCap = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), 
    new THREE.MeshStandardMaterial({ color: 0xfb6f92 }));
    // Flatten it slightly
    shoulderCap.scale.set(1.2, 0.8, 1);
    // Position at joint
    shoulderCap.position.set(0, 0, 0);
    shoulderCap.castShadow = true;
    shoulderCap.receiveShadow = true;
    shoulder.add(shoulderCap);

    const upperArm = new THREE.Mesh( new THREE.CylinderGeometry(0.15, 0.15, 0.9, 32), 
    new THREE.MeshStandardMaterial({ color: 0xfb6f92 }));
    upperArm.position.y = -0.45;
    upperArm.castShadow = true;
    upperArm.receiveShadow = true;
    shoulder.add(upperArm);

    const elbow = new THREE.Group();
    elbow.position.set(0, -0.9, 0);
    elbow.add(new THREE.AxesHelper(0.3));
    shoulder.add(elbow);

    const forearm = new THREE.Mesh( new THREE.CylinderGeometry(0.12, 0.12, 0.8, 32), 
    new THREE.MeshStandardMaterial({ color: 0xfb6f92 }));
    forearm.position.y = -0.4;
    forearm.castShadow = true;
    forearm.receiveShadow = true;
    elbow.add(forearm);

    const wrist = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.12, 24),
      new THREE.MeshStandardMaterial({ color: 0xfb6f92 })
    );
    wrist.position.y = -0.88;
    wrist.castShadow = true;
    wrist.receiveShadow = true;
    elbow.add(wrist);

    const hand = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.14, 0.16),
      new THREE.MeshStandardMaterial({ color: 0xfb6f92 })
    );
    hand.position.set(0, -1.0, 0.03);
    hand.rotation.x = 0.12;
    hand.castShadow = true;
    hand.receiveShadow = true;
    elbow.add(hand);

    return { shoulder, elbow, hand };
  }

  const rightArm = createArm(1);
  const leftArm = createArm(-1);

  // Create the robot's wheels
  function createWheels(torso) {
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0xfb6f92 });
    
    wheelGeo.rotateZ(Math.PI / 2);
    const leftWheel = new THREE.Mesh(wheelGeo, wheelMat);
    leftWheel.position.set(-0.6, -1.2, 0);
    leftWheel.castShadow = true;
    leftWheel.receiveShadow = true;
    torso.add(leftWheel);

    const rightWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rightWheel.position.set(0.6, -1.2, 0);
    rightWheel.castShadow = true;
    rightWheel.receiveShadow = true;
    torso.add(rightWheel);
  }

  createWheels(torso);

  return {
    robot,
    torso,
    shoulderRight: rightArm.shoulder,
    shoulderLeft: leftArm.shoulder,
    elbowRight: rightArm.elbow,
    elbowLeft: leftArm.elbow,
    handRight: rightArm.hand,
    handLeft: leftArm.hand,
    head
  };
}

// Animate robot with FK (Forward Kinematics) - ex4
export function animateRobot(robot, params, time) {
  if (params.autoAnimate) {
    // Animation + Manual GUI control (sliders offset the animation)
    robot.shoulderRight.rotation.x = Math.sin(time) * 1.0 + params.shoulder;
    robot.elbowRight.rotation.x = Math.sin(time * 2.0) * 1.0 + params.elbow;
    robot.shoulderLeft.rotation.x = -Math.sin(time) * 1.0 - params.shoulder;
    robot.elbowLeft.rotation.x = -Math.sin(time * 2.0) * 1.0 - params.elbow;
  } else {
    // When animation is OFF, manual GUI controls only
    robot.shoulderRight.rotation.x = params.shoulder;
    robot.shoulderLeft.rotation.x = -params.shoulder;
    robot.elbowRight.rotation.x = params.elbow;
    robot.elbowLeft.rotation.x = -params.elbow;
  }
}

// Renders the scene and updates controls
export function animate(time) {
  controls.update(); 
  renderer.render(scene, camera);
}

// Setup GUI controls for materials, lights, and objects (ex3+)
export function setupGUIControls(gui, spotlight, robot, objects) {
  // Light controls
  const lightFolder = gui.addFolder('Light');
  lightFolder.add(spotlight, 'intensity', 0, 5);
  lightFolder.add(spotlight.position, 'x', -5, 5);
  lightFolder.add(spotlight.position, 'y', 0, 10);
  lightFolder.add(spotlight.position, 'z', -5, 5);

  // Robot material controls
  const materialFolder = gui.addFolder('Robot Material');
  materialFolder.add(robot.torso.material, 'roughness', 0, 1);
  materialFolder.add(robot.torso.material, 'metalness', 0, 1);
  materialFolder.addColor({ color: robot.torso.material.color.getHex() }, 'color').onChange((value) => {
    robot.torso.material.color.setHex(value);
    robot.head.material.color.setHex(value);
  });

  // Object positioning controls
  const objectsFolder = gui.addFolder('Objects Position');
  
  const cuttingBoardFolder = objectsFolder.addFolder('Cutting Board');
  cuttingBoardFolder.add(objects.cuttingBoard.position, 'x', -3, 3).step(0.1);
  cuttingBoardFolder.add(objects.cuttingBoard.position, 'y', 0, 4).step(0.1);
  cuttingBoardFolder.add(objects.cuttingBoard.position, 'z', -3, 3).step(0.1);

  const pizzaFolder = objectsFolder.addFolder('Pizza');
  pizzaFolder.add(objects.pizza.position, 'x', -3, 3).step(0.1);
  pizzaFolder.add(objects.pizza.position, 'y', 0, 4).step(0.1);
  pizzaFolder.add(objects.pizza.position, 'z', -3, 3).step(0.1);
}

// Get objects to use outside module
export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }
export function getControls() { return controls; }
