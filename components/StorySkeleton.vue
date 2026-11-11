<template>
  <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="h-8 w-48 rounded-full bg-white/70 animate-pulse"></div>
      <div class="h-6 w-20 rounded-full bg-pink-200/60 animate-pulse"></div>
    </div>
    <div class="flex gap-4 overflow-hidden">
      <div
        v-for="i in 5"
        :key="i"
        class="w-[200px] sm:w-[230px] md:w-[250px] shrink-0 rounded-3xl bg-white/80 p-3 shadow-md border border-white"
      >
        <div class="h-64 rounded-2xl bg-gradient-to-br from-pink-200/50 via-purple-200/50 to-blue-200/50 animate-pulse"></div>
        <div class="mt-3 h-4 w-3/4 rounded-full bg-purple-200/60 animate-pulse"></div>
        <div class="mt-2 h-3 w-1/2 rounded-full bg-pink-200/50 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
