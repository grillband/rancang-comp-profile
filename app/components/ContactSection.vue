<template>
  <section id="contact" class="relative py-32 md:py-48 bg-background overflow-hidden border-t border-[var(--color-border-subtle)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        <div data-scroll-reveal>
          <h2 class="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6 uppercase leading-[0.85]">
            Let's<br/>Talk.
          </h2>
          <p class="text-on-elevated text-lg md:text-xl max-w-md leading-relaxed mt-12 mb-16">
            {{ content?.contact?.subheading || 'Ready to build something extraordinary? Drop us a line.' }}
          </p>

          <div class="space-y-6">
            <div class="flex flex-col">
              <span class="text-[10px] uppercase tracking-widest text-muted-text mb-1">Email</span>
              <a href="#" class="text-lg text-foreground hover:text-on-elevated transition-colors">
                {{ content?.contact?.email || 'hello@rancang.dev' }}
              </a>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] uppercase tracking-widest text-muted-text mb-1">Office</span>
              <p class="text-lg text-foreground whitespace-pre-line">
                {{ content?.contact?.address || 'Jakarta, Indonesia' }}
              </p>
            </div>
          </div>
        </div>

        <div data-scroll-reveal data-scroll-delay="150" class="flex flex-col justify-end">
          <form @submit.prevent="handleSubmit" class="space-y-12">
            
            <div class="relative group">
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                placeholder="Name"
                autocomplete="name"
                class="w-full bg-transparent border-0 border-b border-[var(--color-border-default)] px-0 py-4 text-foreground text-lg placeholder:text-muted-text focus:outline-none focus:ring-0 focus:border-foreground transition-colors peer"
              />
              <div class="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full"></div>
            </div>

            <div class="relative group">
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                placeholder="Email Address"
                autocomplete="email"
                class="w-full bg-transparent border-0 border-b border-[var(--color-border-default)] px-0 py-4 text-foreground text-lg placeholder:text-muted-text focus:outline-none focus:ring-0 focus:border-foreground transition-colors peer"
              />
              <div class="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full"></div>
            </div>

            <div class="relative group">
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="1"
                placeholder="Tell us about your project..."
                class="w-full bg-transparent border-0 border-b border-[var(--color-border-default)] px-0 py-4 text-foreground text-lg placeholder:text-muted-text focus:outline-none focus:ring-0 focus:border-foreground transition-colors resize-none peer overflow-hidden"
              ></textarea>
              <div class="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full"></div>
            </div>

            <div v-if="success" class="text-sm text-green-600 dark:text-green-400">{{ success }}</div>
            <div v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</div>

            <button
              type="submit"
              :disabled="submitting"
              class="group relative inline-flex items-center justify-center h-16 w-full md:w-auto md:px-12 bg-inverse text-on-inverse text-sm font-semibold tracking-wide overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="relative z-10 group-hover:text-white transition-colors duration-300">
                {{ submitting ? 'Sending...' : (content?.contact?.submitText || 'Send Message') }}
              </span>
              <div class="absolute inset-0 bg-zinc-800 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            </button>
            
          </form>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

defineProps<{ content: any }>()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitting = ref(false)
const success = ref('')
const error = ref('')

const handleSubmit = async () => {
  success.value = ''
  error.value = ''

  if (!form.name.trim()) { error.value = 'Please enter your name.'; return }
  if (!form.email.trim()) { error.value = 'Please enter your email.'; return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { error.value = 'Please enter a valid email.'; return }
  if (!form.message.trim()) { error.value = 'Please enter your message.'; return }

  submitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { name: form.name, email: form.email, message: form.message },
    })
    success.value = 'Thank you! We will get back to you soon.'
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
