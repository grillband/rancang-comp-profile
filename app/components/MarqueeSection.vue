<template>
  <section class="relative border-y overflow-hidden py-8 md:py-10" :style="{ borderColor: 'var(--line)' }">
    <div class="flex whitespace-nowrap marquee-track">
      <span
        v-for="(item, i) in doubledItems"
        :key="i"
        class="inline-flex items-center gap-8 pr-8"
      >
        <span class="ticker-huge text-ink" :style="{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }">{{ item }}</span>
        <span class="font-serif italic text-accent" :style="{ fontSize: 'clamp(2rem, 5.5vw, 5rem)' }">&mdash;</span>
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ content: any }>()
const doubledItems = computed(() => [...(props.content?.marquee || []), ...(props.content?.marquee || [])])
</script>