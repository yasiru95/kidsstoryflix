<template>
  <!-- <div class="min-w-[320px] bg-white rounded-[35px] overflow-hidden shadow-2xl hover:scale-105 transition">
    <img :src="story.image" class="w-full h-72 object-cover" />
    <div class="p-8 text-center">
      <h3 class="text-3xl font-extrabold" :class="story.color">{{ story.title }}</h3>
      <p class="mt-4 text-gray-600 text-lg leading-8">{{ story.description }}</p>
      <router-link
        :to="`/story/${story.id}`"
        class="mt-6 inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition"
      >
        📖 Read Story
      </router-link>
    </div>
  </div> -->

  <div
  class="
    group
    relative
    w-[180px]
    sm:w-[200px]
    md:w-[220px]
    shrink-0
    snap-center
  "
>
  <router-link
    :to="`/story/${story.id}`"
    class="block"
  >

    <!-- STORY CARD -->
    <div
      class="
        overflow-hidden
        rounded-2xl

        bg-white


        transition-all
        duration-300

      "
    >

      <!-- IMAGE -->
      <img
        :src="story.image"
        alt="story"
        class="
          h-64
          w-full
          object-cover

          sm:h-72
          md:h-80
        "
      />

    </div>

  </router-link>
</div>

  
</template>

<script setup>
import { Story } from '../models/Story';


const props = defineProps({
  story: {
    type: Object,
    required: true,
  },
})
</script>
