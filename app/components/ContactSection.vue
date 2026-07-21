<template>
  <section id="contact" class="relative py-20 sm:py-28 bg-white overflow-hidden">
    <div class="absolute bottom-[-15%] right-[-8%] w-[450px] h-[450px] rounded-full bg-brand-500/[0.03] blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div data-scroll-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Left: Info -->
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold text-surface-950 tracking-tight mb-3">
            {{ content?.contact?.heading || 'Get in Touch' }}
          </h2>
          <p class="text-surface-500 text-base mb-8 max-w-md">
            {{ content?.contact?.subheading || '' }}
          </p>

          <div class="space-y-4 mb-8">
            <!-- Email -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-surface-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:email-outline" size="20" class="text-surface-600" />
              </div>
              <div>
                <p class="text-sm text-surface-900 font-medium">{{ content?.contact?.email || '' }}</p>
              </div>
            </div>

            <!-- Address -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 bg-surface-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:map-marker-outline" size="20" class="text-surface-600" />
              </div>
              <div>
                <p class="text-sm text-surface-900 font-medium whitespace-pre-line">{{ content?.contact?.address || '' }}</p>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="rounded-xl overflow-hidden border border-surface-200 bg-surface-100 aspect-[16/10]">
            <img
              src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-122.4194,37.7749,13,0/600x400?access_token=pk.placeholder"
              alt="Office location map"
              class="w-full h-full object-cover"
              onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\'flex items-center justify-center h-full text-surface-400 text-sm\'><span>📍 Map View</span></div>'"
            />
          </div>
        </div>

        <!-- Right: Form -->
        <div>
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:border-transparent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:border-transparent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Message</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Tell us about your project..."
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-surface-300 focus:border-transparent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full px-7 py-3.5 bg-surface-950 hover:bg-surface-800 text-white text-sm font-semibold rounded-xl active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md hover:shadow-lg"
            >
              {{ content?.contact?.submitText || 'Send a Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ content: any }>()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  alert('Message sent! (This is a demo)')
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
