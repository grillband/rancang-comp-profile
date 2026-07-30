<template>
  <section id="contact" class="px-6 md:px-10 py-24 md:py-36 border-t" :style="{ borderColor: 'var(--line)' }">
    <div class="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-12">
      <div class="md:col-span-5">
        <div class="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-ink mb-6">[ Section 06 &mdash; Contact ]</div>
        <h2 class="font-medium tracking-[-0.035em] leading-[0.9] text-ink" :style="{ fontSize: 'clamp(2.6rem, 7vw, 6rem)' }">
          {{ content?.contact?.heading || "Let's build" }}<br/>
          <span class="font-serif italic text-ink-2">{{ content?.contact?.heading2 || 'something great.' }}</span>
        </h2>
        <p class="mt-8 max-w-md text-ink-2 leading-relaxed">
          {{ content?.contact?.subheading || 'Ready to start?' }}
        </p>

        <div class="mt-14 space-y-6">
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Email</div>
            <a :href="`mailto:${content?.contact?.email || 'hello@rancang.dev.com'}`" class="mt-1 inline-block text-ink text-lg link-underline">
              {{ content?.contact?.email || 'hello@rancang.dev.com' }}
            </a>
          </div>
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Phone</div>
            <div class="mt-1 text-ink text-lg">{{ content?.contact?.phone || '+62 21 1234 5678' }}</div>
          </div>
          <div>
            <div class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">Studio</div>
            <div class="mt-1 text-ink text-[15px] whitespace-pre-line leading-relaxed">{{ content?.contact?.address || 'Jakarta, Indonesia' }}</div>
          </div>
        </div>
      </div>

      <div class="md:col-span-7">
        <form @submit.prevent="handleSubmit" class="relative p-6 md:p-10 rounded-2xl" :style="{ background: 'var(--bg-elev)' }">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">01 &middot; Your Name</label>
              <input
                v-model="form.name"
                class="w-full bg-transparent border-b px-0 py-4 text-ink placeholder:text-muted-ink focus:outline-none focus:border-ink transition-colors"
                :style="{ borderColor: 'var(--line)' }"
                placeholder="Alexei Rossi"
              />
            </div>
            <div>
              <label class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">02 &middot; Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full bg-transparent border-b px-0 py-4 text-ink placeholder:text-muted-ink focus:outline-none focus:border-ink transition-colors"
                :style="{ borderColor: 'var(--line)' }"
                placeholder="alexei@company.com"
              />
            </div>
            <div class="md:col-span-2">
              <label class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">03 &middot; Company</label>
              <input
                v-model="form.company"
                class="w-full bg-transparent border-b px-0 py-4 text-ink placeholder:text-muted-ink focus:outline-none focus:border-ink transition-colors"
                :style="{ borderColor: 'var(--line)' }"
                placeholder="Meridian Capital"
              />
            </div>
            <div class="md:col-span-2">
              <label class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">04 &middot; Tell us about the project</label>
              <textarea
                v-model="form.message"
                rows="4"
                class="w-full bg-transparent border-b px-0 py-4 text-ink placeholder:text-muted-ink focus:outline-none focus:border-ink transition-colors resize-none"
                :style="{ borderColor: 'var(--line)' }"
                placeholder="We're building the next generation of..."
              ></textarea>
            </div>
          </div>

          <div class="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div class="font-mono text-[10px] uppercase tracking-widest text-muted-ink">We reply within 24 hours &middot; M&ndash;F</div>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-ink text-[12px] font-medium tracking-[0.14em] uppercase disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              :style="{ color: 'var(--bg)' }"
            >
              <template v-if="sent">Sent &mdash; thank you<span class="w-9 h-9 rounded-full flex items-center justify-center bg-lime" :style="{ color: 'var(--ink)' }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span></template>
              <template v-else>
                Send Message
                <span class="w-9 h-9 rounded-full flex items-center justify-center" :style="{ background: 'var(--bg)', color: 'var(--ink)' }">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </span>
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

defineProps<{ content: any }>()

const form = reactive({ name: '', email: '', company: '', message: '' })
const submitting = ref(false)
const sent = ref(false)

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) return

  submitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { name: form.name, email: form.email, company: form.company, message: form.message },
    })
    sent.value = true
    setTimeout(() => {
      sent.value = false
      form.name = ''
      form.email = ''
      form.company = ''
      form.message = ''
    }, 3200)
  } catch {
    // silent
  } finally {
    submitting.value = false
  }
}
</script>