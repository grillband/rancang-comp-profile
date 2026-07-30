/**
 * Composable for scroll-triggered visibility detection.
 * Uses IntersectionObserver and respects prefers-reduced-motion.
 */
export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)

  const prefersReducedMotion = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined') return

    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion.value) {
      isVisible.value = true
      return
    }

    if (!elementRef.value) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      }
    )

    observer.observe(elementRef.value)

    onUnmounted(() => observer.disconnect())
  })

  return { isVisible, elementRef, prefersReducedMotion }
}
