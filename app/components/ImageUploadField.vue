<template>
  <div>
    <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">{{ label }}</label>
    <div class="flex items-center gap-4">
      <div v-if="modelValue" class="w-20 h-14 rounded-lg overflow-hidden border border-surface-200 bg-surface-100 flex-shrink-0">
        <img :src="modelValue" :alt="label" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          placeholder="/uploads/image.webp"
          class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
        />
      </div>
      <label class="px-4 py-3 bg-surface-100 border border-surface-200 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-200 transition-colors cursor-pointer flex-shrink-0">
        <Icon name="mdi:upload" size="16" class="mr-1" />
        Upload
        <input type="file" accept="image/*" class="hidden" @change="handleUpload" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  const file = input.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const result = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    })
    emit('update:modelValue', result.url)
  } catch (e) {
    alert('Upload failed. Please try again.')
  }
}
</script>