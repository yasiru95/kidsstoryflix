<template>
  <section id="categories" class="py-4 sm:py-6 select-none overflow-visible">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HEADER -->
      <div class="mb-4 sm:mb-6">
        <h2 class="text-2xl sm:text-3xl font-black font-baloo text-purple-950 tracking-tight">
          Explore by Categories
        </h2>
      </div>

      <!-- 6 CIRCULAR CATEGORY BUBBLES (KIDSLATA STYLE - 100% CONTAINED NO OVERFLOW) -->
      <div class="w-full py-2 sm:py-3 overflow-visible">
        <div
          class="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto justify-items-center items-start"
        >
          <div
            v-for="cat in categories"
            :key="cat.id"
            @click="handleCategoryClick(cat.id)"
            class="group cursor-pointer flex flex-col items-center focus:outline-none w-full"
          >
            <!-- BUBBLE CIRCLE (STABLE BOUNDING BOX - NEVER CLIPPED) -->
            <div
              class="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-22 md:w-22 lg:h-24 lg:w-24 items-center justify-center
                     rounded-full p-2 sm:p-2.5 transition-all duration-300 ease-out
                     group-hover:-translate-y-1 group-active:scale-95"
              :class="[
                activeCategory === cat.id
                  ? 'ring-4 ring-purple-500 shadow-md -translate-y-1'
                  : 'shadow-sm group-hover:shadow-md'
              ]"
            >
              <!-- BG SOFT PASTEL COLOR CIRCLE -->
              <div
                class="absolute inset-0 rounded-full transition-opacity"
                :class="cat.bgColor"
              ></div>

              <!-- INNER CIRCLE WITH ICON (OVERFLOW-HIDDEN PREVENTS ANY ICON OVERFLOW) -->
              <div class="relative z-10 flex h-full w-full items-center justify-center p-1 sm:p-1.5 rounded-full overflow-hidden">
                <img
                  v-if="!imageErrors[cat.id]"
                  :src="cat.image"
                  :alt="cat.label"
                  class="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-110 drop-shadow-sm select-none pointer-events-none"
                  loading="eager"
                  @error="imageErrors[cat.id] = true"
                />
                <span
                  v-else
                  class="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110"
                >
                  {{ cat.emoji }}
                </span>
              </div>
            </div>

            <!-- CUTE LABEL UNDER BUBBLE -->
            <span
              class="mt-2 text-xs sm:text-sm md:text-base font-extrabold font-kids tracking-wide transition-colors duration-200 text-center line-clamp-1"
              :class="activeCategory === cat.id ? 'text-purple-900 font-black' : 'text-gray-800 group-hover:text-purple-600'"
            >
              {{ cat.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue"

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
const imageErrors = ref({})

// 6 Categories exactly matching KidsLata reference image
const categories = [
  {
    id: "bedtime",
    label: "Bedtime",
    emoji: "🌙",
    image: "/images/categories/bedtime.svg",
    bgColor: "bg-gradient-to-br from-[#e0d6ff] to-[#c7b6fb]",
  },
  {
    id: "animals",
    label: "Animals",
    emoji: "🐯",
    image: "/images/categories/animals.svg",
    bgColor: "bg-gradient-to-br from-[#fef08a] to-[#fde047]",
  },
  {
    id: "fairy",
    label: "Fairy Tales",
    emoji: "🏰",
    image: "/images/categories/fairytale-castle.svg",
    bgColor: "bg-gradient-to-br from-[#fbcfe8] to-[#f9a8d4]",
  },
  {
    id: "adventure",
    label: "Adventure",
    emoji: "🎒",
    image: "/images/categories/adventure-backpack.svg",
    bgColor: "bg-gradient-to-br from-[#fed7aa] to-[#fb923c]",
  },
  {
    id: "space",
    label: "Space",
    emoji: "🚀",
    image: "/images/categories/adventure.svg",
    bgColor: "bg-gradient-to-br from-[#bae6fd] to-[#60a5fa]",
  },
  {
    id: "magic",
    label: "Magic",
    emoji: "🧙",
    image: "/images/categories/magic-hat.svg",
    bgColor: "bg-gradient-to-br from-[#e9d5ff] to-[#c084fc]",
  },
]

const playPopSound = () => {
  if (!props.soundEnabled || !import.meta.client) return
  try {
    const audio = new Audio("/assets/sounds/pop.wav")
    audio.volume = 0.35
    audio.play().catch(() => {})
  } catch (err) {}
}

const handleCategoryClick = (catId) => {
  playPopSound()
  emit("select", catId)
}
</script>
