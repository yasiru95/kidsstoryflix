<template>
  <div class="text-center">
    <h2
      @click="playPop"
      @mouseenter="playPop"
      class="
        inline-block
        cursor-pointer
        select-none
        rounded-full
        px-6 sm:px-8
        py-3 sm:py-4
        text-3xl sm:text-5xl
        font-black
        font-[Baloo_2]
        text-purple-700
        bg-gradient-to-br
        from-white
        to-violet-50
        shadow-[0_8px_18px_rgba(109,40,217,0.15)]
        hover:shadow-[0_16px_30px_rgba(109,40,217,0.25)]
        hover:scale-110
        hover:-rotate-1
        transition-all
        duration-300
        animate-bounce
      "
      style="
        text-shadow:
          -2px -2px 0 white,
           2px -2px 0 white,
          -2px  2px 0 white,
           2px  2px 0 white,
           0 0 6px rgba(168,85,247,0.25);
      "
    >
      {{ text }}
    </h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  text: {
    type: String,
    default: "⭐ Categories"
  }
})

const popSound = ref(null)

onMounted(() => {
  if (process.client) {
    popSound.value = new Audio("../assets/sounds/pop.wav")
  }
})

function playPop() {
  if (popSound.value) {
    popSound.value.currentTime = 0
    popSound.value.volume = 0.4
    popSound.value.play()
  }
}
</script>