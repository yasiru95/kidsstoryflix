<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out border-r border-purple-800/40',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- BRAND / LOGO -->
    <div class="h-20 flex items-center justify-between px-6 border-b border-purple-800/40 bg-purple-900/20">
      <NuxtLink to="/admin" class="flex items-center gap-3 group">
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30 group-hover:scale-105 transition">
          👑
        </div>
        <div>
          <div class="text-xl font-extrabold tracking-wide bg-gradient-to-r from-pink-300 via-purple-200 to-yellow-200 bg-clip-text text-transparent">
            StoryFlix
          </div>
          <div class="text-[11px] font-semibold text-purple-300 tracking-wider uppercase flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Admin Portal
          </div>
        </div>
      </NuxtLink>

      <!-- CLOSE BUTTON (Mobile) -->
      <button
        @click="$emit('close')"
        class="lg:hidden p-2 rounded-xl text-purple-300 hover:text-white hover:bg-purple-800/40 transition"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- NAVIGATION LINKS -->
    <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
      <div class="px-3 pb-2 text-[11px] font-bold tracking-wider text-purple-300/60 uppercase">
        Navigation Menu
      </div>

      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        @click="$emit('close')"
        :class="[
          'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 group',
          isActive(item.path)
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
            : 'text-purple-200 hover:bg-purple-900/40 hover:text-white'
        ]"
      >
        <span
          class="text-xl transition-transform duration-200 group-hover:scale-110"
        >
          {{ item.icon }}
        </span>
        <span class="flex-1">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="text-[11px] px-2 py-0.5 rounded-full font-extrabold bg-pink-500/80 text-white"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>

      <div class="pt-6 px-3 pb-2 text-[11px] font-bold tracking-wider text-purple-300/60 uppercase">
        Quick Access
      </div>

      <NuxtLink
        to="/"
        target="_blank"
        class="flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm text-purple-300 hover:bg-purple-900/40 hover:text-white transition group"
      >
        <span class="text-xl transition-transform duration-200 group-hover:scale-110">🌐</span>
        <span class="flex-1">View Live Website</span>
        <svg class="w-4 h-4 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </NuxtLink>
    </nav>

    <!-- ADMIN FOOTER PROFILE -->
    <div class="p-4 border-t border-purple-800/40 bg-purple-950/60">
      <div class="p-3 rounded-2xl bg-slate-900/80 border border-purple-800/30 space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-xl font-bold shadow-md">
            🛡️
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-sm font-bold text-white truncate">
              {{ adminStore.adminUser?.name || 'Administrator' }}
            </div>
            <div class="text-[11px] font-medium text-purple-300 truncate">
              {{ adminStore.adminUser?.email || 'admin@kidsstoryflix.co.uk' }}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between text-[11px] bg-purple-950/80 px-2.5 py-1.5 rounded-lg border border-purple-800/40">
          <span class="text-purple-300">Auth Token:</span>
          <span class="font-mono font-bold text-pink-400">yasiru123</span>
        </div>

        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white font-bold text-xs transition border border-red-500/30"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out of Admin
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router"
import { useAdminStore } from "~/pinaGlobal/admin"

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(["close"])

const route = useRoute()
const adminStore = useAdminStore()

const navItems = [
  { path: "/admin", label: "Dashboard", icon: "📊" },
  { path: "/admin/header-manage", label: "Header Manage", icon: "🎨" },
  { path: "/admin/footer-manage", label: "Footer Manage", icon: "🦶" },
  { path: "/admin/landing-page", label: "Landing Page", icon: "📄" },
  { path: "/admin/stories", label: "Story Library", icon: "📚", badge: "12+" },
  { path: "/admin/users", label: "Kids & Parents", icon: "🧒" },
  { path: "/admin/subscriptions", label: "Subscriptions", icon: "💎" },
  { path: "/admin/settings", label: "System Settings", icon: "⚙️" }
]

const isActive = (path) => {
  if (path === "/admin") {
    return route.path === "/admin"
  }
  return route.path.startsWith(path)
}

const handleLogout = () => {
  if (confirm("Are you sure you want to log out of the Admin Panel?")) {
    adminStore.logoutAdmin()
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.2);
  border-radius: 4px;
}
</style>

