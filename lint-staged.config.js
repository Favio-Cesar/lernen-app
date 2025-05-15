// lint-staged.config.js en raíz
export default {
  '**/*.{js,ts,vue}': ['eslint --config eslint.config.mjs --fix'],
  '**/*.{ts,tsx,js,jsx}': 'prettier --write',
}
