<template>
    <section class="overflow-hidden bg-gradient-to-b from-pink-100 via-sky-100 to-yellow-100 px-4 py-10 sm:px-6 md:px-10 lg:px-16">

  <!-- TITLE -->
<div class="mb-6 sm:mb-8 md:mb-10 text-center">
        <CuteHeading text="⭐ Categories" />
  </div>

  <!-- SLIDER WRAPPER -->
  <div class="relative mx-auto max-w-7xl px-6 sm:px-10">

    <!-- LEFT BUTTON -->
    <button
      @click="scrollLeft"
      class="absolute left-2 top-1/2 z-30 flex items-center justify-center
      h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16
      -translate-y-1/2 rounded-full
      bg-gradient-to-r from-purple-500 to-pink-500
      text-xl text-white sm:text-2xl md:text-4xl
      shadow-2xl hover:scale-110 transition"
    >
      ❮
    </button>

    <!-- SCROLL VIEW -->
    <div
      ref="slider"
      class="overflow-hidden py-6"
    >
      <div class="flex flex-nowrap gap-8 sm:gap-10 md:gap-14">

        <!-- ITEMS -->
        <div
          v-for="story in featuredStories.slice(0, 10)"
          :key="story.id"
          class="relative shrink-0 group px-3 py-6"
        >

          <!-- GLOW -->
          <div
            class="absolute inset-2 rounded-full bg-pink-300/25 blur-sm transition group-hover:scale-105"
          ></div>

          <!-- BUBBLE -->
          <div
            @click="playPop"
      @mouseenter="playPop"
            class="
              cursor-pointer

              relative
              h-28 w-28 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-64 lg:w-64
              rounded-full
              bg-gradient-to-br from-pink-300 via-yellow-200 to-blue-300
              p-2
              shadow-[0_10px_10px_rgba(255,105,180,0.45)]
              transition-transform duration-300
          
              hover:scale-110 hover:rotate-3 transition-transform duration-300
            "
          >

            <img
              src="https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp"
              alt="story"
              class="
                h-full w-full
                rounded-full
                border-4 border-white
                object-cover

              "
            />

            <!-- STAR -->
            <div
              class="absolute left-2 -top-1 sm:left-6 sm:-top-4 text-lg sm:text-4xl animate-bounce"
            >
              ✨
            </div>

          </div>

        </div>

      </div>
    </div>

    <!-- RIGHT BUTTON -->
    <button
      @click="scrollRight"
      class="absolute right-2 top-1/2 z-30 flex items-center justify-center
      h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16
      -translate-y-1/2 rounded-full
      bg-gradient-to-r from-purple-500 to-pink-500
      text-xl text-white sm:text-2xl md:text-4xl
      shadow-2xl hover:scale-110 transition"
    >
      ❯
    </button>

  </div>
</section>
</template>

<script setup>

import { ref } from "vue"
import CuteHeading from "./CuteHeading.vue"

const popSound = new Audio("../assets/sounds/water.wav")

function playPop() {
  popSound.currentTime = 0
  popSound.volume = 0.4
  popSound.play()
}


defineProps({
  featuredStories: {
    type: Array,
    required: true,
  },
})


const slider = ref(null)

const scrollAmount = 220 // adjust for card size

const scrollLeft = () => {
  slider.value.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  })
}

const scrollRight = () => {
  slider.value.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  })
}

</script>