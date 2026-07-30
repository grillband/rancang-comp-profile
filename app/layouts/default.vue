<template>
  <div class="min-h-screen flex flex-col" :style="{ background: 'var(--bg)', color: 'var(--ink)' }">
    <div
      class="cursor-dot"
      :style="{ transform: `translate(${dotX - 4}px, ${dotY - 4}px)` }"
    ></div>
    <div
      class="cursor-ring"
      :style="{
        transform: `translate(${ringX - halfRing}px, ${ringY - halfRing}px)`,
        width: ringSize + 'px',
        height: ringSize + 'px'
      }"
    ></div>

    <SiteNavbar :content="content" />
    <main class="flex-1 relative z-[1]">
      <slot />
    </main>
    <SiteFooter :content="content" />
  </div>
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/content')
provide('siteContent', content)

const dotX = ref(0)
const dotY = ref(0)
const ringX = ref(0)
const ringY = ref(0)
const ringSize = ref(34)
const halfRing = computed(() => ringSize.value / 2)

onMounted(() => {
  if (typeof window === 'undefined') return

  let mx = 0, my = 0
  let rx = 0, ry = 0
  let raf: number

  const onMove = (e: MouseEvent) => {
    mx = e.clientX
    my = e.clientY
    dotX.value = mx
    dotY.value = my
  }

  const animate = () => {
    rx += (mx - rx) * 0.15
    ry += (my - ry) * 0.15
    ringX.value = rx
    ringY.value = ry
    raf = requestAnimationFrame(animate)
  }

  const onEnter = () => { ringSize.value = 60 }
  const onLeave = () => { ringSize.value = 34 }

  window.addEventListener('mousemove', onMove, { passive: true })

  const hoverEls = document.querySelectorAll<HTMLElement>('a, button, [data-cursor="hover"]')
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  })

  animate()

  const observer = new MutationObserver(() => {
    document.querySelectorAll<HTMLElement>('a, button, [data-cursor="hover"]').forEach(el => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(raf)
    observer.disconnect()
  })
})
</script>