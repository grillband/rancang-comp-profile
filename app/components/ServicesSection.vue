<template>
  <section id="services" class="relative py-20 sm:py-28 bg-white overflow-hidden">
    <div class="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-500/[0.03] blur-3xl"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-brand-400/[0.03] blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-scroll-reveal class="text-center mb-14">
        <h2 class="text-3xl sm:text-4xl font-bold text-surface-950 tracking-tight mb-3">
          {{ content?.services?.heading || 'Core Capabilities' }}
        </h2>
        <p class="text-surface-500 text-base max-w-lg mx-auto">
          {{ content?.services?.subheading || '' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(service, index) in (content?.services?.items || [])"
          :key="index"
          data-scroll-reveal
          :data-scroll-delay="index * 100"
          class="group relative p-7 bg-white border border-surface-200 rounded-2xl hover:shadow-card-hover hover:border-surface-300 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <div class="w-12 h-12 bg-surface-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-surface-100 transition-colors duration-300">
            <Icon :name="service.icon || 'mdi:code-braces'" size="24" class="text-surface-700" />
          </div>

          <h3 class="text-lg font-semibold text-surface-950 mb-2">
            {{ service.title }}
          </h3>
          <p class="text-sm text-surface-500 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>
