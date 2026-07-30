<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-colors duration-500"
    :class="scrolled ? 'nav-scrolled backdrop-blur-xl border-b border-[var(--nav-border)]' : 'bg-transparent border-transparent'"
  >
    <div class="px-6 md:px-12 h-20 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-3">
        <img :src="theme === 'dark' ? '/logo-mark-white.svg' : '/logo.svg'" alt="R" class="h-8 w-auto group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <span class="text-xl font-bold tracking-tight text-foreground lowercase group-hover:opacity-80 transition-opacity">rancang.dev</span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="item in (content?.nav?.items || [])"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          class="text-xs font-medium tracking-[0.05em] uppercase text-on-elevated hover:text-foreground transition-colors duration-300"
        >
          {{ item }}
        </a>
      </nav>

      <!-- Theme Toggle & CTA -->
      <div class="hidden md:flex items-center gap-4">
        <button
          @click="toggleTheme"
          class="theme-toggle-btn relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:text-foreground"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <a
          href="#contact"
          class="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-medium tracking-wide text-on-inverse bg-inverse rounded-full overflow-hidden group"
        >
          <span class="relative z-10 group-hover:text-inverse transition-colors duration-300">{{ content?.nav?.cta || 'Start Project' }}</span>
          <div class="absolute inset-0 bg-zinc-800 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden text-white"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="4" y1="8" x2="20" y2="8"></line>
          <line x1="4" y1="16" x2="20" y2="16"></line>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="6" y1="6" x2="18" y2="18"></line>
          <line x1="6" y1="18" x2="18" y2="6"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      v-show="mobileMenuOpen"
      class="md:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-xl border-b border-[var(--color-border-subtle)] p-6"
    >
      <div class="flex flex-col gap-6">
        <a
          v-for="item in (content?.nav?.items || [])"
          :key="item"
          :href="`#${item.toLowerCase()}`"
          class="text-sm font-medium tracking-[0.05em] uppercase text-on-elevated hover:text-foreground transition-colors duration-300"
          @click="mobileMenuOpen = false"
        >
          {{ item }}
        </a>
        <a
          href="#contact"
          class="inline-flex items-center justify-center px-6 py-3 text-xs font-medium tracking-wide text-on-inverse bg-inverse rounded-full mt-4"
          @click="mobileMenuOpen = false"
        >
          {{ content?.nav?.cta || 'Start Project' }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const { theme, toggleTheme } = inject('theme') as { theme: Ref<'dark' | 'light'>, toggleTheme: () => void }

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', onScroll, { passive: true })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
  })
</script>

<style scoped>
.nav-scrolled {
  background-color: var(--nav-bg);
}
.theme-toggle-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #A1A1AA;
}
.theme-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #FAFAFA;
}
[data-theme="light"] .theme-toggle-btn {
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #52525B;
}
[data-theme="light"] .theme-toggle-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #09090B;
}
</style>
