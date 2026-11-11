<template>
  <AdminLayout title="Landing Page Sections" subtitle="Add and configure multiple custom HTML sections with Boxed or Full Width styling">
    <div class="space-y-6 max-w-5xl">
      <!-- TOP ACTION BAR -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <span>📄 Dynamic Landing Sections</span>
            <span class="text-xs font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
              {{ customizer.landingSections.length }} Sections
            </span>
          </h2>
          <p class="text-xs text-slate-500 font-semibold mt-1">
            Build customized announcements, banners, interactive widgets, or hero teasers using HTML.
          </p>
        </div>

        <button
          type="button"
          @click="openAddModal = true"
          class="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition flex items-center gap-2"
        >
          <span>✨ Add Custom Section</span>
        </button>
      </div>

      <!-- SECTIONS LIST -->
      <div v-if="customizer.landingSections.length === 0" class="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
        <div class="text-5xl mb-3">📦</div>
        <h3 class="text-lg font-black text-slate-700">No Custom Sections Created Yet</h3>
        <p class="text-xs text-slate-400 font-semibold mt-1">Click the button above to add your first custom HTML section to the homepage.</p>
        <button
          @click="openAddModal = true"
          class="mt-4 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700"
        >
          Add First Section
        </button>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="(section, index) in customizer.landingSections"
          :key="section.id"
          class="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition"
        >
          <!-- CARD HEADER -->
          <div class="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                #{{ index + 1 }}
              </span>
              <div>
                <input
                  v-model="section.title"
                  @change="saveChanges"
                  type="text"
                  class="font-black text-base text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-purple-500 focus:bg-white px-1 py-0.5 rounded focus:outline-none"
                  placeholder="Section Title"
                />
                <div class="text-[11px] text-slate-400 font-semibold">
                  Placement: <span class="uppercase font-bold text-purple-600">{{ section.position }}</span> • 
                  Style: <span class="uppercase font-bold text-pink-600">{{ section.layout }}</span>
                </div>
              </div>
            </div>

            <!-- CONTROLS: ENABLE TOGGLE & DELETE -->
            <div class="flex items-center gap-4">
              <!-- POSITION -->
              <select
                v-model="section.position"
                @change="saveChanges"
                class="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-purple-500"
              >
                <option value="top">Top (Above Stories)</option>
                <option value="bottom">Bottom (Above Footer)</option>
              </select>

              <!-- LAYOUT STYLE -->
              <div class="inline-flex rounded-xl p-1 bg-slate-200 text-xs font-bold">
                <button
                  type="button"
                  @click="section.layout = 'boxed'; saveChanges()"
                  :class="section.layout === 'boxed' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'"
                  class="px-2.5 py-1 rounded-lg transition"
                >
                  Boxed
                </button>
                <button
                  type="button"
                  @click="section.layout = 'full'; saveChanges()"
                  :class="section.layout === 'full' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'"
                  class="px-2.5 py-1 rounded-lg transition"
                >
                  Full Width
                </button>
              </div>

              <!-- ENABLE TOGGLE -->
              <label class="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  v-model="section.enabled"
                  @change="saveChanges"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                <span class="ml-2 text-xs font-extrabold text-slate-700">
                  {{ section.enabled ? 'Active' : 'Hidden' }}
                </span>
              </label>

              <!-- DELETE BUTTON -->
              <button
                type="button"
                @click="removeSection(section.id)"
                class="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Delete Section"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- CARD BODY: HTML CODE & PREVIEW -->
          <div class="p-5 sm:p-6 space-y-4">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="text-xs font-bold text-slate-500 uppercase">
                  Section HTML & Tailwind Code
                </label>
                <span class="text-[11px] font-mono text-slate-400">
                  {{ section.customHtml?.length || 0 }} chars
                </span>
              </div>
              <textarea
                v-model="section.customHtml"
                @input="saveChanges"
                rows="6"
                placeholder="<div class='bg-purple-500 p-6 rounded-3xl text-white'>...</div>"
                class="w-full p-3.5 rounded-2xl bg-slate-950 text-purple-200 font-mono text-xs leading-relaxed border border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <!-- LIVE PREVIEW ACCORDION -->
            <div class="pt-2">
              <div class="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center justify-between">
                <span>Section Preview</span>
                <span class="font-normal text-[11px] text-slate-400">
                  Rendering mode: {{ section.layout === 'boxed' ? 'Boxed Container (max-w-7xl)' : 'Full Width (100%)' }}
                </span>
              </div>
              <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 overflow-x-auto min-h-[90px] flex items-center justify-center">
                <div
                  :class="section.layout === 'boxed' ? 'w-full max-w-7xl mx-auto' : 'w-full'"
                  v-html="section.customHtml"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD NEW SECTION MODAL -->
      <div
        v-if="openAddModal"
        class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 class="text-xl font-black text-slate-800 flex items-center gap-2">
              <span>✨ Add New Landing Section</span>
            </h3>
            <button
              @click="openAddModal = false"
              class="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="createNewSection" class="mt-6 space-y-4 text-sm font-semibold">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Section Title</label>
              <input
                v-model="newSec.title"
                type="text"
                required
                placeholder="e.g. 🌈 Friday New Stories Banner"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 text-xs"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Layout Style</label>
                <select
                  v-model="newSec.layout"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 text-xs"
                >
                  <option value="boxed">Boxed (Container)</option>
                  <option value="full">Full Width (100%)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Page Placement</label>
                <select
                  v-model="newSec.position"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 text-xs"
                >
                  <option value="top">Top (Above Stories)</option>
                  <option value="bottom">Bottom (Above Footer)</option>
                </select>
              </div>
            </div>

            <!-- CHOOSE PRESET -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Choose HTML Template</label>
              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  type="button"
                  @click="newSec.customHtml = customizer.defaultLandingSectionHtml"
                  class="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                >
                  Announcement Card
                </button>
                <button
                  type="button"
                  @click="loadQuizTemplate"
                  class="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200"
                >
                  Interactive CTA Banner
                </button>
              </div>
              <textarea
                v-model="newSec.customHtml"
                rows="6"
                required
                class="w-full p-3 rounded-xl bg-slate-950 text-purple-200 font-mono text-xs border border-purple-900"
              ></textarea>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                @click="openAddModal = false"
                class="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold shadow-md"
              >
                Add Section 🚀
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Landing Page Sections - KidsStoryFlix Admin",
  robots: "noindex, nofollow"
})

import { reactive, ref, onMounted } from "vue"
import AdminLayout from "~/components/admin/AdminLayout.vue"
import { useSiteCustomizerStore } from "~/pinaGlobal/siteCustomizer"

const customizer = useSiteCustomizerStore()
const openAddModal = ref(false)

const newSec = reactive({
  title: "Special Kids Adventure Banner",
  layout: "boxed",
  position: "top",
  customHtml: ""
})

onMounted(() => {
  customizer.loadFromStorage()
  newSec.customHtml = customizer.defaultLandingSectionHtml
})

const loadQuizTemplate = () => {
  newSec.customHtml = `<div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl text-center relative my-6">
  <div class="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 font-black text-xs uppercase mb-3">
    ⭐ Fun Challenge
  </div>
  <h3 class="text-3xl sm:text-5xl font-black">Can You Solve Today's Mystery? 🕵️‍♂️</h3>
  <p class="text-sm font-semibold text-blue-100 mt-2 max-w-lg mx-auto">
    Listen to our audio story and earn special animal reader badges!
  </p>
  <div class="mt-6 flex justify-center gap-3">
    <a href="/all-stories" class="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-black text-sm shadow-xl transition">
      Play Audio Mystery 🎧
    </a>
  </div>
</div>`
}

const createNewSection = () => {
  customizer.addLandingSection({
    title: newSec.title,
    layout: newSec.layout,
    position: newSec.position,
    customHtml: newSec.customHtml
  })

  openAddModal.value = false
  alert("🎉 Section added to landing page!")
}

const removeSection = (id) => {
  if (confirm("Are you sure you want to delete this section from the landing page?")) {
    customizer.deleteLandingSection(id)
  }
}

const saveChanges = () => {
  customizer.saveHeaderConfig(customizer.headerConfig) // trigger sync
  if (import.meta.client) {
    localStorage.setItem("ksf_landing_sections", JSON.stringify(customizer.landingSections))
  }
}
</script>

