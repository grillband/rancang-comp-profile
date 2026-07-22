<template>
  <section id="portfolio" class="relative py-20 sm:py-28 bg-surface-50 overflow-hidden">
    <div class="absolute top-[-15%] left-[-8%] w-[450px] h-[450px] rounded-full bg-brand-500/[0.04] blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-scroll-reveal class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold text-surface-950 tracking-tight mb-2">
            {{ content?.projects?.heading || 'Past Projects' }}
          </h2>
          <p class="text-surface-500 text-base">
            {{ content?.projects?.subheading || '' }}
          </p>
        </div>
            <NuxtLink to="/project" class="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 hover:gap-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
          View All More
          <Icon name="mdi:arrow-right" size="16" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <NuxtLink
          v-for="(project, index) in (content?.projects?.items || [])"
          :key="index"
          :to="`/project/${project.slug}`"
          data-scroll-reveal
          :data-scroll-delay="index * 120"
          class="group flex flex-col bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-card-hover hover:border-surface-300 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer no-underline text-inherit"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-surface-100">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <div class="p-6">
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in (project.tags || [])"
                :key="tag"
                class="inline-flex items-center px-2.5 py-1 bg-surface-100 text-surface-600 text-xs font-medium rounded-md"
              >
                {{ tag }}
              </span>
            </div>

            <h3 class="text-lg font-semibold text-surface-950 mb-2">
              {{ project.title }}
            </h3>
            <p class="text-sm text-surface-500 leading-relaxed">
              {{ project.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>
