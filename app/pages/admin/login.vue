<template>
  <div class="min-h-screen bg-surface-950 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur">
          <Icon name="mdi:shield-lock-outline" size="28" class="text-white" />
        </div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Admin Panel</h1>
        <p class="text-sm text-surface-400 mt-1">Enter your password to continue</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autofocus
            class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all backdrop-blur"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3.5 bg-white text-surface-950 text-sm font-semibold rounded-xl hover:bg-surface-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Icon v-if="loading" name="mdi:loading" size="18" class="animate-spin" />
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <!-- Error -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p v-if="error" class="text-sm text-red-400 text-center">
            {{ error }}
          </p>
        </Transition>
      </form>

      <!-- Back Link -->
      <div class="text-center mt-6">
        <NuxtLink to="/" class="text-xs text-surface-500 hover:text-surface-300 transition-colors">
          ← Back to website
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { password: password.value },
    })
    await navigateTo('/admin')
  } catch (e: any) {
    error.value = 'Invalid password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
