export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',
  modules: ['@pinia/nuxt'],

  ssr: true,

  css: [
    '@fontsource/baloo-2/index.css',
    '@fontsource/fredoka/index.css',
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
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&family=Fredoka:wght@400;600;700&display=swap'
        }
      ]
    }
    
  }
})