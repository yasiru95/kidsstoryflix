<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
    <div class="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
      
      <!-- Success Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            class="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-green-600 mb-3">
        Payment Successful!
      </h1>

      <p class="text-gray-600 mb-6">
        Thank you for your purchase. Your subscription has been activated successfully.
      </p>

      <div class="bg-green-50 rounded-xl p-4 mb-6">
        <p class="text-sm text-gray-700">
          Your payment has been processed successfully.
        </p>
      </div>

      <button
        @click="goHome"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Go to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>