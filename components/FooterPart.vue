<template>
  <!-- CUSTOM FOOTER (IF ENABLED IN ADMIN) -->
  <div
    v-if="customizer.footerConfig.enabled && customizer.footerConfig.customHtml"
    class="w-full relative z-10 py-8 px-4"
  >
    <div
      :class="customizer.footerConfig.layout === 'boxed' ? 'max-w-7xl mx-auto' : 'w-full'"
      v-html="customizer.footerConfig.customHtml"
    ></div>
  </div>

  <!-- DEFAULT FOOTER -->
  <footer
    v-else
    class="select-none text-white w-full relative bg-transparent overflow-visible pt-16 sm:pt-24 pb-12 sm:pb-16"
  >
    <div class="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        <!-- BRAND COLUMN (4 COLS) -->
        <div class="md:col-span-4 text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-2.5">
            <div class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-sm sm:text-base text-white shadow-lg">
              📚
            </div>
            <span class="text-2xl sm:text-3xl font-black font-baloo tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              KidsStoryFlix
            </span>
          </div>

          <p class="mt-2 text-xs sm:text-sm font-kids text-white/95 leading-relaxed max-w-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            Explore Magical Worlds! Free illustrated bedtime tales and adventures for curious minds.
          </p>

          <div class="mt-3.5">
            <NuxtLink
              to="/all-stories"
              class="inline-flex items-center gap-1.5 rounded-full bg-white text-emerald-950 px-5 py-2 text-xs sm:text-sm font-extrabold font-kids shadow-lg hover:scale-105 active:scale-95 hover:bg-yellow-100 transition-all"
            >
              <span>Read Now</span>
              <span>📖</span>
            </NuxtLink>
          </div>
        </div>

        <!-- QUICK LINKS (3 COLS) -->
        <div class="md:col-span-3 text-center md:text-left">
          <h4 class="text-sm sm:text-base font-black font-baloo text-amber-300 mb-2.5 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            Quick Links
          </h4>
          <ul class="space-y-1.5 text-xs sm:text-sm font-kids font-bold text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            <li>
              <NuxtLink to="/" class="hover:text-amber-200 transition">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/all-stories" class="hover:text-amber-200 transition">Help</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="hover:text-amber-200 transition">Story Submission</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="hover:text-amber-200 transition">Parents Hub</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- NEWSLETTER & SOCIAL (5 COLS) -->
        <div class="md:col-span-5 text-center md:text-left">
          <h4 class="text-sm sm:text-base font-black font-baloo text-amber-300 mb-2.5 tracking-wide flex items-center justify-center md:justify-start gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            <span>Get Weekly Magic!</span>
            <span>📬</span>
          </h4>

          <!-- Newsletter Input with Mailbox Icon -->
          <div class="relative max-w-md mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Subscribe to our newsletter..."
              class="w-full rounded-full bg-white text-gray-800 placeholder-gray-400 px-4 py-2.5 text-xs sm:text-sm font-semibold font-kids shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all pr-20"
            />
            <button
              class="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold font-kids text-xs px-4 py-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Join!
            </button>
          </div>

          <!-- Social Links Icons -->
          <div class="mt-3">
            <p class="text-xs font-kids font-bold text-emerald-200 mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Social Links</p>
            <div class="flex items-center justify-center md:justify-start gap-3.5 text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span class="cursor-pointer hover:scale-125 transition-transform" title="Magic Star">⭐</span>
              <span class="cursor-pointer hover:scale-125 transition-transform" title="Flower">🌸</span>
              <span class="cursor-pointer hover:scale-125 transition-transform" title="Cloud">☁️</span>
              <span class="cursor-pointer hover:scale-125 transition-transform" title="Love">💖</span>
            </div>
          </div>
        </div>

      </div>

      <!-- BOTTOM COPYRIGHT -->
      <div class="mt-12 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-kids text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        <p>© 2026 KidsStoryFlix. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/privacy" class="hover:text-white transition">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white transition">Terms of Service</NuxtLink>
          <NuxtLink to="/refund" class="hover:text-white transition">Refund Policy</NuxtLink>
          <NuxtLink to="/admin" class="hover:text-amber-300 font-bold opacity-80 hover:opacity-100 transition">👑 Admin</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from "vue"
import { useSiteCustomizerStore } from "~/pinaGlobal/siteCustomizer"

const customizer = useSiteCustomizerStore()

onMounted(() => {
  customizer.loadFromStorage()
})
</script>
