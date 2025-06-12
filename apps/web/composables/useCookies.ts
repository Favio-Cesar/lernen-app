const cookiesAccepted = ref<boolean | null>(null)
export function useCookies() {
  const setCookiesAccepted = () => {
    cookiesAccepted.value = true
    document.cookie = 'cookies-accepted=true; max-age=31536000; SameSite=Strict; Secure'
  }
  const checkCookiesAccepted = () => {
    const cookies = document.cookie.split(';')

    for (const cookie of cookies) {
      if (cookie.includes('cookies-accepted')) {
        cookiesAccepted.value = true
        return
      }
      cookiesAccepted.value = null
    }
    console.log(cookiesAccepted, ' aa ', cookies)
  }

  return { cookiesAccepted, setCookiesAccepted, checkCookiesAccepted }
}
