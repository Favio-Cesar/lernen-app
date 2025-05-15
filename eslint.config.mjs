import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'

const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}

export default [
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': [RULES.ERROR],
    },
  },

  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        project: './apps/web/tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
    },
    plugins: {
      vue,
      prettier,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-undef': RULES.OFF,
      'prettier/prettier': [
        RULES.ERROR,
        {
          endOfLine: 'auto',
        },
      ],
      'vue/first-attribute-linebreak': RULES.OFF,
      'no-unused-vars': [RULES.OFF],
      'arrow-spacing': [RULES.ERROR],
      'object-curly-spacing': [RULES.ERROR, 'always'],
      'array-callback-return': [RULES.OFF, { checkForEach: true }],
      'vue/require-default-prop': RULES.OFF,
      'vue/singleline-html-element-content-newline': RULES.OFF,
      'vue/component-name-in-template-casing': [RULES.ERROR, 'PascalCase'],
      'vue/html-quotes': [RULES.ERROR, 'double', { avoidEscape: true }],
      'vue/mustache-interpolation-spacing': [RULES.ERROR, 'always'],
      'vue/no-multi-spaces': [RULES.ERROR, { ignoreProperties: false }],
      'vue/no-spaces-around-equal-signs-in-attribute': [RULES.ERROR],
      'vue/v-on-style': [RULES.ERROR, 'shorthand'],
      'vue/v-bind-style': [RULES.ERROR, 'shorthand'],
      'vue/multi-word-component-names': RULES.OFF,
      'no-return-assign': RULES.OFF,
      'no-mixed-operators': RULES.OFF,
      'vue/no-setup-props-destructure': RULES.OFF,
      'vue/no-v-text-v-html-on-component': RULES.OFF,
      'vue/require-v-for-key': RULES.ERROR,
      'vue/no-mutating-props': RULES.ERROR,
    },
  },
]
