<template>
  <section class="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.02)_0%,_transparent_70%)]"></div>
    <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-500/5 blur-3xl"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-400/5 blur-3xl"></div>

    <div data-scroll-reveal class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-950 tracking-tight leading-[1.1] mb-6">
        {{ content?.hero?.title || 'Engineering Your Digital Future' }}
      </h1>
      <p class="text-base sm:text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed mb-10">
        {{ content?.hero?.subtitle || '' }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#portfolio"
          class="inline-flex items-center px-7 py-3.5 bg-surface-950 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          {{ content?.hero?.primaryButton || 'View Portfolio' }}
        </a>
        <a
          href="#contact"
          class="inline-flex items-center px-7 py-3.5 bg-white text-surface-950 text-sm font-semibold rounded-lg border-2 border-surface-200 hover:border-surface-300 hover:bg-surface-50 active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          {{ content?.hero?.secondaryButton || "Let's Talk" }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>
