<template>
  <section class="relative py-16 sm:py-20 bg-surface-950 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"></div>

    <div data-scroll-reveal class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div
          v-for="(stat, index) in (content?.stats?.items || [])"
          :key="index"
          data-scroll-reveal
          :data-scroll-delay="index * 150"
          class="group"
        >
          <div class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
            <span>{{ stat.value }}</span>
          </div>
          <div class="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-widest">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>
