<template>
  <div class="module">
    <div class="toolbar">
      <button @click="$emit('duplicate')" title="Duplicar módulo">➕</button>
      <button @click="chatVisible = true" title="Abrir chat">💬</button>
      <button
        @click="exercisesVisible = true"
        title="Mostrar ejercicios"
        :disabled="selectedExercise !== null"
      >
        📚
      </button>
      <button @click="$emit('close')" title="Cerrar módulo">❌</button>
      <button @click="clearCanvas" title="Borrar dibujo">🧹</button>
    </div>

    <div class="body">
      <textarea class="text-area" placeholder="Escribe aquí..."></textarea>
      <canvas ref="canvas" class="canvas"></canvas>

      <!-- Mostrar ejercicio seleccionado con botón para borrar -->
      <div v-if="selectedExercise" class="selected-exercise">
        <strong>Ejercicio seleccionado:</strong>
        <span v-html="renderedSelectedTitle"></span>

        <button @click="removeExercise" title="Quitar ejercicio">❌</button>
      </div>
    </div>

    <!-- Modal Chat -->
    <Transition name="fade-scale">
      <div v-if="chatVisible" class="chat-modal">
        <div class="chat-header">
          <span>Chat</span>
          <button @click="chatVisible = false">✖</button>
        </div>
        <div class="chat-messages">
          <div v-for="(msg, i) in messages" :key="i" class="chat-message">
            {{ msg }}
          </div>
        </div>
        <input
          v-model="newMsg"
          @keyup.enter="sendMessage"
          placeholder="Escribe un mensaje..."
        />
      </div>
    </Transition>

    <!-- Modal Exercises -->
    <Transition name="fade-scale">
      <div v-if="exercisesVisible" class="chat-modal">
        <div class="chat-header">
          <span>Lista de Ejercicios</span>
          <button @click="exercisesVisible = false">✖</button>
        </div>
        <div class="chat-messages">
          <div v-if="loading">Cargando...</div>
          <div v-else>
            <div v-if="exercises.length === 0">No hay ejercicios disponibles.</div>
            <ul>
              <li v-for="exercise in exercises" :key="exercise.id">
                <!-- Botón para seleccionar ejercicio -->
                <button @click="selectExercise(exercise)">
                  {{ exercise.title }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// Función para renderizar LaTeX a HTML usando KaTeX
function renderLatex(latexString, displayMode = true) {
  try {
    return katex.renderToString(latexString, {
      throwOnError: false,
      displayMode,
    })
  } catch {
    return latexString
  }
}

const emit = defineEmits(['duplicate', 'close'])
const selectedExercise = ref(null)
const renderedSelectedLatex = ref('')
const renderedSelectedTitle = ref('')
// Cuando cambie selectedExercise renderizamos sólo la parte LaTeX
watch(selectedExercise, (newVal) => {
  if (newVal) {
    // Separamos texto y latex
    const [renderedSelectedTitle.value, renderedSelectedLatex] = splitTextAndLatex(newVal.title)
    // Renderizamos sólo la parte latex
    renderedSelectedLatex.value = latex ? renderLatex(latex, false) : newVal.title
  } else {
    renderedSelectedLatex.value = ''
  }
})

const canvas = ref(null)
const chatVisible = ref(false)
const exercisesVisible = ref(false)
const messages = ref(['Hola, ¿en qué puedo ayudarte?'])
const newMsg = ref('')
let ctx

const exercises = ref([])
const loading = ref(false)

const config = useRuntimeConfig()

const sendMessage = () => {
  if (newMsg.value.trim()) {
    messages.value.push(newMsg.value)
    newMsg.value = ''
  }
}

const { find } = useStrapi()

const clearCanvas = () => {
  if (ctx && canvas.value) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

const fetchExercises = async () => {
  loading.value = true
  try {
    const { data } = await find('exercises')
    exercises.value = data
  } catch (error) {
    console.error('Error al obtener ejercicios:', error)
    exercises.value = []
  } finally {
    loading.value = false
  }
}

watch(exercisesVisible, (newVal) => {
  if (newVal) {
    fetchExercises()
  }
})

// Función para seleccionar ejercicio y cerrar modal
const selectExercise = (exercise) => {
  selectedExercise.value = exercise
  exercisesVisible.value = false
}

// Función para quitar ejercicio seleccionado y reactivar botón
const removeExercise = () => {
  selectedExercise.value = null
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  canvas.value.width = 1500
  canvas.value.height = 500
  let drawing = false
  let lastX = 0
  let lastY = 0

  canvas.value.addEventListener('mousedown', (e) => {
    drawing = true
    lastX = e.offsetX
    lastY = e.offsetY
  })

  canvas.value.addEventListener('mouseup', () => {
    drawing = false
  })

  canvas.value.addEventListener('mouseout', () => {
    drawing = false
  })

  canvas.value.addEventListener('mousemove', (e) => {
    if (!drawing) return

    ctx.strokeStyle = '#000'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'

    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()

    lastX = e.offsetX
    lastY = e.offsetY
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/main.scss';

@include themify($themes) {
  .module {
    background-color: themed('background');
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .toolbar button {
    background-color: themed('secondary');
    border: 1px solid themed('border');
    color: themed('text');
    &:hover {
      background-color: themed('tertiary');
    }
  }

  .text-area {
    background-color: themed('background');
    color: themed('text');
    border: 1px solid themed('border');
  }

  .canvas {
    background-color: themed('background');
    border: 1px solid themed('border');
  }

  .chat-modal {
    background-color: themed('secondary');
    color: themed('text');
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
    border: 1px solid themed('border');
  }

  .chat-messages {
    border: 1px solid themed('border');
    background-color: themed('background');
    color: themed('text');
  }

  .chat-modal input {
    background-color: themed('background');
    border: 1px solid themed('border');
    color: themed('text');
  }
}

.module {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toolbar button {
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1; // Para que crezca con el ancho
}

.text-area {
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
}

.canvas {
  width: 1500px;
  height: 500px;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

.chat-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 1rem;
  width: 70vw;
  max-width: 800px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
  box-sizing: border-box;
  backdrop-filter: blur(6px);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
}

.chat-message {
  margin-bottom: 0.3rem;
}

.chat-modal input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
}
.selected-exercise {
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    border: solid 1px #ff6b6b;
    border-radius: 0.3rem;
    padding: 0.25rem 0.5rem;
    color: white;
    cursor: pointer;
    font-weight: bold;
  }
}
/* Transición del modal */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
