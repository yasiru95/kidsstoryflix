<template>
  <AdminLayout title="System Settings" subtitle="Configure platform security, API endpoints and admin credentials">
    <div class="max-w-4xl space-y-6">
      <!-- SECURITY & TOKEN CARD -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div class="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <div class="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl font-bold">
            🛡️
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-800">Admin Security & Access Token</h3>
            <p class="text-xs text-slate-400 font-semibold">Master token controlling admin panel authentication</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">
              Active Admin Secret Token
            </label>
            <div class="flex items-center gap-3">
              <input
                type="text"
                readonly
                :value="adminStore.ADMIN_SECRET_TOKEN"
                class="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono font-bold text-pink-600 text-sm focus:outline-none"
              />
              <button
                @click="copyToken"
                class="px-4 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition border border-purple-200"
              >
                {{ copied ? 'Copied! ✅' : 'Copy Token 📋' }}
              </button>
            </div>
            <p class="text-[11px] text-slate-400 mt-1">
              This token (<code class="font-bold text-pink-600">yasiru123</code>) is required whenever logging into <code class="text-purple-600">/admin/login</code>.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Default Admin Email</label>
              <input
                type="text"
                readonly
                :value="adminStore.DEFAULT_ADMIN_EMAIL"
                class="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Admin Password</label>
              <input
                type="text"
                readonly
                :value="adminStore.DEFAULT_ADMIN_PASSWORD"
                class="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- BACKEND API INTEGRATION CARD -->
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div class="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
          <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
            🔌
          </div>
          <div>
            <h3 class="text-lg font-black text-slate-800">Backend API Services</h3>
            <p class="text-xs text-slate-400 font-semibold">External Laravel REST API connection details</p>
          </div>
        </div>

        <div class="space-y-4 text-xs font-semibold">
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase mb-1">Base API URL</label>
            <input
              type="text"
              readonly
              value="https://api.kidsstoryflix.co.uk/api"
              class="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-purple-700"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-slate-400 block text-[10px]">AUTH SERVICE</span>
              <span class="text-slate-700 font-bold">Sanctum Bearer</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-slate-400 block text-[10px]">PAYMENTS</span>
              <span class="text-slate-700 font-bold">Stripe Checkout</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-slate-400 block text-[10px]">SSR STATUS</span>
              <span class="text-emerald-600 font-bold">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "System Settings - KidsStoryFlix Admin",
  robots: "noindex, nofollow"
})

import { ref } from "vue"
import AdminLayout from "~/components/admin/AdminLayout.vue"
import { useAdminStore } from "~/pinaGlobal/admin"

const adminStore = useAdminStore()
const copied = ref(false)

const copyToken = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(adminStore.ADMIN_SECRET_TOKEN)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

