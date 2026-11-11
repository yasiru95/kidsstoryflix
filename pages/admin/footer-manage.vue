<template>
  <AdminLayout title="Footer Manage" subtitle="Customize the website footer with custom HTML code, full width or boxed layout">
    <div class="space-y-6 max-w-5xl">
      <!-- TOP STATUS CARD -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-2.5">
            <span class="text-3xl">🦶</span>
            <h2 class="text-xl sm:text-2xl font-black text-slate-800">
              Custom Footer Status
            </h2>
            <span
              class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
              :class="form.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
            >
              {{ form.enabled ? 'Custom Footer Active' : 'Default Footer Active' }}
            </span>
          </div>
          <p class="text-xs text-slate-500 font-semibold mt-1">
            When enabled, the default bottom footer is replaced with your custom HTML code.
          </p>
        </div>

        <!-- TOGGLE SWITCH -->
        <label class="relative inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            v-model="form.enabled"
            class="sr-only peer"
          />
          <div class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600 shadow-inner"></div>
          <span class="ml-3 text-sm font-extrabold text-slate-700">
            {{ form.enabled ? 'Enabled' : 'Disabled' }}
          </span>
        </label>
      </div>

      <!-- LAYOUT WIDTH OPTIONS -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h3 class="text-base font-black text-slate-800 mb-2 flex items-center gap-2">
          <span>📐 Footer Layout Style</span>
        </h3>
        <p class="text-xs text-slate-500 font-medium mb-6">
          Choose whether the footer spans across 100% viewport width or stays inside a centered container.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- BOXED -->
          <div
            @click="form.layout = 'boxed'"
            :class="[
              'p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-4',
              form.layout === 'boxed'
                ? 'border-purple-600 bg-purple-50/50 shadow-sm'
                : 'border-slate-200 hover:border-purple-300 bg-white'
            ]"
          >
            <div class="text-2xl p-2.5 rounded-xl bg-purple-100 text-purple-700">
              📦
            </div>
            <div>
              <div class="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <span>Boxed Layout (Container)</span>
                <span v-if="form.layout === 'boxed'" class="text-xs font-black text-purple-600">✓ Selected</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Centers the footer within a maximum width (<code class="bg-slate-100 px-1 py-0.5 rounded text-[11px]">max-w-7xl mx-auto</code>) leaving neat left and right page padding.
              </p>
            </div>
          </div>

          <!-- FULL WIDTH -->
          <div
            @click="form.layout = 'full'"
            :class="[
              'p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-4',
              form.layout === 'full'
                ? 'border-pink-500 bg-pink-50/50 shadow-sm'
                : 'border-slate-200 hover:border-pink-300 bg-white'
            ]"
          >
            <div class="text-2xl p-2.5 rounded-xl bg-pink-100 text-pink-600">
              ↔️
            </div>
            <div>
              <div class="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <span>Full Width Layout (100%)</span>
                <span v-if="form.layout === 'full'" class="text-xs font-black text-pink-600">✓ Selected</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Extends edge to edge (<code class="bg-slate-100 px-1 py-0.5 rounded text-[11px]">w-full</code>) across the bottom of the screen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- HTML CODE EDITOR -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
              <span>💻 Custom Footer HTML Code</span>
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              Write custom HTML, copyright tags, links, and Tailwind styling.
            </p>
          </div>

          <!-- PRESETS -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="loadNightSkyPreset"
              class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition border border-purple-200"
            >
              🌙 Night Sky Preset
            </button>
            <button
              type="button"
              @click="loadPlaygroundPreset"
              class="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition border border-pink-200"
            >
              🎈 Playground Preset
            </button>
          </div>
        </div>

        <div class="relative">
          <textarea
            v-model="form.customHtml"
            rows="10"
            placeholder="<footer class='bg-slate-900 text-white p-8'>...</footer>"
            class="w-full p-4 rounded-2xl bg-slate-950 text-pink-200 font-mono text-xs leading-relaxed border border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
          ></textarea>
        </div>

        <div class="mt-4 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Supported: Any standard HTML elements, Tailwind CSS classes, SVG icons, and hyperlinks.</span>
          <span class="font-mono">{{ form.customHtml.length }} characters</span>
        </div>
      </div>

      <!-- LIVE PREVIEW CONTAINER -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-black text-slate-800 flex items-center gap-2">
            <span>👁️ Live Preview</span>
            <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
              {{ form.layout === 'boxed' ? 'Boxed' : 'Full Width' }}
            </span>
          </h3>
          <span class="text-xs text-slate-400 font-semibold">Updates as you type</span>
        </div>

        <div class="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 overflow-x-auto min-h-[140px] flex items-center justify-center">
          <div
            :class="form.layout === 'boxed' ? 'w-full max-w-7xl mx-auto' : 'w-full'"
            v-html="form.customHtml"
          ></div>
        </div>
      </div>

      <!-- SAVE ACTIONS -->
      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          @click="resetDefaults"
          class="px-5 py-3 rounded-2xl text-slate-600 hover:bg-slate-200 font-bold text-sm transition"
        >
          Reset to Defaults
        </button>

        <button
          type="button"
          @click="saveChanges"
          class="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition flex items-center gap-2"
        >
          <span>💾 Save Footer Settings</span>
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Footer Management - KidsStoryFlix Admin",
  robots: "noindex, nofollow"
})

import { reactive, onMounted } from "vue"
import AdminLayout from "~/components/admin/AdminLayout.vue"
import { useSiteCustomizerStore } from "~/pinaGlobal/siteCustomizer"

const customizer = useSiteCustomizerStore()

const form = reactive({
  enabled: false,
  layout: "boxed",
  customHtml: ""
})

onMounted(() => {
  customizer.loadFromStorage()
  form.enabled = customizer.footerConfig.enabled
  form.layout = customizer.footerConfig.layout
  form.customHtml = customizer.footerConfig.customHtml || customizer.defaultFooterHtml
})

const loadNightSkyPreset = () => {
  form.customHtml = customizer.defaultFooterHtml
}

const loadPlaygroundPreset = () => {
  form.customHtml = `<footer class="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white rounded-3xl p-8 sm:p-10 shadow-2xl">
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
    <div>
      <h3 class="text-3xl font-black">KidsStoryFlix 🎈</h3>
      <p class="text-xs font-bold text-white/90 mt-1">Free illustrated bedtime stories for little champions!</p>
    </div>
    <div class="flex items-center gap-4 text-xs font-black">
      <a href="/" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition">Home</a>
      <a href="/all-stories" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition">Stories</a>
      <a href="/privacy" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition">Privacy</a>
    </div>
  </div>
  <div class="mt-8 pt-4 border-t border-white/20 text-center text-xs font-bold text-white/80">
    © 2026 KidsStoryFlix • Magical Fun for Curious Minds
  </div>
</footer>`
}

const resetDefaults = () => {
  if (confirm("Reset Footer configuration back to defaults?")) {
    form.enabled = false
    form.layout = "boxed"
    form.customHtml = customizer.defaultFooterHtml
    customizer.saveFooterConfig(form)
    alert("Reset successful!")
  }
}

const saveChanges = () => {
  customizer.saveFooterConfig({
    enabled: form.enabled,
    layout: form.layout,
    customHtml: form.customHtml
  })
  alert("🎉 Footer settings saved successfully! Live website updated.")
}
</script>

