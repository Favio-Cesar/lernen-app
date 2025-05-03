<script setup>
import { ref } from "vue";

const containerRef = ref(null);

const handleSignUp = () => {
  containerRef.value?.classList.add("right-panel-active");
  console.log("Sign Up button clicked - adding class");
};

const handleSignIn = () => {
  containerRef.value?.classList.remove("right-panel-active");
  console.log("Sign In button clicked - removing class");
};
</script>

<template>
  <div>
    <div class="container" ref="containerRef">
      <!-- Sign Up Form -->
      <div class="form-container sign-up-container">
        <form>
          <h1>Create Account 🚀</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="👤 Name" required />
          <input type="email" placeholder="📧 Email" required />
          <input type="password" placeholder="🔒 Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <!-- Sign In Form -->
      <div class="form-container sign-in-container">
        <form>
          <h1>Sign In 👋</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="📧 Email" required />
          <input type="password" placeholder="🔒 Password" required />
          <a href="#">Forgot your password? 🤔</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <!-- Overlay Container -->
      <div class="overlay-container">
        <div class="overlay">
          <!-- Overlay Left Panel -->
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back! 🎉</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" @click="handleSignIn">Sign In</button>
          </div>

          <!-- Overlay Right Panel -->
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend! ✨</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button class="ghost" @click="handleSignUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>

    <div class="copyright">@copyright by dipesh</div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

* {
  box-sizing: border-box;

  margin: 0;

  padding: 0;
}

body {
  background: linear-gradient(to right, #ff4b2b, #ff416c);

  /* Fallback background */

  background: #f6f5f7;

  display: flex;

  justify-content: center;

  align-items: center;

  flex-direction: column; /* To position copyright below */

  font-family: "Poppins", sans-serif;

  height: 100vh;

  margin: -20px 0 50px; /* Adjust top margin if needed */
}

h1 {
  font-weight: bold;

  margin: 0;

  font-size: 1.8em; /* Slightly larger headings */

  margin-bottom: 10px; /* Spacing below heading */
}

h1 span {
  /* Style emoji inside heading differently if needed */

  font-size: 0.9em;

  margin-left: 5px;
}

p {
  font-size: 14px;

  font-weight: 300; /* Lighter weight for paragraph */

  line-height: 20px;

  letter-spacing: 0.5px;

  margin: 20px 0 30px;
}

span {
  font-size: 12px;

  margin-bottom: 10px; /* Space below the 'or use...' text */
}

a {
  color: #333;

  font-size: 14px;

  text-decoration: none;

  margin: 15px 0;

  transition: color 0.3s ease;
}

a:hover {
  color: #ff4b2b; /* Highlight on hover */
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

  margin-top: 10px; /* Space above button */
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
  background-color: rgba(255, 255, 255, 0.1); /* Subtle hover for ghost */
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

  border-radius: 5px; /* Slightly rounded inputs */

  font-family: "Poppins", sans-serif; /* Ensure font consistency */
}

input:focus {
  outline: 2px solid #ff416c; /* Focus indicator */

  background-color: #fff; /* Change background on focus */
}

.container {
  background-color: #fff;

  border-radius: 10px;

  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2); /* Softer shadow */

  position: relative;

  overflow: hidden;

  width: 768px;

  max-width: 100%;

  min-height: 520px; /* Slightly taller */
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

  z-index: 100; /* Ensure overlay is on top */
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

  width: 50%;

  transform: translateX(0);

  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%); /* Start slightly off-screen */
}

.overlay-right {
  right: 0;

  transform: translateX(0);
}

/* --- Animation --- */

/* Move Sign-in to the right */

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

/* Move overlay to the left */

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* Bring Sign-up over Sign-in */

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);

  opacity: 1;

  z-index: 5;

  animation: show 0.6s;
}

/* Move overlay back to the right */

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

/* Move overlay panels */

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%); /* Move slightly off-screen */
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

/* Social Icons Styling (Optional) */

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;

  border-radius: 50%;

  display: inline-flex;

  justify-content: center;

  align-items: center;

  margin: 0 5px;

  height: 40px;

  width: 40px;

  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.social-container a:hover {
  background-color: #eee;

  color: #ff4b2b;

  border-color: transparent; /* Hide border on hover */
}

/* Copyright Notice */

.copyright {
  position: fixed; /* Or absolute if you prefer relative to body */

  bottom: 10px;

  right: 15px; /* Position in the bottom-right corner */

  color: #aaa; /* Subtle color */

  font-size: 0.8em;

  font-weight: 300;

  z-index: 1001; /* Ensure it's above everything */
}

/* Responsive adjustments (Example) */

@media (max-width: 768px) {
  .container {
    width: 95%;

    min-height: 500px;
  }

  .form-container {
    padding: 0 20px; /* Less padding on smaller screens */
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

  .social-container a {
    height: 35px;

    width: 35px;
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
  /* Cambiar la dirección del contenedor principal */
  .container {
    min-height: 90vh;
    max-width: 90vw;
  }

  /* Ajustar formularios para apilamiento vertical */
  .form-container {
    width: 100% !important;
    height: 50%;
    left: 0 !important;
  }

  /* Posicionamiento del overlay */
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

  /* Ajustar paneles del overlay */
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

  /* Animaciones para versión móvil */
  .container.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  .container.right-panel-active .sign-up-container {
    transform: translateY(100%);
  }

  .container.right-panel-active .overlay-container {
    transform: translateY(-100%);
  }

  .container.right-panel-active .overlay {
    transform: translateY(50%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateY(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateY(0);
  }
}
</style>
