<template>
  <section class="px-6 md:px-10 py-24 md:py-32 border-y" :style="{ borderColor: 'var(--line)' }">
    <div class="max-w-[1600px] mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        <div
          v-for="(stat, index) in (content?.stats?.items || [])"
          :key="index"
          class="text-center"
        >
          <div class="text-4xl md:text-6xl font-light tracking-tighter text-ink mb-2">
            {{ stat.value }}
          </div>
          <div class="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-ink">
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