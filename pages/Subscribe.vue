<template>
    <NavBar />

  <div
    class="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 flex items-center justify-center px-4 py-10 relative overflow-hidden"
  >

    <!-- FLOATING ICONS -->
    <div class="absolute top-10 left-10 text-5xl animate-bounce">🌈</div>
    <div class="absolute top-20 right-10 text-5xl animate-pulse">⭐</div>
    <div class="absolute bottom-10 left-10 text-5xl animate-bounce">🧸</div>
    <div class="absolute bottom-10 right-10 text-5xl animate-pulse">📚</div>

    <!-- CARD -->
    <div
      class="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl border-[10px] border-white p-8 md:p-14 text-center relative overflow-hidden"
    >

      <!-- HEADER ICON -->
      <div
        class="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-5xl text-white shadow-xl"
      >
        💖
      </div>

      <!-- TITLE -->
      <h1 class="mt-6 text-4xl md:text-6xl font-extrabold text-purple-700">
        Subscribe & Read  
      </h1>

      <p class="mt-4 text-lg md:text-2xl text-gray-600 leading-8">
        Unlock magical stories every day ✨  
        Explore 1000+ kids stories with new ones added monthly  📚
      </p>

      <!-- FEATURES -->
      <div class="mt-10 grid sm:grid-cols-2 gap-6 text-left">

        <div class="bg-pink-50 rounded-3xl p-6 shadow-lg border-2 border-pink-100">
          <div class="text-4xl">📖</div>
          <h3 class="mt-3 text-xl font-bold text-purple-700">
            1000+ Stories
          </h3>
          <p class="text-gray-600 mt-2">
            Unlimited magical adventures for kids
          </p>
        </div>

        <div class="bg-blue-50 rounded-3xl p-6 shadow-lg border-2 border-blue-100">
          <div class="text-4xl">🚀</div>
          <h3 class="mt-3 text-xl font-bold text-purple-700">
            Daily New Stories
          </h3>
          <p class="text-gray-600 mt-2">
            Fresh content added every day
          </p>
        </div>

        <div class="bg-yellow-50 rounded-3xl p-6 shadow-lg border-2 border-yellow-100">
          <div class="text-4xl">🧠</div>
          <h3 class="mt-3 text-xl font-bold text-purple-700">
            Learn & Grow
          </h3>
          <p class="text-gray-600 mt-2">
            Improve reading skills in a fun way
          </p>
        </div>

        <div class="bg-purple-50 rounded-3xl p-6 shadow-lg border-2 border-purple-100">
          <div class="text-4xl">👨‍👩‍👧</div>
          <h3 class="mt-3 text-xl font-bold text-purple-700">
            Safe for Kids
          </h3>
          <p class="text-gray-600 mt-2">
            Parent-approved safe content
          </p>
        </div>

      </div>

      <!-- PRICE -->
      <div class="mt-10">
        <div
          class="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-10 py-6 rounded-full shadow-2xl"
        >
          <p class="text-xl md:text-2xl font-bold">
            Only $2.49 / month 🌟
          </p>
        </div>
      </div>

      <!-- BUTTON -->
      <button
      @click="payment"
        class="mt-10 w-full md:w-auto px-12 py-5 rounded-full text-2xl font-extrabold text-white shadow-2xl
        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
        hover:scale-110 transition"
      >
        🚀 Subscribe Now
      </button>

      <!-- FOOTER NOTE -->
      <p class="mt-6 text-gray-500 text-sm">
        Cancel anytime • No hidden fees • Made for kids 💖
      </p>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { globalStore } from "../pinaGlobal/global"
import api from "../services/Api.js"
import { useRoute } from "vue-router"
import router from "../router"
import NavBar from "../components/NavBar.vue"

const route = useRoute()

const global = globalStore()


const payment = async () => {

  if(global.isLoggedIn==true){
    try {
    const response = await api.post(
  '/payments',
  {
    user_id: global.userLogin.id,
    amount: 249,
    payment_id: "pay_1234567890",
    payment_method: "google_pay",
    transaction_id: "txn_1234567890",
    currency: "USD",
    is_subscription: true
  },
  {
    headers: {
      Authorization: `Bearer ${global.userLogin.token}`
    }
  }
)
if (response.data.success===true) {
  alert("Payment successful! Thank you for subscribing.")
  global.isKidSubscribed = true
  router.push('/')
} else {
  alert("Payment failed. Please try again.")
}





} catch (error) {
  alert("Payment failed. Please try again.")

  // Laravel responded with an error
  if (error.response) {

    console.error('Status:', error.response.status)
    console.error('Backend Error:', error.response.data)

    // Validation errors (422)
    if (error.response.status === 422) {
      console.log(error.response.data.errors)
    }

    // Unauthorized (401)
    else if (error.response.status === 401) {
      alert(error.response.data.message || 'Unauthorized')
    }

    // Forbidden (403)
    else if (error.response.status === 403) {
      alert(error.response.data.message || 'Access denied')
    }

    // Not found (404)
    else if (error.response.status === 404) {
      alert(error.response.data.message || 'Resource not found')
    }

    // Server error (500)
    else if (error.response.status === 500) {
      alert(error.response.data.message || 'Server error')
    }

  }
  // No response from server
  else if (error.request) {
    console.error('No response from server')
    alert('Cannot connect to server')
  }
  // Other error
  else {
    console.error(error.message)
    alert(error.message)
  }
}
  }else{
    alert('Registration required to subscribe. Redirecting to registration page.')
    router.push("/register?isAgeGate=reg")
  }
} 


</script>