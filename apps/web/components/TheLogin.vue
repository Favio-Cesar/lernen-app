<script setup lang="ts">
const containerRef = ref<HTMLElement | null>(null)
const signup = ref(true)
const handleSignUp = () => {
  containerRef.value?.classList.add('right-panel-active')
  signup.value = false
}
const handleSignIn = () => {
  containerRef.value?.classList.remove('right-panel-active')
  signup.value = true
}
</script>
<template>
  <div ref="containerRef" class="container">
    <div class="form-container sign-in-container">
      <Transition name="fade-expand">
        <UiSignForm mode="login" v-if="!signup" />
        <UiSignForm mode="signup" v-else />
      </Transition>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>{{ $t('login.register.h2') }}</h1>
          <p>{{ $t('login.register.p') }}</p>
          <button class="ghost" @click="handleSignIn">
            {{ $t('login.register.title') }}
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>{{ $t('login.login.h2') }}</h1>
          <p>{{ $t('login.login.p') }}</p>
          <button class="ghost" @click="handleSignUp">
            {{ $t('login.login.title') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
.fade-expand-enter-active,
.fade-expand-leave-active {
  transition: opacity 0.4s ease;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
  opacity: 0;
}

.fade-expand-enter-to,
.fade-expand-leave-from {
  opacity: 1;
}
h1 {
  font-weight: bold;
  margin: 0;
  font-size: 2.5rem;
}

p {
  font-size: 1.6rem;
  font-weight: 100;
  line-height: 1.7rem;
  letter-spacing: 0.05rem;
  margin: 20px 0 30px;
}

span {
  font-size: 1.4rem;
  font-weight: 150;
}

a {
  color: #333;
  font-size: 1.4rem;
  text-decoration: none;
  font-weight: 250;
  transition: color 0.3s ease;
}

a:hover {
  color: #ff4b2b;
}

button {
  border-radius: $button-radius;
  border: 1px solid $primary-color-dark;
  background-color: $primary-color;
  color: $font__color--dark;
  font-size: 1.4rem;
  font-weight: bold;
  padding: $button-padding;
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
  background-color: $primary-color-light;
  border-color: $primary-color-lighter;
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

.container {
  background-color: #fff;
  border-radius: $border-radius;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  width: 75%;
  max-width: 80%;
  min-height: 75%;
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
  width: 51%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: linear-gradient(to right, $primary-color, $primary-color-dark);
  color: $font__color--dark;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
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
  left: 9%;
  transform: translateX(0%);
}

.overlay-right {
  right: 5%;
  transform: translateX(0%);
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(0%);
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

/* Mobile Responsiveness Fixes */
@media (max-width: 768px) {
  .container {
    width: 95%;
    min-height: 90%;
    max-width: 95%;
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

  /* Mobile Layout Adjustments */
  .form-container {
    width: 100%;
    height: 50%;
    left: 0;
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
    padding: 20px;
  }

  .overlay-left {
    top: 0;
    left: 0;
    transform: translateY(200%);
  }

  .overlay-right {
    top: 50%;
    left: 0;
    right: auto;
    transform: translateY(0);
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

  .container.right-panel-active .overlay {
    transform: translateX(0%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateY(100%);
  }

  .container.right-panel-active .overlay-right {
    transform: translateY(-100%);
  }

  /* Adjust text sizes for mobile */
  .overlay-panel h1 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .overlay-panel p {
    font-size: 1.2rem;
    margin: 10px 0 20px;
  }
}
</style>
