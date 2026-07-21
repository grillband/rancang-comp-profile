<template>
  <div class="bg-white rounded-2xl border border-surface-200 shadow-card overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-surface-100 bg-surface-50/50">
      <div class="flex items-center gap-2.5">
        <Icon :name="icon" size="18" class="text-surface-500" />
        <h3 class="text-sm font-semibold text-surface-800">{{ title }}</h3>
      </div>
      <button
        v-if="removable"
        @click="$emit('remove')"
        class="p-1.5 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        title="Remove"
      >
        <Icon name="mdi:delete-outline" size="16" />
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 py-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  removable?: boolean
}>()

defineEmits<{
  remove: []
}>()
</script>
