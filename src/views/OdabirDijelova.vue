<template>
  <div>
    <v-navigation-drawer class="custom-drawer" permanent right>
      <!-- Layout Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radio1" label="Choose the layout" class="custom-label" style="padding-top: 20px;">
          <v-radio label="60%" value="1" class="custom-option first-radio"></v-radio>
          <v-radio label="67%" value="2" class="custom-option"></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Case Material Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radio2" label="Case material" class="custom-label" style="margin-top: -70px;">
          <v-radio label="White Plastic" value="C" class="custom-option first-radio"></v-radio>
          <v-radio label="Black Plastic" value="A" class="custom-option"></v-radio>
          <v-radio label="Brushed Aluminum" value="B" class="custom-option"></v-radio>
          <v-radio label="Brushed Brass" value="D" class="custom-option"></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Keycap Color Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radio2" label="Keycap color" class="custom-label" style="margin-top: -70px;">
          <v-radio label="Black pbt" value="" class="custom-option first-radio"></v-radio>
          <v-radio label="White pbt" value="" class="custom-option"></v-radio>
          <v-radio label="Peach red pbt" value="" class="custom-option"></v-radio>
          
        </v-radio-group>
      </v-card>

      <!-- Keycap Color Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radio2" label="Switches" class="custom-label" style="margin-top: -70px;">
          <v-radio label="XDA Bubble" value="" class="custom-option first-radio"></v-radio>
          <v-radio label="Akko Cream Black Pro" value="" class="custom-option"></v-radio>
          <v-radio label="AKKO Cream Yellw Pro" value="" class="custom-option"></v-radio>
          <v-radio label="C3 Equals Banana Split" value="" class="custom-option"></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Checkbox -->
      <v-card class="custom-card">
        <v-checkbox v-model="checkbox1" label="Wireless connectivity" class="custom-option custom-checkbox" style="margin-top: -70px;"></v-checkbox>
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
  data() {
    return {
      radio1: '1', // Default to 60% layout
      radio2: 'B', // Default to Brushed Aluminum
      object: null, // Reference to the 3D object
    };
  },
  watch: {
    // Watch the radio2 value to change the texture based on case material selection
    radio2(newVal) {
      this.updateTexture(newVal);
    }
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // Create the scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000); // Set background color to black

      // Create a camera, move it further back to zoom out
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 2, 7.5); // Adjusted to zoom out more

      // Create a renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth / 1.2, window.innerHeight);
      this.$refs.threeContainer.appendChild(renderer.domElement);

      // Add OrbitControls and enable full-axis rotation
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // Adds smoothness to the controls
      controls.dampingFactor = 0.25; // Damping factor for smooth controls
      controls.screenSpacePanning = false; // Disable panning
      controls.minDistance = 5; // Adjusted minimum zoom distance
      controls.maxDistance = 20; // Adjusted maximum zoom distance
      controls.enableZoom = true; // Enable zooming

      // Remove any axis restrictions to allow full rotation
      controls.maxPolarAngle = Math.PI; // Allow full rotation vertically
      controls.minPolarAngle = 0;       // Allow looking straight up

      // Add lights to the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      // Load the keyboard.obj model
      const objLoader = new OBJLoader();
      objLoader.load(
        '/prava.obj', // Replace with the actual path to your .obj file
        (object) => {
          // Called when the .obj file is loaded successfully
          object.scale.set(3, 3, 3); // Adjust scale as necessary
          object.position.set(4.5, -1, 0); // Adjust position
          object.rotation.x = Math.PI / 2; // Adjust rotation if needed
          
          this.object = object; // Store the object reference
          this.updateTexture(this.radio2); // Apply the initial texture
          scene.add(this.object);

          // Set the 67% layout option as checked
          this.radio1 = '2';
        },
        (xhr) => {
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (error) => {
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
    },
    updateTexture(material) {
      const textureLoader = new THREE.TextureLoader();
      let texturePath = '';

      if (material === 'B') {
        // Brushed Aluminum selected
        texturePath = '/redAluminum1.png';
      } else if (material === 'C') {
        // Brushed Brass selected
        texturePath = '/redWhite.png';
      } else if (material === 'A') {
        // Black Plastic selected
        texturePath = '/redBlack.png';
      } else if (material === 'D') {
        // Brushed Brass selected
        texturePath = '/redBrass1.png';
      }

      if (texturePath && this.object) {
        // Load the new texture
        textureLoader.load(texturePath, (texture) => {
          // Apply the texture to all meshes in the object
          this.object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.map = texture;
              child.material.needsUpdate = true; // Ensure the material is updated
            }
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black; /* Set the three-container background to black */
}

@import url('https://fonts.cdnfonts.com/css/coolvetica-2');

/* Spacing adjustment for first radio button in each group */
.first-radio {
  margin-top: 27px !important; /* Add extra margin between the header and the first radio button */
}

/* Customize v-checkbox border color */
.custom-checkbox >>> .v-input__control {
  border: 2px solid white !important;
  border-radius: 4px; /* Add this if you want rounded corners */
}

.custom-checkbox >>> .v-input--selection-controls__ripple {
  border-color: white !important;
}

/* Entire drawer styling */
.custom-drawer {
  background-color: black; /* Change the drawer background color to black */
  width: 15% !important;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  border-left: 1px solid rgb(114, 114, 114);
  padding: 45px;
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
