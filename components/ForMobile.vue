<template>
    <!-- MOBILE LANDSCAPE + FULLSCREEN HINT -->
<div
  class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 text-center px-6"
  v-if="showRotateHint"
>
  <div
    class="bg-white rounded-[30px] shadow-2xl border-4 border-pink-200 p-6 max-w-sm "
  >
    <div class="text-6xl">📱➡️📺</div>

    <h2 class="mt-4 text-2xl font-extrabold text-purple-700">
      Better Experience! (Use laptop or tablet)
    </h2>

    <p class="mt-3 text-base text-gray-600 leading-6">
      Please rotate your device to <br><b>Landscape Mode</b> and use <b>Full Screen</b> ✨
    </p>

    <div class="mt-4 text-pink-600 font-bold text-sm">
      🌈 For magical story reading!
    </div>

    <button
      @click="showRotateHint = false"
      class="mt-5 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition"
    >
      Got it 👍
    </button>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const showRotateHint = ref(false)

const checkOrientation = () => {
  const isMobile = window.innerWidth < 768
  const isPortrait = window.matchMedia("(orientation: portrait)").matches

  showRotateHint.value = isMobile && isPortrait
}

onMounted(() => {
  checkOrientation()
  window.addEventListener("resize", checkOrientation)
  window.addEventListener("orientationchange", checkOrientation)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkOrientation)
  window.removeEventListener("orientationchange", checkOrientation)
})
</script>