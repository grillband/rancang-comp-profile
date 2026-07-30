<template>
  <div>
    <section class="relative pt-32 pb-24 px-6 md:px-12 bg-background overflow-hidden">
      <div class="max-w-4xl mx-auto">
        <NuxtLink
          to="/project"
          class="inline-flex items-center gap-1 text-sm font-medium text-on-elevated hover:text-foreground mb-12 transition-colors duration-300"
        >
          <Icon name="mdi:arrow-left" size="16" />
          Back to Projects
        </NuxtLink>

        <div v-if="project" data-scroll-reveal>
          <div class="relative rounded-[2rem] overflow-hidden bg-elevated mb-10 border border-[var(--color-border-subtle)]">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full aspect-[16/9] object-cover"
            />
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in (project.tags || [])"
              :key="tag"
              class="px-3 py-1.5 text-[10px] uppercase tracking-widest text-on-elevated tag-pill backdrop-blur-md rounded-full border border-[var(--color-border-subtle)]"
            >
              {{ tag }}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {{ project.title }}
          </h1>

          <div class="text-on-elevated text-base leading-relaxed max-w-2xl">
            <div v-if="project.details" v-html="renderedDetails"></div>
            <p v-else>{{ project.description }}</p>
          </div>
        </div>

        <div v-else-if="!loading" class="text-center py-20">
          <p class="text-on-elevated text-lg mb-4">Project not found.</p>
          <NuxtLink to="/project" class="text-on-elevated hover:text-foreground underline underline-offset-4 decoration-[var(--color-border-subtle)] transition-colors">
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

useHead(() => ({
  title: project.value ? `${project.value.title} — rancang.dev` : 'Project — rancang.dev',
  meta: project.value ? [
    { name: 'description', content: project.value.description },
    { property: 'og:title', content: `${project.value.title} — rancang.dev` },
    { property: 'og:description', content: project.value.description },
    { property: 'og:image', content: project.value.image || '/og-image.svg' },
    { name: 'twitter:title', content: `${project.value.title} — rancang.dev` },
    { name: 'twitter:description', content: project.value.description },
    { name: 'twitter:image', content: project.value.image || '/og-image.svg' },
  ] : [],
}))

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<style scoped>
.tag-pill {
  background-color: rgba(255, 255, 255, 0.1);
}
[data-theme="light"] .tag-pill {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>