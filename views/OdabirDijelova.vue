<template>
    <div>
      <v-navigation-drawer class="custom-drawer" permanent right>
        <v-card class="custom-card">
          <v-radio-group v-model="radio1" label="Choose the layout" class="custom-label">
            <v-radio label="60%" value="1" class="custom-option"></v-radio>
            <v-radio label="GMK67" value="2" class="custom-option"></v-radio>
            <v-radio label="GMK87" value="3" class="custom-option"></v-radio>
            <v-radio label="Full size" value="4" class="custom-option"></v-radio>
          </v-radio-group>
        </v-card>
    
        <v-card class="custom-card">
          <v-radio-group v-model="radio2" label="Case material" class="custom-label">
            <v-radio label="Plastic" value="A" class="custom-option"></v-radio>
            <v-radio label="Brushed Aluminum" value="B" class="custom-option"></v-radio>
            <v-radio label="Brushed Brass" value="C" class="custom-option"></v-radio>
          </v-radio-group>
        </v-card>
    
        <v-card class="custom-card">
          <v-checkbox v-model="checkbox1" label="Wireless connectivity" class="custom-option"></v-checkbox>
        </v-card>
      </v-navigation-drawer>
    
      <div ref="threeContainer" class="three-container"></div>
    </div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'; // Import OBJLoader
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls
  
  export default {
    name: 'ThreeScene',
    mounted() {
      this.initThree();
    },
    methods: {
      initThree() {
        // Create the scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xeeeeee); // Set a background color if needed
  
        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
  
        // Create a renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.threeContainer.appendChild(renderer.domElement);
  
        // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Optional: Adds some smoothness to the controls
        controls.dampingFactor = 0.25; // Optional: Damping factor for smooth controls
        controls.screenSpacePanning = false;
        controls.minDistance = 2; // Optional: Minimum zoom distance
        controls.maxDistance = 10; // Optional: Maximum zoom distance
        controls.maxPolarAngle = Math.PI / 2; // Optional: Limits the vertical angle
  
        // Add lights to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
  
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
  
        // Load and apply textures
        const textureLoader = new THREE.TextureLoader();
        const diffuseTexture = textureLoader.load('/keyboard_texture.jpg'); // Adjust the path to your texture file
  
        // Load the keyboard.obj model
        const objLoader = new OBJLoader();
        objLoader.load(
          '/keyboard.obj', // Replace with the actual path to your .obj file
          (object) => {
            // Called when the .obj file is loaded successfully
            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({ map: diffuseTexture });
              }
            });
  
            object.scale.set(3, 3, 3); // Adjust scale as necessary
            object.position.set(0, 0, 0); // Ensure the object is centered
            object.rotation.x = Math.PI / 2; // Adjust rotation if needed
            scene.add(object);
          },
          (xhr) => {
            // Called while loading is progressing
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
            // Called when loading has errors
            console.error('An error happened', error);
          }
        );
  
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update(); // Required for damping to work
          renderer.render(scene, camera);
        };
  
        animate();
  
        // Handle window resize
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .three-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
  
  /* Entire drawer styling */
  .custom-drawer {
    background-color: black;
    width: 33%;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    border-left: 1px solid rgb(114, 114, 114);
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  /* Card styling */
  .custom-card {
    background-color: transparent;
    border: none; /* Remove the border from cards */
    margin-top: 80px; /* Adjust this value to move the cards lower */
  }
  
  /* Label styling */
  .custom-label >>> .v-label,
  .custom-label /deep/ .v-label {
    font-family: 'Coolvetica', sans-serif;
    font-size: 24px !important;
    color: white;
  }
  
  /* Option styling */
  .custom-option >>> .v-label,
  .custom-option /deep/ .v-label {
    font-family: 'Coolvetica', sans-serif;
    font-size: 18px !important;
    color: white;
    cursor: pointer; /* Show pointer cursor to indicate clickability */
    transition: color 0.3s; /* Smooth color transition */
  }
  
  /* Hover effect for radio options */
  .custom-option:hover >>> .v-label,
  .custom-option:hover /deep/ .v-label {
    color: #FF4191; /* Change color on hover */
  }
  
  /* Checkbox styling */
  .custom-option >>> .v-checkbox__input,
  .custom-option /deep/ .v-checkbox__input {
    color: white !important;
  }
  
  /* Remove outline from radio and checkbox */
  .custom-option >>> .v-input__control,
  .custom-option /deep/ .v-input__control {
    border: none !important; /* Remove border */
  }
  
  .custom-option >>> .v-input__control:focus,
  .custom-option /deep/ .v-input__control:focus {
    outline: none !important; /* Remove focus outline */
  }
  </style>
  