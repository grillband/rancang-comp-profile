<template>
  <footer class="px-6 md:px-10 pt-24 pb-10 border-t" :style="{ borderColor: 'var(--line)' }">
    <div class="max-w-[1600px] mx-auto">
      <div class="mb-16 md:mb-24">
        <div class="flex items-center gap-4 mb-4">
          <div class="font-medium tracking-[-0.055em] leading-[0.85] text-ink select-none" :style="{ fontSize: 'clamp(2rem, 10vw, 10rem)' }">
            rancang<span class="font-serif italic text-ink-2">.dev</span>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-12 gap-10 pb-12 border-b" :style="{ borderColor: 'var(--line)' }">
        <div class="md:col-span-4">
          <div class="font-mono text-[10px] uppercase tracking-widest text-muted-ink mb-3">Studio</div>
          <p class="text-ink-2 max-w-sm leading-relaxed">
            {{ content?.footer?.tagline || 'We operate at the intersection of extreme technical performance and meticulous design.' }}
          </p>
        </div>

        <div class="md:col-span-8 grid grid-cols-3 gap-8">
          <div v-for="(column, index) in (content?.footer?.columns || [])" :key="index">
            <h4 class="font-mono text-[10px] uppercase tracking-widest text-muted-ink mb-4">{{ column.title }}</h4>
            <ul class="space-y-3">
              <li v-for="link in (column.links || [])" :key="link">
                <a href="#" class="text-ink-2 text-sm hover:text-ink transition-colors link-underline">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
        <p class="font-mono text-[10px] tracking-widest text-muted-ink">
          &copy; {{ year }} rancang.dev. All rights reserved.
        </p>
        <div class="font-mono text-[10px] tracking-widest text-muted-ink">
          Jakarta &middot; ID
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
const { theme } = inject('theme') as { theme: Ref<'dark' | 'light'> }
const year = ref(new Date().getFullYear())
</script>