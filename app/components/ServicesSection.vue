<template>
  <section id="services" class="px-6 md:px-10 py-24 md:py-36">
    <div class="max-w-[1600px] mx-auto">
      <div data-scroll-reveal class="grid md:grid-cols-12 gap-10 mb-16">
        <div class="md:col-span-4">
          <div class="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-ink mb-4">[ Section 02 &mdash; Services ]</div>
        </div>
        <div class="md:col-span-8">
          <p class="max-w-lg text-ink-2 leading-relaxed">{{ content?.services?.subheading || 'Architecting robust solutions.' }}</p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="(item, i) in (content?.services?.items || [])"
          :key="item.num"
          data-scroll-reveal
          :data-scroll-delay="i * 80"
          class="relative p-6 md:p-8 rounded-2xl border h-full group hover:-translate-y-1 transition-transform duration-500"
          :style="{ borderColor: 'var(--line)', background: 'var(--bg-elev)' }"
        >
          <div class="flex items-center justify-between mb-16 md:mb-20">
            <span class="font-mono text-[11px] tracking-widest text-muted-ink">{{ item.num }}</span>
            <span class="w-10 h-10 rounded-full border flex items-center justify-center text-[11px] font-mono" :style="{ borderColor: 'var(--line)' }">&rarr;</span>
          </div>
          <div class="font-medium tracking-[-0.02em] text-ink text-2xl md:text-3xl">{{ item.title }}</div>
          <p class="mt-3 text-ink-2 text-[14px] leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>