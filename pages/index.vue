<template>
  <div
    class="min-h-screen relative font-['Fredoka'] overflow-x-hidden text-gray-800"
    style="background-color: #0d2922; background-image: url('/images/page-background.jpg'); background-repeat: no-repeat; background-position: top center; background-size: cover;"
  >
    <!-- FLOATING BACKGROUND PARTICLES (Bedtime Stars or Daytime Bubbles) -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <template v-if="isBedtimeMode">
        <div
          v-for="i in 18"
          :key="`star-${i}`"
          class="absolute text-yellow-200/70 animate-pulse"
          :style="{
            top: `${(i * 17) % 95}%`,
            left: `${(i * 23) % 96}%`,
            fontSize: `${10 + (i % 4) * 6}px`,
            animationDuration: `${2 + (i % 3)}s`
          }"
        >
          ✦
        </div>
      </template>
      <template v-else>
        <div
          v-for="i in 8"
          :key="`cloud-${i}`"
          class="absolute rounded-full bg-white/40 blur-sm animate-float pointer-events-none"
          :style="{
            top: `${(i * 19) % 80}%`,
            left: `${(i * 27) % 90}%`,
            width: `${100 + (i % 3) * 60}px`,
            height: `${50 + (i % 2) * 30}px`,
            animationDelay: `${i * 0.7}s`
          }"
        ></div>
      </template>
    </div>

    <!-- MAIN STORYBOOK WHITE CANVAS CARD (KIDSLATA STYLE - EXACTLY MATCHING MOCKUP) -->
    <div
      class="relative z-10 max-w-[1180px] mx-auto bg-white/95 backdrop-blur-md rounded-[2.5rem] p-3 sm:p-5 md:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.22)] border-4 border-white/80 my-4 sm:my-6"
    >
      <!-- NAVBAR -->
      <NavBar />

      <!-- DYNAMIC TOP CUSTOM SECTIONS (FROM ADMIN) -->
      <template v-for="section in topCustomSections" :key="section.id">
        <div
          v-if="section.enabled && section.customHtml"
          :class="section.layout === 'boxed' ? 'max-w-[1180px] mx-auto px-2 sm:px-4 my-3' : 'w-full my-3'"
        >
          <div v-html="section.customHtml"></div>
        </div>
      </template>

      <main class="relative z-10">
        <!-- HERO SLIDER SECTION (KIDSLATA MAGIC NIGHT SKY STYLE) -->
        <section class="w-full mt-2 sm:mt-3">
          <HeroSlider
            :slides="heroSlides"
            :activeIndex="heroIndex"
            @prev="prevHero"
            @next="nextHero"
            @change="heroIndex = $event"
            @pause="pauseHeroSlide"
            @resume="startHeroSlide"
            @search="searchQuery = $event"
          />
        </section>

        <!-- EXPLORE BY CATEGORIES (6 CIRCULAR BUBBLES - KIDSLATA STYLE) -->
        <Catergory
          :activeCategory="selectedCategory"
          :soundEnabled="isSoundOn"
          @select="handleSelectCategory"
        />

        <!-- INTERACTIVE CONTROL BAR (Surprise Me + Bedtime + Sound) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative z-20">
          <div
            class="rounded-full px-4 py-2.5 shadow-md border-2 backdrop-blur-xl transition-all duration-300 flex items-center justify-between gap-3 flex-wrap"
            :class="isBedtimeMode
              ? 'bg-indigo-900/80 border-indigo-700/60 shadow-[0_10px_25px_rgba(0,0,0,0.5)]'
              : 'bg-white/90 border-purple-100 shadow-[0_8px_20px_rgba(168,85,247,0.1)]'"
          >
            <!-- QUICK AGE FILTERS -->
            <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
              <button
                v-for="age in ageFilters"
                :key="age.id"
                @click="setAgeFilter(age.id)"
                class="rounded-full px-3 py-1 text-xs sm:text-sm font-bold font-kids transition-all shrink-0 select-none"
                :class="selectedAge === age.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm scale-105'
                  : isBedtimeMode
                    ? 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-950'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'"
              >
                <span>{{ age.label }}</span>
              </button>
            </div>

            <!-- ACTIONS: SURPRISE ME + BEDTIME + SOUND -->
            <div class="flex items-center gap-2">
              <!-- SURPRISE ME BUTTON -->
              <button
                @click="handleSurpriseMe"
                class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 px-3.5 py-1.5 text-xs sm:text-sm font-bold font-kids text-white shadow-sm hover:scale-105 active:scale-95 transition-all select-none"
              >
                <span>Surprise Me!</span>
                <span class="text-sm">🎲</span>
              </button>

              <!-- BEDTIME MODE TOGGLE -->
              <button
                @click="toggleBedtimeMode"
                :title="isBedtimeMode ? 'Switch to Daylight Mode' : 'Switch to Cozy Bedtime Mode'"
                class="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full shadow-sm transition-all hover:scale-110 active:scale-95 select-none"
                :class="isBedtimeMode ? 'bg-amber-400 text-indigo-950' : 'bg-indigo-950 text-yellow-300'"
              >
                <span class="text-sm">{{ isBedtimeMode ? '☀️' : '🌙' }}</span>
              </button>

              <!-- SOUND TOGGLE -->
              <button
                @click="toggleSound"
                :title="isSoundOn ? 'Mute Sounds' : 'Turn Sounds On'"
                class="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full shadow-sm transition-all hover:scale-110 active:scale-95 select-none"
                :class="isSoundOn
                  ? (isBedtimeMode ? 'bg-purple-600 text-white' : 'bg-pink-500 text-white')
                  : (isBedtimeMode ? 'bg-indigo-950 text-indigo-400' : 'bg-gray-100 text-gray-500')"
              >
                <span class="text-sm">{{ isSoundOn ? '🔊' : '🔇' }}</span>
              </button>
            </div>
          </div>
        </section>

        <!-- LOADING STATE (Cute Skeleton) -->
        <StorySkeleton v-if="pending" />

        <!-- FILTERED SEARCH RESULTS VIEW -->
        <section
          v-else-if="searchQuery || selectedCategory !== 'all' || selectedAge !== 'all'"
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div>
              <div class="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-extrabold font-kids text-purple-700 mb-2 border border-purple-200">
                <span>🎯 Custom Exploration</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold font-baloo text-purple-950 tracking-tight" :class="{ 'text-white': isBedtimeMode }">
                Found {{ filteredStories.length }} Story Adventure{{ filteredStories.length === 1 ? '' : 's' }}
              </h2>
            </div>

            <!-- RESET FILTER BUTTON -->
            <button
              @click="resetFilters"
              class="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-bold font-kids text-pink-600 shadow-sm border border-pink-200 hover:bg-pink-50 hover:scale-105 active:scale-95 transition"
            >
              <span>Reset All Filters</span>
              <span>✕</span>
            </button>
          </div>

          <!-- NO RESULTS FOUND -->
          <div
            v-if="filteredStories.length === 0"
            class="rounded-3xl bg-white/70 backdrop-blur-md p-10 text-center shadow-lg border border-purple-100 max-w-lg mx-auto"
          >
            <div class="text-5xl mb-3">
              🔍 🦄
            </div>
            <h3 class="text-xl font-black text-purple-800">
              No magical tales found!
            </h3>
            <p class="text-sm font-medium text-gray-600 mt-1 mb-5">
              Try searching for something else like "lion", "stars", or "bedtime".
            </p>
            <button
              @click="resetFilters"
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:scale-105 transition"
            >
              <span>Show All Stories</span>
              <span>🌈</span>
            </button>
          </div>

          <!-- RESULTS GRID -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            <StoryCard
              v-for="story in filteredStories"
              :key="story.id"
              :story="story"
            />
          </div>
        </section>

        <!-- DEFAULT STORYFLIX CURATED VIEW (KIDSLATA SHOWCASE) -->
        <template v-else>
          <!-- SHOWCASE: FEATURED STORY + POPULAR STORIES (KIDSLATA STYLE) -->
          <section class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 select-none">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              <!-- LEFT: FEATURED STORY (ALL STORIES) -->
              <div class="lg:col-span-4 bg-[#f0edfd]/90 backdrop-blur-md rounded-[2.5rem] p-5 sm:p-6 border-2 border-purple-100/90 shadow-[0_12px_28px_rgba(147,51,234,0.08)] flex flex-col justify-between">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl sm:text-2xl font-black font-baloo text-purple-950 flex items-center gap-1.5">
                    <span>All Stories</span>
                    <span class="text-lg">📚</span>
                  </h3>
                  <span class="rounded-full bg-emerald-100 text-emerald-900 px-3 py-0.5 text-xs font-bold font-kids border border-emerald-200">
                    Age 3-5
                  </span>
                </div>

                <!-- FEATURED 3D BOOK -->
                <StoryCard
                  :story="spotlightStory || storiesList[0]"
                  featured
                  darkButton
                />
              </div>

              <!-- RIGHT: POPULAR STORIES (ALL MAGICAL BOOKS) -->
              <div class="lg:col-span-8 bg-[#f0edfd]/90 backdrop-blur-md rounded-[2.5rem] p-5 sm:p-6 border-2 border-purple-100/90 shadow-[0_12px_28px_rgba(147,51,234,0.08)]">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xl sm:text-2xl font-black font-baloo text-purple-950 flex items-center gap-1.5">
                    <span>Popular Stories</span>
                    <span class="text-xs font-bold font-kids text-purple-600 bg-purple-100 px-2.5 py-0.5 rounded-full ml-1">All Magical Books! 🧚</span>
                  </h3>
                  <NuxtLink
                    to="/all-stories"
                    class="text-xs sm:text-sm font-bold font-kids text-purple-700 hover:text-pink-600 transition-colors flex items-center gap-1"
                  >
                    <span>See All</span>
                    <span>→</span>
                  </NuxtLink>
                </div>

                <!-- 4 POPULAR 3D BOOKS -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                  <StoryCard
                    v-for="story in trendingStories.slice(0, 4)"
                    :key="story.id"
                    :story="story"
                    inGrid
                    darkButton
                  />
                </div>
              </div>
            </div>
          </section>
        </template>
      </main>
    </div>

    <!-- FUN PLAY & AUDIOBOOKS (FLOATING ON ROLLING GREEN HILLS) -->
    <div class="relative z-10 max-w-[1180px] mx-auto px-3 sm:px-4 my-6 sm:my-8">
      <FunPlaySection />
    </div>

    <!-- DYNAMIC BOTTOM CUSTOM SECTIONS (FROM ADMIN) -->
    <template v-for="section in bottomCustomSections" :key="section.id">
      <div
        v-if="section.enabled && section.customHtml"
        :class="section.layout === 'boxed' ? 'relative z-10 max-w-[1180px] mx-auto px-3 sm:px-4 my-6 sm:my-8' : 'relative z-10 w-full px-4 my-6 sm:my-8'"
      >
        <div v-html="section.customHtml"></div>
      </div>
    </template>

    <!-- SEAMLESS WOODLAND FOOTER (SITTING DIRECTLY ON LOWER MEADOW OF ARTWORK) -->
    <FooterPart />

    <!-- SURPRISE MODAL -->
    <SurpriseModal
      :isOpen="isSurpriseOpen"
      :story="surpriseStory"
      @close="isSurpriseOpen = false"
      @spin-again="pickRandomStory"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"

import HeroSlider from "../components/HeroSlider.vue"
import StoryCard from "../components/StoryCard.vue"
import StoryRail from "../components/StoryRail.vue"
import Catergory from "../components/Catergory.vue"
import FunPlaySection from "../components/FunPlaySection.vue"
import CuteHeading from "../components/CuteHeading.vue"
import SpotlightStory from "../components/SpotlightStory.vue"
import TrustBadges from "../components/TrustBadges.vue"
import StorySkeleton from "../components/StorySkeleton.vue"
import SurpriseModal from "../components/SurpriseModal.vue"
import FooterPart from "../components/FooterPart.vue"
import NavBar from "../components/NavBar.vue"

import { heroSlides } from "../data/storyData.js"
import api from "../services/Api.js"
import { useSiteCustomizerStore } from "../pinaGlobal/siteCustomizer"

const customizer = useSiteCustomizerStore()

const topCustomSections = computed(() => {
  return (customizer.landingSections || []).filter((s) => s.enabled && s.position === "top")
})

const bottomCustomSections = computed(() => {
  return (customizer.landingSections || []).filter((s) => s.enabled && s.position === "bottom")
})

// =====================================================
// SEO & HEAD
// =====================================================
useSeoMeta({
  title: "KidsStoryFlix | Magical Stories & Bedtime Audio for Kids",
  description: "Discover fun children's stories, bedtime tales, educational stories and audiobooks for kids on KidsStoryFlix.",
  robots: "index, follow",
  ogTitle: "KidsStoryFlix | Magical Stories for Kids",
  ogDescription: "Discover fun children's stories, bedtime tales, educational stories and audiobooks for kids on KidsStoryFlix.",
  ogType: "website",
  ogUrl: "https://kidsstoryflix.co.uk/",
  ogImage: "https://kidsstoryflix.co.uk/assets/hero.png",
  twitterCard: "summary_large_image",
  twitterTitle: "KidsStoryFlix | Magical Stories for Kids",
  twitterDescription: "Discover fun children's stories, bedtime tales, educational stories and audiobooks for kids.",
  twitterImage: "https://kidsstoryflix.co.uk/assets/hero.png",
})

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://kidsstoryflix.co.uk/",
    },
  ],
})

// =====================================================
// SAFE FALLBACK STORIES
// =====================================================
const fallbackStories = [
  {
    id: 1,
    title: "🦁 Brave Lion of the Savanna",
    slug: "brave-lion",
    description: "A kind and courageous lion protects the jungle animals during a stormy day.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779278768/65f805ad-831f-46bd-aa54-35f8cc2bf01a_ijee9c.png",
    category: "animals",
    age: "5-7",
  },
  {
    id: 2,
    title: "🐰 Magic Moon Rabbit",
    slug: "magic-rabbit",
    description: "A curious little bunny discovers magical glowing flowers that light up the forest.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp",
    category: "fairy",
    age: "2-4",
  },
  {
    id: 3,
    title: "🚀 The Little Cosmic Rocket",
    slug: "space-adventure",
    description: "Two brave friends blast off through glittery galaxies to meet friendly aliens.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/4_grvsqm.webp",
    category: "adventure",
    age: "5-7",
  },
  {
    id: 4,
    title: "🦄 Sparkle and the Rainbow Forest",
    slug: "unicorn-forest",
    description: "A gentle unicorn protects the magical rainbow waterfall with her friends.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272836/8_i7nldx.webp",
    category: "fairy",
    age: "2-4",
  },
  {
    id: 5,
    title: "🐼 Panda's Bedtime Lullaby",
    slug: "panda-dreams",
    description: "A sleepy panda counts falling leaves and discovers the quiet comfort of peaceful sleep.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272833/3_wvercf.webp",
    category: "bedtime",
    age: "2-4",
  },
  {
    id: 6,
    title: "🎈 The Flying Red Balloon",
    slug: "flying-balloon",
    description: "A playful balloon travels across cities, rainbow mountains, and smiling clouds.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp",
    category: "funny",
    age: "2-4",
  },
  {
    id: 7,
    title: "🐬 The Singing Little Dolphin",
    slug: "singing-dolphin",
    description: "Dive deep with Pip the dolphin as he learns to lead the ocean's coral choir.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779278768/65f805ad-831f-46bd-aa54-35f8cc2bf01a_ijee9c.png",
    category: "animals",
    age: "5-7",
  },
  {
    id: 8,
    title: "⭐ The Star that Forgot How to Shine",
    slug: "star-forgot-shine",
    description: "A touching tale about helping a little star regain its confidence and sparkle.",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272836/8_i7nldx.webp",
    category: "moral",
    age: "8+",
  },
]

// =====================================================
// DATA FETCHING (SSR)
// =====================================================
const {
  data: rawStories,
  pending,
  error,
} = await useAsyncData(
  "homepage-stories",
  async () => {
    try {
      const response = await api.get("/stories")
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        return response.data
      }
      return fallbackStories
    } catch (err) {
      console.warn("API unavailable, displaying fallback stories:", err.message)
      return fallbackStories
    }
  },
  {
    default: () => fallbackStories,
  }
)

const storiesList = computed(() => {
  if (Array.isArray(rawStories.value) && rawStories.value.length > 0) {
    return rawStories.value
  }
  return fallbackStories
})

// =====================================================
// INTERACTIVE HERO SLIDER
// =====================================================
const heroIndex = ref(0)
let heroAutoSlide = null

const nextHero = () => {
  heroIndex.value = (heroIndex.value + 1) % heroSlides.length
}

const prevHero = () => {
  heroIndex.value = (heroIndex.value - 1 + heroSlides.length) % heroSlides.length
}

const startHeroSlide = () => {
  if (heroAutoSlide || !import.meta.client) return
  heroAutoSlide = setInterval(nextHero, 5000)
}

const pauseHeroSlide = () => {
  if (heroAutoSlide) {
    clearInterval(heroAutoSlide)
    heroAutoSlide = null
  }
}

// =====================================================
// BEDTIME MODE & SOUND TOGGLE
// =====================================================
const isBedtimeMode = ref(false)
const isSoundOn = ref(true)

const playChime = () => {
  if (!isSoundOn.value || !import.meta.client) return
  try {
    const audio = new Audio("/assets/sounds/pop.wav")
    audio.volume = 0.3
    audio.play().catch(() => {})
  } catch (err) {}
}

const toggleBedtimeMode = () => {
  isBedtimeMode.value = !isBedtimeMode.value
  playChime()
}

const toggleSound = () => {
  isSoundOn.value = !isSoundOn.value
  if (isSoundOn.value) playChime()
}

// =====================================================
// SEARCH & FILTERS
// =====================================================
const searchQuery = ref("")
const selectedCategory = ref("all")
const selectedAge = ref("all")

const ageFilters = [
  { id: "all", label: "🌈 All Ages" },
  { id: "2-4", label: "🍼 Ages 2–4" },
  { id: "5-7", label: "🦊 Ages 5–7" },
  { id: "8+", label: "🦁 Ages 8+" },
]

// KidsLata-style Pill Category & Age Filters
const quickPillCategories = [
  { id: "bedtime", label: "Bedtime", icon: "🌙", colorClass: "bg-[#25335e] text-white border-blue-900/40 hover:bg-[#314175]", activeClass: "bg-[#182347] text-white" },
  { id: "animals", label: "Animals", icon: "🦁", colorClass: "bg-[#fed882] text-amber-950 border-amber-300 hover:bg-[#ffdf94]", activeClass: "bg-amber-400 text-amber-950" },
  { id: "fairy", label: "Fairy Tales", icon: "🧚", colorClass: "bg-[#bbf7d0] text-emerald-950 border-emerald-300 hover:bg-[#c9f9db]", activeClass: "bg-emerald-300 text-emerald-950" },
  { id: "adventure", label: "Adventures", icon: "🚀", colorClass: "bg-[#ddd6fe] text-purple-950 border-purple-300 hover:bg-[#e6e0fe]", activeClass: "bg-purple-300 text-purple-950" },
]

const agePills = [
  { id: "2-4", label: "Age 3-5", icon: "👶", colorClass: "bg-[#bae6fd] text-sky-950 border-sky-300 hover:bg-[#c7ecfe]", activeClass: "bg-sky-300 text-sky-950" },
  { id: "5-7", label: "Age 6-8", icon: "🧒", colorClass: "bg-[#fbcfe8] text-pink-950 border-pink-300 hover:bg-[#fcd9ed]", activeClass: "bg-pink-300 text-pink-950" },
]

const handleSelectCategory = (catId) => {
  selectedCategory.value = catId
}

const setAgeFilter = (ageId) => {
  selectedAge.value = ageId
  playChime()
}

const resetFilters = () => {
  searchQuery.value = ""
  selectedCategory.value = "all"
  selectedAge.value = "all"
  playChime()
}

const filteredStories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const cat = selectedCategory.value
  const age = selectedAge.value

  return storiesList.value.filter((story, index) => {
    // Search matching
    const matchSearch =
      !query ||
      (story.title && story.title.toLowerCase().includes(query)) ||
      (story.description && story.description.toLowerCase().includes(query))

    // Category matching (heuristic fallback if category field missing)
    let storyCat = story.category
    if (!storyCat) {
      const idx = (story.id || index) % 6
      const cats = ["bedtime", "animals", "fairy", "adventure", "funny", "moral"]
      storyCat = cats[idx]
    }
    const matchCategory = cat === "all" || storyCat === cat

    // Age matching (heuristic fallback if age field missing)
    let storyAge = story.age
    if (!storyAge) {
      const ages = ["2-4", "5-7", "8+"]
      storyAge = ages[(story.id || index) % 3]
    }
    const matchAge = age === "all" || storyAge === age

    return matchSearch && matchCategory && matchAge
  })
})

// =====================================================
// NETFLIX-STYLE CURATED LISTS
// =====================================================
const trendingStories = computed(() => {
  return storiesList.value.slice(0, 8)
})

const spotlightStory = computed(() => {
  if (storiesList.value.length > 2) return storiesList.value[2]
  return storiesList.value[0] || null
})

const bedtimeStories = computed(() => {
  // Return bedtime or even-indexed stories
  const subset = storiesList.value.filter((s, i) => i % 2 === 1 || (s.title && s.title.toLowerCase().includes("bedtime")))
  return subset.length >= 4 ? subset : storiesList.value.slice(0, 6)
})

const adventureStories = computed(() => {
  const subset = storiesList.value.filter((s, i) => i % 2 === 0 || (s.title && s.title.toLowerCase().includes("space")))
  return subset.length >= 4 ? subset : storiesList.value.slice(1, 7)
})

// =====================================================
// SURPRISE ME MODAL
// =====================================================
const isSurpriseOpen = ref(false)
const surpriseStory = ref(null)

const pickRandomStory = () => {
  if (!storiesList.value.length) return
  playChime()
  const randomIndex = Math.floor(Math.random() * storiesList.value.length)
  surpriseStory.value = storiesList.value[randomIndex]
}

const handleSurpriseMe = () => {
  pickRandomStory()
  isSurpriseOpen.value = true
}

// =====================================================
// LIFECYCLE
// =====================================================
onMounted(() => {
  customizer.loadFromStorage()
  startHeroSlide()
})

onUnmounted(() => {
  pauseHeroSlide()
})
</script>
