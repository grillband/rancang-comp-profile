<template>
  <section id="work" class="px-6 md:px-10 py-24 md:py-36" :style="{ borderColor: 'var(--line)' }">
    <div class="max-w-[1600px] mx-auto">
      <div class="grid md:grid-cols-12 gap-10 mb-16">
        <div class="md:col-span-4">
          <div class="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-ink mb-4">[ Section 03 &mdash; Selected Work ]</div>
        </div>
        <div class="md:col-span-8">
          <h2 class="font-medium tracking-[-0.03em] leading-[0.95] text-ink" :style="{ fontSize: 'clamp(2.2rem, 5vw, 4.8rem)' }">
            Projects we're<span class="font-serif italic text-ink-2"> proud of.</span>
          </h2>
          <p class="mt-6 max-w-lg text-ink-2 leading-relaxed">{{ content?.projects?.subheading || 'A selection of our technical achievements.' }}</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4 md:gap-6">
        <NuxtLink
          v-for="(project, index) in (content?.projects?.items || [])"
          :key="project.slug"
          :to="`/project/${project.slug}`"
          class="group relative p-6 md:p-8 rounded-2xl border transition-all duration-500"
          :style="{ borderColor: 'var(--line)', background: 'var(--bg-elev)' }"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="font-mono text-[11px] tracking-widest text-muted-ink mb-1">{{ project.year }}</div>
              <div class="font-mono text-[11px] tracking-widest text-muted-ink">{{ project.client }}</div>
            </div>
            <span class="w-10 h-10 rounded-full border flex items-center justify-center text-[11px] font-mono group-hover:bg-ink group-hover:text-bg transition-colors duration-300" :style="{ borderColor: 'var(--line)' }">&rarr;</span>
          </div>

          <div class="relative aspect-[16/10] rounded-xl overflow-hidden mb-6" :style="{ background: 'var(--bg)' }">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tag in (project.tags || [])"
              :key="tag"
              class="px-3 py-1 text-[10px] uppercase tracking-widest text-muted-ink rounded-full border"
              :style="{ borderColor: 'var(--line)' }"
            >
              {{ tag }}
            </span>
          </div>

          <h3 class="text-2xl font-medium tracking-[-0.02em] text-ink mb-2">{{ project.title }}</h3>
          <p class="text-ink-2 text-[14px] leading-relaxed">{{ project.description }}</p>
        </NuxtLink>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink
          to="/project"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-[11px] font-medium tracking-[0.12em] uppercase text-ink hover:bg-ink hover:text-bg transition-all duration-300"
          :style="{ borderColor: 'var(--line)' }"
        >
          View All Projects
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>