import { defineStore } from "pinia"
import { ref } from "vue"

export const useSiteCustomizerStore = defineStore("siteCustomizer", () => {
  // 🎨 Default Sample Templates
  const defaultHeaderHtml = `<nav class="bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 text-white py-3.5 px-6 rounded-3xl shadow-xl flex items-center justify-between">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-2xl bg-white text-purple-700 flex items-center justify-center text-xl font-bold shadow-md">
      🦄
    </div>
    <span class="text-2xl font-black tracking-tight">KidsStoryFlix</span>
  </div>
  <div class="hidden sm:flex items-center gap-5 text-sm font-extrabold">
    <a href="/" class="hover:text-yellow-300 transition">Home</a>
    <a href="/all-stories" class="hover:text-yellow-300 transition">All Stories</a>
    <a href="/subscribe" class="hover:text-yellow-300 transition">Subscribe</a>
  </div>
  <div class="flex items-center gap-2">
    <a href="/login" class="px-4 py-2 rounded-full bg-white text-purple-800 text-xs font-black shadow-md hover:bg-yellow-300 transition">
      Login 🌟
    </a>
  </div>
</nav>`

  const defaultFooterHtml = `<footer class="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-purple-800/40">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
    <div>
      <div class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
        KidsStoryFlix Magic 🌈
      </div>
      <p class="text-xs text-purple-200/80 mt-2">
        Sparking endless curiosity and imagination for every child worldwide.
      </p>
    </div>
    <div class="flex justify-center gap-4 text-xs font-bold text-purple-200">
      <a href="/" class="hover:text-white transition">Home</a>
      <a href="/all-stories" class="hover:text-white transition">Stories</a>
      <a href="/privacy" class="hover:text-white transition">Parents Hub</a>
      <a href="/admin" class="hover:text-pink-400 transition">Admin</a>
    </div>
    <div class="text-center md:text-right text-xs text-purple-300">
      © 2026 KidsStoryFlix. Protected by Wonder ✨
    </div>
  </div>
</footer>`

  const defaultLandingSectionHtml = `<div class="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-[2.5rem] p-8 sm:p-12 shadow-xl border-4 border-white text-slate-800 text-center relative overflow-hidden my-6">
  <span class="inline-block px-4 py-1.5 rounded-full bg-white/90 text-purple-800 text-xs font-black mb-3 shadow-xs">
    🎉 Special Kids Announcement
  </span>
  <h2 class="text-3xl sm:text-5xl font-black text-purple-900 tracking-tight">
    New Magical Stories Drop Every Friday! 📚✨
  </h2>
  <p class="text-sm sm:text-base font-bold text-purple-800/90 max-w-xl mx-auto mt-3">
    Join over 1,000+ happy young readers and explore fresh audio tales with interactive quizzes!
  </p>
  <div class="mt-6 flex justify-center gap-3">
    <a href="/all-stories" class="px-6 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-sm shadow-lg hover:scale-105 transition">
      Explore All Stories 🚀
    </a>
  </div>
</div>`

  // State
  const headerConfig = ref({
    enabled: false,
    layout: "boxed", // 'boxed' or 'full'
    customHtml: defaultHeaderHtml
  })

  const footerConfig = ref({
    enabled: false,
    layout: "boxed", // 'boxed' or 'full'
    customHtml: defaultFooterHtml
  })

  const landingSections = ref([
    {
      id: "sec-banner-1",
      title: "Magical Announcement Banner",
      layout: "boxed", // 'boxed' or 'full'
      position: "top", // 'top' or 'bottom'
      enabled: false,
      customHtml: defaultLandingSectionHtml
    }
  ])

  // Load from localStorage
  const loadFromStorage = () => {
    if (!import.meta.client) return

    try {
      const storedHeader = localStorage.getItem("ksf_header_config")
      if (storedHeader) {
        headerConfig.value = JSON.parse(storedHeader)
      }

      const storedFooter = localStorage.getItem("ksf_footer_config")
      if (storedFooter) {
        footerConfig.value = JSON.parse(storedFooter)
      }

      const storedSections = localStorage.getItem("ksf_landing_sections")
      if (storedSections) {
        landingSections.value = JSON.parse(storedSections)
      }
    } catch (e) {
      console.error("Error loading site customizer settings from localStorage:", e)
    }
  }

  // Save Header Config
  const saveHeaderConfig = (newConfig) => {
    headerConfig.value = { ...newConfig }
    if (import.meta.client) {
      localStorage.setItem("ksf_header_config", JSON.stringify(headerConfig.value))
    }
  }

  // Save Footer Config
  const saveFooterConfig = (newConfig) => {
    footerConfig.value = { ...newConfig }
    if (import.meta.client) {
      localStorage.setItem("ksf_footer_config", JSON.stringify(footerConfig.value))
    }
  }

  // Landing Page Sections Management
  const saveLandingSections = () => {
    if (import.meta.client) {
      localStorage.setItem("ksf_landing_sections", JSON.stringify(landingSections.value))
    }
  }

  const addLandingSection = (section) => {
    landingSections.value.push({
      id: `sec-${Date.now()}`,
      title: section.title || "Custom Section",
      layout: section.layout || "boxed",
      position: section.position || "bottom",
      enabled: true,
      customHtml: section.customHtml || defaultLandingSectionHtml
    })
    saveLandingSections()
  }

  const updateLandingSection = (id, updatedData) => {
    const index = landingSections.value.findIndex((s) => s.id === id)
    if (index !== -1) {
      landingSections.value[index] = { ...landingSections.value[index], ...updatedData }
      saveLandingSections()
    }
  }

  const deleteLandingSection = (id) => {
    landingSections.value = landingSections.value.filter((s) => s.id !== id)
    saveLandingSections()
  }

  const toggleLandingSection = (id) => {
    const section = landingSections.value.find((s) => s.id === id)
    if (section) {
      section.enabled = !section.enabled
      saveLandingSections()
    }
  }

  return {
    defaultHeaderHtml,
    defaultFooterHtml,
    defaultLandingSectionHtml,
    headerConfig,
    footerConfig,
    landingSections,
    loadFromStorage,
    saveHeaderConfig,
    saveFooterConfig,
    addLandingSection,
    updateLandingSection,
    deleteLandingSection,
    toggleLandingSection
  }
})

