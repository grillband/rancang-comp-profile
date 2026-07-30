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
      'Playfair Display': [400, 500, 600, 700],
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
        { name: 'description', content: 'Rancang.dev Solutions is a premier software development house dedicated to technical mastery, architectural integrity, and forward-thinking innovation.' },
        { name: 'theme-color', content: '#F8FAFC' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'rancang.dev — Engineering Your Digital Future' },
        { property: 'og:description', content: 'Rancang.dev Solutions is a premier software development house dedicated to technical mastery, architectural integrity, and forward-thinking innovation.' },
        { property: 'og:image', content: '/og-image.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'rancang.dev — Engineering Your Digital Future' },
        { name: 'twitter:description', content: 'Rancang.dev Solutions — Engineering Your Digital Future' },
        { name: 'twitter:image', content: '/og-image.svg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.setAttribute('data-theme',t);document.querySelector('meta[name="theme-color"]')?.setAttribute('content',t==='dark'?'#000000':'#F8FAFC')}catch(e){}})()`,
          type: 'text/javascript',
          tagPosition: 'head',
        },
      ],
    },
  },

  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare-pages',
  },
})