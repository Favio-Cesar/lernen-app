<script setup lang="ts">
import { ref } from "vue";

const userInput = ref("");
const messages = ref<
  { role: "user" | "assistant"; content: string; loading?: boolean }[]
>([]);
const loading = ref(false);

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const prompt = userInput.value;
  messages.value.push({ role: "user", content: prompt });
  userInput.value = "";
  loading.value = true;

  messages.value.push({ role: "assistant", content: "", loading: true });

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();
    console.log(data);
    const lastIndex = messages.value.findIndex((m) => m.loading);
    if (lastIndex !== -1) {
      messages.value[lastIndex] = {
        role: "assistant",
        content: data.response || "[Sin respuesta]",
      };
    }
  } catch (err) {
    console.error(err);
    const lastIndex = messages.value.findIndex((m) => m.loading);
    if (lastIndex !== -1) {
      messages.value[lastIndex] = {
        role: "assistant",
        content: "[Error al contactar con Ollama]",
      };
    }
  }

  loading.value = false;
};
</script>

<template>
  <div class="chat-container">
    <h2 class="text-xl font-bold mb-4">Chat de Matemáticas (IA)</h2>

    <div class="messages">
      <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
        <strong>{{ msg.role === "user" ? "Tú" : "IA" }}:</strong>
        <span v-if="msg.loading" class="dots"
          ><span>.</span><span>.</span><span>.</span></span
        >
        <span v-else>{{ msg.content }}</span>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="form">
      <input
        v-model="userInput"
        type="text"
        placeholder="Escribe tu duda..."
        class="input"
      />
      <button :disabled="loading" type="submit" class="button">
        {{ loading ? "Cargando..." : "Enviar" }}
      </button>
    </form>
  </div>
</template>
<style scoped lang="scss">
.chat-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  color: black;
}

.messages {
  margin-bottom: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.message {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: black;
}

.message.user {
  background-color: #e0f7fa;
  color: black;
}

.message.assistant {
  background-color: #f1f8e9;
  color: black;
}

.form {
  display: flex;
  gap: 0.5rem;
}

.input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  color: black;
}

.button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
