<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
    <!-- SUNSHINE YELLOW BANNER CONTAINER -->
    <div
      class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#fef3c7] via-[#fffbeb] to-[#fef3c7] p-6 sm:p-8 md:p-10 border-2 border-amber-200/80 shadow-md"
    >
      <!-- HEADER -->
      <div class="text-center mb-6">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-baloo text-amber-950 flex items-center justify-center gap-2">
          <span>Fun Play & Audiobooks!</span>
          <span class="text-2xl">🎧 ✨</span>
        </h2>
        <p class="text-xs sm:text-sm md:text-base font-kids font-semibold text-amber-800/80 mt-1">
          Listen to immersive story audio or spark your creativity with fun games!
        </p>
      </div>

      <!-- TWO INTERACTIVE CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        
        <!-- CARD 1: MAGIC AUDIOBOOKS -->
        <NuxtLink
          to="/all-stories"
          class="group relative overflow-hidden rounded-3xl bg-white/95 p-5 sm:p-6 border-2 border-amber-200/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-pink-300 flex items-center gap-4 cursor-pointer"
        >
          <!-- Audio Waveform / Player Graphic -->
          <div class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-amber-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <div class="flex flex-col items-center">
              <span class="text-3xl sm:text-4xl animate-pulse">▶️</span>
              <span class="text-[10px] font-bold font-kids mt-1">LISTEN</span>
            </div>
          </div>

          <!-- Info -->
          <div>
            <h3 class="text-lg sm:text-xl font-black font-baloo text-purple-950 group-hover:text-pink-600 transition-colors">
              Magic Audiobooks
            </h3>
            <p class="text-xs sm:text-sm font-kids text-gray-600 mt-1 leading-snug">
              Listen along with magical narrations, soothing soundscapes, and character voices.
            </p>
            <div class="mt-2.5 inline-flex items-center gap-1 text-xs font-bold font-kids text-pink-600 group-hover:translate-x-1 transition-transform">
              <span>Explore Audio Stories</span>
              <span>→</span>
            </div>
          </div>
        </NuxtLink>

        <!-- CARD 2: INTERACTIVE QUIZZES & COLORING -->
        <NuxtLink
          to="/all-stories"
          class="group relative overflow-hidden rounded-3xl bg-white/95 p-5 sm:p-6 border-2 border-amber-200/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-400 flex items-center gap-4 cursor-pointer"
        >
          <!-- Painting Palette & Quiz Graphic -->
          <div class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <div class="flex flex-col items-center">
              <span class="text-3xl sm:text-4xl animate-bounceSoft">🎨</span>
              <span class="text-[10px] font-bold font-kids mt-1">PLAY</span>
            </div>
          </div>

          <!-- Info -->
          <div>
            <h3 class="text-lg sm:text-xl font-black font-baloo text-purple-950 group-hover:text-emerald-700 transition-colors">
              Interactive Quizzes & Coloring
            </h3>
            <p class="text-xs sm:text-sm font-kids text-gray-600 mt-1 leading-snug">
              Test what you learned, color your favorite characters, and earn shiny story badges!
            </p>
            <div class="mt-2.5 inline-flex items-center gap-1 text-xs font-bold font-kids text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Start Fun Games</span>
              <span>→</span>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>
