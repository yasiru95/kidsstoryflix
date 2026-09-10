<template>
  <div class="p-10 text-center">

    <!-- PAGE TEXT -->
    <div
      class="text-4xl font-bold leading-relaxed max-w-5xl mx-auto"
    >

      <span
        v-for="(word, index) in pages[currentPage]"
        :key="index"
        class="inline-block mr-4 transition-all duration-150"
        :class="
          activeWordIndex === index
            ? 'text-yellow-400 scale-125'
            : 'text-gray-800'
        "
      >
        {{ word.text }}
      </span>

    </div>


    <!-- CONTROLS -->
    <div class="mt-10 flex justify-center gap-4">

      <button
        @click="playAudio"
        class="px-6 py-3 bg-purple-500 text-white rounded-full"
      >
        ▶ Play
      </button>

      <button
        @click="stopAudio"
        class="px-6 py-3 bg-red-500 text-white rounded-full"
      >
        ⏹ Stop
      </button>

      <button
        @click="previousPage"
        class="px-6 py-3 bg-gray-300 rounded-full"
      >
        ←
      </button>

      <button
        @click="nextPage"
        class="px-6 py-3 bg-blue-500 text-white rounded-full"
      >
        →
      </button>

    </div>


    <p class="mt-5">
      Page {{ currentPage + 1 }} / {{ pages.length }}
    </p>

  </div>
</template>


<script setup>

import { ref, onUnmounted } from 'vue'


/*
|--------------------------------------------------------------------------
| ONE MP3
|--------------------------------------------------------------------------
*/

const audioUrl =
  'https://kidsstoryflix-images.s3.us-east-1.amazonaws.com/Stories/princess-lilla/audio/page-1.mp3'


/*
|--------------------------------------------------------------------------
| PAGES
|
| IMPORTANT:
| start/end are GLOBAL MP3 TIMES
|
|--------------------------------------------------------------------------
*/

const pages = [

  // ============================================================
  // PAGE 1
  // 0s → 4s
  // ============================================================

  [
    { text: 'Once', start: 0, end: 1 },
    { text: 'upon', start: 1, end: 1 },
    { text: 'a', start: 1, end: 1 },
    { text: 'time', start: 1, end: 2 },
    { text: 'there', start: 2, end: 2 },
    { text: 'was', start: 2, end: 2 },
    { text: 'a', start: 2, end: 2 },
    { text: 'kind', start: 2, end: 2 },
    { text: 'princess', start: 2, end: 3 },
    { text: 'named', start: 3, end: 3 },
    { text: 'Lila', start: 3, end: 4 }
  ],


  // ============================================================
  // PAGE 2
  // 4s → 8s
  // ============================================================

  [
    { text: 'She', start: 4, end: 5 },
    { text: 'lived', start: 5, end: 5 },
    { text: 'in', start: 5, end: 5 },
    { text: 'a', start: 5, end: 5 },
    { text: 'bright', start: 5, end: 6 },
    { text: 'castle', start: 6, end: 6 },
    { text: 'near', start: 6, end: 6 },
    { text: 'a', start: 6, end: 6 },
    { text: 'green', start: 6, end: 7 },
    { text: 'forest', start: 7, end: 8 }
  ],


  // ============================================================
  // PAGE 3
  // 8s → 12s
  // ============================================================

  [
    { text: 'Every', start: 8, end: 8 },
    { text: 'morning', start: 8, end: 9 },
    { text: 'she', start: 9, end: 9 },
    { text: 'said', start: 9, end: 10 },
    { text: 'Good', start: 10, end: 10 },
    { text: 'day', start: 10, end: 10 },
    { text: 'world', start: 10, end: 11 },
    { text: 'with', start: 11, end: 11 },
    { text: 'a', start: 11, end: 11 },
    { text: 'smile', start: 11, end: 12 }
  ]

]


/*
|--------------------------------------------------------------------------
| PAGE START / END
|--------------------------------------------------------------------------
*/

const pageStartTimes = [
  0,
  4,
  8
]

const pageEndTimes = [
  4,
  8,
  12
]


/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const currentPage = ref(0)

const activeWordIndex = ref(-1)

let audio = null

let animationFrame = null


/*
|--------------------------------------------------------------------------
| PLAY
|--------------------------------------------------------------------------
*/

const playAudio = async () => {

  /*
   * Create audio only once
   */

  if (!audio) {

    audio = new Audio(audioUrl)

    audio.addEventListener('ended', () => {

      stopAudio()

      currentPage.value = 0

    })

  }


  /*
   * Start MP3 from current page
   */

  audio.currentTime =
    pageStartTimes[currentPage.value]


  try {

    await audio.play()

    syncWords()

  } catch (error) {

    console.error('Audio error:', error)

  }

}


/*
|--------------------------------------------------------------------------
| SYNC WORDS
|--------------------------------------------------------------------------
*/

const syncWords = () => {

  if (!audio) return


  /*
   * Current MP3 time in SECONDS
   */

  const currentTime =
    audio.currentTime


  /*
   * ----------------------------------------------------------
   * AUTOMATIC PAGE CHANGE
   * ----------------------------------------------------------
   */

  if (
    currentPage.value < pages.length - 1 &&
    currentTime >= pageEndTimes[currentPage.value]
  ) {

    currentPage.value++

    activeWordIndex.value = -1

  }


  /*
   * ----------------------------------------------------------
   * LAST PAGE
   * ----------------------------------------------------------
   */

  if (
    currentPage.value === pages.length - 1 &&
    currentTime >= pageEndTimes[currentPage.value]
  ) {

    stopAudio()

    return

  }


  /*
   * ----------------------------------------------------------
   * FIND WORD
   * ----------------------------------------------------------
   */

  const words =
    pages[currentPage.value]


  const index =
    words.findIndex(word => {

      return (
        currentTime >= word.start &&
        currentTime < word.end
      )

    })


  /*
   * Highlight current word
   */

  activeWordIndex.value = index


  /*
   * Continue checking
   */

  animationFrame =
    requestAnimationFrame(syncWords)

}


/*
|--------------------------------------------------------------------------
| STOP
|--------------------------------------------------------------------------
*/

const stopAudio = () => {

  if (animationFrame) {

    cancelAnimationFrame(animationFrame)

    animationFrame = null

  }


  if (audio) {

    audio.pause()

  }


  activeWordIndex.value = -1

}


/*
|--------------------------------------------------------------------------
| NEXT PAGE
|--------------------------------------------------------------------------
*/

const nextPage = () => {

  stopAudio()

  if (currentPage.value < pages.length - 1) {

    currentPage.value++

  }

}


/*
|--------------------------------------------------------------------------
| PREVIOUS PAGE
|--------------------------------------------------------------------------
*/

const previousPage = () => {

  stopAudio()

  if (currentPage.value > 0) {

    currentPage.value--

  }

}


/*
|--------------------------------------------------------------------------
| CLEANUP
|--------------------------------------------------------------------------
*/

onUnmounted(() => {

  stopAudio()

})

</script>