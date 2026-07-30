<template>
  <section class="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-10 pt-28 pb-10 overflow-visible">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] font-mono uppercase tracking-widest text-muted-ink">
      <div v-for="(_, idx) in 4" :key="idx" :style="{ transitionDelay: `${0.2 + idx * 0.08}s` }" :class="mountedClass">
        <template v-if="idx === 0">
          <div class="text-ink-2">[01]</div>
          <div class="mt-1">{{ content?.hero?.eyebrow || 'Jakarta, ID' }}</div>
        </template>
        <template v-else-if="idx === 1">
          <div class="text-ink-2">[02]</div>
          <div class="mt-1">{{ content?.hero?.location || 'UTC+7' }}</div>
        </template>
        <template v-else-if="idx === 2">
          <div class="text-ink-2">[03]</div>
          <div class="mt-1">{{ time || '00:00 JKT' }}</div>
        </template>
        <template v-else>
          <div class="text-ink-2">[04]</div>
          <div class="mt-1 flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-lime" :style="{ boxShadow: '0 0 12px var(--lime)' }"></span>
            {{ content?.hero?.availability || 'Available for projects' }}
          </div>
        </template>
      </div>
    </div>

    <div class="flex-1 flex items-center py-2 md:py-4">
      <h1 class="font-medium tracking-[-0.045em] leading-[1.0] text-ink" :style="{ fontSize: 'clamp(2rem, 10vw, 10rem)' }">
        <span v-for="(line, i) in (content?.hero?.lines || ['Engineering', 'Digital', 'Futures.'])" :key="i" class="mask-line">
          <span :style="{ transitionDelay: `${0.4 + i * 0.15}s` }" :class="[mountedClass, 'block']">
            <span v-if="i === 1" class="font-serif italic tracking-tight text-ink-2" style="font-weight: 400">{{ line }}</span>
            <span v-else>{{ line }}</span>
          </span>
        </span>
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 items-end gap-10">
      <p :style="{ transitionDelay: '0.9s' }" :class="mountedClass" class="text-sm md:text-[15px] leading-relaxed text-ink-2 max-w-md">
        {{ content?.hero?.subtitle || 'We build high-performance software architecture for companies that demand precision.' }}
      </p>
      <div class="hidden md:block"></div>
      <div :style="{ transitionDelay: '1.1s' }" :class="mountedClass" class="flex flex-col items-start md:items-end gap-3">
        <div class="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-ink">Scroll to explore</div>
        <div class="w-10 h-10 rounded-full border flex items-center justify-center" :style="{ borderColor: 'var(--line)' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()

const time = ref('')
const mounted = ref(false)
const mountedClass = computed(() => mounted.value ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-[2px]')

onMounted(() => {
  requestAnimationFrame(() => { mounted.value = true })

  const update = () => {
    const d = new Date()
    const opts: any = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' }
    time.value = d.toLocaleTimeString('en-GB', opts) + ' JKT'
  }
  update()
  const i = setInterval(update, 30000)
  onUnmounted(() => clearInterval(i))
})
</script>

<style scoped>
.mask-line span {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>