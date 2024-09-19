
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'element-plus/dist/index.css',
],
  plugins: [
    '~/plugins/pinia.js',
    '~/plugins/element-plus.js'
  ]
})