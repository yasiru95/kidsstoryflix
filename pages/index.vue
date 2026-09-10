<template>
  <div
    class="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 font-['Fredoka']"
  >
    <!-- NAVBAR -->
    <NavBar />

    <!-- HERO -->
    <section class="w-full overflow-hidden">
      <HeroSlider
        :slides="heroSlides"
        :activeIndex="heroIndex"
        @prev="prevHero"
        @next="nextHero"
        @change="heroIndex = $event"
        class="w-full h-full"
      />
    </section>

    <!-- BOOKS -->
    <section
      class="overflow-hidden bg-gradient-to-b from-pink-100 via-sky-100 to-yellow-100 px-4 py-10 sm:px-6 md:px-10 lg:px-16"
      aria-labelledby="books-heading"
    >
      <!-- TITLE -->
      <div class="mb-12 text-center md:mb-16">
        <h1
          id="books-heading"
          class="sr-only"
        >
          Children's Stories
        </h1>

        <CuteHeading text="⭐ Books" />
      </div>

      <!-- LOADING -->
      <div
        v-if="pending"
        class="flex min-h-[300px] items-center justify-center"
      >
        <Loadder />
      </div>

      <!-- ERROR -->
      <div
        v-else-if="error"
        class="py-10 text-center"
      >
        <p class="text-lg font-semibold text-red-600">
          Unable to load stories.
        </p>
      </div>

      <!-- STORIES -->
      <div
        v-else
        class="relative mx-auto max-w-7xl"
      >
        <!-- LEFT BUTTON -->
        <button
          type="button"
          aria-label="Previous stories"
          @click="prevFeatured"
          class="
            absolute left-2 top-1/2 z-30
            flex h-10 w-10
            -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-gradient-to-r from-purple-500 to-pink-500
            text-xl text-white
            shadow-2xl
            transition
            hover:scale-110

            sm:h-12 sm:w-12 sm:text-2xl
            md:-left-8 md:h-14 md:w-14 md:text-3xl
          "
        >
          ❮
        </button>

        <!-- STORY SLIDER -->
        <div
          ref="featuredSlider"
          class="
            overflow-x-auto
            scroll-smooth
            scrollbar-none
            snap-x snap-mandatory
            sm:overflow-hidden
          "
        >
          <div
            class="
              flex
              gap-3
              transition-transform duration-500
              sm:gap-4
              md:gap-4
            "
          >
            <StoryCard
              v-for="story in stories"
              :key="story.id"
              :story="story"
            />
          </div>
        </div>

        <!-- RIGHT BUTTON -->
        <button
          type="button"
          aria-label="Next stories"
          @click="nextFeatured"
          class="
            absolute right-2 top-1/2 z-30
            flex h-10 w-10
            -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-gradient-to-r from-purple-500 to-pink-500
            text-xl text-white
            shadow-2xl
            transition
            hover:scale-110

            sm:h-12 sm:w-12 sm:text-2xl
            md:-right-8 md:h-14 md:w-14 md:text-3xl
          "
        >
          ❯
        </button>
      </div>
    </section>

    <!-- FOOTER -->
    <FooterPart />
  </div>
</template>


<script setup>

import {
  ref,
  onMounted,
  onUnmounted
} from "vue"

import HeroSlider from "../components/HeroSlider.vue"
import StoryCard from "../components/StoryCard.vue"
import CuteHeading from "../components/CuteHeading.vue"

import { heroSlides } from "../data/storyData.js"

import FooterPart from "../components/FooterPart.vue"
import Loadder from "../components/Loadder.vue"
import NavBar from "../components/NavBar.vue"

import api from "../services/Api.js"
import { Story } from "../models/Story.js"


// =====================================================
// SEO
// =====================================================

useSeoMeta({

  title: "KidsStoryFlix | Fun Stories for Kids",

  description:
    "Discover fun children's stories, bedtime stories, educational stories and fairy tales for kids on KidsStoryFlix.",

  robots: "index, follow",

  ogTitle:
    "KidsStoryFlix | Fun Stories for Kids",

  ogDescription:
    "Discover fun children's stories, bedtime stories, educational stories and fairy tales for kids on KidsStoryFlix.",

  ogType: "website",

  ogUrl:
    "https://kidsstoryflix.co.uk/",

  ogImage:
    "https://kidsstoryflix.co.uk/images/kidsstoryflix-og.jpg",

  twitterCard:
    "summary_large_image",

  twitterTitle:
    "KidsStoryFlix | Fun Stories for Kids",

  twitterDescription:
    "Discover fun children's stories, bedtime stories, educational stories and fairy tales for kids.",

  twitterImage:
    "https://kidsstoryflix.co.uk/images/kidsstoryflix-og.jpg"

})


// =====================================================
// CANONICAL
// =====================================================

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://kidsstoryflix.co.uk/"
    }
  ]
})


// =====================================================
// LOAD STORIES WITH SSR
// =====================================================
//
// IMPORTANT:
// This replaces:
//
// onMounted(() => {
//     loadStories()
// })
//
// The API is now called during Nuxt SSR.
//

const {
  data: stories,
  pending,
  error
} = await useAsyncData(
  "homepage-stories",

  async () => {

    try {

      const response = await api.get("/stories")

      console.log(
        "Loaded stories:",
        response.data
      )

      const data = response.data
      return response.data
    //   return data.map(
    //     item => new Story(item)
    //   )

    } catch (err) {

      console.error(
        "Failed to load stories:",
        err
      )

      throw createError({
        statusCode: 500,
        statusMessage: "Unable to load stories"
      })

    }

  },

  {
    default: () => []
  }
)


// =====================================================
// HERO
// =====================================================

const heroIndex = ref(0)

const nextHero = () => {

  heroIndex.value =
    (heroIndex.value + 1) %
    heroSlides.length

}

const prevHero = () => {

  heroIndex.value =
    (
      heroIndex.value -
      1 +
      heroSlides.length
    ) %
    heroSlides.length

}


// =====================================================
// STORY SLIDER
// =====================================================

const featuredSlider = ref(null)

const cardWidth = ref(300)


const getCardGap = () => {

  if (window.innerWidth < 640) {
    return 12
  }

  if (window.innerWidth < 1024) {
    return 24
  }

  return 32

}


const getCardWidth = () => {

  return cardWidth.value

}


const nextFeatured = () => {

  if (!featuredSlider.value) {
    return
  }

  const scrollAmount =
    getCardWidth() +
    getCardGap()

  featuredSlider.value.scrollBy({

    left: scrollAmount,

    behavior: "smooth"

  })

}


const prevFeatured = () => {

  if (!featuredSlider.value) {
    return
  }

  const scrollAmount =
    getCardWidth() +
    getCardGap()

  featuredSlider.value.scrollBy({

    left: -scrollAmount,

    behavior: "smooth"

  })

}


// =====================================================
// CARD WIDTH
// =====================================================

const updateCardWidth = () => {

  if (window.innerWidth < 640) {

    cardWidth.value = 260

  } else if (window.innerWidth < 1024) {

    cardWidth.value = 300

  } else {

    cardWidth.value = 340

  }

}


// =====================================================
// HERO AUTO SLIDER
// =====================================================

let heroAutoSlide = null

let resizeHandler = null


onMounted(() => {

  // Browser-only functionality
  updateCardWidth()

  heroAutoSlide =
    setInterval(
      nextHero,
      4000
    )

  resizeHandler =
    () => updateCardWidth()

  window.addEventListener(
    "resize",
    resizeHandler
  )

})


onUnmounted(() => {

  if (heroAutoSlide) {

    clearInterval(
      heroAutoSlide
    )

  }

  if (resizeHandler) {

    window.removeEventListener(
      "resize",
      resizeHandler
    )

  }

})

</script>


<style scoped>

</style>