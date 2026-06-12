<template>
  <section
    class="relative w-full overflow-hidden max-h-[90vh]
           h-[320px] sm:h-[420px] md:h-[550px] lg:h-[700px] xl:h-[760px]"
  >
    <!-- SLIDES WRAPPER -->
    <div
      class="flex h-full transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
    >
      <div
        v-for="slide in slides"
        :key="slide.id"
        class="min-w-full h-full relative"
      >
        <!-- IMAGE -->
        <img
          :src="slide.image"
          class="w-full h-full object-cover object-center"
        />

        <!-- DARK OVERLAY -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- CONTENT -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center
                 text-center px-4 sm:px-6 md:px-10"
        >
          <!-- TITLE -->
          <h1
            class="font-extrabold text-white drop-shadow-2xl leading-tight
                   text-2xl sm:text-4xl md:text-6xl lg:text-8xl"
          >
            {{ slide.title }}
          </h1>

          <!-- DESCRIPTION -->
          <p
            class="mt-3 sm:mt-6 md:mt-8 text-white max-w-2xl
                   leading-snug sm:leading-relaxed
                   text-sm sm:text-lg md:text-2xl lg:text-3xl"
          >
            {{ slide.description }}
          </p>

          <!-- BUTTON -->
          <router-link
            :to="`/story/${slide.id}`"
            class="mt-5 sm:mt-8 md:mt-10 inline-block
                   bg-gradient-to-r from-pink-500 to-purple-500
                   text-white font-bold shadow-2xl
                   rounded-full transition transform hover:scale-105
                   px-6 py-3 text-sm
                   sm:px-8 sm:py-4 sm:text-lg
                   md:px-10 md:py-5 md:text-2xl"
          >
            📖 Read Story
          </router-link>
        </div>
      </div>
    </div>

    <!-- LEFT BUTTON -->
    <button
      @click="$emit('prev')"
      class="absolute left-2 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 z-30
             bg-white/80 text-purple-700
             w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16
             rounded-full text-xl sm:text-2xl md:text-4xl
             shadow-xl hover:scale-110 transition"
    >
      ❮
    </button>

    <!-- RIGHT BUTTON -->
    <button
      @click="$emit('next')"
      class="absolute right-2 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-30
             bg-white/80 text-pink-600
             w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16
             rounded-full text-xl sm:text-2xl md:text-4xl
             shadow-xl hover:scale-110 transition"
    >
      ❯
    </button>

    <!-- DOTS -->
    <div
      class="absolute bottom-3 sm:bottom-5 md:bottom-8
             left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3"
    >
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="$emit('change', index)"
        class="rounded-full transition-all duration-300"
        :class="activeIndex === index
          ? 'bg-white scale-125 w-3 h-3 sm:w-4 sm:h-4'
          : 'bg-white/50 w-2 h-2 sm:w-3 sm:h-3'"
      ></button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  slides: Array,
  activeIndex: Number,
})

defineEmits(["prev", "next", "change"])
</script>