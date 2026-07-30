<template>
  <div>
    <section class="relative pt-32 pb-16 px-6 md:px-12 bg-background overflow-hidden">
      <div class="max-w-[1440px] mx-auto">
        <div data-scroll-reveal class="mb-16">
          <h1 class="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-4">
            {{ content?.projects?.heading || 'Our Projects' }}
          </h1>
          <p class="text-on-elevated text-sm max-w-lg leading-relaxed">
            {{ content?.projects?.subheading || '' }}
          </p>
        </div>
      </div>
    </section>

    <section class="pb-32 px-6 md:px-12 bg-background">
      <div class="max-w-[1440px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <NuxtLink
            v-for="(project, index) in (content?.projects?.items || [])"
            :key="index"
            :to="`/project/${project.slug}`"
            data-scroll-reveal
            :data-scroll-delay="index * 120"
            class="group relative p-6 md:p-8 rounded-[2rem] bg-elevated overflow-hidden transition-all duration-500 ease-[var(--ease-expo)]"
          >
            <div class="absolute inset-0 border border-[var(--color-border-subtle)] rounded-[2rem]"></div>
            <div class="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div class="relative z-10">
              <div class="relative aspect-[16/10] rounded-xl overflow-hidden bg-background mb-6">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in (project.tags || [])"
                  :key="tag"
                  class="px-3 py-1 text-[10px] uppercase tracking-widest text-on-elevated tag-pill backdrop-blur-md rounded-full border border-[var(--color-border-subtle)]"
                >
                  {{ tag }}
                </span>
              </div>

              <h3 class="text-xl font-semibold text-foreground tracking-tight mb-2">
                {{ project.title }}
              </h3>
              <p class="text-sm text-on-elevated leading-relaxed">
                {{ project.description }}
              </p>

              <div class="mt-6 flex items-center gap-1 text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                View Project
                <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/content')

useHead({
  title: 'Our Projects — rancang.dev',
  meta: [
    { name: 'description', content: 'Explore our portfolio of high-performance software engineering projects.' },
    { property: 'og:title', content: 'Our Projects — rancang.dev' },
    { property: 'og:description', content: 'Explore our portfolio of high-performance software engineering projects.' },
    { name: 'twitter:title', content: 'Our Projects — rancang.dev' },
    { name: 'twitter:description', content: 'Explore our portfolio of high-performance software engineering projects.' },
  ],
})

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