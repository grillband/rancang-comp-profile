<template>
  <section class="relative h-[100svh] flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-background">
    <div v-if="content?.hero?.background" class="absolute inset-0 z-0">
      <img :src="content.hero.background" alt="" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-background/60"></div>
    </div>
    <div class="relative z-10 hero-text-container">
      <h1 class="text-[12vw] leading-[0.9] font-semibold tracking-tighter text-foreground uppercase text-balance">
        <span class="block overflow-hidden">
          <span class="block translate-y-full opacity-0 gs-reveal-up">Engineering</span>
        </span>
        <span class="block overflow-hidden">
          <span class="block translate-y-full opacity-0 gs-reveal-up text-subtle">Digital</span>
        </span>
        <span class="block overflow-hidden">
          <span class="block translate-y-full opacity-0 gs-reveal-up">Futures.</span>
        </span>
      </h1>
    </div>

    <div class="absolute bottom-12 inset-x-6 md:inset-x-12 flex flex-col md:flex-row justify-between items-end gap-6 z-10 gs-fade-in opacity-0">
      <p class="max-w-sm text-sm text-on-elevated font-medium leading-relaxed text-pretty">
        {{ content?.hero?.subtitle || 'We build high-performance software architecture for companies that demand precision.' }}
      </p>
      
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-end">
          <span class="text-[10px] text-muted-text uppercase tracking-widest">Scroll</span>
          <div class="w-px h-12 bg-gradient-to-b from-muted-text to-transparent mt-2"></div>
        </div>
      </div>
    </div>
    
    <div class="absolute inset-0 hero-gradient z-0 pointer-events-none"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

defineProps<{ content: any }>()

onMounted(async () => {
  if (typeof window === 'undefined') return
  
  // Dynamically import GSAP to avoid SSR issues
  const { gsap } = await import('gsap')
  
  // Timeline for the hero entrance
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  
  tl.to('.gs-reveal-up', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15,
    delay: 0.2
  })
  .to('.gs-fade-in', {
    opacity: 1,
    duration: 1
  }, "-=0.6")
})
</script>

<style scoped>
.hero-gradient {
  background: radial-gradient(ellipse at top right, rgba(24, 24, 27, 0.2), transparent 60%, transparent);
}

[data-theme="light"] .hero-gradient {
  background: radial-gradient(ellipse at top right, rgba(0, 0, 0, 0.03), transparent 60%, transparent);
}
</style>
