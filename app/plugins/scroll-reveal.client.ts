export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-scroll-delay')
          if (delay && !prefersReducedMotion.matches) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`
          }
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )

  const observeNew = () => {
    document.querySelectorAll('[data-scroll-reveal]:not(.revealed)').forEach((el) => {
      if (prefersReducedMotion.matches) {
        el.classList.add('revealed')
      } else {
        observer.observe(el)
      }
    })
  }

  // Also listen for changes to the media query
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      document.querySelectorAll('[data-scroll-reveal]:not(.revealed)').forEach((el) => {
        el.classList.add('revealed')
        observer.unobserve(el)
      })
    }
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeNew)
  } else {
    observeNew()
  }

  const nuxtApp = useNuxtApp()

  nuxtApp.hook('page:finish', () => {
    nextTick(() => {
      observeNew()
      requestAnimationFrame(() => {
        observeNew()
      })
    })
  })

  nuxtApp.hook('page:transition:finish', () => {
    observeNew()
  })
})
