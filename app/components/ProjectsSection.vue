<template>
  <!-- The container for pinning -->
  <section id="portfolio" ref="sectionRef" class="relative bg-background overflow-hidden h-screen">
    
    <div class="absolute top-12 left-6 md:left-12 z-20 mix-blend-difference pointer-events-none">
      <h2 class="text-2xl font-medium tracking-tight text-foreground mb-2">Selected Work</h2>
      <p class="text-xs text-on-elevated tracking-widest uppercase">Scroll to explore</p>
    </div>

    <div ref="trackRef" class="flex h-full w-[300vw] sm:w-[200vw] lg:w-[150vw]">
      <NuxtLink
        v-for="(project, index) in (content?.projects?.items || [])"
        :key="index"
        :to="`/project/${project.slug}`"
        class="relative w-[100vw] sm:w-[50vw] h-full flex items-center justify-center p-6 md:p-12 border-r border-[var(--color-border-subtle)] group no-underline"
      >
        <div class="relative w-full h-[60vh] overflow-hidden bg-elevated">
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          
          <div class="absolute bottom-8 left-8 right-8">
            <div class="flex gap-2 mb-4">
              <span 
                v-for="tag in (project.tags || [])" 
                :key="tag"
                class="px-3 py-1 text-[10px] uppercase tracking-widest text-on-elevated tag-pill backdrop-blur-md rounded-full border border-[var(--color-border-subtle)]"
              >
                {{ tag }}
              </span>
            </div>
            <h3 class="text-3xl font-semibold text-foreground tracking-tight mb-2">{{ project.title }}</h3>
            <p class="text-sm text-on-elevated max-w-sm leading-relaxed">{{ project.description }}</p>
          </div>
        </div>
      </NuxtLink>

      <div class="relative w-[100vw] sm:w-[50vw] h-full flex items-center justify-center p-6 md:p-12 group">
        <div class="text-center">
          <NuxtLink to="/project" class="inline-flex items-center justify-center w-32 h-32 rounded-full border border-[var(--color-border-default)] text-foreground hover:bg-inverse hover:text-on-inverse transition-all duration-500">
            <span class="text-sm font-medium tracking-wide">View All</span>
          </NuxtLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{ content: any }>()

const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
let ctx: any

onMounted(async () => {
  if (typeof window === 'undefined') return
  
  // Dynamic import of GSAP and ScrollTrigger
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  
  if (!sectionRef.value || !trackRef.value) return

  // Re-evaluate on next tick to ensure DOM is fully rendered
  setTimeout(() => {
    ctx = gsap.context(() => {
      
      const trackWidth = trackRef.value!.scrollWidth
      const windowWidth = window.innerWidth
      const scrollDistance = trackWidth - windowWidth

      gsap.to(trackRef.value, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          pin: true,
          scrub: 1, // Smooth scrubbing, takes 1 second to catch up
          start: "top top",
          end: `+=${scrollDistance}`, // The pinning lasts exactly as long as the horizontal distance
          invalidateOnRefresh: true, // Recalculate on resize
        }
      })
      
    }, sectionRef.value as HTMLElement)
  }, 100)
})

onUnmounted(() => {
  if (ctx) ctx.revert() // Cleanup GSAP instances
})
</script>

<style scoped>
.tag-pill {
  background-color: rgba(255, 255, 255, 0.1);
}
[data-theme="light"] .tag-pill {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
