<template>
  <AdminLayout title="Kids & Parents Directory" subtitle="Manage registered users, kids profiles and parental consent">
    <!-- STATS ROW -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 border border-slate-200">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Accounts</div>
        <div class="text-3xl font-black text-slate-800 mt-1">1,248</div>
        <div class="text-xs text-purple-600 font-semibold mt-2">Parents & Family Profiles</div>
      </div>
      <div class="bg-white rounded-3xl p-6 border border-slate-200">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscribed Kids</div>
        <div class="text-3xl font-black text-emerald-600 mt-1">342</div>
        <div class="text-xs text-slate-500 font-semibold mt-2">Active paid story streaming</div>
      </div>
      <div class="bg-white rounded-3xl p-6 border border-slate-200">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Explorer Tier</div>
        <div class="text-3xl font-black text-pink-600 mt-1">906</div>
        <div class="text-xs text-slate-500 font-semibold mt-2">Free story previews</div>
      </div>
    </div>

    <!-- USERS TABLE CONTAINER -->
    <div class="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      <!-- HEADER SEARCH -->
      <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div class="relative sm:w-80">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">🔍</span>
          <input
            v-model="search"
            type="text"
            placeholder="Search parent or kid name..."
            class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-purple-500"
          />
        </div>
        <div class="text-xs font-bold text-slate-400">
          Showing {{ filteredUsers.length }} accounts
        </div>
      </div>

      <!-- TABLE -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/70 border-b border-slate-100 text-[11px] font-black uppercase text-slate-400">
              <th class="py-3.5 px-6">User / Family</th>
              <th class="py-3.5 px-4">Gender</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Joined Date</th>
              <th class="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm font-semibold">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50/60 transition">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                    {{ user.avatar }}
                  </div>
                  <div>
                    <div class="font-extrabold text-slate-800">{{ user.name }}</div>
                    <div class="text-xs text-slate-400 font-mono">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-xs capitalize text-slate-600">
                {{ user.gender }}
              </td>
              <td class="py-4 px-4">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold"
                  :class="user.isSubscribed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="user.isSubscribed ? 'bg-emerald-500' : 'bg-slate-400'"
                  ></span>
                  {{ user.isSubscribed ? 'Subscribed' : 'Free Trial' }}
                </span>
              </td>
              <td class="py-4 px-4 text-xs text-slate-500">
                {{ user.joined }}
              </td>
              <td class="py-4 px-6 text-right">
                <button
                  @click="toggleSub(user)"
                  class="text-xs font-bold px-3 py-1.5 rounded-xl border transition"
                  :class="user.isSubscribed ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'"
                >
                  {{ user.isSubscribed ? 'Revoke Pass' : 'Grant Pass' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Kids & Parents - KidsStoryFlix Admin",
  robots: "noindex, nofollow"
})

import { ref, computed } from "vue"
import AdminLayout from "~/components/admin/AdminLayout.vue"

const search = ref("")

const users = ref([
  { id: 1, name: "Emily Clark", email: "emily@example.com", avatar: "EC", gender: "girl", isSubscribed: true, joined: "2026-10-14" },
  { id: 2, name: "Liam Johnson", email: "liam.j@example.com", avatar: "LJ", gender: "boy", isSubscribed: true, joined: "2026-10-22" },
  { id: 3, name: "Sophia Williams", email: "sophia.w@example.com", avatar: "SW", gender: "girl", isSubscribed: false, joined: "2026-11-01" },
  { id: 4, name: "Oliver Brown", email: "oliver@example.com", avatar: "OB", gender: "boy", isSubscribed: true, joined: "2026-11-04" },
  { id: 5, name: "Ava Taylor", email: "ava.t@example.com", avatar: "AT", gender: "girl", isSubscribed: false, joined: "2026-11-09" }
])

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    return u.name.toLowerCase().includes(search.value.toLowerCase()) ||
           u.email.toLowerCase().includes(search.value.toLowerCase())
  })
})

const toggleSub = (user) => {
  user.isSubscribed = !user.isSubscribed
}
</script>

