import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from '#imports'
import { z } from 'zod'

export function useAuth(mode: 'login' | 'signup') {
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const errorMessages = ref<string[]>([])

  const isLogin = computed(() => mode === 'login')

  const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })

  const signUpSchema = z.object({
    email: z.string().email('Valid email is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })

  const jwtCookie = useCookie('jwt', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
  })

  const router = useRouter()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    errorMessages.value = []

    const result = isLogin.value
      ? loginSchema.safeParse({
          username: username.value,
          password: password.value,
        })
      : signUpSchema.safeParse({
          email: email.value,
          username: username.value,
          password: password.value,
        })

    if (!result.success) {
      errorMessages.value = result.error.errors.map((err) => err.message)
      return
    }

    const endpoint = isLogin.value
      ? 'http://localhost:1337/api/auth/local'
      : 'http://localhost:1337/api/auth/local/register'

    const payload = isLogin.value
      ? {
          identifier: username.value,
          password: password.value,
        }
      : {
          username: username.value,
          email: email.value,
          password: password.value,
        }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Authentication failed')
      }

      jwtCookie.value = data.jwt
      router.push('/')
    } catch (err: unknown) {
      errorMessages.value = [
        err instanceof Error ? err.message : 'An unknown error occurred',
      ]
    }
  }

  return {
    username,
    email,
    password,
    isLogin,
    errorMessages,
    handleSubmit,
  }
}
