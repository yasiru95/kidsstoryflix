<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
    <!-- MOBILE SIDEBAR OVERLAY -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
    ></div>

    <!-- SIDEBAR -->
    <AdminSidebar
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <!-- MAIN WRAPPER -->
    <div class="lg:pl-72 flex flex-col min-h-screen">
      <!-- HEADER -->
      <AdminHeader
        :title="title"
        :subtitle="subtitle"
        @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      />

      <!-- CONTENT AREA -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <slot />
      </main>

      <!-- ADMIN FOOTER -->
      <footer class="py-4 px-6 border-t border-slate-200 text-center text-xs font-semibold text-slate-400">
        KidsStoryFlix Admin Engine • Protected by Token Authentication • All rights reserved
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AdminSidebar from "./AdminSidebar.vue"
import AdminHeader from "./AdminHeader.vue"

defineProps({
  title: {
    type: String,
    default: "Admin Portal"
  },
  subtitle: {
    type: String,
    default: ""
  }
})

const isSidebarOpen = ref(false)
</script>

