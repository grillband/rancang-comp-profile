<template>
  <footer class="bg-surface-950 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <h3 class="text-lg font-bold tracking-tight mb-3">
            {{ content?.footer?.logo || 'rancang.dev' }}
          </h3>
          <p class="text-sm text-surface-400 max-w-xs leading-relaxed">
            {{ content?.footer?.copyright || '' }}
          </p>
        </div>

        <!-- Link Columns -->
        <div
          v-for="(column, index) in (content?.footer?.columns || [])"
          :key="index"
        >
          <h4 class="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">
            {{ column.title }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in (column.links || [])" :key="link">
              <a href="#" class="text-sm text-surface-400 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-surface-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p class="text-xs text-surface-500 text-center">
          {{ content?.footer?.copyright || '' }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>
