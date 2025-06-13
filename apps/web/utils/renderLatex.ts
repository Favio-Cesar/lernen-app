import katex from 'katex'
export function renderLatex(latexString: string, displayMode = true) {
  try {
    return katex.renderToString(latexString, {
      throwOnError: false,
      displayMode,
    })
  } catch {
    return latexString
  }
}
export function splitTextAndLatex(input: string) {
  const parts = input.split('$$')
  if (parts.length >= 3) {
    return [parts[0], parts[1]]
  } else {
    return [input, '']
  }
}
