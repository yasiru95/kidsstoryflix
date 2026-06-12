<template>
  

  <NavBar />

  
  <div class="min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 font-['Fredoka']">
    <!-- HERO -->
    <div class="w-full overflow-hidden">
      <HeroSlider
        :slides="heroSlides"
        :activeIndex="heroIndex"
        @prev="prevHero"
        @next="nextHero"
        @change="heroIndex = $event"
        class="w-full h-full"
      />
    </div>

    <!-- CATEGORIES -->
    <!-- <catergory :featuredStories="featuredStories" /> -->
    

    <!-- books -->
<!-- BOOKS SECTION -->
<section class="overflow-hidden bg-gradient-to-b from-pink-100 via-sky-100 to-yellow-100 px-4 py-10 sm:px-6 md:px-10 lg:px-16">

  <!-- TITLE -->
  <div class="mb-12 text-center md:mb-16">
    <CuteHeading text="⭐ Books" />
  </div>

  <!-- SLIDER WRAPPER -->
         <div class="relative mx-auto max-w-7xl">

        <!-- LEFT -->
        <button
          @click="prevFeatured"
          class="
            absolute left-2 top-1/2 z-30
            flex items-center justify-center
            h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14
            -translate-y-1/2
            rounded-full
            bg-gradient-to-r from-purple-500 to-pink-500
            text-xl text-white
            shadow-2xl
            transition
            hover:scale-110

            sm:text-2xl
            md:-left-8
            md:text-3xl
          "
        >
          ❮
        </button>

        <!-- STORIES -->
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
              v-for="story in featuredStories"
              :key="story.id"
              :story="story"
            />

          </div>

        </div>

        <!-- RIGHT -->
        <button
          @click="nextFeatured"
          class="
            absolute right-2 top-1/2 z-30
            flex items-center justify-center
            h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14
            -translate-y-1/2
            rounded-full
            bg-gradient-to-r from-purple-500 to-pink-500
            text-xl text-white
            shadow-2xl
            transition
            hover:scale-110

            sm:text-2xl
            md:-right-8
            md:text-3xl
          "
        >
          ❯
        </button>

      </div>

</section>

    <!-- LOADER -->
    <Loadder v-if="loading" />

    <!-- FEATURED STORIES -->
    

      <FooterPart />
  

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

import HeroSlider from "../components/HeroSlider.vue"
import StoryCard from "../components/StoryCard.vue"
import CuteHeading from "../components/CuteHeading.vue"
import { heroSlides } from "../data/storyData.js"
import FooterPart from "../components/FooterPart.vue"
import catergory from "../components/Catergory.vue"
import Loadder from "../components/Loadder.vue"
import NavBar from "../components/NavBar.vue"
import api from '../services/Api.js';
import { Story } from '../models/Story.js';

const heroIndex = ref(0)
const featuredStories = ref([])
const featuredSlider = ref(null)
const loading = ref(true)
const cardWidth = ref(300)

let heroAutoSlide = null
let resizeHandler = null

const nextHero = () => {
  heroIndex.value = (heroIndex.value + 1) % heroSlides.length
}

const prevHero = () => {
  heroIndex.value =
    (heroIndex.value - 1 + heroSlides.length) % heroSlides.length
}

const getCardGap = () => {
  if (window.innerWidth < 640) return 12
  if (window.innerWidth < 1024) return 24
  return 32
}

const nextFeatured = () => {
  if (!featuredSlider.value) return

  const scrollAmount = getCardWidth() + getCardGap()

  featuredSlider.value.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  })
}

const prevFeatured = () => {
  if (!featuredSlider.value) return

  const scrollAmount = getCardWidth() + getCardGap()

  featuredSlider.value.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  })
}

const updateCardWidth = () => {
  if (window.innerWidth < 640) cardWidth.value = 260
  else if (window.innerWidth < 1024) cardWidth.value = 300
  else cardWidth.value = 340
}

const getCardWidth = () => cardWidth.value

const loadStories = async () => {
  loading.value = true

  // await new Promise((r) => setTimeout(r, 2000))

   try {
        const response = await api.get('/stories');
        console.log("Loaded stories back: " + response.data);

          const data = await response.data;
          featuredStories.value = data.map(item => new Story(item));
          // console.log('Parsed data:', featuredStories.value) // log the parsed data
          // featuredStories.value = data
          // console.log('Parsed data22:', data) // log the parsed data
    } catch (error) {
        console.error(error);
    }

  // const response = await fetch("/stories.json")

  loading.value = false
}

onMounted(() => {
  loadStories()

  updateCardWidth()

  heroAutoSlide = setInterval(nextHero, 4000)

  resizeHandler = () => updateCardWidth()

  window.addEventListener("resize", resizeHandler)
})

onUnmounted(() => {
  clearInterval(heroAutoSlide)

  window.removeEventListener("resize", resizeHandler)
})



</script>

<style scoped>



</style>