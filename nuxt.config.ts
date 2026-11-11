export default defineNuxtConfig({
  compatibilityDate: '2026-06-12',

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap'
  ],

  ssr: true,

  site: {
  url: 'https://kidsstoryflix.co.uk'
  },

  sitemap: {

    sources: [
    '/api/__sitemap__/urls'
    ],

    exclude: [
      '/Age-Gate',
      '/Login',
      '/Register',
      '/Forgot-Password',
      '/Kid-Account',
      '/Subscribe',
      '/ErrorPagePayment',
      '/SucessPagePayment',
      '/indexWithoutSEO',
    ]
  },

  

  css: [
    '@fontsource/baloo-2/index.css',
    '@fontsource/fredoka/index.css',
    '~/style.css'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'KidsStoryFlix',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'Free bedtime, moral and educational stories for children.'
        },
        {
          name: 'keywords',
          content:
            'kids stories, bedtime stories, moral stories for children'
        },
        {
          property: 'og:site_name',
          content: 'KidsStoryFlix'
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&family=Fredoka:wght@400;600;700&display=swap'
        }
      ]
    }
  }
})