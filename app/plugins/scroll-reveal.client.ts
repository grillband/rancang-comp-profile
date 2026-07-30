export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  let ticking = false
  let cleanupQueue: (() => void)[] = []

  function revealCheck() {
    const elements = document.querySelectorAll('[data-scroll-reveal]:not([data-revealed])')
    if (elements.length === 0) return

    const windowHeight = window.innerHeight

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < windowHeight - 60) {
        if (!prefersReducedMotion.matches) {
          const delay = el.getAttribute('data-scroll-delay')
          if (delay) {
            ;(el as HTMLElement).style.transitionDelay = `${delay}ms`
          }
        }
        el.setAttribute('data-revealed', '')
      }
    })
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        revealCheck()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  cleanupQueue.push(() => window.removeEventListener('scroll', onScroll))

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => revealCheck())
  } else {
    revealCheck()
  }

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      document.querySelectorAll('[data-scroll-reveal]:not([data-revealed])').forEach((el) => {
        el.setAttribute('data-revealed', '')
      })
    }
  })

  const nuxtApp = useNuxtApp()

  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(() => {
      revealCheck()
      requestAnimationFrame(() => revealCheck())
    })
  })

  nuxtApp.hook('page:transition:finish', () => {
    revealCheck()
  })
})
