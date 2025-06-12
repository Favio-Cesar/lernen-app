import { ref, onMounted } from 'vue'

export function useMobile() {
  const isMobile = ref(false)

  onMounted(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    isMobile.value =
      userAgent.includes('iphone') ||
      userAgent.includes('ipad') ||
      userAgent.includes('android') ||
      userAgent.includes('mobile')
  })

  return isMobile
}
