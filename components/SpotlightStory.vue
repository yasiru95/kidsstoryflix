<template>
  <section v-if="story" class="py-10 select-none">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-700 via-pink-600 to-amber-500 p-1 shadow-2xl"
      >
        <!-- INNER CONTAINER -->
        <div class="relative overflow-hidden rounded-[2.3rem] bg-gradient-to-r from-purple-950/90 via-purple-900/80 to-pink-950/70 p-6 sm:p-10 md:p-12 text-white">
          <!-- FLOATING STARS -->
          <div class="absolute top-4 right-10 text-3xl animate-bounce opacity-80">✨</div>
          <div class="absolute bottom-6 left-12 text-2xl animate-float opacity-70">🌟</div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <!-- STORY COVER -->
            <div class="md:col-span-5 flex justify-center">
              <div class="relative group">
                <!-- GLOW EFFECT -->
                <div class="absolute -inset-2 rounded-3xl bg-gradient-to-r from-yellow-400 to-pink-500 opacity-60 blur-lg transition duration-500 group-hover:opacity-100"></div>

                <div class="relative overflow-hidden rounded-3xl border-4 border-white/80 shadow-2xl w-56 sm:w-64 md:w-72 aspect-[3/4]">
                  <img
                    :src="story.image || defaultImage"
                    :alt="story.title"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div class="absolute top-3 left-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-purple-950 shadow-md">
                    👑 Story of the Day
                  </div>
                </div>
              </div>
            </div>

            <!-- STORY INFO -->
            <div class="md:col-span-7 text-center md:text-left">
              <div class="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3.5 py-1 text-xs sm:text-sm font-bold font-kids text-yellow-300 border border-yellow-400/30 backdrop-blur-md mb-3">
                <span>⭐ Editor's Magic Pick</span>
              </div>

              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-baloo text-white leading-tight">
                {{ story.title }}
              </h2>

              <p class="mt-3 sm:mt-4 text-white/95 text-sm sm:text-base md:text-lg font-medium font-kids leading-relaxed max-w-xl">
                {{ story.description || "Join this unforgettable story full of laughter, friendship, and gentle moral wisdom designed especially for young imaginations." }}
              </p>

              <!-- CHIPS -->
              <div class="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs sm:text-sm font-bold font-kids">
                <span class="rounded-full bg-white/20 px-3.5 py-1 text-white backdrop-blur-md border border-white/20">
                  ⏱️ 5 Min Read
                </span>
                <span class="rounded-full bg-white/20 px-3.5 py-1 text-white backdrop-blur-md border border-white/20">
                  🎧 Audio Read-Along
                </span>
                <span class="rounded-full bg-emerald-400/25 px-3.5 py-1 text-emerald-200 border border-emerald-400/40 backdrop-blur-md">
                  🌈 100% Kid Safe
                </span>
              </div>

              <!-- CTA BUTTON -->
              <div class="mt-6 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <NuxtLink
                  :to="`/story/${story.slug || story.id}`"
                  class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg font-black font-kids text-purple-950 shadow-[0_10px_25px_rgba(251,191,36,0.4)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_15px_30px_rgba(251,191,36,0.6)]"
                >
                  <span>Start Reading Now</span>
                  <span class="text-xl">🚀</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  story: {
    type: Object,
    default: null,
  },
})

const defaultImage = "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp"
</script>
