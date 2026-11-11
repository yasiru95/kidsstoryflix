<template>
  <header class="h-20 bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
    <!-- LEFT: MOBILE TOGGLE & TITLE -->
    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="lg:hidden p-2.5 rounded-2xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition shadow-sm"
        aria-label="Toggle Navigation"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
          <span>{{ title }}</span>
          <span class="hidden sm:inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
            Admin Area
          </span>
        </h1>
        <p class="text-xs text-slate-500 font-semibold hidden md:block">
          {{ subtitle || 'Manage KidsStoryFlix platform, stories, subscribers & settings' }}
        </p>
      </div>
    </div>

    <!-- RIGHT: QUICK ACTIONS & ADMIN PILL -->
    <div class="flex items-center gap-3">
      <!-- SECURITY TOKEN PILL -->
      <div class="hidden xl:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-purple-800">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Authorized Token:</span>
        <code class="bg-white px-2 py-0.5 rounded-md text-pink-600 font-mono text-[11px] shadow-xs">yasiru123</code>
      </div>

      <!-- VIEW PUBLIC SITE -->
      <NuxtLink
        to="/"
        target="_blank"
        class="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition border border-purple-100"
      >
        <span>🌟 Live Site</span>
      </NuxtLink>

      <!-- ADMIN BADGE -->
      <div class="flex items-center gap-3 pl-2 sm:border-l border-slate-200">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-extrabold flex items-center justify-center shadow-md text-sm">
          YS
        </div>
        <div class="hidden md:block text-left">
          <div class="text-xs font-black text-slate-800 leading-tight">
            {{ adminStore.adminUser?.name || 'Super Admin' }}
          </div>
          <div class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            Verified Admin
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAdminStore } from "~/pinaGlobal/admin"

defineProps({
  title: {
    type: String,
    default: "Dashboard"
  },
  subtitle: {
    type: String,
    default: ""
  }
})

defineEmits(["toggle-sidebar"])

const adminStore = useAdminStore()
</script>

