<template>
  <section class="relative py-8 sm:py-12 overflow-hidden select-none">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HEADER -->
      <div class="text-center mb-6 sm:mb-8">
        <div class="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-bold font-kids text-purple-700 shadow-sm backdrop-blur-md mb-3 border border-purple-100 hover:scale-105 transition-transform duration-200">
          <span class="text-yellow-400">✨</span>
          <span class="tracking-wide">Explore By World</span>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black font-baloo text-purple-900 tracking-tight drop-shadow-[0_2px_4px_rgba(109,40,217,0.1)]">
          Choose Your Adventure! <span class="inline-block animate-bounceSoft">🎨</span>
        </h2>
        <p class="mt-2 text-sm sm:text-base font-semibold font-kids text-purple-600/90 max-w-xl mx-auto leading-relaxed">
          Tap a magical bubble to discover bedtime tales, silly giggles, space quests, and animal friends!
        </p>
      </div>

      <!-- BUBBLE CATEGORY ROW (CENTERED) -->
      <div class="relative max-w-6xl mx-auto px-2 sm:px-8">
        <!-- LEFT ARROW -->
        <button
          v-show="canScrollLeft"
          @click="scrollLeft"
          aria-label="Scroll categories left"
          class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
                 h-11 w-11 items-center justify-center rounded-full
                 bg-white text-purple-700 shadow-lg border border-purple-100
                 hover:scale-110 hover:bg-purple-50 transition-all duration-200 active:scale-95"
        >
          <span class="text-lg font-black font-kids">❮</span>
        </button>

        <!-- HORIZONTAL SCROLL / CENTERED ROW -->
        <div
          ref="sliderRef"
          @scroll="checkScroll"
          class="flex items-center gap-3.5 sm:gap-5 md:gap-6 overflow-x-auto py-4 px-2 scroll-smooth scrollbar-none snap-x justify-start md:justify-center [justify-content:safe_center]"
        >
          <div
            v-for="cat in categories"
            :key="cat.id"
            @click="handleCategoryClick(cat.id)"
            class="group cursor-pointer shrink-0 snap-center flex flex-col items-center focus:outline-none"
          >
            <!-- BUBBLE -->
            <div
              class="relative flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 items-center justify-center
                     rounded-full p-1.5 transition-all duration-300 transform
                     group-hover:scale-110 group-hover:-translate-y-1.5 group-active:scale-95"
              :class="[
                activeCategory === cat.id
                  ? 'ring-4 ring-purple-400 shadow-[0_12px_28px_rgba(168,85,247,0.45)] scale-105 -translate-y-1'
                  : 'shadow-[0_8px_20px_rgba(0,0,0,0.08)] group-hover:shadow-[0_14px_28px_rgba(236,72,153,0.3)]'
              ]"
            >
              <!-- BG GRADIENT -->
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-br transition-opacity"
                :class="cat.gradient"
              ></div>

              <!-- INNER CIRCLE -->
              <div class="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-white/95 backdrop-blur-sm border-2 border-white shadow-inner p-2 sm:p-2.5">
                <!-- CUTE CATEGORY IMAGE -->
                <img
                  v-if="!imageErrors[cat.id]"
                  :src="cat.image"
                  :alt="cat.label"
                  class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 drop-shadow-sm select-none pointer-events-none"
                  loading="eager"
                  @error="handleImageError(cat.id)"
                />
                <!-- FALLBACK EMOJI IF IMAGE FAILS TO LOAD -->
                <span
                  v-else
                  class="text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
                >
                  {{ cat.emoji }}
                </span>
              </div>

              <!-- POPPING DECORATION STAR -->
              <span
                class="absolute -top-1 -right-1 text-sm sm:text-base animate-bounce opacity-85 transition-transform group-hover:scale-125"
                :class="activeCategory === cat.id ? 'opacity-100 scale-110' : 'opacity-70'"
              >
                ✨
              </span>
            </div>

            <!-- CUTE KIDS-FRIENDLY LABEL -->
            <span
              class="mt-2.5 text-xs sm:text-sm font-bold font-kids tracking-wide transition-all duration-300 text-center px-2.5 py-0.5 rounded-full"
              :class="[
                activeCategory === cat.id
                  ? 'text-purple-900 font-extrabold bg-purple-100/90 shadow-sm scale-105 ring-1 ring-purple-200'
                  : 'text-gray-700 group-hover:text-purple-600 group-hover:scale-105'
              ]"
            >
              {{ cat.label }}
            </span>
          </div>
        </div>

        <!-- RIGHT ARROW -->
        <button
          v-show="canScrollRight"
          @click="scrollRight"
          aria-label="Scroll categories right"
          class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
                 h-11 w-11 items-center justify-center rounded-full
                 bg-white text-pink-600 shadow-lg border border-pink-100
                 hover:scale-110 hover:bg-pink-50 transition-all duration-200 active:scale-95"
        >
          <span class="text-lg font-black font-kids">❯</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

const props = defineProps({
  activeCategory: {
    type: String,
    default: "all",
  },
  soundEnabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(["select"])

const sliderRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const imageErrors = ref({})

const categories = [
  {
    id: "all",
    label: "All Magic",
    emoji: "🌈",
    image: "/images/categories/all-magic.svg",
    gradient: "from-pink-400 via-purple-400 to-sky-400",
  },
  {
    id: "bedtime",
    label: "Bedtime Tales",
    emoji: "🌙",
    image: "/images/categories/bedtime.svg",
    gradient: "from-indigo-400 via-purple-500 to-pink-400",
  },
  {
    id: "animals",
    label: "Animal Pals",
    emoji: "🦁",
    image: "/images/categories/animals.svg",
    gradient: "from-amber-400 via-orange-400 to-yellow-300",
  },
  {
    id: "fairy",
    label: "Fairy Tales",
    emoji: "🦄",
    image: "/images/categories/fairy.svg",
    gradient: "from-pink-400 via-rose-400 to-purple-300",
  },
  {
    id: "adventure",
    label: "Space & Quest",
    emoji: "🚀",
    image: "/images/categories/adventure.svg",
    gradient: "from-sky-400 via-blue-500 to-cyan-300",
  },
  {
    id: "funny",
    label: "Funny & Silly",
    emoji: "🎈",
    image: "/images/categories/funny.svg",
    gradient: "from-emerald-400 via-teal-400 to-lime-300",
  },
  {
    id: "moral",
    label: "Kindness & Care",
    emoji: "💖",
    image: "/images/categories/moral.svg",
    gradient: "from-rose-400 via-pink-400 to-amber-300",
  },
]

const handleImageError = (catId) => {
  imageErrors.value[catId] = true
}

const checkScroll = () => {
  if (!sliderRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value
  canScrollLeft.value = scrollLeft > 5
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 5
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

const playPopSound = () => {
  if (!props.soundEnabled || !import.meta.client) return
  try {
    const audio = new Audio("/assets/sounds/pop.wav")
    audio.volume = 0.35
    audio.play().catch(() => {})
  } catch (err) {
    // Audio playback policy or missing audio file
  }
}

const handleCategoryClick = (catId) => {
  playPopSound()
  emit("select", catId)
}

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -260, behavior: "smooth" })
    setTimeout(checkScroll, 350)
  }
}

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: 260, behavior: "smooth" })
    setTimeout(checkScroll, 350)
  }
}
</script>
