<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white px-4">
    <div class="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">

      <!-- Error Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            class="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-red-600 mb-3">
        Payment Failed
      </h1>

      <p class="text-gray-600 mb-6">
        We couldn't process your payment. Please try again or use a different payment method.
      </p>

      <div class="bg-red-50 rounded-xl p-4 mb-6">
        <p class="text-sm text-gray-700">
          No payment has been charged to your account.
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <button
          @click="retryPayment"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Try Again
        </button>

        <button
          @click="goHome"
          class="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition"
        >
          Back to Home
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const retryPayment = () => {
  router.push('/subscribe?isAgeGate=subs')
}

const goHome = () => {
  router.push('/')
}
</script>