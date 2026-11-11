<template>
  <AdminLayout title="Overview Dashboard" subtitle="Live statistics, story catalog & platform activity">
    <!-- WELCOME BANNER -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl mb-8">
      <div class="absolute -right-10 -bottom-10 text-9xl opacity-20 select-none">
        👑
      </div>
      <div class="relative z-10 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Admin Access Verified (Token: <code class="font-mono text-yellow-200">yasiru123</code>)</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-black">
          Welcome to KidsStoryFlix Management! 🚀
        </h2>
        <p class="mt-2 text-sm text-purple-100 font-medium leading-relaxed">
          Manage your magical children's story library, monitor paid subscribers, oversee kid profiles, and configure system settings directly from this console.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <NuxtLink
            to="/admin/stories"
            class="px-4 py-2.5 rounded-xl bg-white text-purple-900 font-black text-xs hover:bg-yellow-300 transition shadow-md inline-flex items-center gap-2"
          >
            <span>📚 Manage Stories</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/subscriptions"
            class="px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 text-white font-bold text-xs transition border border-white/20 inline-flex items-center gap-2"
          >
            <span>💎 View Subscriptions</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- METRICS GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition"
      >
        <div class="flex items-center justify-between mb-4">
          <span class="text-3xl p-3 rounded-2xl" :class="stat.iconBg">
            {{ stat.icon }}
          </span>
          <span
            class="text-xs font-extrabold px-2.5 py-1 rounded-full"
            :class="stat.trendColor"
          >
            {{ stat.trend }}
          </span>
        </div>
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {{ stat.title }}
        </div>
        <div class="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
          {{ stat.value }}
        </div>
        <div class="text-xs font-medium text-slate-500 mt-2">
          {{ stat.description }}
        </div>
      </div>
    </div>

    <!-- MAIN TWO-COLUMN SECTION -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <!-- LEFT 2 COLUMNS: STORY CATALOG PREVIEW -->
      <div class="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 flex items-center gap-2">
              <span>📖 Story Library Overview</span>
            </h3>
            <p class="text-xs text-slate-500 font-medium">Recent stories published on the platform</p>
          </div>
          <NuxtLink
            to="/admin/stories"
            class="text-xs font-bold text-purple-600 hover:text-purple-800 transition flex items-center gap-1"
          >
            <span>View All</span>
            <span>→</span>
          </NuxtLink>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-[11px] font-black uppercase text-slate-400">
                <th class="pb-3 pl-2">Story</th>
                <th class="pb-3 px-3">Category</th>
                <th class="pb-3 px-3">Target Age</th>
                <th class="pb-3 px-3">Status</th>
                <th class="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr
                v-for="story in sampleStories"
                :key="story.id"
                class="hover:bg-slate-50/70 transition"
              >
                <td class="py-3.5 pl-2">
                  <div class="flex items-center gap-3">
                    <img
                      :src="story.image"
                      :alt="story.title"
                      class="w-12 h-12 rounded-xl object-cover shadow-xs border border-slate-100"
                    />
                    <div>
                      <div class="font-extrabold text-slate-800">{{ story.title }}</div>
                      <div class="text-xs text-slate-400 truncate max-w-xs">{{ story.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3.5 px-3">
                  <span class="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                    {{ story.category }}
                  </span>
                </td>
                <td class="py-3.5 px-3 font-semibold text-slate-600 text-xs">
                  {{ story.age }}
                </td>
                <td class="py-3.5 px-3">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Live
                  </span>
                </td>
                <td class="py-3.5 pr-2 text-right">
                  <NuxtLink
                    :to="`/story/${story.slug}`"
                    target="_blank"
                    class="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 transition inline-flex items-center gap-1"
                  >
                    <span>Read</span>
                    <span>↗</span>
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- RIGHT 1 COLUMN: RECENT ACTIVITIES & SYSTEM STATUS -->
      <div class="space-y-6">
        <!-- RECENT SUBSCRIBERS -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-black text-slate-800">
              ⚡ Recent Subscribers
            </h3>
            <span class="text-xs font-bold text-pink-600">Stripe Live</span>
          </div>

          <div class="space-y-3.5">
            <div
              v-for="sub in recentSubscribers"
              :key="sub.id"
              class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-400 to-purple-500 text-white font-extrabold flex items-center justify-center text-xs">
                  {{ sub.name.substring(0, 2).toUpperCase() }}
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-800">{{ sub.name }}</div>
                  <div class="text-[11px] text-slate-400">{{ sub.plan }} • {{ sub.time }}</div>
                </div>
              </div>
              <span class="text-xs font-mono font-bold text-emerald-600">
                +{{ sub.amount }}
              </span>
            </div>
          </div>
        </div>

        <!-- PLATFORM HEALTH CARD -->
        <div class="bg-gradient-to-br from-slate-900 to-purple-950 text-white rounded-3xl p-6 shadow-md border border-purple-800/40">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-white flex items-center gap-2">
              <span>🛠️ Platform Health</span>
            </h3>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div class="space-y-3 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-purple-900/40 border border-purple-800/30">
              <span class="text-purple-200">Backend API</span>
              <span class="font-bold text-emerald-400">Online (api.kidsstoryflix)</span>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-purple-900/40 border border-purple-800/30">
              <span class="text-purple-200">Security Gate</span>
              <span class="font-mono font-bold text-pink-400">Token yasiru123 Active</span>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-purple-900/40 border border-purple-800/30">
              <span class="text-purple-200">Framework</span>
              <span class="font-bold text-purple-200">Nuxt 4 / Vue 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Admin Dashboard - KidsStoryFlix",
  robots: "noindex, nofollow"
})

import AdminLayout from "~/components/admin/AdminLayout.vue"

const stats = [
  {
    title: "Total Stories",
    value: "24",
    trend: "+4 this month",
    trendColor: "bg-purple-100 text-purple-700",
    icon: "📚",
    iconBg: "bg-purple-100",
    description: "Published interactive audio tales"
  },
  {
    title: "Registered Users",
    value: "1,248",
    trend: "+18% growth",
    trendColor: "bg-blue-100 text-blue-700",
    icon: "🧒",
    iconBg: "bg-blue-100",
    description: "Parents & kid accounts"
  },
  {
    title: "Active Subscriptions",
    value: "342",
    trend: "+28 new",
    trendColor: "bg-emerald-100 text-emerald-700",
    icon: "💎",
    iconBg: "bg-emerald-100",
    description: "Monthly recurring parents"
  },
  {
    title: "Estimated Revenue",
    value: "£1,710",
    trend: "Stripe Active",
    trendColor: "bg-pink-100 text-pink-700",
    icon: "💳",
    iconBg: "bg-pink-100",
    description: "Monthly recurring revenue (MRR)"
  }
]

const sampleStories = [
  {
    id: 1,
    title: "🦁 The Brave Lion",
    slug: "brave-lion",
    category: "Animals & Courage",
    age: "Ages 4-8",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779278768/65f805ad-831f-46bd-aa54-35f8cc2bf01a_ijee9c.png",
    description: "A brave lion protects the jungle animals and learns the power of kindness."
  },
  {
    id: 2,
    title: "🐰 Magic Rabbit",
    slug: "magic-rabbit",
    category: "Fairy Tale",
    age: "Ages 3-7",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    description: "A rabbit discovers enchanted woodland powers."
  },
  {
    id: 3,
    title: "🚀 Space Adventure",
    slug: "space-adventure",
    category: "Sci-Fi & Exploration",
    age: "Ages 5-10",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    description: "Kids journey past the stars and meet playful lunar creatures."
  },
  {
    id: 4,
    title: "🦄 Unicorn Forest",
    slug: "unicorn-forest",
    category: "Bedtime Magic",
    age: "All Ages",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "A gentle unicorn protects the rainbow forest before sleep."
  }
]

const recentSubscribers = [
  { id: 1, name: "Sarah Jenkins", plan: "Monthly Pass", amount: "£4.99", time: "10 mins ago" },
  { id: 2, name: "David Miller", plan: "Annual Pass", amount: "£39.99", time: "1 hour ago" },
  { id: 3, name: "Emily Watson", plan: "Monthly Pass", amount: "£4.99", time: "3 hours ago" },
  { id: 4, name: "Michael Chang", plan: "Monthly Pass", amount: "£4.99", time: "5 hours ago" }
]
</script>

