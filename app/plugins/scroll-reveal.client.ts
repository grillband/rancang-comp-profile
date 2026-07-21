export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-scroll-delay')
          if (delay) {
            entry.target.style.transitionDelay = `${delay}ms`
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
      observer.observe(el)
    })
  }

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
