<template>
  <section class="py-6 sm:py-9 select-none">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HEADER (PLAYFUL, CUTE, USER-FRIENDLY, NO OVERFLOW) -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <!-- CUTE BADGE -->
          <div
            v-if="badge"
            class="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-extrabold font-kids tracking-wider uppercase shadow-sm border border-white/80 mb-2 transition-transform hover:scale-105"
            :class="badgeColorClass"
          >
            <span class="animate-pulse">✨</span>
            <span>{{ badge }}</span>
          </div>

          <!-- SECTION TITLE -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-baloo text-purple-950 tracking-tight flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(147,51,234,0.12)]">
            <span class="hover:scale-105 transition-transform duration-200 inline-block">{{ title }}</span>
          </h2>

          <!-- SUBTITLE -->
          <p
            v-if="subtitle"
            class="text-xs sm:text-sm md:text-base font-medium font-kids text-purple-700/80 mt-1 max-w-xl leading-relaxed"
          >
            {{ subtitle }}
          </p>
        </div>

        <!-- TOP ACTIONS (SEE ALL BUTTON + MINI CAROUSEL ARROWS) -->
        <div class="flex items-center gap-2.5 self-start sm:self-end">
          <!-- SEE ALL CUTE PILL BUTTON -->
          <NuxtLink
            :to="viewAllLink"
            class="group inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs sm:text-sm font-bold font-kids text-purple-700 border-2 border-purple-100 shadow-[0_4px_12px_rgba(147,51,234,0.08)] hover:shadow-[0_6px_16px_rgba(236,72,153,0.2)] hover:border-pink-200 hover:text-pink-600 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
          >
            <span>See All</span>
            <span class="text-pink-500 font-bold transition-transform duration-200 group-hover:translate-x-1">→</span>
          </NuxtLink>

          <!-- MINI HEADER ARROWS (EASY FOR KIDS/PARENTS TO NAVIGATE) -->
          <div class="hidden sm:flex items-center gap-1.5 pl-1">
            <button
              @click="scrollLeft"
              :disabled="!canScrollLeft"
              aria-label="Scroll rail left"
              class="h-9 w-9 rounded-full flex items-center justify-center bg-white border-2 border-purple-100 text-purple-700 font-bold shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
            >
              ❮
            </button>
            <button
              @click="scrollRight"
              :disabled="!canScrollRight"
              aria-label="Scroll rail right"
              class="h-9 w-9 rounded-full flex items-center justify-center bg-white border-2 border-pink-100 text-pink-600 font-bold shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:hover:scale-100"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      <!-- STORIES CAROUSEL WRAPPER -->
      <div class="relative group/rail">
        <!-- LEFT EDGE GRADIENT (SMOOTH SCROLL CUE) -->
        <div
          v-show="canScrollLeft"
          class="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#fff0f6]/90 to-transparent z-10 transition-opacity duration-300 rounded-l-3xl"
        ></div>

        <!-- LEFT FLOATING ARROW -->
        <button
          v-show="canScrollLeft"
          @click="scrollLeft"
          aria-label="Scroll left"
          class="hidden sm:flex absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20
                 h-11 w-11 items-center justify-center rounded-full
                 bg-white text-purple-700 shadow-xl border-2 border-purple-100
                 hover:scale-115 hover:bg-purple-50 active:scale-95 transition-all duration-200"
        >
          <span class="text-base font-black font-kids">❮</span>
        </button>

        <!-- HORIZONTAL SCROLLER (NO OVERFLOW / NO UGLY SCROLLBAR) -->
        <div
          ref="sliderRef"
          @scroll="checkScroll"
          class="flex items-stretch gap-3.5 sm:gap-5 md:gap-6 overflow-x-auto py-4 px-1.5 scroll-smooth scrollbar-none no-scrollbar snap-x snap-mandatory"
        >
          <StoryCard
            v-for="story in stories"
            :key="story.id"
            :story="story"
          />
        </div>

        <!-- RIGHT FLOATING ARROW -->
        <button
          v-show="canScrollRight"
          @click="scrollRight"
          aria-label="Scroll right"
          class="hidden sm:flex absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20
                 h-11 w-11 items-center justify-center rounded-full
                 bg-white text-pink-600 shadow-xl border-2 border-pink-100
                 hover:scale-115 hover:bg-pink-50 active:scale-95 transition-all duration-200"
        >
          <span class="text-base font-black font-kids">❯</span>
        </button>

        <!-- RIGHT EDGE GRADIENT (SMOOTH SCROLL CUE) -->
        <div
          v-show="canScrollRight"
          class="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#fff0f6]/90 to-transparent z-10 transition-opacity duration-300 rounded-r-3xl"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue"
import StoryCard from "./StoryCard.vue"

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  badge: {
    type: String,
    default: "",
  },
  badgeColor: {
    type: String,
    default: "bg-purple-100 text-purple-700",
  },
  stories: {
    type: Array,
    default: () => [],
  },
  viewAllLink: {
    type: String,
    default: "/all-stories",
  },
})

const sliderRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const badgeColorClass = computed(() => {
  return props.badgeColor || "bg-purple-100 text-purple-700"
})

const checkScroll = () => {
  if (!sliderRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value
  canScrollLeft.value = scrollLeft > 10
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10
}

onMounted(() => {
  nextTick(() => {
    checkScroll()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScroll)
    }
  })
})

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", checkScroll)
  }
})

const getScrollStep = () => {
  if (typeof window === "undefined") return 300
  if (window.innerWidth < 640) return 230
  if (window.innerWidth < 1024) return 480
  return 720
}

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -getScrollStep(), behavior: "smooth" })
    setTimeout(checkScroll, 350)
  }
}

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: getScrollStep(), behavior: "smooth" })
    setTimeout(checkScroll, 350)
  }
}
</script>
