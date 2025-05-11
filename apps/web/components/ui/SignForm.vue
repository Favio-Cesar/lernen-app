<script setup lang="ts">
import { ref, computed } from "vue";
import { z } from "zod";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps<{
  mode: "login" | "signup";
}>();

const username = ref("");
const email = ref("");
const password = ref("");

// 👇 Cambiado a array de strings
const errorMessages = ref<string[]>([]);

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signUpSchema = z.object({
  email: z.string().email("Valid email is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const isLogin = computed(() => props.mode === "login");

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  errorMessages.value = [];

  const result = isLogin.value
    ? loginSchema.safeParse({
        username: username.value,
        password: password.value,
      })
    : signUpSchema.safeParse({
        email: email.value,
        username: username.value,
        password: password.value,
      });

  if (!result.success) {
    errorMessages.value = result.error.errors.map((err) => err.message);
    return;
  }

  const endpoint = isLogin.value
    ? "http://localhost:1337/api/auth/local"
    : "http://localhost:1337/api/auth/local/register";

  const payload = isLogin.value
    ? {
        identifier: username.value,
        password: password.value,
      }
    : {
        username: username.value,
        email: email.value,
        password: password.value,
      };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Authentication failed");
    }

    localStorage.setItem("jwt", data.jwt);
    router.push("/"); // Redirige al home tras la autenticación exitosa
  } catch (err: unknown) {
    errorMessages.value = [
      err instanceof Error ? err.message : "An unknown error occurred",
    ];
  }
};
</script>

<template>
  <form @submit="handleSubmit">
    <h1>{{ isLogin ? "Sign In" : "Sign Up" }}</h1>

    <div class="social-container">
      <a href="#" class="social"><i class="fab fa-facebook-f" /></a>
      <a href="#" class="social"><i class="fab fa-google-plus-g" /></a>
      <a href="#" class="social"><i class="fab fa-linkedin-in" /></a>
    </div>

    <span v-if="!isLogin">or use your email to register</span>

    <input
      v-if="!isLogin"
      v-model="email"
      type="email"
      placeholder="📧 Email"
      autocomplete="email"
    />

    <input
      v-model="username"
      type="text"
      placeholder="👤 Username"
      autocomplete="username"
    />

    <input
      v-model="password"
      type="password"
      placeholder="🔒 Password"
      autocomplete="current-password"
    />

    <!-- ✅ Aquí renderizamos cada mensaje de error individualmente -->
    <ul
      v-if="errorMessages"
      style="color: red; font-size: 0.9em; margin: 5px 0; padding-left: 1em"
    >
      <li v-for="(message, index) in errorMessages" :key="index">
        {{ message }}
      </li>
    </ul>

    <a href="#" v-if="isLogin">Forgot your password? 🤔</a>
    <button type="submit">{{ isLogin ? "Sign In" : "Sign Up" }}</button>
  </form>
</template>

<style lang="scss" scoped>
.social-container {
  margin: 20px 0;
}
.social-container a {
  border: 1px solid #ddd;
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
  border-color: transparent;
}
</style>
