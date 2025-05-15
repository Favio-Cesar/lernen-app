<script setup lang="ts">
import { ref } from 'vue'
const containerRef = ref<HTMLElement | null>(null)
const handleSignUp = () => {
  containerRef.value?.classList.add('right-panel-active')
}
const handleSignIn = () => {
  containerRef.value?.classList.remove('right-panel-active')
}
</script>
<template>
  <div>
    <div ref="containerRef" class="container">
      <!-- Sign Up Form -->
      <div class="form-container sign-up-container">
        <UiSignForm mode="login" />
      </div>

      <!-- Sign In Form -->
      <div class="form-container sign-in-container">
        <UiSignForm mode="signup" />
      </div>

      <!-- Overlay Container -->
      <div class="overlay-container">
        <div class="overlay">
          <!-- Overlay Left Panel -->
          <div class="overlay-panel overlay-left">
            <h1>Don't have an account?</h1>
            <p>Sign up to our page and get a personalised experience!</p>
            <button class="ghost" @click="handleSignIn">Sign Up</button>
          </div>

          <!-- Overlay Right Panel -->
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="handleSignUp">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

h1 {
  font-weight: bold;
  margin: 0;
  font-size: 1.8em;
}

h1 span {
  font-size: 0.9em;
  margin-left: 5px;
}

p {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
  margin-bottom: 10px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: color 0.3s ease;
}

a:hover {
  color: #ff4b2b;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition:
    transform 80ms ease-in,
    background-color 0.3s ease,
    border-color 0.3s ease;
  cursor: pointer;
  margin-top: 10px;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

button.ghost:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
}

input:focus {
  outline: 2px solid #ff416c;
  background-color: #fff;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 520px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 40%;
  line-break: normal;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  left: 4.6rem;
  transform: translateX(0%);
}

.overlay-right {
  right: 2rem;
  transform: translateX(0%);
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

.container.right-panel-active .overlay {
  transform: translateX(45%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.copyright {
  position: fixed;
  bottom: 10px;
  right: 15px;
  color: #aaa;
  font-size: 0.8em;
  font-weight: 300;
  z-index: 1001;
}

@media (max-width: 768px) {
  .container {
    width: 95%;
    min-height: 500px;
  }
  .form-container {
    padding: 0 20px;
  }
  h1 {
    font-size: 1.6em;
  }
  .overlay-panel {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.4em;
  }
  button {
    padding: 10px 30px;
  }
  input {
    padding: 10px 12px;
  }

  .container {
    min-height: 480px;
  }
  .copyright {
    font-size: 0.7em;
    bottom: 5px;
    right: 10px;
  }
}
@media (max-width: 768px) {
  .container {
    min-height: 90vh;
    max-width: 90vw;
  }
  .form-container {
    width: 100% !important;
    height: 50%;
    left: 0 !important;
  }
  .overlay-container {
    width: 100%;
    height: 50%;
    top: 50%;
    left: 0;
    transform: translateY(0);
  }
  .overlay {
    width: 100%;
    height: 200%;
    top: -100%;
    left: 0;
    transform: translateY(0);
  }
  .overlay-panel {
    width: 100%;
    height: 50%;
    transform: translateY(0);
  }
  .overlay-left {
    transform: translateY(-20%);
  }
  .overlay-right {
    transform: translateY(20%);
  }
  .container.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }
  .container.right-panel-active .sign-up-container {
    transform: translateY(100%);
  }
  .container.right-panel-active .overlay-container {
    transform: translateY(-100%);
  }
}
</style>
