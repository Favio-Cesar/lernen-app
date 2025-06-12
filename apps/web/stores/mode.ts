import { MODE, DARK_MODE, LIGHT_MODE } from '@/constants/mode'

export const useModeStore = defineStore('mode', () => {
  const mode: Ref<typeof DARK_MODE | typeof LIGHT_MODE> = ref(DARK_MODE)

  const getMode = computed(() => mode.value)
  const changeMode = () => {
    mode.value = mode.value === DARK_MODE ? LIGHT_MODE : DARK_MODE
    localStorage.setItem(MODE, mode.value)
  }

  const setMode = (newMode: typeof DARK_MODE | typeof LIGHT_MODE) => {
    mode.value = newMode
  }

  return { getMode, changeMode, setMode }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModeStore, import.meta.hot))
}
