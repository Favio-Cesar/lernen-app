<script setup lang="ts">
import { ref, nextTick } from "vue";

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
    const lastIndex = messages.value.findIndex((m) => m.loading);
    if (lastIndex !== -1) {
      messages.value[lastIndex] = {
        role: "assistant",
        content: data.response || "[Sin respuesta]",
      };
      await nextTick(); // asegúrate que se renderiza antes de hacer scroll
      scrollToBottom();
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

const scrollToBottom = () => {
  const el = document.querySelector(".messages");
  if (el) el.scrollTop = el.scrollHeight;
};
</script>

<template>
  <div class="chat-container">
    <h2 class="title">💬 Chat de Matemáticas (IA)</h2>

    <div class="messages">
      <transition-group name="fade" tag="div">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['message', msg.role]"
        >
          <strong>{{ msg.role === "user" ? "Tú" : "IA" }}:</strong>
          <span v-if="msg.loading" class="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
          <span v-else>{{ msg.content }}</span>
        </div>
      </transition-group>
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
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap");

.chat-container {
  font-family: "Fira Code", monospace;
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #1e1e2f;
  border-radius: 1rem;
  box-shadow: 0 0 20px #00000033;
  color: #e0e0e0;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #90caf9;
}

.messages {
  background: #12121c;
  border-radius: 0.75rem;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
}

.message {
  margin: 0.75rem 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  line-height: 1.5;
  transition: all 0.3s ease;
  white-space: pre-wrap;
}

.message.user {
  background-color: #283593;
  color: #fff;
}

.message.assistant {
  background-color: #2e7d32;
  color: #fff;
}

.dots span {
  animation: blink 1.5s infinite;
  font-size: 1.5rem;
  margin-left: 0.1rem;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.form {
  display: flex;
  gap: 0.5rem;
}

.input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #2a2a40;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #90caf9;
  }
}

.button {
  padding: 0.75rem 1.5rem;
  background-color: #90caf9;
  color: #000;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #64b5f6;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
