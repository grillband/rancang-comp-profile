<template>
  <section id="services" class="relative py-32 px-6 md:px-12 bg-background">
    <div class="max-w-[1440px] mx-auto">
      <div class="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 class="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4" data-scroll-reveal>
            {{ content?.services?.heading || 'Capabilities' }}
          </h2>
          <p class="text-on-elevated max-w-md text-sm leading-relaxed" data-scroll-reveal data-scroll-delay="100">
            {{ content?.services?.subheading || 'End-to-end software architecture for modern enterprises.' }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
        
        <div 
          class="md:col-span-2 md:row-span-2 group relative p-8 md:p-10 rounded-[2rem] bg-elevated overflow-hidden flex flex-col justify-end"
          data-scroll-reveal
        >
          <div class="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="absolute inset-0 border border-[var(--color-border-subtle)] rounded-[2rem]"></div>
          
          <div class="relative z-10">
            <div class="w-12 h-12 rounded-full bg-inverse text-on-inverse flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
              <Icon :name="(content?.services?.items && content.services.items[0]?.icon) || 'mdi:code-braces'" size="24" />
            </div>
            <h3 class="text-2xl font-semibold text-foreground tracking-tight mb-3">
              {{ (content?.services?.items && content.services.items[0]?.title) || 'Systems Architecture' }}
            </h3>
            <p class="text-sm text-on-elevated leading-relaxed max-w-sm">
              {{ (content?.services?.items && content.services.items[0]?.description) || 'We design resilient, scalable systems built to handle extreme scale and complexity without failing.' }}
            </p>
          </div>
        </div>

        <div 
          class="md:col-span-2 md:row-span-1 group relative p-8 rounded-[2rem] bg-elevated-secondary overflow-hidden"
          data-scroll-reveal
          data-scroll-delay="150"
        >
          <div class="absolute inset-0 border border-[var(--color-border-subtle)] rounded-[2rem]"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between">
            <Icon :name="(content?.services?.items && content.services.items[1]?.icon) || 'mdi:database-outline'" size="24" class="text-subtle transition-colors duration-300 group-hover:text-foreground" />
            <div>
              <h3 class="text-lg font-semibold text-foreground tracking-tight mb-2">
                {{ (content?.services?.items && content.services.items[1]?.title) || 'Cloud Infrastructure' }}
              </h3>
              <p class="text-sm text-on-elevated">
                {{ (content?.services?.items && content.services.items[1]?.description) || 'Cloud-native deployment pipelines and zero-downtime environments.' }}
              </p>
            </div>
          </div>
        </div>

        <div 
          class="md:col-span-1 md:row-span-1 group relative p-8 rounded-[2rem] bg-elevated-secondary overflow-hidden"
          data-scroll-reveal
          data-scroll-delay="300"
        >
          <div class="absolute inset-0 border border-[var(--color-border-subtle)] rounded-[2rem]"></div>
          <div class="relative z-10 flex flex-col h-full justify-between">
            <Icon :name="(content?.services?.items && content.services.items[2]?.icon) || 'mdi:shield-lock-outline'" size="24" class="text-subtle transition-colors duration-300 group-hover:text-foreground" />
            <div>
              <h3 class="text-base font-semibold text-foreground tracking-tight mb-2">
                {{ (content?.services?.items && content.services.items[2]?.title) || 'Security & Audit' }}
              </h3>
            </div>
          </div>
        </div>

        <div 
          class="md:col-span-1 md:row-span-1 group relative p-8 rounded-[2rem] bg-elevated-secondary overflow-hidden flex items-center justify-center text-center"
          data-scroll-reveal
          data-scroll-delay="450"
        >
          <div class="absolute inset-0 border border-[var(--color-border-subtle)] rounded-[2rem]"></div>
          <NuxtLink to="#contact" class="relative z-10 text-sm font-medium text-foreground hover:text-subtle transition-colors underline underline-offset-4 decoration-[var(--color-border-subtle)] hover:decoration-foreground">
            Discuss a capability →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
</script>
