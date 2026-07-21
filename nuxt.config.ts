// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon'
  ],

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
  },

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'rancang.dev — Engineering Your Digital Future',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'DevArchitect Solutions is a premier software development house dedicated to technical mastery, architectural integrity, and forward-thinking innovation.' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare-pages',
  },
})