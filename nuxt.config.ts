export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',
  modules: ['@pinia/nuxt'],

  ssr: true,

  css: [
    '~/style.css'
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  app: {
    head: {
      title: 'KidsStoryFlix',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Free kids bedtime stories' },
        { name: 'keywords', content: 'kids stories, bedtime stories, moral stories for children' }
      ]
    }
  }
})