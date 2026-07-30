<template>
  <section class="px-6 md:px-10 py-24 md:py-36 border-y" :style="{ borderColor: 'var(--line)' }">
    <div class="max-w-[1600px] mx-auto">
      <div class="grid md:grid-cols-12 gap-10 mb-16">
        <div class="md:col-span-4">
          <div class="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-ink mb-4">[ Section 05 &mdash; Testimonials ]</div>
        </div>
        <div class="md:col-span-8">
          <h2 class="font-medium tracking-[-0.03em] leading-[0.95] text-ink" :style="{ fontSize: 'clamp(2.2rem, 5vw, 4.8rem)' }">
            What our<span class="font-serif italic text-ink-2"> clients say.</span>
          </h2>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="(t, i) in (content?.testimonials?.items || [])"
          :key="i"
          class="relative p-6 md:p-10 rounded-2xl border"
          :style="{ borderColor: 'var(--line)', background: 'var(--bg-elev)' }"
        >
          <div class="font-serif italic text-ink text-xl md:text-2xl leading-[1.3] mb-8">&ldquo;{{ t.quote }}&rdquo;</div>
          <div>
            <div class="font-medium text-ink text-sm">{{ t.author }}</div>
            <div class="font-mono text-[10px] tracking-widest text-muted-ink mt-1">{{ t.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>