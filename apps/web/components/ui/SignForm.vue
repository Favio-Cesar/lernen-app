<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{
  mode: 'login' | 'signup'
}>()

const { username, email, password, isLogin, errorMessages, handleSubmit } = useAuth(
  props.mode,
)
</script>

<template>
  <form @submit="handleSubmit" class="sign-form">
    <h1>{{ isLogin ? 'Sign In' : 'Sign Up' }}</h1>

    <input
      v-if="!isLogin"
      v-model="email"
      type="email"
      :placeholder="$t('login.form.email')"
      autocomplete="email"
      required
    />

    <input
      v-model="username"
      type="text"
      :placeholder="$t('login.form.username')"
      autocomplete="username"
      required
    />

    <input
      v-model="password"
      type="password"
      :placeholder="$t('login.form.password')"
      autocomplete="current-password"
      required
    />

    <ul v-if="errorMessages.length" class="error-list">
      <li v-for="(message, index) in errorMessages" :key="index">
        {{ message }}
      </li>
    </ul>

    <button type="submit">{{ isLogin ? 'Sign In' : 'Sign Up' }}</button>
  </form>
</template>

<style lang="scss" scoped>
.sign-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.social-container a {
  border: 1px solid #000000;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 3rem;
  width: 3rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
.social-container a:hover {
  background-color: #eee;
  color: #00dc82;
  border-color: transparent;
}
.error-list {
  color: red;
  font-size: 0.9em;
  margin: 5px 0;
  padding-left: 1em;
}

input {
  background-color: #eee;
  border: none;
  padding: $input-padding;
  margin: 0.5rem 0;
  max-width: 90%;
  border-radius: 0.4rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.4s;
  outline: 0.1rem solid $primary-color-light;
  color: black;
  ::placeholder {
    color: black;
  }
}

input:focus {
  background-color: #fff;
}
h1,
button {
  color: $primary-color-dark;
}
button {
  background-color: $primary-color;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease-in-out;
}
</style>
