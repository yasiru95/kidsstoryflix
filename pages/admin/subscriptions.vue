<template>
  <AdminLayout title="Subscriptions & Billing" subtitle="Monitor Stripe checkout sessions, subscriber tiers and recurring revenue">
    <!-- REVENUE SUMMARY CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-gradient-to-tr from-purple-700 to-indigo-800 text-white rounded-3xl p-6 shadow-md">
        <div class="text-xs font-bold text-purple-200 uppercase tracking-wider">Monthly Recurring Revenue</div>
        <div class="text-3xl font-black mt-2">£1,706.58</div>
        <div class="text-xs text-purple-200 mt-2">342 active paying subscriptions</div>
      </div>
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Pass (£4.99)</div>
        <div class="text-3xl font-black text-slate-800 mt-2">294</div>
        <div class="text-xs text-emerald-600 font-bold mt-2">86% of subscribers</div>
      </div>
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Annual Pass (£39.99)</div>
        <div class="text-3xl font-black text-slate-800 mt-2">48</div>
        <div class="text-xs text-purple-600 font-bold mt-2">14% of subscribers</div>
      </div>
    </div>

    <!-- SUBSCRIPTION PLANS CONFIGURATION -->
    <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
      <h3 class="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
        <span>💎 Active StoryFlix Membership Tiers</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- PLAN 1 -->
        <div class="rounded-3xl border-2 border-purple-200 bg-purple-50/40 p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-purple-200 text-purple-800">Monthly</span>
              <span class="text-xs font-bold text-emerald-600">Stripe Live</span>
            </div>
            <h4 class="text-2xl font-black text-slate-800 mt-3">Monthly Magical Pass</h4>
            <div class="text-3xl font-black text-purple-700 mt-1">£4.99 <span class="text-xs text-slate-400 font-normal">/ month</span></div>
            <ul class="mt-4 space-y-2 text-xs font-semibold text-slate-600">
              <li>✓ Unlimited access to 1000+ kids stories</li>
              <li>✓ Audio narration & karaoke word-highlighting</li>
              <li>✓ Safe Parent-Gate protection</li>
            </ul>
          </div>
          <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
            <span class="text-slate-400">Endpoint: <code class="text-purple-700 font-bold">/api/checkout</code></span>
            <span class="font-bold text-purple-700">Active</span>
          </div>
        </div>

        <!-- PLAN 2 -->
        <div class="rounded-3xl border-2 border-pink-200 bg-pink-50/40 p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 rounded-full text-xs font-black bg-pink-200 text-pink-800">Annual Saver</span>
              <span class="text-xs font-bold text-emerald-600">Stripe Live</span>
            </div>
            <h4 class="text-2xl font-black text-slate-800 mt-3">Annual Magical Pass</h4>
            <div class="text-3xl font-black text-pink-600 mt-1">£39.99 <span class="text-xs text-slate-400 font-normal">/ year</span></div>
            <ul class="mt-4 space-y-2 text-xs font-semibold text-slate-600">
              <li>✓ Everything in Monthly plus 33% savings</li>
              <li>✓ Early access to new monthly stories</li>
              <li>✓ Multiple kid accounts support</li>
            </ul>
          </div>
          <div class="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between text-xs">
            <span class="text-slate-400">Endpoint: <code class="text-pink-700 font-bold">/api/checkout</code></span>
            <span class="font-bold text-pink-700">Active</span>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Subscriptions - KidsStoryFlix Admin",
  robots: "noindex, nofollow"
})

import AdminLayout from "~/components/admin/AdminLayout.vue"
</script>

