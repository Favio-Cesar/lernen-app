import type { DARK_MODE, LIGHT_MODE } from '@/constants/mode'

export type ModeType = typeof DARK_MODE | typeof LIGHT_MODE

export type LanguageCode = 'en' | 'es' | 'pt-BR'

export type Flag = {
  name: string
  icon: string
  value: LanguageCode
}

export type HexColor = `#${string}`

export type DetailItem = {
  id: number
  question: string
  answer: string
}

export type AlertType = 'error' | 'success' | 'warning' | 'info'

export type DetailList = DetailItem[]

export type CategoryModule = 'serie'
