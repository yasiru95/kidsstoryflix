```vue
<template>
  <NavBar />

  <div
    class="
      min-h-screen
      bg-gradient-to-b
      from-pink-100
      via-blue-100
      to-yellow-100
      p-6
    "
  >
    <div class="max-w-7xl mx-auto">

      <!-- TITLE -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-purple-700">
          📚 All Stories
        </h1>

        <p class="mt-2 text-gray-600 font-semibold">
          Choose a story and start reading 🌈
        </p>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="flex justify-center items-center py-20"
      >
        <div
          class="
            w-12
            h-12
            border-4
            border-purple-200
            border-t-purple-600
            rounded-full
            animate-spin
          "
        ></div>
      </div>

      <!-- ERROR -->
      <div
        v-else-if="storyError"
        class="text-center py-20"
      >
        <p class="text-red-500 font-semibold">
          Unable to load stories.
        </p>
      </div>

      <!-- STORIES -->
      <div
        v-else
        class="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        <StoryCard
          v-for="story in stories"
          :key="story.id"
          :story="story"
        />

        
      </div>

    </div>

  </div>

          <FooterPart />

</template>

<script setup>
useSeoMeta({
  title: "All Kids Stories | KidsStoryFlix",
  description: "Browse bedtime, moral and educational stories for children on KidsStoryFlix.",
  robots: "index, follow",
  ogTitle: "All Kids Stories | KidsStoryFlix",
  ogDescription: "Browse bedtime, moral and educational stories for children on KidsStoryFlix.",
  ogType: "website",
  ogUrl: "https://kidsstoryflix.co.uk/All-Stories",
  ogImage: "https://kidsstoryflix.co.uk/assets/hero.png",
  twitterCard: "summary_large_image"
})

useHead({
  link: [{ rel: "canonical", href: "https://kidsstoryflix.co.uk/All-Stories" }]
})

import NavBar from "../components/NavBar.vue"
import StoryCard from "../components/StoryCard.vue"
import api from "../services/Api.js"
import FooterPart from "../components/FooterPart.vue"


const {
  data: stories,
  pending: loading,
  error: storyError
} = await useAsyncData(
  "stories",
  async () => {
    const response = await api.get("/stories")

    return response.data.data ?? response.data
  }
)
</script>
```
