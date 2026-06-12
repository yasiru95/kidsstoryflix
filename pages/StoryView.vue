<template>
  <NavBar />
  <div class="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 py-[2.5rem] px-[1rem] overflow-hidden">

    <!-- BACK -->
 <div class="max-w-7xl mx-auto mb-[1rem] sm:mb-0">
  <router-link
    to="/"
    class="inline-flex items-center justify-center
           w-[60%] ml-[5rem] sm:w-auto
           px-[1.5rem] py-[0.875rem]
           sm:px-[1.5rem] sm:py-[0.75rem]
           rounded-full shadow-xl
           font-bold text-purple-700
           bg-white
           hover:scale-105 transition"
  >
    ⬅ Back Home
  </router-link>
</div>

    <Loadder v-if="loading" />

    <!-- STORY -->
 <div v-if="story" class="max-w-6xl mx-auto">

  <MobileHint />

<!-- PLAY + FULLSCREEN BUTTONS -->
<div class="flex flex-col sm:flex-row justify-center items-center gap-[1rem] mb-[2rem] px-[0.5rem] sm:px-0">

  <!-- PLAY -->
  <button
    @click="playStoryFromPage"
    class="w-full sm:w-auto px-[2rem] sm:px-[2.5rem] py-[1rem] sm:py-[1.25rem] rounded-full text-[1.25rem] sm:text-[1.5rem] font-bold text-white shadow-2xl
            bg-gradient-to-r from-purple-500 to-pink-500
            hover:scale-110 transition"
  >
    🎧 Play Story
  </button>
  <!-- FULLSCREEN -->
  <button
    @click="toggleHeroFullScreen"
    class="w-full sm:w-auto px-[1.5rem] sm:px-[2rem] py-[1rem] sm:py-[1.25rem] rounded-full text-[1.25rem] sm:text-[1.5rem] font-bold text-purple-700 shadow-2xl
    bg-white hover:scale-110 transition border-[0.125rem] border-purple-200"
  >
    ⛶ Full Screen
  </button>

  

</div>

<!-- HERO -->
 <div
  ref="heroRef"
  :class="[
    'relative overflow-hidden shadow-2xl border-4 border-white w-full aspect-[16/9] sm:h-[26rem] md:h-[32rem] lg:h-[38rem] xl:h-[44rem] rounded-[1.5rem] sm:rounded-[2.5rem] bg-black',

    isIOS && isFullScreen ? 'story-fullscreen-mode' : ''
  ]"
>

<!-- <div
  ref="heroRef"
  class="relative overflow-hidden shadow-2xl border-4 border-white
         w-full aspect-[16/9]
         sm:h-[26rem] md:h-[32rem] lg:h-[38rem] xl:h-[44rem]
         rounded-[1.5rem] sm:rounded-[2.5rem] bg-black"
> -->

  <!-- IMAGE -->
  <transition
    mode="out-in"
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-500 ease-in"
    enter-from-class="opacity-0 translate-x-10"
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-10"
  >
    <img
      :key="currentPage"
      :src="story.pages[currentPage].img"
      class="absolute inset-0 w-full h-full object-cover"
      alt="Story Image"
    />
  </transition>

  <!-- OVERLAY -->
  <div
    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
  ></div>

  <!-- TITLE -->
  <div
    class="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-full px-2 flex justify-center"
  >
    <div
      class="bg-white/90 backdrop-blur-md px-3 sm:px-6 py-2 rounded-full
             shadow-xl border-2 border-pink-200 max-w-[80%] "
    >
      <h1
        class="text-[0.25rem] sm:text-lg md:text-xl lg:text-2xl
               font-extrabold text-pink-600 truncate"
      >
        {{ story.title }}
      </h1>
    </div>
  </div>

  <!-- STAR -->
  <div
    class="absolute top-14 left-3 sm:left-6 text-xl sm:text-3xl animate-bounce"
  >
    🌟
  </div>

  <!-- PREV -->
  <button
    @click="prevPage"
    class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
           w-10 h-10 sm:w-14 sm:h-14
           rounded-full bg-white/90 shadow-xl
           flex items-center justify-center
           text-lg sm:text-2xl text-purple-600
           hover:scale-110 transition"
  >
    ❮
  </button>

  <!-- NEXT -->
  <button
    @click="nextPage"
    class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
           w-10 h-10 sm:w-14 sm:h-14
           rounded-full bg-white/90 shadow-xl
           flex items-center justify-center
           text-lg sm:text-2xl text-purple-600
           hover:scale-110 transition"
  >
    ❯
  </button>

  <!-- STORY TEXT -->
  <div
  class="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2
         w-[95%] sm:w-[90%]
         flex justify-center"
>
  <div
    class="bg-white/50 backdrop-blur-md
           px-3 sm:px-5 py-2 sm:py-3
           rounded-2xl sm:rounded-full
           border border-white/80
           shadow-xl
           h-[2.7rem] sm:h-auto 
           overflow-hidden
           max-w-full"
  >
    <transition name="fade" mode="out-in">
      <div
        :key="currentPage"
        class="text-center leading-relaxed"
      >
        <span class="mr-2">💬</span>

        <span
          v-for="(word, index) in currentSentenceData.words"
          :key="index"
          @click="playStoryFromPage"
          class="
            inline-block
            mx-[3px]
            sm:mx-[4px]
            py-[1px]
            text-[12px]
            sm:text-[15px]
            md:text-[20px]
            font-semibold
            cursor-pointer
            transition-all duration-300
          "
          :class="[
            activeWordIndex === index
             ? 'text-highlight scale-105 shadow-md'
                  : 'text-outline',
              // ? 'text-pink-600 scale-110'
              // : 'text-gray-800'
          ]"
        >
          {{ word.text }}
        </span>

      </div>
    </transition>
  </div>
</div>

</div>


<!-- WHITE CONTROL BOX -->
<div
  class="
      w-full
    max-w-5xl
    mx-auto
    mt-4
    relative z-10
    bg-white
    shadow-xl
    border-4 border-pink-100
    px-3 sm:px-6
    py-3
    rounded-3xl sm:rounded-full
  "
>

  <div class=" flex
      flex-wrap
      justify-center
      items-center
      gap-4">

    <!-- DOTS -->
    <div class="flex
        flex-wrap
        justify-center
        gap-2">
      <div
        v-for="(p, index) in story.pages"
        :key="index"
        @click="goToPage(index)"
        class="rounded-full cursor-pointer transition"
        :class="[
          currentPage === index
            ? 'bg-pink-500 shadow-lg'
            : 'bg-pink-200 hover:bg-pink-300',
          'w-[0.5rem] h-[0.5rem] sm:w-[1rem] sm:h-[1rem]'
        ]"
      ></div>
    </div>

    <!-- INFO -->
    <span
      class="font-semibold text-purple-700 whitespace-nowrap
             text-[0.625rem] sm:text-[1rem] shrink-0"
    >
      📖 {{ currentPage + 1 }}/{{ story.pages.length }}
    </span>

    <!-- CONTROLS -->
    <div class="flex items-center gap-[0.75rem] sm:gap-[0.5rem] shrink-0">

      <!-- PREV -->
      <button
        @click="prevPage"
        class="flex items-center justify-center rounded-full
               bg-pink-100 text-pink-600
               w-[1.5rem] h-[1.5rem] sm:w-[2.5rem] sm:h-[2.5rem]
               text-[0.625rem] sm:text-[1.125rem]
               hover:scale-110 transition"
      >
        ⬅
      </button>

      <!-- INPUT -->
      <input
        v-model="pageInput"
        type="number"
        min="1"
        :max="story.pages.length"
        @keyup.enter="jumpToPage"
        placeholder="Page No"
        class="text-center font-bold text-purple-700 outline-none
               border border-pink-100 bg-pink-50
               rounded-full
               w-[5rem]  h-[1.5rem] text-[0.625rem]
              sm:text-[0.875rem] 
               focus:border-pink-400 focus:bg-white"
      />

      <!-- GO -->
      <button
        @click="jumpToPage"
        class="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold
               rounded-full transition hover:scale-105
               text-[0.5625rem] px-[0.5rem] py-[0.125rem]
               sm:text-[0.75rem] sm:px-[0.75rem] sm:py-[0.25rem]"
      >
        Go
      </button>

      <!-- NEXT -->
      <button
        @click="nextPage"
        class="flex items-center justify-center rounded-full
               bg-blue-100 text-blue-600
               w-[1.5rem] h-[1.5rem] sm:w-[2.5rem] sm:h-[2.5rem]
               text-[0.625rem] sm:text-[1.125rem]
               hover:scale-110 transition"
      >
        ➡
      </button>

    </div>

  </div>
</div>

    </div>

    <!-- NOT FOUND -->
    <NotFound v-else />

  </div>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
  onMounted,
  onUnmounted
} from "vue"
import NotFound from "../components/NotFound.vue"
import NavBar from "../components/NavBar.vue"

import { useRoute } from "vue-router"
import Loadder from "../components/Loadder.vue"
import MobileHint from "../components/ForMobile.vue"
import api from '../services/Api.js';

import router from "../router"

import { globalStore } from "../pinaGlobal/global"
const global = globalStore()


const popSound = new Audio("../assets/sounds/pop.wav")


const checkSubscription = async () => {
  console.log("Checking subscription for user ID:", global.userLogin.id)


try {

  const response = await api.get('/subscription', {
    headers: {
      Authorization: `Bearer ${global.userLogin.token}`
    },
    params: {
      user_id: global.userLogin.id,
    }
  })

  global.isKidSubscribed = response.data.has_subscription

} catch (error) {

  // Laravel responded with an error
  if (error.response) {

    console.error('Status:', error.response.status)
    console.error('Backend Error:', error.response.data)

    // Validation errors (422)
    if (error.response.status === 422) {
      console.log(error.response.data.errors)
    }

    // Unauthorized (401)
    else if (error.response.status === 401) {
      alert(error.response.data.message || 'Unauthorized')
    }

    // Forbidden (403)
    else if (error.response.status === 403) {
      alert(error.response.data.message || 'Access denied')
    }

    // Not found (404)
    else if (error.response.status === 404) {
      alert(error.response.data.message || 'Resource not found')
    }

    // Server error (500)
    else if (error.response.status === 500) {
      alert(error.response.data.message || 'Server error')
    }

  }
  // No response from server
  else if (error.request) {
    console.error('No response from server')
    alert('Cannot connect to server')
  }
  // Other error
  else {
    console.error(error.message)
    alert(error.message)
  }
}


  // if (!global.isKidSubscribed) {
  //  alert( JSON.parse(user).id)

  // }
}







function playPop() {
  popSound.currentTime = 0
  popSound.volume = 0.4
  popSound.play()
}


const heroRef = ref(null)
const isFullScreen = ref(false)
const isIOS = ref(false)

const toggleHeroFullScreen = async () => {
    isFullScreen.value = !isFullScreen.value
 const el = heroRef.value
  if (!el) return

  try {
    if (!document.fullscreenElement) {
      await el.requestFullscreen?.()
      playStoryFromPage()
    } else {
      await document.exitFullscreen?.()
    }
  } catch (e) {
    // fallback for iOS Safari
    document.body.style.position = "fixed"
    document.body.style.top = "0"
    document.body.style.left = "0"
    document.body.style.width = "100%"
    document.body.style.height = "100%"
  }
}

/* ================= FULLSCREEN EXIT EVENT ================= */

const handleFullScreenChange = () => {
  const isNowFullscreen = !!document.fullscreenElement

  isFullScreen.value = isNowFullscreen

  // EXITED FULLSCREEN
  if (!isNowFullscreen) {
    stopAudio()
  }
}

/* ================= MOUNT ================= */

onMounted(() => {
  isIOS.value = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  loadStories()
  if (global.userLogin?.token) {
    console.log("User logged in, checking subscription...") 
    checkSubscription()
  }

  document.addEventListener(
    "fullscreenchange",
    handleFullScreenChange
  )
})

/* ================= UNMOUNT ================= */

onUnmounted(() => {
  document.removeEventListener(
    "fullscreenchange",
    handleFullScreenChange
  )

  stopAudio()
})

const heroClass = computed(() =>
  isFullScreen.value
    ? "fixed inset-0 w-screen h-screen rounded-none border-0 z-50"
    : "relative w-full h-[420px] md:h-[520px] rounded-[40px] border-8 border-white"
)

const route = useRoute()

const currentPage = ref(0)
const currentSentence = ref(0)
const activeWordIndex = ref(-1)

let animationFrame = null
let currentAudio = null


const story= ref(null)
const loading = ref(true)

const loadStories = async () => {
  try {
    loading.value = true

      // simulate API loading
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    // fake API call
    // const response = await fetch("../storyPage.json")
    const response = await api.get('/stories/' + route.params.id);
    console.log("Loaded story back:", response.data['data'])

    // await new Promise((r) => setTimeout(r, 1000))

    story.value = response.data['data']
    console.log("Loaded story mp3:", story.value.pages[currentPage.value].audio) // log the loaded story
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}



/* ================= STORY ================= */


/* ================= STORY ================= */
// const story = computed(() =>
//   stories.value.find((s) => s.id === Number(route.params.id))
  
// )
console.log("Current story:", story) // log the current story
/* ================= CURRENT SENTENCE ================= */
const currentSentenceData = computed(() => {
  return story.value.pages[currentPage.value].sentences[currentSentence.value]
})

console.log("Current sentence data:", currentSentenceData) // log the current sentence data
console.log("Is kid subscribed:", global.isKidSubscribed) // log the current sentence data

/* ================= AUDIO ================= */
const playStoryFromPage = () => {
  // alert(global.isKidSubscribed+'page: '+currentPage.value)

 // ✅ subscribed users
  if (global.isKidSubscribed) {

    playAudio(
      story.value.pages[currentPage.value].audio
    )

  }

  // ✅ free pages
  else if (currentPage.value < 2) {

    playAudio(
      story.value.pages[currentPage.value].audio
    )

  }

  // ❌ locked pages
  else {

    alert("🌟 Subscribe to unlock all magical stories!")
    router.push("/subscribe?isAgeGate=subs")
  }


}

const playAudio = (audioFile) => {
  stopAudio()

  const page = story.value.pages[currentPage.value]
  const audio = new Audio(audioFile)
  currentAudio = audio

  currentSentence.value = 0
  activeWordIndex.value = -1

  audio.play()

  const sync = () => {
    const time = audio.currentTime*1000
    const sentence = page.sentences[currentSentence.value]

    if (!sentence) return

    // sentence switch
    for (let i = 0; i < page.sentences.length; i++) {
      const last = page.sentences[i].words.at(-1)
      if (time <= last.end) {
        currentSentence.value = i
        break
      }
    }

    const words = sentence.words

    let index = words.length - 1
    for (let i = 0; i < words.length; i++) {
      if (time < words[i].end) {
        index = i
        break
      }
    }

    activeWordIndex.value = index

    animationFrame = requestAnimationFrame(sync)
  }

  sync()

  audio.onended = () => {
    stopAudio()

    if (currentPage.value < story.value.pages.length - 1) {
      setTimeout(() => {
        currentPage.value++
        playStoryFromPage()
      }, 1200)
    }
  }
}

/* ================= STOP ================= */
const stopAudio = () => {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
  }

  currentAudio = null
  activeWordIndex.value = -1

  if (animationFrame) cancelAnimationFrame(animationFrame)
}

/* ================= NAV ================= */
const nextPage = () => {
  playPop()
  if (currentPage.value < story.value.pages.length - 1) {
    currentPage.value++
    stopAudio()
    
  }
}

const prevPage = () => {
  playPop()
  if (currentPage.value > 0) {
    currentPage.value--
    stopAudio()
  }
}

const goToPage = (i) => {
  currentPage.value = i
  currentSentence.value = 0
  stopAudio()
}

/* RESET */
watch(
  () => route.params.id,
  () => {
    currentPage.value = 0
    currentSentence.value = 0
    stopAudio()
  }
)
//Stop page scroll when fullscreen ON:
watch(isFullScreen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})


const pageInput = ref("")

const jumpToPage = () => {
  const page = Number(pageInput.value)

  if (
    !isNaN(page) &&
    page >= 1 &&
    page <= story.value.pages.length
  ) {
    goToPage(page - 1)

    pageInput.value = ""
  }
}



</script>

<style scoped>

.story-fullscreen-mode {
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;
  height: 100dvh;

  z-index: 9999;
  overflow: hidden;
  background: black;
}



.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}


.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Mobile */
.text-outline {
    color: white;
    font-weight: 900;
    text-shadow:
        -1px -1px 0 #000,
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;
}




.text-highlight {
    color: yellow;
    font-weight: 900;
    text-shadow:
        -1px -1px 0 #000,
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;
}


/* Tablet */
@media (min-width: 640px) {
    .text-outline, .text-highlight {
        text-shadow:
            -2px -2px 0 #000,
             2px -2px 0 #000,
            -2px  2px 0 #000,
             2px  2px 0 #000,
            -2px  0 0 #000,
             2px  0 0 #000,
             0 -2px 0 #000,
             0  2px 0 #000;
    }
}

/* Desktop */
@media (min-width: 768px) {
    .text-outline, .text-highlight {
        text-shadow:
            -3px -3px 0 #000,
             3px -3px 0 #000,
            -3px  3px 0 #000,
             3px  3px 0 #000,
            -3px  0 0 #000,
             3px  0 0 #000,
             0 -3px 0 #000,
             0  3px 0 #000;
    }
}




</style>