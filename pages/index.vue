<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-700 font-[\'Fredoka\'] overflow-x-hidden',
      isBedtimeMode
        ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-purple-100'
        : 'bg-gradient-to-b from-pink-100 via-sky-100 to-amber-50 text-gray-800'
    ]"
  >
    <!-- NAVBAR -->
    <NavBar />

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

    <main class="relative z-10">
      <!-- HERO SLIDER SECTION -->
      <section class="w-full overflow-hidden shadow-lg">
        <HeroSlider
          :slides="heroSlides"
          :activeIndex="heroIndex"
          @prev="prevHero"
          @next="nextHero"
          @change="heroIndex = $event"
          @pause="pauseHeroSlide"
          @resume="startHeroSlide"
        />
      </section>

      <!-- INTERACTIVE CONTROL BAR (Search + Surprise + Bedtime + Sound) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div
          class="rounded-3xl p-3 sm:p-4 shadow-xl border-2 backdrop-blur-xl transition-all duration-300"
          :class="isBedtimeMode
            ? 'bg-indigo-900/80 border-indigo-700/60 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
            : 'bg-white/90 border-white shadow-[0_15px_35px_rgba(168,85,247,0.15)]'"
        >
          <div class="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
            <!-- SEARCH INPUT -->
            <div class="relative w-full lg:w-96">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl select-none">
                🔍
              </span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search dragons, space, lions..."
                class="w-full rounded-full pl-12 pr-10 py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 transition-all"
                :class="isBedtimeMode
                  ? 'bg-indigo-950/80 text-white placeholder-indigo-300 border border-indigo-700 focus:ring-purple-500'
                  : 'bg-pink-50/80 text-gray-800 placeholder-gray-400 border border-pink-100 focus:ring-pink-300'"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300 text-xs text-gray-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <!-- AGE FILTER PILLS -->
            <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 lg:pb-0 scrollbar-none">
              <button
                v-for="age in ageFilters"
                :key="age.id"
                @click="setAgeFilter(age.id)"
                class="rounded-full px-3.5 py-2 text-xs sm:text-sm font-black transition-all shrink-0 select-none"
                :class="selectedAge === age.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md scale-105'
                  : isBedtimeMode
                    ? 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-950'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'"
              >
                <span>{{ age.label }}</span>
              </button>
            </div>

            <!-- INTERACTIVE ACTION BUTTONS -->
            <div class="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-end">
              <!-- SURPRISE ME BUTTON -->
              <button
                @click="handleSurpriseMe"
                class="flex-1 lg:flex-none inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-md hover:scale-105 active:scale-95 transition-all select-none"
              >
                <span>Surprise Me!</span>
                <span class="text-base animate-bounce">🎲</span>
              </button>

              <!-- BEDTIME MODE TOGGLE -->
              <button
                @click="toggleBedtimeMode"
                :title="isBedtimeMode ? 'Switch to Daylight Mode' : 'Switch to Cozy Bedtime Mode'"
                class="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full shadow-md transition-all hover:scale-110 active:scale-95 select-none"
                :class="isBedtimeMode ? 'bg-amber-400 text-indigo-950' : 'bg-indigo-950 text-yellow-300'"
              >
                <span class="text-lg">{{ isBedtimeMode ? '☀️' : '🌙' }}</span>
              </button>

              <!-- SOUND TOGGLE -->
              <button
                @click="toggleSound"
                :title="isSoundOn ? 'Mute Sounds' : 'Turn Sounds On'"
                class="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full shadow-md transition-all hover:scale-110 active:scale-95 select-none"
                :class="isSoundOn
                  ? (isBedtimeMode ? 'bg-purple-600 text-white' : 'bg-pink-500 text-white')
                  : (isBedtimeMode ? 'bg-indigo-950 text-indigo-400' : 'bg-gray-100 text-gray-500')"
              >
                <span class="text-base">{{ isSoundOn ? '🔊' : '🔇' }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- CATEGORY BUBBLES -->
      <Catergory
        :activeCategory="selectedCategory"
        :soundEnabled="isSoundOn"
        @select="handleSelectCategory"
      />

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

      <!-- DEFAULT STORYFLIX NETFLIX-STYLE CURATED VIEW -->
      <template v-else>
        <!-- ROW 1: TRENDING & POPULAR STORIES -->
        <StoryRail
          title="🔥 Popular & Trending Stories"
          subtitle="The most-read adventures kids are loving right now!"
          badge="HOT PICKS"
          badgeColor="bg-rose-100 text-rose-700"
          :stories="trendingStories"
        />

        <!-- SPOTLIGHT BOOK OF THE DAY -->
        <SpotlightStory :story="spotlightStory" />

        <!-- ROW 2: COZY BEDTIME STORIES -->
        <StoryRail
          title="🌙 Cozy Bedtime Tales"
          subtitle="Gentle, soothing stories designed to inspire sweet dreams."
          badge="SWEET DREAMS"
          badgeColor="bg-indigo-100 text-indigo-700"
          :stories="bedtimeStories"
        />

        <!-- ROW 3: MAGIC & SPACE ADVENTURES -->
        <StoryRail
          title="🚀 Magic & Space Quests"
          subtitle="Explore secret forests, star kingdoms, and faraway galaxies!"
          badge="ADVENTURE"
          badgeColor="bg-cyan-100 text-cyan-700"
          :stories="adventureStories"
        />

        <!-- FULL LIBRARY EXPLORER PREVIEW -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div class="text-center mb-8">
            <CuteHeading text="⭐ Story Library" />
            <p class="text-sm sm:text-base font-medium font-kids text-purple-700/80 mt-2 max-w-lg mx-auto" :class="{ 'text-purple-300': isBedtimeMode }">
              Dive into our full bookshelf of illustrated stories, ready for storytime anytime!
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <StoryCard
              v-for="story in storiesList.slice(0, 10)"
              :key="story.id"
              :story="story"
            />
          </div>

          <!-- BROWSE ALL CTA -->
          <div class="mt-10 text-center">
            <NuxtLink
              to="/all-stories"
              class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 px-8 py-4 text-base sm:text-lg font-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore All Stories</span>
              <span class="text-xl">📚</span>
            </NuxtLink>
          </div>
        </section>
      </template>

      <!-- TRUST & PARENT BENEFIT BADGES -->
      <TrustBadges />
    </main>

    <!-- FOOTER -->
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
import CuteHeading from "../components/CuteHeading.vue"
import SpotlightStory from "../components/SpotlightStory.vue"
import TrustBadges from "../components/TrustBadges.vue"
import StorySkeleton from "../components/StorySkeleton.vue"
import SurpriseModal from "../components/SurpriseModal.vue"
import FooterPart from "../components/FooterPart.vue"
import NavBar from "../components/NavBar.vue"

import { heroSlides } from "../data/storyData.js"
import api from "../services/Api.js"

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
  startHeroSlide()
})

onUnmounted(() => {
  pauseHeroSlide()
})
</script>
