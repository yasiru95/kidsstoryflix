<template>
  <div class="flex gap-3">
    <button
      v-for="index in count"
      :key="index"
      @click="$emit('change', index - 1)"
      class="w-4 h-4 rounded-full transition"
      :class="activeIndex === index - 1 ? 'bg-pink-500 scale-125' : 'bg-pink-200'"
    ></button>
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
})
</script>
