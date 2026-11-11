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
        text-2xl sm:text-4xl md:text-5xl
        font-black
        font-['Baloo_2']
        text-purple-700
        bg-gradient-to-br
        from-white
        to-violet-50
        border-2 border-white
        shadow-[0_8px_18px_rgba(109,40,217,0.12)]
        hover:shadow-[0_16px_30px_rgba(109,40,217,0.22)]
        hover:scale-105
        active:scale-95
        transition-all
        duration-300
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
defineProps({
  text: {
    type: String,
    default: "⭐ Categories"
  }
})

function playPop() {
  if (!import.meta.client) return
  try {
    const popSound = new Audio("/assets/sounds/pop.wav")
    popSound.currentTime = 0
    popSound.volume = 0.3
    popSound.play().catch(() => {})
  } catch (err) {}
}
</script>
