<template>
  <div>
    <HeroSection :content="content" />
    <ServicesSection :content="content" />
    <ProjectsSection :content="content" />
    <StatsSection :content="content" />
    <ContactSection :content="content" />
  </div>
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/content')

useHead({
  title: 'Rancang.dev — Engineering Your Digital Future',
  meta: [
    { name: 'description', content: 'Rancang.dev Solutions is a premier software development house dedicated to technical mastery, architectural integrity, and forward-thinking innovation.' },
    { property: 'og:title', content: 'rancang.dev — Engineering Your Digital Future' },
    { property: 'og:description', content: 'We build high-performance software architecture for companies that demand precision.' },
    { name: 'twitter:title', content: 'rancang.dev — Engineering Your Digital Future' },
    { name: 'twitter:description', content: 'We build high-performance software architecture for companies that demand precision.' },
  ],
})
</script>
