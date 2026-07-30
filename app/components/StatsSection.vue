<template>
  <section class="relative py-24 md:py-32 bg-background overflow-hidden border-t border-[var(--color-border-subtle)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-[var(--color-border-subtle)]">
        <div
          v-for="(stat, index) in (content?.stats?.items || [])"
          :key="index"
          data-scroll-reveal
          :data-scroll-delay="Number(index) * 150"
          class="flex flex-col items-center justify-center text-center px-4"
        >
          <div class="text-4xl md:text-6xl font-light tracking-tighter text-foreground mb-4">
            {{ stat.value }}
          </div>
          <div class="text-[10px] font-medium text-subtle uppercase tracking-widest">
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
