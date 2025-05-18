<script setup lang="ts">
import { ref, nextTick } from 'vue'

const userInput = ref('')
const messages = ref<
  { role: 'user' | 'assistant'; content: string; loading?: boolean }[]
>([])
const loading = ref(false)

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  const prompt = userInput.value
  messages.value.push({ role: 'user', content: prompt })
  userInput.value = ''
  loading.value = true

  messages.value.push({ role: 'assistant', content: '', loading: true })

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt,
        stream: false,
      }),
    })

    const data = await res.json()
    const lastIndex = messages.value.findIndex((m) => m.loading)
    if (lastIndex !== -1) {
      messages.value[lastIndex] = {
        role: 'assistant',
        content: data.response || '[Sin respuesta]',
      }
      await nextTick()
      scrollToBottom()
    }
  } catch (err) {
    console.error(err)
    const lastIndex = messages.value.findIndex((m) => m.loading)
    if (lastIndex !== -1) {
      messages.value[lastIndex] = {
        role: 'assistant',
        content: '[Error al contactar con Ollama]',
      }
    }
  }

  loading.value = false
}

const scrollToBottom = () => {
  const el = document.querySelector('.messages')
  if (el) el.scrollTop = el.scrollHeight
}
</script>

<template>
  <div class="chat-container">
    <h2 class="title">Chat</h2>

    <div class="messages">
      <transition-group name="fade" tag="div">
        <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
          <strong>{{ msg.role === 'user' ? 'Tú' : 'IA' }}:</strong>
          <span v-if="msg.loading" class="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
          <span v-else>{{ msg.content }}</span>
        </div>
      </transition-group>
    </div>

    <form class="form" @submit.prevent="sendMessage">
      <input
        v-model="userInput"
        type="text"
        placeholder="Escribe tu duda..."
        class="input"
      />
      <button :disabled="loading" type="submit" class="button">
        {{ loading ? 'Cargando...' : 'Enviar' }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap');

.chat-container {
  font-family: 'Fira Code', monospace;
  max-width: 80vw;
  height: 60vh;
  margin: 2rem auto;
  padding: 2rem;
  background: $primary-color-light;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  color: $primary-color-dark;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 2.8rem;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 1rem;
  text-align: center;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, $primary-color-dark, $secondary-color-dark);
}

.messages {
  background: $primary-color-dark;
  border-radius: 0.75rem;
  padding: 1rem;
  max-height: 50vh;
  overflow-y: auto;
  margin-bottom: 1rem;
  scroll-behavior: smooth;
  flex-grow: 1;
}

.message {
  margin: 0.75rem 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  line-height: 1.5;
  transition: all $transition-fast;
  white-space: pre-wrap;
  word-break: break-word;

  &.user {
    background-color: $primary-color-light;
    color: $primary-color-dark;
    align-self: flex-end;
  }

  &.assistant {
    background-color: $secondary-color-light;
    color: $primary-color-dark;
    align-self: flex-start;
  }
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
  background: $tertiary-color-dark;
  color: $primary-color-dark;
  font-size: 1rem;
  transition: box-shadow $transition-fast;
  &::placeholder {
    color: $primary-color-dark;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px $primary-color;
  }
}

.button {
  padding: 0.75rem 1.5rem;
  background-color: $primary-color;
  color: $font__color--light;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background $transition-fast;

  &:hover {
    background-color: $tertiary-color-light;
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
