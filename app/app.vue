<template>
  <div class="grain">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const theme = ref<'dark' | 'light'>('light')

onMounted(() => {
  const saved = localStorage.getItem('rancang_theme')
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  }
  applyTheme(theme.value)
})

function applyTheme(t: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', t)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#0A0A0A' : '#F5F0E8')
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
  localStorage.setItem('rancang_theme', theme.value)
}

provide('theme', { theme, toggleTheme })

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl
useHead({
  meta: [
    { property: 'og:image', content: `${siteUrl}/og-image.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
  ],
})
</script>

<style>
:root {
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);

  --bg: #F5F0E8;
  --bg-elev: #EDE7DC;
  --ink: #0A0A0A;
  --ink-2: #1A1A1A;
  --muted: #6B6B68;
  --line: rgba(10, 10, 10, 0.12);
  --accent: #FF5722;
  --lime: #C7F550;
}

[data-theme="dark"] {
  --bg: #0A0A0A;
  --bg-elev: #141414;
  --ink: #F5F0E8;
  --ink-2: #E8E3D8;
  --muted: #8A8A85;
  --line: rgba(245, 240, 232, 0.14);
  --accent: #FF5722;
  --lime: #C7F550;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
  background-color: var(--bg);
  color-scheme: light;
  -webkit-text-size-adjust: 100%;
}

[data-theme="dark"] {
  color-scheme: dark;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  transition: background-color 0.6s ease, color 0.6s ease;
}

::selection {
  background: var(--ink);
  color: var(--bg);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--line);
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

* {
  border-color: var(--line);
}

.font-serif { font-family: 'Instrument Serif', serif; font-weight: 400; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--ink);
  border-radius: 999px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.15s ease, width 0.25s ease, height 0.25s ease, background 0.3s;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s ease, height 0.3s ease, border-color 0.3s;
}

@media (max-width: 768px) {
  .cursor-dot, .cursor-ring { display: none; }
}

.grain::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 40s linear infinite;
}

@keyframes marquee-r {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.marquee-r-track { animation: marquee-r 45s linear infinite; }

.dot-grid {
  background-image: radial-gradient(circle, var(--line) 1px, transparent 1px);
  background-size: 24px 24px;
}

.mask-line { overflow: hidden; display: block; }

.link-underline { position: relative; }
.link-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.link-underline:hover::after { transform: scaleX(1); transform-origin: left; }

.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}
</style>