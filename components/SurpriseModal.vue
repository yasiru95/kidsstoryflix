<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="isOpen && story"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-sm select-none"
        @click.self="$emit('close')"
      >
        <div
          class="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white via-purple-50 to-pink-50 p-6 sm:p-8 text-center shadow-2xl border-4 border-yellow-300 animate-wiggle"
        >
          <!-- CLOSE BUTTON -->
          <button
            @click="$emit('close')"
            aria-label="Close modal"
            class="absolute top-4 right-4 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition"
          >
            ✕
          </button>

          <!-- TOP CELEBRATION -->
          <div class="text-4xl mb-2 animate-bounce">
            🎉 🎲 ✨
          </div>

          <h3 class="text-2xl sm:text-3xl font-black font-['Baloo_2'] text-purple-800">
            Abracadabra!
          </h3>
          <p class="text-xs sm:text-sm font-bold text-pink-600 mb-4">
            The magic dice picked this story for you:
          </p>

          <!-- STORY PREVIEW CARD -->
          <div class="overflow-hidden rounded-2xl bg-white shadow-lg border-2 border-purple-100 mb-6">
            <img
              :src="story.image || defaultImage"
              :alt="story.title"
              class="h-48 w-full object-cover"
            />
            <div class="p-3">
              <h4 class="font-black text-lg text-gray-800 line-clamp-1">
                {{ story.title }}
              </h4>
              <p class="text-xs text-gray-500 font-medium line-clamp-2 mt-1">
                {{ story.description || "Get ready for an exciting magical journey!" }}
              </p>
            </div>
          </div>

          <!-- ACTIONS -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <NuxtLink
              :to="`/story/${story.slug || story.id}`"
              @click="$emit('close')"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-base font-black text-white shadow-lg hover:scale-105 active:scale-95 transition"
            >
              <span>Read Story Now</span>
              <span>📖</span>
            </NuxtLink>

            <button
              @click="$emit('spin-again')"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-1 rounded-full bg-white px-5 py-3 text-sm font-bold text-purple-700 border border-purple-200 shadow-sm hover:bg-purple-50 transition"
            >
              <span>Roll Again 🎲</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  story: {
    type: Object,
    default: null,
  },
})

defineEmits(["close", "spin-again"])

const defaultImage = "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779272834/6_bli0uv.webp"
</script>
