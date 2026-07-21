<template>
  <div class="min-h-screen flex flex-col font-sans antialiased text-surface-900 bg-white">
    <div class="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.015)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(0,0,0,0.01)_0%,_transparent_50%)] z-0"></div>
    <SiteNavbar :content="content" />
    <main class="flex-1 relative z-[1]">
      <slot />
    </main>
    <SiteFooter :content="content" />
  </div>
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/content')
provide('siteContent', content)
</script>
