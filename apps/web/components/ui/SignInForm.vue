<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const handleSignInSubmit = async (e: Event) => {
  e.preventDefault();
  errorMessage.value = "";

  const result = loginSchema.safeParse({
    username: username.value,
    password: password.value,
  });

  if (!result.success) {
    errorMessage.value = result.error.errors
      .map((err) => err.message)
      .join(", ");
    return;
  }

  try {
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Login failed");
    }

    console.log("Login success:", data);

    localStorage.setItem("jwt", data.jwt);
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = "An unknown error occurred";
    }
  }
  console.log(errorMessage.value);
  console.log("Zod result:", result);
};
</script>

<template>
  <form @submit="handleSignInSubmit">
    <h1>Sign In</h1>
    <div class="social-container">
      <a href="#" class="social"><i class="fab fa-facebook-f" /></a>
      <a href="#" class="social"><i class="fab fa-google-plus-g" /></a>
      <a href="#" class="social"><i class="fab fa-linkedin-in" /></a>
    </div>
    <input
      v-model="username"
      type="text"
      placeholder="username"
      autocomplete="username"
    />

    <input
      v-model="password"
      type="password"
      placeholder="🔒 Password"
      autocomplete="current-password"
    />
    <div
      v-if="errorMessage.length"
      style="color: red; font-size: 0.9em; margin: 5px 0"
    >
      {{ errorMessage }}
    </div>
    <a href="#">Forgot your password?🤔</a>
    <button type="submit">Sign In</button>
  </form>
</template>

<style lang="scss" scoped>
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
  border-color: transparent;
}
</style>
