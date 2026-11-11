<template>
  <div
    class="group relative w-[185px] sm:w-[215px] md:w-[245px] shrink-0 snap-start select-none flex flex-col h-full"
  >
    <NuxtLink
      :to="`/story/${story.slug || story.id}`"
      class="flex flex-col flex-1 h-full focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-3xl"
      :aria-label="`Read ${story.title || 'Story'}`"
    >
      <div
        class="relative overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3
               border-2 border-purple-100/90 shadow-[0_8px_20px_-4px_rgba(147,51,234,0.12)]
               transition-all duration-300 ease-out
               group-hover:-translate-y-2 group-hover:scale-[1.02]
               group-hover:shadow-[0_18px_32px_-4px_rgba(236,72,153,0.25)]
               group-hover:border-pink-300
               flex flex-col flex-1 h-full"
      >
        <!-- COVER IMAGE CONTAINER (FIXED HEIGHT ON ALL CARDS) -->
        <div class="relative w-full h-56 sm:h-64 md:h-72 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 shadow-inner">
          <img
            :src="story.image || defaultImage"
            :alt="`${story.title || 'Story'} - KidsStoryFlix`"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
            loading="lazy"
            decoding="async"
            @error="onImageError"
          />

          <!-- SUBTLE GRADIENT OVERLAY -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>

          <!-- TOP BADGES -->
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-1">
            <!-- Category Tag -->
            <span
              class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-bold font-kids text-white shadow-md backdrop-blur-md border border-white/30"
              :class="badgeColorClass"
            >
              <span>{{ badgeIcon }}</span>
              <span class="tracking-wide">{{ badgeText }}</span>
            </span>

            <!-- Featured Star -->
            <span
              v-if="story.is_featured || story.id % 2 === 0"
              class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 text-xs shadow-md border border-white/60 animate-bounceSoft"
              title="Featured Star"
            >
              ⭐
            </span>
          </div>

          <!-- HOVER "READ NOW" ACTION CHIP -->
          <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[90%] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div class="flex items-center justify-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold font-kids text-purple-700 shadow-xl backdrop-blur-md border border-purple-100 hover:bg-purple-600 hover:text-white transition-colors">
              <span>Read Story</span>
              <span class="text-sm">📖</span>
            </div>
          </div>
        </div>

        <!-- STORY TITLE & INFO (UNIFORM EXACT HEIGHT ON EVERY CARD) -->
        <div class="pt-3 pb-1 px-1 flex flex-col flex-1 justify-between">
          <!-- TITLE (EXACT SAME HEIGHT: h-10 on mobile, h-12 on desktop with line-clamp-2) -->
          <h3
            class="font-bold font-kids text-sm sm:text-base text-gray-800 group-hover:text-purple-700 transition-colors line-clamp-2 h-10 sm:h-12 flex items-center leading-snug"
            :title="story.title"
          >
            {{ story.title || "Magical Adventure" }}
          </h3>

          <!-- FOOTER PILLS (PINNED TO EXACT SAME BOTTOM POSITION) -->
          <div class="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs font-semibold gap-1 shrink-0">
            <!-- Reading Time Pill -->
            <span class="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-0.5 text-pink-600 font-kids font-bold border border-pink-100/60 shrink-0">
              <span>⏱️</span>
              <span>{{ readingTime }}m</span>
            </span>

            <!-- Audio Pill -->
            <span class="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 text-sky-600 font-kids font-bold border border-sky-100/60 shrink-0">
              <span>🎧</span>
              <span>Audio</span>
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  story: {
    type: Object,
    required: true,
  },
})

const defaultImage = "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp"

const onImageError = (event) => {
  event.target.src = defaultImage
}

// Fun deterministic badge calculation based on story ID or title
const badgeData = [
  { text: "Bedtime", icon: "🌙", color: "bg-indigo-600/90" },
  { text: "Adventure", icon: "🚀", color: "bg-sky-600/90" },
  { text: "Animal Tale", icon: "🦁", color: "bg-amber-600/90" },
  { text: "Fairy Tale", icon: "✨", color: "bg-pink-600/90" },
  { text: "Fun & Laughs", icon: "🎈", color: "bg-emerald-600/90" },
]

const storyIndex = computed(() => {
  const id = Number(props.story?.id) || 0
  return Math.abs(id) % badgeData.length
})

const badgeText = computed(() => badgeData[storyIndex.value].text)
const badgeIcon = computed(() => badgeData[storyIndex.value].icon)
const badgeColorClass = computed(() => badgeData[storyIndex.value].color)

const readingTime = computed(() => {
  const id = Number(props.story?.id) || 3
  return 3 + (id % 4) // 3 to 6 min read
})
</script>
