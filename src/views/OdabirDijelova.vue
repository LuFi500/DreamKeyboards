<template>
  <div>
    <v-navigation-drawer class="custom-drawer" permanent right>
      <!-- Layout Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radio1" label="Choose layout" class="custom-label" style="padding-top: 20px;">
          <v-radio label="60%" value="1" class="custom-option first-radio"></v-radio>
          <v-radio label="67%" value="2" class="custom-option"></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Case Material Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radio2" label="Case material" class="custom-label" style="margin-top: -70px;">
          <v-radio label="White Plastic" value="white" class="custom-option first-radio"></v-radio>
          <v-radio label="Black Plastic" value="black" class="custom-option"></v-radio>
          <v-radio label="Brushed Aluminum" value="aluminum" class="custom-option"></v-radio>
          <v-radio label="Brushed Brass" value="brass" class="custom-option"></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Keycap Color Radio Group -->
      <v-card class="custom-card">
        <v-radio-group v-model="radioKeycap" label="Keycap color" class="custom-label" style="margin-top: -70px;">
          <v-radio label="Black pbt" value="blackPbt" class="custom-option first-radio"></v-radio>
          <v-radio label="White pbt" value="whitePbt" class="custom-option"></v-radio>
          <v-radio label="Peach Red pbt" value="peachRed" class="custom-option"></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Switches Radio Group with Play Buttons -->
      <v-card class="custom-card">
        <v-radio-group v-model="radioSwitches" label="Switches" class="custom-label" style="margin-top: -70px;">
          <div class="switch-option d-flex justify-space-between align-center">
            <v-radio label="Matcha Late" value="matchaLate" class="custom-option first-radio"></v-radio>
            <v-btn icon @click="playSound('matchaLatte')" class="play-button">
              <v-icon class="pt-5" color="white">mdi-play-circle</v-icon>
            </v-btn>
          </div>
          <div class="switch-option">
            <v-radio label="Boba U4T" value="boba" class="custom-option"></v-radio>
            <v-btn icon @click="playSound('boba')" class="play-button">
              <v-icon color="white">mdi-play-circle</v-icon>
            </v-btn>
          </div>
          <div class="switch-option">
            <v-radio label="Akko Cream Black" value="akkoBlack" class="custom-option"></v-radio>
            <v-btn icon @click="playSound('akkoBlack')" class="play-button">
              <v-icon color="white">mdi-play-circle</v-icon>
            </v-btn>
          </div>
          <div class="switch-option">
            <v-radio label="Akko Cream Yellow" value="akkoYellow" class="custom-option"></v-radio>
            <v-btn icon @click="playSound('akkoYellow')" class="play-button">
              <v-icon color="white">mdi-play-circle</v-icon>
            </v-btn>
          </div>
        </v-radio-group>
      </v-card>

      <!-- Checkbox for Wireless Connectivity -->
      <v-card class="custom-card">
        <v-checkbox v-model="checkbox1" label="Wireless connectivity" class="custom-option custom-checkbox" style="margin-top: -70px;"></v-checkbox>
      </v-card>

      <!-- Checkout Button -->
      <v-btn
        class="proceed-to-checkout-btn"
        text
        block
        @click="goToCheckout"
      >
        Proceed to Checkout
      </v-btn>
    </v-navigation-drawer>

    <div ref="threeContainer" class="three-container"></div>

    <!-- Audio elements for sound samples -->
    <audio ref="matchaLatte" src="/Sounds/matchaLatte.wav"></audio>
    <audio ref="boba" src="/Sounds/Boba.wav"></audio>
    <audio ref="akkoBlack" src="/Sounds/akkoCreamBlack.wav"></audio>
    <audio ref="akkoYellow" src="/Sounds/akkoCreamYellow.wav"></audio>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'; // Import OBJLoader
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls
import { auth } from '@/router/firebase'; // Import Firebase authentication

export default {
  name: 'ThreeScene',
  data() {
    return {
      radio1: '2', // Default to 67% layout
      radio2: 'aluminum', // Default to Brushed Aluminum for case material
      radioKeycap: 'peachRed', // Track keycap color, default Peach Red
      radioSwitches: 'matchaLate', // Default to Matcha Late switch
      checkbox1: false, // Wireless connectivity option (default unchecked)
      object: null, // Reference to the 3D object
      currentPlayingAudio: null, // Track the currently playing audio
      layoutPrices: { 1: 40, 2: 45 }, // Prices for layouts
      caseMaterialPrices: { white: 20, black: 20, aluminum: 30, brass: 40 }, // Prices for case materials
      keycapPrice: 20, // Keycap price
      switchPrices: { matchaLate: 40, boba: 50, akkoBlack: 30, akkoYellow: 30 }, // Prices for switches
      wirelessPrice: 20, // Wireless connectivity price
    };
  },
  watch: {
    radio1(newVal) {
      if (newVal === '1') {
        this.loadKeyboardModel('/60keyboard.obj'); // Load 60% keyboard model
      } else if (newVal === '2') {
        this.loadKeyboardModel('/prava.obj'); // Load 67% keyboard model
      }
    },
    radio2(newVal) {
      this.updateTexture(newVal, this.radioKeycap);
    },
    radioKeycap(newVal) {
      this.updateTexture(this.radio2, newVal);
    }
  },
  methods: {
    playSound(switchType) {
      const audio = this.$refs[switchType];
      if (audio) {
        if (this.currentPlayingAudio && this.currentPlayingAudio !== audio) {
          this.currentPlayingAudio.pause();
          this.currentPlayingAudio.currentTime = 0;
        }
        this.currentPlayingAudio = audio;
        audio.play();
      }
    },
    loadKeyboardModel(modelPath) {
      if (this.object) {
        this.scene.remove(this.object);
        this.object = null;
      }

      const objLoader = new OBJLoader();
      objLoader.load(
        modelPath,
        (object) => {
          if (modelPath === '/60keyboard.obj') {
            object.scale.set(0.1, 0.1, 0.1); // Scale to match the 67% model
            object.position.set(-2.3, 1, -1); // Position to match the 67% model
            object.rotation.x = Math.PI / 2; // Same rotation as the 67% model
          } else if (modelPath === '/prava.obj') {
            object.scale.set(3, 3, 3);
            object.position.set(4.5, -1, 0);
            object.rotation.x = Math.PI / 2;
          }

          this.object = object;
          this.updateTexture(this.radio2, this.radioKeycap); // Update texture
          this.scene.add(this.object); // Add the object to the scene
        },
        (xhr) => {
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (error) => {
          console.error('An error happened', error);
        }
      );
    },
    calculateTotal() {
      const layoutPrice = this.layoutPrices[this.radio1];
      const caseMaterialPrice = this.caseMaterialPrices[this.radio2];
      const keycapPrice = this.keycapPrice;
      const switchPrice = this.switchPrices[this.radioSwitches];
      const wirelessPrice = this.checkbox1 ? this.wirelessPrice : 0;

      return layoutPrice + caseMaterialPrice + keycapPrice + switchPrice + wirelessPrice;
    },
    initThree() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 2, 7.5);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth * 0.85, window.innerHeight);
      this.$refs.threeContainer.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.minDistance = 5;
      controls.maxDistance = 20;
      controls.enableZoom = true;
      controls.maxPolarAngle = Math.PI;
      controls.minPolarAngle = 0;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      this.scene.add(directionalLight);

      this.loadKeyboardModel('/prava.obj'); // Default model

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(this.scene, camera);
      };

      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth * 0.85, window.innerHeight);
      });

      this.radio1 = '2';
    },
    updateTexture(caseMaterial, keycap) {
  const textureLoader = new THREE.TextureLoader();
  let texturePath = '';

  // Determine if we are using the 60% or 67% model
  const is60Percent = this.radio1 === '1'; // Check if 60% model is selected

  if (is60Percent) {
    // Logic for 60% model texture paths
    if (keycap === 'peachRed') {
      texturePath = caseMaterial === 'aluminum' ? '/60aluminumRed.png' :
                    caseMaterial === 'white' ? '/60whiteRed.png' :
                    caseMaterial === 'black' ? '/60blackRed.png' :
                    caseMaterial === 'brass' ? '/60brassRed.png' : '';
    } else if (keycap === 'blackPbt') {
      texturePath = caseMaterial === 'aluminum' ? '/60aluminumBlack.png' :
                    caseMaterial === 'white' ? '/60whiteBlack.png' :
                    caseMaterial === 'black' ? '/60blackBlack.png' :
                    caseMaterial === 'brass' ? '/60brassBlack.png' : '';
    } else if (keycap === 'whitePbt') {
      texturePath = caseMaterial === 'aluminum' ? '/60aluminumWhite.png' :
                    caseMaterial === 'white' ? '/60whiteWhite.png' :
                    caseMaterial === 'black' ? '/60blackWhite.png' :
                    caseMaterial === 'brass' ? '/60brassWhite.png' : '';
    }
  } else {
    // Logic for 67% model texture paths
    if (keycap === 'peachRed') {
      texturePath = caseMaterial === 'aluminum' ? '/redAluminum1.png' :
                    caseMaterial === 'white' ? '/redWhite.png' :
                    caseMaterial === 'black' ? '/redBlack.png' :
                    caseMaterial === 'brass' ? '/redBrass1.png' : '';
    } else if (keycap === 'blackPbt') {
      texturePath = caseMaterial === 'aluminum' ? '/blackAluminum1.png' :
                    caseMaterial === 'white' ? '/blackWhite.png' :
                    caseMaterial === 'black' ? '/blackBlack.png' :
                    caseMaterial === 'brass' ? '/blackBrass1.png' : '';
    } else if (keycap === 'whitePbt') {
      texturePath = caseMaterial === 'aluminum' ? '/whiteAluminum1.png' :
                    caseMaterial === 'white' ? '/whiteWhite.png' :
                    caseMaterial === 'black' ? '/whiteBlack.png' :
                    caseMaterial === 'brass' ? '/whiteBrass1.png' : '';
    }
  }

  if (texturePath && this.object) {
    console.log('Loading texture:', texturePath); // Debugging log

    textureLoader.load(
      texturePath,
      (texture) => {
        this.object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        });
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  } else {
    console.error('Texture path not found or object not loaded');
  }
},

    goToCheckout() {
      const totalAmount = this.calculateTotal();

      if (auth.currentUser) {
        this.$router.push({
          path: '/checkout',
          query: {
            layout: this.radio1,
            caseMaterial: this.radio2,
            keycap: this.radioKeycap,
            switches: this.radioSwitches,
            wireless: this.checkbox1,
            total: totalAmount
          }
        });
      } else {
        this.$router.push('/login');
      }
    }
  },
  mounted() {
    this.initThree();
  }
};
</script>

<style scoped>
.three-container {
  width: 85%;
  height: 100vh;
  float: left;
  overflow: hidden;
  background-color: black;
}

.switch-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.play-button {
  color: white;
  cursor: pointer;
  padding-top: 2px;
  border-radius: 50%;
}

/* Apply the same button style as the login button */
.proceed-to-checkout-btn {
  background-color: black !important;
  color: white !important;
  border: 1px solid white !important;
  transition: background-color 0.3s, color 0.3s;
}

.proceed-to-checkout-btn:hover {
  background-color: #FF4191 !important;
  color: white !important;
}

/* Drawer and card styling */
.custom-drawer {
  background-color: black;
  width: 15% !important;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  border-left: 1px solid rgb(114, 114, 114);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.custom-card {
  background-color: transparent;
  border: none;
  margin-top: 80px;
}

/* Font styling */
@import url('https://fonts.cdnfonts.com/css/coolvetica-2');

.custom-label >>> .v-label,
.custom-label /deep/ .v-label {
  font-family: 'Coolvetica', sans-serif;
  font-size: 24px !important;
  color: white;
}

.custom-option >>> .v-label,
.custom-option /deep/ .v-label {
  font-family: 'Coolvetica', sans-serif;
  font-size: 18px !important;
  color: white;
  cursor: pointer;
  transition: color 0.3s;
}

.custom-checkbox >>> .v-input__control {
  border: 2px solid white !important;
  border-radius: 4px;
}

.custom-checkbox >>> .v-input--selection-controls__ripple {
  border-color: white !important;
}

.custom-option >>> .v-input__control,
.custom-option /deep/ .v-input__control {
  border: none !important;
}

.custom-option >>> .v-input__control:focus,
.custom-option /deep/ .v-input__control:focus {
  outline: none !important;
}
</style>
