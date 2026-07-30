<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const theme = ref<'dark' | 'light'>('light')

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  }
  applyTheme(theme.value)
})

function applyTheme(t: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', t)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#000000' : '#FAFAFA')
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
  localStorage.setItem('theme', theme.value)
}

provide('theme', { theme, toggleTheme })
</script>

<style>
:root {
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);

  --color-bg: #000000;
  --color-fg: #FAFAFA;
  --color-muted: #181818;
  --color-border: #3F3F46;
  --color-surface: #000000;
  --color-elevated: #18181B;
  --color-on-elevated: #A1A1AA;
  --color-text-subtle: #71717A;
  --color-text-muted: #52525B;
  --color-inverse: #FAFAFA;
  --color-on-inverse: #000000;
  --color-border-subtle: rgba(255, 255, 255, 0.05);
  --color-border-default: rgba(255, 255, 255, 0.2);
  --color-elevated-secondary: rgba(24, 24, 27, 0.5);
  --glass-gradient: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
  --nav-bg: rgba(0, 0, 0, 0.8);
  --nav-border: rgba(255, 255, 255, 0.05);
}

[data-theme="light"] {
  --color-bg: #F8FAFC;
  --color-fg: #09090B;
  --color-muted: #F1F5F9;
  --color-border: #E2E8F0;
  --color-surface: #F8FAFC;
  --color-elevated: #FFFFFF;
  --color-on-elevated: #52525B;
  --color-text-subtle: #64748B;
  --color-text-muted: #94A3B8;
  --color-inverse: #18181B;
  --color-on-inverse: #FAFAFA;
  --color-border-subtle: rgba(0, 0, 0, 0.05);
  --color-border-default: rgba(0, 0, 0, 0.1);
  --color-elevated-secondary: rgba(255, 255, 255, 0.8);
  --glass-gradient: linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%);
  --nav-bg: rgba(255, 255, 255, 0.8);
  --nav-border: rgba(0, 0, 0, 0.05);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
  background-color: var(--color-bg);
  color-scheme: var(--color-scheme, dark);
  -webkit-text-size-adjust: 100%;
}

[data-theme="dark"] {
  color-scheme: dark;
}

[data-theme="light"] {
  color-scheme: light;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background-color: var(--color-bg);
  color: var(--color-fg);
  overflow-x: hidden;
}

::selection {
  background: var(--color-fg);
  color: var(--color-bg);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-muted);
}

.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}
</style>
