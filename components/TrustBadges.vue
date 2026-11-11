<template>
  <section class="py-12 select-none">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HEADING -->
      <div class="text-center mb-8 sm:mb-10">
        <h2 class="text-2xl sm:text-3xl font-black font-['Baloo_2'] text-purple-800">
          Loved by Kids • Trusted by Parents 💖
        </h2>
        <p class="mt-1 text-sm sm:text-base font-semibold text-gray-500">
          Designed with love, safety, and imagination in every single story.
        </p>
      </div>

      <!-- BADGES GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center text-center p-6 rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <!-- ICON BUBBLE -->
          <div
            class="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner"
            :class="feature.bgClass"
          >
            {{ feature.icon }}
          </div>

          <h3 class="text-lg font-black text-gray-800 mb-1">
            {{ feature.title }}
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: "🛡️",
    title: "100% Kid Safe & Ad-Free",
    description: "No pop-ups, no external ads, and completely safe browsing for peace of mind.",
    bgClass: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: "🎧",
    title: "Audio & Read-Along",
    description: "Voice-narrated stories that highlight words to encourage independent reading.",
    bgClass: "bg-sky-100 text-sky-600",
  },
  {
    icon: "💡",
    title: "Heartwarming Moral Tales",
    description: "Teaches empathy, courage, curiosity, friendship, and positive values.",
    bgClass: "bg-amber-100 text-amber-600",
  },
  {
    icon: "🌙",
    title: "Bedtime Friendly",
    description: "Soothing nighttime tales tailored to help children drift peacefully to sleep.",
    bgClass: "bg-purple-100 text-purple-600",
  },
]
</script>
