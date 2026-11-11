<template>
  <section
    class="relative w-full overflow-hidden
           h-[360px] sm:h-[460px] md:h-[540px] lg:h-[620px] select-none"
    @mouseenter="$emit('pause')"
    @mouseleave="$emit('resume')"
  >
    <!-- SLIDES WRAPPER -->
    <div
      class="flex h-full transition-transform duration-700 ease-out"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.id || index"
        class="min-w-full h-full relative overflow-hidden"
      >
        <!-- BACKGROUND IMAGE -->
        <img
          :src="slide.image"
          :alt="slide.title || 'Kids Story Adventure'"
          class="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          :class="activeIndex === index ? 'scale-100' : 'scale-105'"
        />

        <!-- VIBRANT DUAL GRADIENT OVERLAY -->
        <div class="absolute inset-0 bg-gradient-to-t from-purple-950/85 via-purple-900/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-transparent to-pink-900/40"></div>

        <!-- FLOATING SPARKLES DECORATION -->
        <div class="absolute top-6 left-10 text-2xl sm:text-4xl animate-bounce opacity-75 hidden sm:block">
          ⭐
        </div>
        <div class="absolute top-16 right-16 text-xl sm:text-3xl animate-pulse opacity-80 hidden sm:block">
          ✨
        </div>
        <div class="absolute bottom-20 left-16 text-xl sm:text-2xl animate-float opacity-70 hidden md:block">
          🎈
        </div>

        <!-- CONTENT CONTAINER -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-end md:justify-center
                 text-center px-4 sm:px-8 md:px-16 pb-16 md:pb-0 z-10"
        >
          <!-- CUTE BADGE -->
          <div
            v-if="slide.badge"
            class="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs sm:text-sm font-black text-purple-700 shadow-lg backdrop-blur-md mb-2 sm:mb-4 animate-bounceSoft"
          >
            <span>{{ slide.badge }}</span>
          </div>

          <!-- TITLE -->
          <h1
            class="font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight max-w-4xl
                   text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-['Baloo_2']"
          >
            {{ slide.title || "Welcome to KidsStoryFlix" }}
          </h1>

          <!-- DESCRIPTION -->
          <p
            v-if="slide.description"
            class="mt-2 sm:mt-4 text-white/95 max-w-2xl
                   leading-snug sm:leading-relaxed drop-shadow-md
                   text-xs sm:text-base md:text-xl font-medium"
          >
            {{ slide.description }}
          </p>

          <!-- ACTIONS & TAG -->
          <div class="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
            <NuxtLink
              to="/all-stories"
              class="inline-flex items-center gap-2 rounded-full
                     bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                     px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-base md:text-lg
                     font-black text-white shadow-[0_10px_25px_rgba(236,72,153,0.5)]
                     transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <span>{{ slide.ctaText || "Explore Stories 📚" }}</span>
            </NuxtLink>

            <span
              v-if="slide.tag"
              class="hidden sm:inline-flex items-center rounded-full bg-black/40 px-3 py-1.5 text-xs sm:text-sm font-bold text-white/90 backdrop-blur-md border border-white/20"
            >
              {{ slide.tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- PREV BUTTON -->
    <button
      @click="$emit('prev')"
      aria-label="Previous slide"
      class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20
             flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center
             rounded-full bg-white/85 text-purple-700 backdrop-blur-md
             shadow-xl transition-all hover:scale-110 hover:bg-white active:scale-95"
    >
      <span class="text-xl sm:text-2xl font-bold">❮</span>
    </button>

    <!-- NEXT BUTTON -->
    <button
      @click="$emit('next')"
      aria-label="Next slide"
      class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20
             flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center
             rounded-full bg-white/85 text-pink-600 backdrop-blur-md
             shadow-xl transition-all hover:scale-110 hover:bg-white active:scale-95"
    >
      <span class="text-xl sm:text-2xl font-bold">❯</span>
    </button>

    <!-- SLIDE DOTS / INDICATOR -->
    <div
      class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20
             flex items-center gap-2 sm:gap-2.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-md"
    >
      <button
        v-for="(slide, index) in slides"
        :key="slide.id || index"
        @click="$emit('change', index)"
        :aria-label="`Go to slide ${index + 1}`"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="activeIndex === index ? 'w-7 bg-pink-400' : 'w-2.5 bg-white/60 hover:bg-white'"
      ></button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
})

defineEmits(["prev", "next", "change", "pause", "resume"])
</script>
