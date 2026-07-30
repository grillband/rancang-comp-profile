<template>
  <footer class="bg-background border-t border-[var(--color-border-subtle)] pt-24 pb-12">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
        
        <div class="md:col-span-5">
          <div class="flex items-center gap-3 mb-8">
            <img :src="theme === 'dark' ? '/logo-mark-white.svg' : '/logo.svg'" alt="Rancang.Dev" class="h-10 w-auto opacity-90" />
          </div>
          <p class="text-sm text-subtle max-w-sm leading-relaxed text-balance">
            We operate at the intersection of extreme technical performance and meticulous design.
          </p>
        </div>

        <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div v-for="(column, index) in (content?.footer?.columns || [])" :key="index">
            <h4 class="text-[10px] font-bold text-foreground uppercase tracking-[0.2em] mb-6">
              {{ column.title }}
            </h4>
            <ul class="space-y-4">
              <li v-for="link in (column.links || [])" :key="link">
                <a href="#" class="text-sm text-subtle hover:text-foreground transition-colors duration-300">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--color-border-subtle)]">
        <p class="text-xs text-muted-text">
          {{ content?.footer?.copyright || '© 2026 Rancang. All rights reserved.' }}
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-muted-text hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" class="text-xs text-muted-text hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
const { theme } = inject('theme') as { theme: Ref<'dark' | 'light'> }
</script>
