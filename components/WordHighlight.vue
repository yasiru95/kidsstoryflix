<!-- <template>
  <div class="text-center text-3xl md:text-4xl font-medium leading-[70px]">
    <span
      v-for="(word, index) in words"
      :key="index"
      class="inline-block mx-1 px-3 py-1 rounded-2xl transition-all duration-300"
      :class="index === activeIndex ? 'bg-yellow-300 text-purple-900 scale-125 shadow-xl animate-pulse' : 'text-gray-700'"
    >
      {{ word.text }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  words: {
    type: Array,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: -1,
  },
})
</script>

<style scoped>
.text-outline {
  color: white;
  -webkit-text-stroke: 2px black;
  font-weight: 800;
  font-size: 2rem;
}
</style> -->
