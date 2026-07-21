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
  title: 'DevArchitect — Engineering Your Digital Future',
  meta: [
    { name: 'description', content: 'DevArchitect Solutions is a premier software development house dedicated to technical mastery, architectural integrity, and forward-thinking innovation.' },
  ],
})
</script>
