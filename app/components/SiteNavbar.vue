<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-200/60 shadow-nav">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <img src="/logo.svg" alt="Logo" class="h-10 w-auto transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
          <span class="text-lg font-bold text-surface-950 tracking-tight">{{ content?.nav?.logo || 'rancang.dev' }}</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="item in (content?.nav?.items || [])"
            :key="item"
            :href="`#${item.toLowerCase()}`"
            class="text-sm font-medium text-surface-600 hover:text-surface-950 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-surface-950 after:rounded-full after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:w-full"
          >
            {{ item }}
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <a
            href="#contact"
            class="inline-flex items-center px-5 py-2.5 bg-surface-950 text-white text-sm font-semibold rounded-lg hover:bg-surface-800 active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm hover:shadow-md"
          >
            {{ content?.nav?.cta || 'Get Started' }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100 active:scale-95 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          aria-label="Toggle menu"
        >
          <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-b border-surface-200 shadow-lg">
        <div class="px-4 py-4 space-y-2">
          <a
            v-for="item in (content?.nav?.items || [])"
            :key="item"
            :href="`#${item.toLowerCase()}`"
            class="block px-4 py-2.5 text-sm font-medium text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ item }}
          </a>
          <a
            href="#contact"
            class="block px-4 py-2.5 bg-surface-950 text-white text-sm font-semibold rounded-lg text-center mt-3 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            @click="mobileMenuOpen = false"
          >
            {{ content?.nav?.cta || 'Get Started' }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
const mobileMenuOpen = ref(false)
</script>
