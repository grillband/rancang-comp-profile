<template>
  <div>
    <section class="px-6 md:px-10 pt-32 pb-24">
      <div class="max-w-4xl mx-auto">
        <NuxtLink
          to="/project"
          class="inline-flex items-center gap-1 text-sm font-medium text-ink-2 hover:text-ink mb-12 transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Projects
        </NuxtLink>

        <div v-if="project" data-scroll-reveal>
          <div class="flex items-start justify-between mb-8">
            <div>
              <div class="font-mono text-[11px] tracking-widest text-muted-ink mb-1">{{ project.year }}</div>
              <div class="font-mono text-[11px] tracking-widest text-muted-ink">{{ project.client }}</div>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden mb-10 border" :style="{ borderColor: 'var(--line)', background: 'var(--bg-elev)' }">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full aspect-[16/9] object-cover"
            />
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="(tag, i) in (project.tags || [])"
              :key="tag"
              data-scroll-reveal
              :data-scroll-delay="i * 60"
              class="px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-ink rounded-full border"
              :style="{ borderColor: 'var(--line)' }"
            >
              {{ tag }}
            </span>
          </div>

          <h1 data-scroll-reveal class="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-ink mb-4">
            {{ project.title }}
          </h1>

          <a
            v-if="project.liveUrl"
            data-scroll-reveal
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[11px] font-medium tracking-[0.12em] uppercase text-ink hover:bg-ink hover:text-bg transition-all duration-300 mb-8"
            :style="{ borderColor: 'var(--line)' }"
          >
            Visit Live Site
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>

          <div data-scroll-reveal class="text-ink-2 text-base leading-relaxed max-w-2xl">
            <div v-if="project.details" v-html="renderedDetails"></div>
            <p v-else>{{ project.description }}</p>
          </div>
        </div>

        <div v-else-if="!loading" class="text-center py-20">
          <p class="text-ink-2 text-lg mb-4">Project not found.</p>
          <NuxtLink to="/project" class="text-ink-2 hover:text-ink link-underline transition-colors">
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