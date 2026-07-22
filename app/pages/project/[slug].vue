<template>
  <div>
    <section class="relative pt-24 sm:pt-32 pb-16 bg-white">
      <div class="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-brand-500/[0.04] blur-3xl"></div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink
          to="/project"
          class="inline-flex items-center gap-1 text-sm font-medium text-surface-500 hover:text-brand-600 mb-8 transition-colors duration-200"
        >
          <Icon name="mdi:arrow-left" size="16" />
          Back to Projects
        </NuxtLink>

        <div v-if="project" data-scroll-reveal>
          <div class="aspect-[16/9] rounded-2xl overflow-hidden bg-surface-100 mb-8">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in (project.tags || [])"
              :key="tag"
              class="inline-flex items-center px-3 py-1.5 bg-brand-50 text-brand-700 text-xs font-semibold rounded-md"
            >
              {{ tag }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-bold text-surface-950 tracking-tight mb-4">
            {{ project.title }}
          </h1>

          <div v-if="project.details" class="prose prose-surface max-w-none" v-html="renderedDetails"></div>
          <p v-else class="text-surface-600 text-lg leading-relaxed">
            {{ project.description }}
          </p>
        </div>

        <div v-else-if="!loading" class="text-center py-20">
          <p class="text-surface-500 text-lg">Project not found.</p>
          <NuxtLink to="/project" class="text-brand-600 hover:underline mt-2 inline-block">
            &larr; Back to Projects
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: content, pending: loading } = await useFetch('/api/content')

const project = computed(() => {
  return content.value?.projects?.items?.find((p: any) => p.slug === slug) || null
})

const renderedDetails = computed(() => {
  if (!project.value?.details) return ''
  return project.value.details
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
})

useHead({
  title: project.value ? `${project.value.title} — rancang.dev` : 'Project — rancang.dev',
})

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>
