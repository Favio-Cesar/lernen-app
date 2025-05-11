<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
const email = ref("");
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const handleSignUpSubmit = async (e: Event) => {
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
        identifier: email.value,
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
};
</script>

<template>
  <form @submit="handleSignUpSubmit">
    <h1>Sign Up</h1>
    <div class="social-container">
      <a href="#" class="social"><i class="fab fa-facebook-f" /></a>
      <a href="#" class="social"><i class="fab fa-google-plus-g" /></a>
      <a href="#" class="social"><i class="fab fa-linkedin-in" /></a>
    </div>
    <span>or use your account</span>

    <input
      v-model="username"
      type="text"
      placeholder="📧 username"
      autocomplete="username"
      required
    />
    <input
      type="password"
      placeholder="🔒Password"
      autocomplete="current-password"
      required
    />
    <a href="#">Forgot your password?🤔</a>
    <button type="submit">Sign In</button>
  </form>
</template>

<style lang="scss" scoped></style>
