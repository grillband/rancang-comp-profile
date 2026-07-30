<template>
  <section data-scroll-reveal class="px-6 md:px-10 py-24 md:py-32 border-y" :style="{ borderColor: 'var(--line)' }">
    <div class="max-w-[1600px] mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        <div
          v-for="(stat, index) in (content?.stats?.items || [])"
          :key="index"
          class="text-center"
        >
          <div ref="statRefs" class="text-4xl md:text-6xl font-light tracking-tighter text-ink mb-2">
            {{ displayValues[index] ?? stat.value }}
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
const props = defineProps<{ content: any }>()

const statRefs = ref<HTMLElement[]>([])
const displayValues = ref<string[]>([])
const animated = ref(false)

onMounted(() => {
  const items = props.content?.stats?.items || []
  displayValues.value = items.map(() => '0')

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !animated.value) {
        animated.value = true
        observer.disconnect()
        animateCounters(items)
      }
    },
    { threshold: 0.3 }
  )

  const el = statRefs.value?.[0]?.closest('section')
  if (el) observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

function animateCounters(items: any[]) {
  const duration = 1500
  const start = performance.now()

  function parseValue(v: string): [number, string] {
    const num = parseFloat(v.replace(/[^0-9.]/g, ''))
    const suffix = v.replace(/[0-9.]/g, '')
    return [num, suffix]
  }

  function tick() {
    const elapsed = performance.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    displayValues.value = items.map((stat: any) => {
      const [target, suffix] = parseValue(stat.value)
      const current = Math.round(target * eased)
      return suffix ? `${current}${suffix}` : String(current)
    })

    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
</script>