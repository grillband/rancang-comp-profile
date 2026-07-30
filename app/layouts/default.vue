<template>
  <div class="min-h-screen flex flex-col" :style="{ background: 'var(--bg)', color: 'var(--ink)' }">
    <div ref="dotRef" class="cursor-dot"></div>
    <div ref="ringRef" class="cursor-ring"></div>

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

const dotRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const dot = dotRef.value
  const ring = ringRef.value
  if (!dot || !ring) return

  let mouseX = 0, mouseY = 0
  let ringX = 0, ringY = 0

  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
  }

  const animate = () => {
    ringX += (mouseX - ringX) * 0.15
    ringY += (mouseY - ringY) * 0.15
    ring.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`
    requestAnimationFrame(animate)
  }

  const onEnter = () => { ring.style.width = '60px'; ring.style.height = '60px' }
  const onLeave = () => { ring.style.width = '34px'; ring.style.height = '34px' }

  window.addEventListener('mousemove', onMove)
  document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  })

  animate()

  onUnmounted(() => window.removeEventListener('mousemove', onMove))
})
</script>