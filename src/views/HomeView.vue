<template>
  <div class="home-container">
    <!-- 3D model rendered here -->
    <div class="three-container" ref="threeCanvas"></div>

    <!-- Text section for project introduction -->
    <div  class="text-container">
      <h1>Welcome to DreamKeyboards</h1>
      <h2>Design your custom dream keyboard</h2>
      <p>
        DreamKeyboards is a platform that allows you to create and customize your very own mechanical keyboard.
        Choose from a variety of switches, keycaps, and layouts to craft your perfect typing experience. 
        Whether you're a gamer, writer, or just love quality keyboards, DreamKeyboards has something for you.
      </p>

      <!-- Begin button -->
      <button class="begin-btn" @click="goToBuild">Begin</button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

export default {
  name: 'Home',
  methods: {
    goToBuild() {
      this.$router.push({ name: 'build' }); // Navigate to the build page
    }
  },
  mounted() {
    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Move the camera a bit farther back to give a good view of the model
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 1.4, window.innerHeight); // Set renderer to half the screen
    this.$refs.threeCanvas.appendChild(renderer.domElement);

    let keyboardModel;

    // Load textures from the public directory
    const textureLoader = new THREE.TextureLoader();
    const keyboardTexture = textureLoader.load('/redWhite.png'); // Adjust the path and texture name accordingly

    // Load the keyboard model using OBJLoader
    const loader = new OBJLoader();
    loader.load('/prava.obj', (object) => {
      // Apply textures to the model materials
      object.traverse((child) => {
        if (child.isMesh) {
          child.material.map = keyboardTexture; // Apply the texture to the material
          child.material.needsUpdate = true; // Ensure the material updates after applying the texture
        }
      });

      // Center the object for rotation
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());

      object.position.sub(center); // Move the object so its center is at (0, 0, 0)
      object.scale.set(1.57, 1.5, 1.5); // Adjust size

      keyboardModel = object;
      scene.add(keyboardModel);

      // Set OrbitControls target to the center of the keyboard model
      controls.target.copy(new THREE.Vector3(-0.9, -0.5, -0.2)); // Center the controls on the model
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10).normalize();
    scene.add(directionalLight);

    // Add OrbitControls for rotating the view around the keyboard model
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update controls for user interaction
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
      camera.aspect = (window.innerWidth / 2) / window.innerHeight; // Adjust aspect ratio
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    });
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Coolvetica&display=swap'); /* Import Coolvetica font */

.home-container {
  display: flex;
  background-color: black;
  width: 100vw;
  height: 100vh;
}

.three-container {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-container {
  width: 50vw;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align content towards the top */
  align-items: center;
  text-align: center;
  font-family: 'Coolvetica', sans-serif; /* Apply Coolvetica font */
  margin-top: 140px; /* Adjust this value to move the text higher */
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

p {
  font-size: 1.2rem;
  max-width: 600px;
}

.begin-btn {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #000000;
  color: #FFFFFF;
  border: 1px solid gray;
  font-family: 'Coolvetica', sans-serif;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 10px;
}

.begin-btn:hover {
  background-color: #FF4191;
  color: #FFFFFF;
}
</style>
