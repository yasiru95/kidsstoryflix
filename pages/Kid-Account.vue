<template>
  <NavBar />

  <div class="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 p-6">

   

    <!-- MAIN CARD -->
    <div class="relative max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border-4 border-white p-6 sm:p-10">

      <!-- PROFILE HEADER -->
      <div class="flex items-center gap-4">

        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-4xl text-white shadow-xl">
          🧒
        </div>

        <div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-purple-700">
          {{ global.userLogin.name }}
          </h2>

          <p class="text-gray-500 font-semibold">
            Kids Story World Account 🌈
          </p>
        </div>

      </div>

      <!-- SUBSCRIPTION BOX -->
      <div class="mt-8">

        <!-- ACTIVE -->
        <div
          v-if="subscriptionData?.has_subscription"
          class="bg-green-50 border-4 border-green-200 rounded-3xl p-6 shadow-lg"
        >

          <div class="flex items-center gap-3">

            <div class="text-5xl">🎉</div>

            <div>
              <h3 class="text-2xl font-extrabold text-green-700">
                Subscription Active
              </h3>

              <p class="text-green-600 font-semibold mt-1">
                Expires on:
                <span class="font-bold"> {{ subscriptionData?.subscription?.end_date }}</span>
              </p>

              <p class="text-green-500 mt-2">
                🌟 Enjoy unlimited magical stories!
              </p>
              <p class="text-green-500 mt-2">{{ daysRemaining }} days remaining</p>
            </div>

          </div>

          <!-- <p class="text-green-500 mt-2">
          <br>
          {{ daysRemaining }} days remaining
          </p> -->

          <!-- PROGRESS BAR -->
          <!-- <div class="mt-5 w-full bg-green-100 rounded-full h-3 overflow-hidden">
            <div class="bg-green-400 h-3 w-[70%] rounded-full"></div>
          </div> -->

        </div>

        <!-- NOT SUBSCRIBED -->
        <div
          v-else
          class="bg-pink-50 border-4 border-pink-200 rounded-3xl p-6 shadow-lg text-center"
        >

          <div class="text-6xl mb-3">😢</div>

          <h3 class="text-3xl font-extrabold text-pink-600">
            No Active Subscription
          </h3>

          <p class="text-gray-600 mt-2 font-semibold">
            Unlock unlimited magical stories for your child 🌈
          </p>

          <div class="mt-4 text-yellow-600 font-bold animate-pulse">
            ⚠ Start your adventure today!
          </div>

          <router-link
            to="/subscribe?isAgeGate=subs"
            class="mt-6 inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition"
          >
            🌈 Subscribe Now
          </router-link>

        </div>

      </div>

      <!-- FOOTER INFO -->
      <div class="mt-10 text-center text-gray-500 font-semibold text-sm">
        ✨ Kids Story World - Safe & Magical Learning ✨
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import NavBar from "../components/NavBar.vue"
import { globalStore } from "../pinaGlobal/global"
const global = globalStore();
const subscriptionData = ref(null)

const daysRemaining = computed(() => {
  if (!subscriptionData.value?.subscription) return 0

  const end = new Date(subscriptionData.value.subscription.end_date)
  const now = new Date()

  return Math.max(
    Math.ceil((end - now) / (1000 * 60 * 60 * 24)),
    0
  )
})

onMounted(async () => {
   subscriptionData.value =await global.checkSubscription();

})

/* 👤 Kid Data (replace with API later) */
// const kid = ref({
//   name: "Little Explorer"
// })

/* 💳 Subscription Status */
// const isSubscribed = ref(true) // Change to false to test non-subscribed state

/* 📅 Expiry Date */
// const expiryDate = ref("2026-12-31")
</script>

<style scoped>
/* floating animation */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
</style>