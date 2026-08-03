<template>
  <div>
    <HeroSection :content="content" />
    <MarqueeSection :content="content" />
    <ServicesSection :content="content" />
    <ProjectsSection :content="content" />
    <DemosSection :content="content" />
    <StatsSection :content="content" />
    <ProcessSection :content="content" />
    <TestimonialsSection :content="content" />
    <ContactSection :content="content" />
  </div>
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/content')

useHead({
  title: 'rancang.dev — Engineering Digital Futures',
  meta: [
    { name: 'description', content: 'We build high-performance software architecture for companies that demand precision.' },
    { property: 'og:title', content: 'rancang.dev — Engineering Digital Futures' },
    { property: 'og:description', content: 'We build high-performance software architecture for companies that demand precision.' },
    { name: 'twitter:title', content: 'rancang.dev — Engineering Digital Futures' },
    { name: 'twitter:description', content: 'We build high-performance software architecture for companies that demand precision.' },
  ],
})
</script>