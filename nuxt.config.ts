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
      'Space Grotesk': [300, 400, 500, 600, 700],
      'Instrument Serif': [400],
      'JetBrains Mono': [300, 400, 500],
    },
    display: 'swap',
  },

  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'rancang.dev — Engineering Digital Futures',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'We build high-performance software architecture for companies that demand precision.' },
        { name: 'theme-color', content: '#F5F0E8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'rancang.dev — Engineering Digital Futures' },
        { property: 'og:description', content: 'We build high-performance software architecture for companies that demand precision.' },
        { name: 'twitter:card', content: 'summary_large_image' },
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
    preset: process.env.NITRO_PRESET || 'cloudflare-module',
  },
})