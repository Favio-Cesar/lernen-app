<script setup lang="ts">
const props = defineProps<{
  size?: number | string
}>()

const theme = ref<'light' | 'dark'>(
  document.documentElement.classList.contains('dark') ? 'dark' : 'light',
)

function toggleTheme() {
  const html = document.documentElement
  if (theme.value === 'light') {
    html.classList.remove('light')
    html.classList.add('dark')
    theme.value = 'dark'
  } else {
    html.classList.remove('dark')
    html.classList.add('light')
    theme.value = 'light'
  }
}

const sizeRem = computed(() => {
  if (!props.size) return '6rem'
  return typeof props.size === 'number' ? `${props.size}rem` : props.size
})
</script>

<template>
  <button
    class="theme-switcher"
    aria-label="Cambiar tema"
    :style="{ width: sizeRem, height: sizeRem }"
    @click="toggleTheme"
  >
    <span v-if="theme === 'light'" class="theme-switcher__icon" title="Modo claro"
      >🌞</span
    >
    <span v-else class="theme-switcher__icon" title="Modo oscuro">🌙</span>
  </button>
</template>

<style scoped lang="scss">
.theme-switcher {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
    outline: none;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.85);
  }

  &__icon {
    font-size: 2rem;
    transition: transform 0.3s ease;
  }
}
</style>
