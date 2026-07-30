<template>
  <div class="min-h-screen flex flex-col font-sans antialiased text-foreground bg-background relative selection:bg-white selection:text-black">
    <!-- Content -->
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
