<template>
  <NavBar />
  <div class="min-h-screen bg-gradient-to-b from-yellow-100 via-pink-100 to-blue-100 p-6">

    <div class="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border-4 border-yellow-100 p-8">

      <!-- HEADER -->
      <div class="text-center">
        <div class="text-5xl">💸</div>

        <h1 class="text-4xl font-extrabold text-pink-600 mt-4">
          Refund Policy
        </h1>

        <p class="text-gray-600 mt-2 font-semibold">
          Monthly subscription made simple 🌈
        </p>
      </div>

      <!-- CONTENT -->
      <div class="mt-8 space-y-6 text-gray-700 font-medium leading-7">

        <div>
          <h2 class="text-xl font-bold text-pink-600">📅 Monthly Subscription</h2>
          <p>
            Kids Story World offers a simple monthly subscription plan.
            You are charged once every month until you cancel.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-pink-600">❌ Cancel Anytime</h2>
          <p>
            You can cancel your subscription at any time.
            After cancellation, you will still have access until the end of your paid period.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-pink-600">💰 Refund Policy</h2>
          <p>
            We generally do not offer refunds for used subscription time.
            However, if there is a billing error, you can contact support for help.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-pink-600">👨‍👩‍👧 Parent Control</h2>
          <p>
            Parents can manage or cancel subscriptions anytime from their account settings.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-bold text-pink-600">📞 Support</h2>
          <p>
            If you need help with billing or cancellation, our support team is always ready to help.
          </p>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="mt-10 text-center text-gray-500 text-sm">
        🌟 Kids Story World - Fair & Transparent Subscription 🌟
      </div>

    </div>
  </div>
</template>
      <script setup>
      import NavBar from "../components/NavBar.vue"
      </script>