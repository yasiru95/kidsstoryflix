<template>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 select-none"
    @mouseenter="$emit('pause')"
    @mouseleave="$emit('resume')"
  >
    <!-- HERO BANNER CONTAINER (KIDSLATA STYLE) -->
    <div
      class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#141d47] via-[#1c2759] to-[#263573] text-white shadow-2xl border-2 border-white/20 min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex items-center"
    >
      <!-- ANIMATED TWINKLE STARS & SHOOTING STARS -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Shooting Star 1 -->
        <div class="absolute top-8 right-24 w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-200 to-white rotate-[-25deg] opacity-70 animate-pulse"></div>
        <div class="absolute top-20 right-48 w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-200 to-white rotate-[-25deg] opacity-60"></div>

        <!-- Twinkle Stars -->
        <span class="absolute top-6 left-12 text-yellow-300 text-xl animate-bounceSoft">⭐</span>
        <span class="absolute top-14 left-1/3 text-yellow-200 text-sm animate-pulse">✨</span>
        <span class="absolute top-8 right-1/4 text-yellow-300 text-lg animate-pulse">⭐</span>
        <span class="absolute top-16 right-12 text-yellow-200 text-base animate-bounceSoft">✨</span>
        <span class="absolute bottom-24 left-16 text-yellow-300 text-sm animate-pulse">🌟</span>
      </div>

      <!-- MAIN CONTENT: 3-COLUMN DESKTOP LAYOUT -->
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-8 sm:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <!-- LEFT COLUMN: TITLE & ACTION BUTTON -->
          <div class="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
            <!-- SLIDE BADGE -->
            <div
              v-if="currentSlide.badge"
              class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold font-kids text-yellow-300 border border-yellow-300/30 backdrop-blur-md mb-3"
            >
              <span>{{ currentSlide.badge }}</span>
            </div>

            <!-- MAIN TITLE -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black font-baloo text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {{ currentSlide.title || "Explore Magical Worlds!" }}
            </h1>

            <!-- DESCRIPTION -->
            <p class="mt-2.5 sm:mt-3 text-white/90 text-sm sm:text-base font-kids font-medium max-w-sm leading-relaxed drop-shadow-sm">
              {{ currentSlide.description || "Discover bedtime tales, silly giggles, space quests, and animal friends!" }}
            </p>

            <!-- BROWSE ALL STORIES PILL BUTTON -->
            <div class="mt-5 sm:mt-6">
              <NuxtLink
                to="/all-stories"
                class="inline-flex items-center gap-2 rounded-full bg-white text-purple-900 font-bold font-kids text-sm sm:text-base px-6 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 hover:bg-yellow-100 transition-all duration-200"
              >
                <span>{{ currentSlide.ctaText || "Browse All Stories 📚" }}</span>
              </NuxtLink>
            </div>
          </div>

          <!-- CENTER COLUMN: GLOWING MAGIC STORYBOOK ILLUSTRATION -->
          <div class="lg:col-span-5 flex justify-center items-center py-2 lg:py-0">
            <div class="relative group/center cursor-pointer">
              <!-- Soft Glow Aura -->
              <div class="absolute -inset-4 bg-gradient-to-t from-yellow-300/30 via-yellow-400/20 to-transparent blur-2xl rounded-full pointer-events-none"></div>

              <!-- Boy, Fox & Glowing Open Book SVG -->
              <img
                src="/images/hero-reading-magic.svg"
                alt="Children reading magical storybook with fox"
                class="relative z-10 w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>
          </div>

          <!-- RIGHT COLUMN: BLOG TAG + SEARCH BAR + AUDIO STORIES -->
          <div class="lg:col-span-3 flex flex-col items-center lg:items-end gap-3 text-center lg:text-right">
            <!-- TAG BADGE -->
            <div class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold font-kids text-yellow-300 border border-white/20 backdrop-blur-md">
              <span>⭐</span>
              <span>Explore Love Blog</span>
            </div>

            <!-- SEARCH MAGICAL STORIES INPUT PILL -->
            <div class="relative w-full max-w-xs sm:max-w-sm mt-1">
              <input
                v-model="searchInput"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search magical stories..."
                class="w-full rounded-full bg-white text-gray-800 placeholder-gray-400 pl-4 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold font-kids shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all"
              />
              <button
                @click="handleSearch"
                aria-label="Search stories"
                class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center text-xs font-bold transition-transform hover:scale-105"
              >
                🔍
              </button>
            </div>

            <!-- AUDIO STORIES LINK -->
            <NuxtLink
              to="/all-stories"
              class="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-kids text-sky-200 hover:text-white transition-colors group"
            >
              <span class="text-base group-hover:scale-125 transition-transform duration-200">🎧</span>
              <span>Try Audio Stories 📚</span>
            </NuxtLink>
          </div>

        </div>
      </div>

      <!-- FLUFFY WHITE CLOUDS BORDER (AT BOTTOM EDGE) -->
      <div class="absolute -bottom-1 inset-x-0 pointer-events-none z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 60" preserveAspectRatio="none" class="w-full h-8 sm:h-12 text-white fill-current opacity-95">
          <path d="M0,0 C150,45 350,-15 500,25 C650,55 850,-10 1000,25 C1120,45 1180,15 1200,30 L1200,60 L0,60 Z"></path>
        </svg>
      </div>

      <!-- PREV SLIDE BUTTON -->
      <button
        @click="$emit('prev')"
        aria-label="Previous slide"
        class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
               flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center
               rounded-full bg-white/20 hover:bg-white text-white hover:text-purple-900 backdrop-blur-md
               border border-white/30 shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <span class="text-base sm:text-xl font-bold font-kids">❮</span>
      </button>

      <!-- NEXT SLIDE BUTTON -->
      <button
        @click="$emit('next')"
        aria-label="Next slide"
        class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
               flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center
               rounded-full bg-white/20 hover:bg-white text-white hover:text-purple-900 backdrop-blur-md
               border border-white/30 shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        <span class="text-base sm:text-xl font-bold font-kids">❯</span>
      </button>

      <!-- SLIDE INDICATOR DOTS -->
      <div
        v-if="slides && slides.length > 1"
        class="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20
               flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/20 px-2.5 py-1 backdrop-blur-sm"
      >
        <button
          v-for="(slide, index) in slides"
          :key="slide.id || index"
          @click="$emit('change', index)"
          :aria-label="`Go to slide ${index + 1}`"
          class="h-2 rounded-full transition-all duration-300"
          :class="activeIndex === index ? 'w-6 bg-yellow-400' : 'w-2 bg-white/50 hover:bg-white'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(["prev", "next", "change", "pause", "resume", "search"])

const searchInput = ref("")

const currentSlide = computed(() => {
  if (props.slides && props.slides.length > 0) {
    return props.slides[props.activeIndex] || props.slides[0]
  }
  return {
    badge: "🌟 Featured Adventure",
    title: "Explore Magical Worlds!",
    description: "Discover bedtime tales, silly giggles, space quests, and animal friends!",
    ctaText: "Browse All Stories 📚",
  }
})

const handleSearch = () => {
  if (searchInput.value.trim()) {
    emit("search", searchInput.value.trim())
  }
}
</script>
