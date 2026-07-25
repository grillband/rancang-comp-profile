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
  ],
})
</script>
