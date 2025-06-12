import katex from 'katex'
export function renderLatex(latexString: string, displayMode = false) {
  try {
    return katex.renderToString(latexString, {
      throwOnError: false,
      displayMode,
    })
  } catch (err) {
    console.error('Error renderizando LaTeX:', err)
    return latexString // fallback: texto plano
  }
}
export function splitTextAndLatex(input: string) {
  const parts = input.split('$$')
  if (parts.length >= 3) {
    // Devuelve texto antes del primer $$ y texto entre los primeros $$
    return [parts[0], parts[1]]
  } else {
    // No hay fórmula o no está bien delimitada
    return [input, '']
  }
}
