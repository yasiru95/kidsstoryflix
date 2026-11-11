<template>
  <AdminLayout title="Header Manage" subtitle="Customize the website header with custom HTML code, full width or boxed layout">
    <div class="space-y-6 max-w-5xl">
      <!-- TOP STATUS CARD -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-2.5">
            <span class="text-3xl">🎨</span>
            <h2 class="text-xl sm:text-2xl font-black text-slate-800">
              Custom Header Status
            </h2>
            <span
              class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
              :class="form.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
            >
              {{ form.enabled ? 'Custom Header Active' : 'Default Navbar Active' }}
            </span>
          </div>
          <p class="text-xs text-slate-500 font-semibold mt-1">
            When enabled, the default website navigation is replaced with your custom HTML code.
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
          <span>📐 Header Layout Style</span>
        </h3>
        <p class="text-xs text-slate-500 font-medium mb-6">
          Choose whether the header spans across the entire viewport width or stays inside a centered container.
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
                Centers the header inside a maximum container width (<code class="bg-slate-100 px-1 py-0.5 rounded text-[11px]">max-w-7xl mx-auto</code>), providing clean margins on large screens.
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
                Stretches from edge to edge across 100% of the screen width (<code class="bg-slate-100 px-1 py-0.5 rounded text-[11px]">w-full</code>) with full bleed background.
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
              <span>💻 Custom Header HTML Code</span>
            </h3>
            <p class="text-xs text-slate-500 font-medium">
              You can write any HTML and Tailwind CSS utility classes.
            </p>
          </div>

          <!-- QUICK PRESETS -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="loadRainbowPreset"
              class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition border border-purple-200"
            >
              🌈 Load Gradient Preset
            </button>
            <button
              type="button"
              @click="loadWhitePreset"
              class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              ⚪ Clean White Preset
            </button>
          </div>
        </div>

        <div class="relative">
          <textarea
            v-model="form.customHtml"
            rows="10"
            placeholder="<nav class='bg-purple-600 text-white p-4 rounded-2xl'>...</nav>"
            class="w-full p-4 rounded-2xl bg-slate-950 text-purple-200 font-mono text-xs leading-relaxed border border-purple-900/60 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
          ></textarea>
        </div>

        <div class="mt-4 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Tip: Use Tailwind classes like <code class="text-purple-600">bg-gradient-to-r</code>, <code class="text-purple-600">flex</code>, <code class="text-purple-600">shadow-xl</code>.</span>
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

        <div class="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 overflow-x-auto min-h-[120px] flex items-center justify-center">
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
          <span>💾 Save Header Settings</span>
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Header Management - KidsStoryFlix Admin",
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
  form.enabled = customizer.headerConfig.enabled
  form.layout = customizer.headerConfig.layout
  form.customHtml = customizer.headerConfig.customHtml || customizer.defaultHeaderHtml
})

const loadRainbowPreset = () => {
  form.customHtml = customizer.defaultHeaderHtml
}

const loadWhitePreset = () => {
  form.customHtml = `<header class="bg-white/95 backdrop-blur-md border-2 border-purple-100 text-slate-800 py-4 px-6 rounded-3xl shadow-lg flex items-center justify-between">
  <a href="/" class="flex items-center gap-2 font-black text-2xl text-purple-700">
    <span class="text-3xl">📚</span>
    <span>KidsStoryFlix</span>
  </a>
  <div class="hidden md:flex items-center gap-6 font-bold text-sm text-slate-600">
    <a href="/" class="hover:text-purple-600 transition">Home</a>
    <a href="/all-stories" class="hover:text-purple-600 transition">Stories</a>
    <a href="/subscribe" class="hover:text-purple-600 transition">Pricing</a>
  </div>
  <a href="/login" class="px-5 py-2.5 rounded-full bg-purple-600 text-white font-extrabold text-xs shadow-md hover:bg-purple-700 transition">
    Sign In
  </a>
</header>`
}

const resetDefaults = () => {
  if (confirm("Reset Header configuration back to defaults?")) {
    form.enabled = false
    form.layout = "boxed"
    form.customHtml = customizer.defaultHeaderHtml
    customizer.saveHeaderConfig(form)
    alert("Reset successful!")
  }
}

const saveChanges = () => {
  customizer.saveHeaderConfig({
    enabled: form.enabled,
    layout: form.layout,
    customHtml: form.customHtml
  })
  alert("🎉 Header settings saved successfully! Live website updated.")
}
</script>

