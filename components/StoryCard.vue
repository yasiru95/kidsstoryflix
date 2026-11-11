<template>
  <div
    class="group/card relative flex flex-col justify-between select-none"
    :class="[
      featured
        ? 'w-full max-w-[300px] mx-auto'
        : inGrid
          ? 'w-full max-w-[210px] mx-auto'
          : 'w-[170px] sm:w-[195px] md:w-[220px] shrink-0 snap-start mx-auto'
    ]"
  >
    <NuxtLink
      :to="`/story/${story.slug || story.id}`"
      class="block focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-2xl"
      :aria-label="`Read ${story.title || 'Story'}`"
    >
      <!-- 3D HARDCOVER BOOK WRAPPER (KIDSLATA 3D STYLE) -->
      <div class="relative pt-1 pb-2 px-1">
        <!-- 3D REALISTIC CAST SHADOW BENEATH BOOK -->
        <div class="absolute -bottom-1.5 left-4 right-1 h-3.5 bg-black/25 blur-md rounded-full transition-all duration-300 group-hover/card:scale-110 group-hover/card:opacity-40"></div>

        <!-- 3D PHYSICAL PAGES EDGE (RIGHT SIDE OF BOOK) -->
        <div
          class="absolute top-2 bottom-2 -right-2 w-2.5 sm:w-3 rounded-r-md border-r border-t border-b border-stone-300/90 shadow-sm"
          style="background: repeating-linear-gradient(to bottom, #ffffff, #ffffff 2px, #e7e5e4 2px, #e7e5e4 3px);"
        ></div>

        <!-- 3D PHYSICAL PAGES EDGE (BOTTOM OF BOOK) -->
        <div
          class="absolute -bottom-1.5 left-3 right-0 h-2 sm:h-2.5 rounded-b-md border-b border-l border-r border-stone-300/90 shadow-sm"
          style="background: repeating-linear-gradient(to right, #ffffff, #ffffff 2px, #e7e5e4 2px, #e7e5e4 3px);"
        ></div>

        <!-- HARDCOVER BOOK BODY -->
        <div
          class="relative overflow-hidden rounded-r-xl rounded-l-sm bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 aspect-[3/4] w-full border-t border-r border-b border-white/25 shadow-xl transition-all duration-300 transform group-hover/card:-translate-y-2 group-hover/card:rotate-[-1.5deg] group-hover/card:shadow-2xl"
        >
          <!-- BOOK COVER ARTWORK -->
          <img
            :src="story.image || defaultImage"
            :alt="`${story.title || 'Story'} - KidsStoryFlix`"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-108"
            loading="lazy"
            decoding="async"
            @error="onImageError"
          />

          <!-- 3D BOOK SPINE CREASE & FOLD SHADOW (LEFT EDGE) -->
          <div class="absolute top-0 bottom-0 left-0 w-3.5 sm:w-4 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-20 pointer-events-none"></div>
          <div class="absolute top-0 bottom-0 left-2.5 sm:left-3 w-0.5 bg-white/30 z-20 pointer-events-none"></div>

          <!-- TOP CATEGORY PILL BADGE (CENTERED ON COVER) -->
          <div class="absolute top-2 sm:top-2.5 inset-x-0 flex justify-center z-20 pointer-events-none px-2">
            <span
              class="rounded-full px-3 py-0.5 text-[9px] sm:text-[11px] font-black font-kids uppercase tracking-wider text-white shadow-md border border-white/40 drop-shadow-sm"
              :class="categoryBadgeClass"
            >
              {{ badgeText }}
            </span>
          </div>

          <!-- BOTTOM TITLE OVERLAY ON COVER -->
          <div class="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 pt-8 bg-gradient-to-t from-black/90 via-black/55 to-transparent z-20 text-center">
            <h4
              class="font-extrabold font-baloo text-white text-xs sm:text-sm md:text-base leading-snug drop-shadow-md line-clamp-2"
              :title="story.title"
            >
              {{ story.title || "Magical Adventure" }}
            </h4>
            <p class="text-[9px] sm:text-[10px] text-white/80 font-kids mt-0.5 tracking-wider">
              By KidsStoryFlix
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- METADATA ROW (AGE + READING TIME PILLS) -->
    <div class="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-bold font-kids gap-1 px-1">
      <!-- Age Pill -->
      <span class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 sm:px-2.5 py-0.5 sm:py-1 text-amber-800 border border-amber-200/80 shrink-0">
        <span>👶</span>
        <span>{{ ageRange }}</span>
      </span>

      <!-- Reading Time Pill -->
      <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 text-slate-700 border border-slate-200 shrink-0">
        <span>⏱️</span>
        <span>{{ readingTime }} Min</span>
      </span>
    </div>

    <!-- VIBRANT READ NOW BUTTON (DARK OR ORANGE BASED ON PROP) -->
    <div class="mt-2 px-0.5">
      <NuxtLink
        :to="`/story/${story.slug || story.id}`"
        class="w-full inline-flex items-center justify-center gap-1.5 rounded-full
               text-white font-extrabold font-kids text-xs sm:text-sm py-2 sm:py-2.5 px-3
               hover:scale-105 active:scale-95 transition-all duration-200"
        :class="darkButton
          ? 'bg-[#1a2552] hover:bg-purple-900 shadow-[0_4px_12px_rgba(26,37,82,0.4)]'
          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-[0_4px_12px_rgba(249,115,22,0.4)] hover:shadow-[0_6px_18px_rgba(249,115,22,0.6)]'"
      >
        <span>Read Now</span>
        <span class="text-sm">📖</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  story: {
    type: Object,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  inGrid: {
    type: Boolean,
    default: false,
  },
  darkButton: {
    type: Boolean,
    default: false,
  },
})

const defaultImage = "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp"

const onImageError = (event) => {
  event.target.src = defaultImage
}

// Category badges matching reference image (ADVENTURE, MAGIC, FAIRY TALE, ANIMALS, BEDTIME)
const badgeList = [
  { text: "ADVENTURE", color: "bg-gradient-to-r from-blue-600 to-indigo-600" },
  { text: "MAGIC", color: "bg-gradient-to-r from-pink-500 to-purple-600" },
  { text: "ANIMAL TALE", color: "bg-gradient-to-r from-amber-500 to-orange-600" },
  { text: "FAIRY TALE", color: "bg-gradient-to-r from-rose-500 to-pink-500" },
  { text: "BEDTIME", color: "bg-gradient-to-r from-indigo-500 to-blue-500" },
]

const storyIndex = computed(() => {
  const id = Number(props.story?.id) || 0
  return Math.abs(id) % badgeList.length
})

const badgeText = computed(() => {
  if (props.story?.category) {
    return props.story.category.toUpperCase()
  }
  return badgeList[storyIndex.value].text
})

const categoryBadgeClass = computed(() => badgeList[storyIndex.value].color)

const readingTime = computed(() => {
  const id = Number(props.story?.id) || 3
  return 3 + (id % 4) // 3 to 6 min read
})

const ageRange = computed(() => {
  if (props.story?.age) return `Age ${props.story.age}`
  const ranges = ["Age 3-7", "Age 4-8", "Age 5-9", "Age 6-10"]
  const id = Number(props.story?.id) || 0
  return ranges[id % ranges.length]
})
</script>
