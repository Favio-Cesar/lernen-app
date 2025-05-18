<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  size?: number | string
}>()

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)
function toggleLocale() {
  locale.value = locale.value === 'en' ? 'es' : 'en'
}

// Tamaño en rem, por defecto 6
const sizeRem = computed(() => {
  if (!props.size) return '6rem'
  // Si el prop es número, lo convertimos a rem, si es string, lo usamos tal cual
  return typeof props.size === 'number' ? `${props.size}rem` : props.size
})
</script>
<template>
  <button
    class="locale-switcher"
    aria-label="Change language"
    :style="{ width: sizeRem, height: sizeRem }"
    @click="toggleLocale"
  >
    <span
      v-if="currentLocale === 'es'"
      class="fi fi-es locale-switcher__icon"
      title="Español"
    ></span>
    <span v-else class="fi fi-gb locale-switcher__icon" title="English"></span>
  </button>
</template>

<style scoped lang="scss">
.locale-switcher {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  /* width y height se manejan desde style */
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
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    transition: transform 0.3s ease;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
