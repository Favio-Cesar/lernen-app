<script setup lang="ts">
import { ref, computed } from 'vue'
import { z } from 'zod'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  mode: 'login' | 'signup'
}>()

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessages = ref<string[]>([])

const isLogin = computed(() => props.mode === 'login')
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const signUpSchema = z.object({
  email: z.string().email('Valid email is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  errorMessages.value = []

  const result = isLogin.value
    ? loginSchema.safeParse({
        username: username.value,
        password: password.value,
      })
    : signUpSchema.safeParse({
        email: email.value,
        username: username.value,
        password: password.value,
      })

  if (!result.success) {
    errorMessages.value = result.error.errors.map((err) => err.message)
    return
  }

  const endpoint = isLogin.value
    ? 'http://localhost:1337/api/auth/local'
    : 'http://localhost:1337/api/auth/local/register'

  const payload = isLogin.value
    ? {
        identifier: username.value,
        password: password.value,
      }
    : {
        username: username.value,
        email: email.value,
        password: password.value,
      }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Authentication failed')
    }

    localStorage.setItem('jwt', data.jwt)
    router.push('/')
  } catch (err: unknown) {
    errorMessages.value = [
      err instanceof Error ? err.message : 'An unknown error occurred',
    ]
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <h1>{{ isLogin ? 'Sign In' : 'Sign Up' }}</h1>

    <div class="social-container">
      <a href="#" class="social" aria-label="Sign in with Nuxt">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
          <path
            fill="#fbc02d"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#e53935"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4caf50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1565c0"
            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
      </a>
    </div>

    <span>{{ isLogin ? 'or use your account' : 'or use your email to register' }}</span>

    <input
      v-if="!isLogin"
      v-model="email"
      type="email"
      placeholder="📧 Email"
      autocomplete="email"
      required
    />

    <input
      v-model="username"
      type="text"
      placeholder="👤 Username"
      autocomplete="username"
      required
    />

    <input
      v-model="password"
      type="password"
      placeholder="🔒 Password"
      autocomplete="current-password"
      required
    />

    <ul v-if="errorMessages.length" class="error-list">
      <li v-for="(message, index) in errorMessages" :key="index">
        {{ message }}
      </li>
    </ul>

    <a href="#" v-if="isLogin">Forgot your password? 🤔</a>
    <button type="submit">{{ isLogin ? 'Sign In' : 'Sign Up' }}</button>
  </form>
</template>

<style lang="scss" scoped>
.social-container a {
  border: 1px solid #ddd;
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
</style>
