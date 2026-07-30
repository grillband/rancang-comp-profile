<template>
  <div class="min-h-screen bg-surface-50 font-sans antialiased">
    <!-- Admin Header -->
    <header class="sticky top-0 z-50 bg-surface-950 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <Icon name="mdi:view-dashboard-outline" size="22" class="text-brand-400" />
            <span class="text-lg font-bold tracking-tight">Admin Panel</span>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/" target="_blank" class="text-xs text-surface-400 hover:text-white transition-colors flex items-center gap-1">
              <Icon name="mdi:open-in-new" size="14" />
              View Site
            </NuxtLink>
            <button
              @click="handleLogout"
              class="text-xs text-surface-400 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Icon name="mdi:logout" size="14" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Status Banner -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="saveStatus" :class="[
          'mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          saveStatus === 'saved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        ]">
          <Icon :name="saveStatus === 'saved' ? 'mdi:check-circle' : 'mdi:alert-circle'" size="18" />
          {{ saveStatus === 'saved' ? 'Changes saved successfully!' : 'Failed to save. Please try again.' }}
        </div>
      </Transition>

      <!-- Tabs -->
      <div class="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-1.5 border border-surface-200 shadow-card">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2',
            activeTab === tab.id
              ? 'bg-surface-950 text-white shadow-md'
              : 'text-surface-500 hover:text-surface-900 hover:bg-surface-50'
          ]"
        >
          <Icon :name="tab.icon" size="16" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="!content" class="flex items-center justify-center py-20">
        <Icon name="mdi:loading" size="32" class="animate-spin text-surface-400" />
      </div>

      <!-- Editor Panels -->
      <div v-else class="space-y-6">

        <!-- ============ NAVIGATION ============ -->
        <div v-show="activeTab === 'nav'" class="space-y-6">
          <EditorCard title="Navigation Bar" icon="mdi:navigation-outline">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField v-model="content.nav.logo" label="Logo Text" />
              <InputField v-model="content.nav.cta" label="CTA Button Text" />
            </div>
            <div class="mt-4">
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Nav Items (comma-separated)</label>
              <input
                :value="content.nav.items.join(', ')"
                @input="content.nav.items = ($event.target as HTMLInputElement).value.split(',').map((s: string) => s.trim()).filter(Boolean)"
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
              />
            </div>
          </EditorCard>
        </div>

        <!-- ============ HERO ============ -->
        <div v-show="activeTab === 'hero'" class="space-y-6">
          <EditorCard title="Hero Section" icon="mdi:star-four-points-outline">
            <InputField v-model="content.hero.title" label="Headline" />
            <TextareaField v-model="content.hero.subtitle" label="Subtitle" :rows="3" class="mt-4" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField v-model="content.hero.primaryButton" label="Primary Button" />
              <InputField v-model="content.hero.secondaryButton" label="Secondary Button" />
            </div>
            <ImageUploadField v-model="content.hero.background" label="Background Image" class="mt-4" />
          </EditorCard>
        </div>

        <!-- ============ SERVICES ============ -->
        <div v-show="activeTab === 'services'" class="space-y-6">
          <EditorCard title="Services Section" icon="mdi:cog-outline">
            <InputField v-model="content.services.heading" label="Section Heading" />
            <InputField v-model="content.services.subheading" label="Section Subheading" class="mt-4" />
          </EditorCard>

          <EditorCard
            v-for="(service, i) in content.services.items"
            :key="i"
            :title="`Service ${Number(i) + 1}: ${service.title}`"
            icon="mdi:cube-outline"
            :removable="content.services.items.length > 1"
            @remove="content.services.items.splice(i, 1)"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField v-model="service.icon" label="Icon (MDI name)" placeholder="mdi:monitor-dashboard" />
              <InputField v-model="service.title" label="Title" />
            </div>
            <TextareaField v-model="service.description" label="Description" :rows="3" class="mt-4" />
            <ImageUploadField v-model="service.image" label="Card Image (optional)" class="mt-4" />
          </EditorCard>

          <button
            @click="content.services.items.push({ icon: 'mdi:plus', title: 'New Service', description: 'Description here.', image: '' })"
            class="w-full py-3 border-2 border-dashed border-surface-300 rounded-xl text-sm font-medium text-surface-500 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="mdi:plus-circle-outline" size="18" />
            Add Service
          </button>
        </div>

        <!-- ============ PROJECTS ============ -->
        <div v-show="activeTab === 'projects'" class="space-y-6">
          <EditorCard title="Projects Section" icon="mdi:folder-outline">
            <InputField v-model="content.projects.heading" label="Section Heading" />
            <InputField v-model="content.projects.subheading" label="Section Subheading" class="mt-4" />
          </EditorCard>

          <EditorCard
            v-for="(project, i) in content.projects.items"
            :key="i"
            :title="`Project ${Number(i) + 1}: ${project.title}`"
            icon="mdi:briefcase-outline"
            :removable="true"
            @remove="content.projects.items.splice(i, 1)"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField v-model="project.title" label="Title" />
              <InputField v-model="project.slug" label="Slug (URL path)" placeholder="my-project-slug" />
            </div>
            <TextareaField v-model="project.description" label="Description (short summary)" :rows="2" class="mt-4" />
            <div class="mt-4">
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Tags (comma-separated)</label>
              <input
                :value="project.tags.join(', ')"
                @input="project.tags = ($event.target as HTMLInputElement).value.split(',').map((s: string) => s.trim()).filter(Boolean)"
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
              />
            </div>
            <div class="mt-4">
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Details (Markdown supported)</label>
              <textarea
                :value="project.details"
                @input="project.details = ($event.target as HTMLTextAreaElement).value"
                rows="8"
                placeholder="## Overview&#10;&#10;Write your project details here..."
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder:text-surface-400 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all resize-y"
              ></textarea>
            </div>
            <div class="mt-4">
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Image</label>
              <div class="flex items-center gap-4">
                <div v-if="project.image" class="w-20 h-14 rounded-lg overflow-hidden border border-surface-200 bg-surface-100 flex-shrink-0">
                  <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <input
                    v-model="project.image"
                    placeholder="/uploads/image.webp"
                    class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
                  />
                </div>
                <label class="px-4 py-3 bg-surface-100 border border-surface-200 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-200 transition-colors cursor-pointer flex-shrink-0">
                  <Icon name="mdi:upload" size="16" class="mr-1" />
                  Upload
                  <input type="file" accept="image/*" class="hidden" @change="(e) => uploadImage(e, project)" />
                </label>
              </div>
            </div>
          </EditorCard>

          <button
            @click="content.projects.items.push({ slug: 'new-project-' + Date.now(), image: '', tags: ['New'], title: 'New Project', description: 'Project description.', details: '## Overview\n\nDetails about the project.' })"
            class="w-full py-3 border-2 border-dashed border-surface-300 rounded-xl text-sm font-medium text-surface-500 hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="mdi:plus-circle-outline" size="18" />
            Add Project
          </button>
        </div>

        <!-- ============ STATS ============ -->
        <div v-show="activeTab === 'stats'" class="space-y-6">
          <EditorCard title="Statistics Banner" icon="mdi:chart-bar">
            <div class="space-y-4">
              <div v-for="(stat, i) in content.stats.items" :key="i" class="flex items-center gap-4">
                <div class="flex-1 grid grid-cols-2 gap-4">
                  <InputField v-model="stat.value" :label="'Value ' + (Number(i) + 1)" />
                  <InputField v-model="stat.label" :label="'Label ' + (Number(i) + 1)" />
                </div>
                <button
                  v-if="content.stats.items.length > 1"
                  @click="content.stats.items.splice(i, 1)"
                  class="mt-5 p-2 text-surface-400 hover:text-red-500 transition-colors"
                >
                  <Icon name="mdi:delete-outline" size="18" />
                </button>
              </div>
            </div>
            <button
              @click="content.stats.items.push({ value: '0+', label: 'NEW STAT' })"
              class="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1"
            >
              <Icon name="mdi:plus" size="16" />
              Add Stat
            </button>
          </EditorCard>
        </div>

        <!-- ============ CONTACT ============ -->
        <div v-show="activeTab === 'contact'" class="space-y-6">
          <EditorCard title="Contact Section" icon="mdi:email-outline">
            <InputField v-model="content.contact.heading" label="Section Heading" />
            <TextareaField v-model="content.contact.subheading" label="Section Subheading" :rows="2" class="mt-4" />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField v-model="content.contact.email" label="Email Address" />
              <InputField v-model="content.contact.submitText" label="Submit Button Text" />
            </div>
            <TextareaField v-model="content.contact.address" label="Office Address" :rows="2" class="mt-4" />
          </EditorCard>
        </div>

        <!-- ============ FOOTER ============ -->
        <div v-show="activeTab === 'footer'" class="space-y-6">
          <EditorCard title="Footer" icon="mdi:page-layout-footer">
            <InputField v-model="content.footer.logo" label="Footer Logo Text" />
            <TextareaField v-model="content.footer.copyright" label="Copyright Text" :rows="2" class="mt-4" />
          </EditorCard>

          <EditorCard
            v-for="(column, i) in content.footer.columns"
            :key="i"
            :title="`Column: ${column.title}`"
            icon="mdi:view-column-outline"
          >
            <InputField v-model="column.title" label="Column Title" />
            <div class="mt-4">
              <label class="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Links (comma-separated)</label>
              <input
                :value="column.links.join(', ')"
                @input="column.links = ($event.target as HTMLInputElement).value.split(',').map((s: string) => s.trim()).filter(Boolean)"
                class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
              />
            </div>
          </EditorCard>
        </div>
      </div>

      <!-- Save Button -->
      <div class="sticky bottom-0 bg-surface-50/95 backdrop-blur-md py-4 mt-8 border-t border-surface-200">
        <div class="flex items-center justify-between">
          <p class="text-xs text-surface-400">
            Changes are saved to the server and reflected on the live site immediately.
          </p>
          <button
            @click="saveContent"
            :disabled="saving"
            class="px-8 py-3 bg-surface-950 text-white text-sm font-semibold rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Icon v-if="saving" name="mdi:loading" size="16" class="animate-spin" />
            <Icon v-else name="mdi:content-save-outline" size="16" />
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const tabs = [
  { id: 'nav', label: 'Navigation', icon: 'mdi:navigation-outline' },
  { id: 'hero', label: 'Hero', icon: 'mdi:star-four-points-outline' },
  { id: 'services', label: 'Services', icon: 'mdi:cog-outline' },
  { id: 'projects', label: 'Projects', icon: 'mdi:folder-outline' },
  { id: 'stats', label: 'Stats', icon: 'mdi:chart-bar' },
  { id: 'contact', label: 'Contact', icon: 'mdi:email-outline' },
  { id: 'footer', label: 'Footer', icon: 'mdi:page-layout-footer' },
]

const activeTab = ref('hero')
const saving = ref(false)
const saveStatus = ref<'saved' | 'error' | ''>('')

// Fetch current content
const { data: rawContent } = await useFetch<Record<string, any>>('/api/content')
const content = ref<Record<string, any> | null>(rawContent.value ? JSON.parse(JSON.stringify(rawContent.value)) : null)

const saveContent = async () => {
  saving.value = true
  saveStatus.value = ''

  try {
    await $fetch('/api/content', {
      method: 'PUT',
      body: content.value,
    })
    saveStatus.value = 'saved'
  } catch {
    saveStatus.value = 'error'
  } finally {
    saving.value = false
    setTimeout(() => { saveStatus.value = '' }, 3000)
  }
}

const uploadImage = async (event: Event, project: any) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const result = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    })
    project.image = result.url
  } catch (e) {
    alert('Upload failed. Please try again.')
  }
}

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>
