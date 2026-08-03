<template>
  <header
    class="fixed top-0 inset-x-0 z-50"
    :class="[mounted ? 'translate-y-0' : '-translate-y-full']"
    :style="{
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      background: scrolled ? (theme === 'dark' ? 'rgba(10,10,10,0.72)' : 'rgba(245,240,232,0.72)') : 'transparent',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease'
    }"
  >
    <div class="px-6 md:px-10 h-20 flex items-center justify-between max-w-[1600px] mx-auto">
      <div :class="[fadeClass, 'nav-fade']" :style="{ transitionDelay: '0.05s' }">
        <a href="/" class="flex items-center gap-3 group" @click.prevent="scrollToTop">
          <img
            :src="theme === 'dark' ? '/logo-mark-white.svg' : '/logo.svg'"
            alt="comp-sh"
            class="h-8 w-auto group-hover:scale-105 transition-transform duration-500"
          />
          <span class="text-lg font-medium tracking-tight text-ink">{{ content?.nav?.logo || 'comp-sh' }}</span>
        </a>
      </div>

      <nav class="hidden md:flex items-center gap-10">
        <div
          v-for="(item, i) in (content?.nav?.items || [])"
          :key="item.label"
          :class="[fadeClass, 'nav-fade']"
          :style="{ transitionDelay: `${0.12 + i * 0.06}s` }"
        >
          <a
            class="text-[13px] font-medium tracking-[0.14em] uppercase text-ink-2 hover:opacity-60 link-underline cursor-pointer"
            @click.prevent="scrollTo(item.href)"
          >
            {{ item.label }}
          </a>
        </div>
      </nav>

      <div class="flex items-center gap-3">
        <div :class="[fadeClass, 'nav-fade']" :style="{ transitionDelay: '0.35s' }">
          <button
            @click="toggleTheme"
            aria-label="Toggle theme"
            class="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-elev"
            :style="{ borderColor: 'var(--line)' }"
          >
            <svg v-if="theme === 'dark'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>

        <div :class="[fadeClass, 'nav-fade']" :style="{ transitionDelay: '0.42s' }">
          <a
            class="hidden md:inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-ink text-[11px] font-medium tracking-[0.12em] uppercase hover:-translate-y-[4px] cursor-pointer group transition-transform duration-500"
            :style="{ color: 'var(--bg)' }"
            @click.prevent="scrollTo('#contact')"
          >
            {{ content?.nav?.cta || 'Start Project' }}
            <span class="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-[3px]" :style="{ background: 'var(--bg)', color: 'var(--ink)' }">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </span>
          </a>
        </div>

        <div :class="[fadeClass, 'nav-fade']" :style="{ transitionDelay: '0.42s' }">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden w-10 h-10 rounded-full border flex items-center justify-center"
            :style="{ borderColor: 'var(--line)' }"
            aria-label="Menu"
          >
            <svg v-if="!mobileMenuOpen" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t px-6 py-6 flex flex-col gap-4"
        :style="{ background: 'var(--bg)', borderColor: 'var(--line)' }"
      >
        <a
          v-for="item in (content?.nav?.items || [])"
          :key="item.label"
          class="text-sm uppercase tracking-widest text-ink-2 cursor-pointer"
          @click.prevent="scrollTo(item.href)"
        >
          {{ item.label }}
        </a>
        <a
          class="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-xs tracking-widest uppercase cursor-pointer group transition-transform duration-500"
          :style="{ color: 'var(--bg)' }"
          @click.prevent="scrollTo('#contact')"
        >
          {{ content?.nav?.cta || 'Start a Project' }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-500 group-hover:translate-x-[3px]">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()
const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const mounted = ref(false)

const fadeClass = computed(() => mounted.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')

const { theme, toggleTheme } = inject('theme') as { theme: Ref<'dark' | 'light'>, toggleTheme: () => void }

function scrollTo(href: string) {
  mobileMenuOpen.value = false
  if (route.path !== '/') {
    router.push('/' + href)
    return
  }
  const el = document.getElementById(href.replace('#', ''))
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToTop() {
  mobileMenuOpen.value = false
  if (route.path !== '/') {
    router.push('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  requestAnimationFrame(() => { mounted.value = true })

  const onScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.nav-fade {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>