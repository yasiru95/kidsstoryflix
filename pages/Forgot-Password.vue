
<template>
  <div
    class="relative min-h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100"
  >

    <!-- FLOATING ICONS -->
    <div class="absolute top-10 left-6 text-5xl animate-bounce">
      🌈
    </div>

    <div class="absolute top-20 right-10 text-5xl animate-pulse">
      ⭐
    </div>

    <div class="absolute bottom-10 left-10 text-5xl animate-bounce">
      🧸
    </div>

    <div class="absolute bottom-10 right-10 text-5xl animate-pulse">
      📚
    </div>

    <!-- CONTAINER -->
    <div
      class="relative z-10 flex min-h-screen items-center justify-center px-4 py-10"
    >

      <!-- CARD -->
      <div
        class="w-full max-w-5xl overflow-hidden rounded-[40px] border-[10px] border-white bg-white shadow-2xl grid lg:grid-cols-2"
      >

        <!-- LEFT SIDE -->
        <div
          class="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 p-10"
        >

          <!-- FLOATING ICONS -->
          <div class="absolute top-10 left-10 text-6xl animate-bounce">
            ✨
          </div>

          <div class="absolute top-16 right-10 text-6xl animate-pulse">
            🔑
          </div>

          <div class="absolute bottom-10 left-10 text-6xl animate-bounce">
            🌟
          </div>

          <div class="absolute bottom-10 right-10 text-6xl animate-pulse">
            🎈
          </div>

          <div class="relative z-10 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"
              class="mx-auto w-72 animate-float drop-shadow-2xl"
            />

            <h1
              class="mt-8 text-5xl font-extrabold text-white drop-shadow-lg"
            >
              Forgot Password?
            </h1>

            <p
              class="mt-6 text-2xl leading-10 text-white/95 font-semibold"
            >
              Don't worry ✨
              <br />
              We will help you get back to your magical stories 📚
            </p>

          </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="p-6 sm:p-10 lg:p-14">

          <!-- TOP -->
          <div class="text-center">

            <div
              class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-5xl text-white shadow-2xl"
            >
              🔐
            </div>

            <h2
              class="mt-6 text-4xl sm:text-5xl font-extrabold text-purple-700"
            >
              Reset Password
            </h2>

            <p
              class="mt-4 text-lg leading-8 text-gray-600"
            >
              Enter your email address
              <br />
              and we will send you a reset link 🌈
            </p>

          </div>

          <!-- FORM -->
          <form class="mt-10 space-y-6">

            <!-- EMAIL -->
            <div>

              <label
                class="mb-3 block text-lg font-bold text-purple-700"
              >
                📧 Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                class="w-full rounded-3xl border-4 border-blue-100 bg-blue-50 px-6 py-5 text-lg font-semibold text-purple-700 outline-none transition focus:border-blue-400 focus:bg-white focus:shadow-xl"
              />

            </div>

            <!-- BUTTON -->
            <button
              type="submit"
              class="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-5 text-2xl font-extrabold text-white shadow-2xl transition hover:scale-105"
            >
              ✨ Send Reset Link
            </button>

            <!-- BACK LOGIN -->
            <div class="text-center">

              <p class="text-lg font-semibold text-gray-600">
                Remember your password?
              </p>

              <router-link
                to="/login"
                class="mt-4 inline-block rounded-full bg-purple-100 px-8 py-3 text-lg font-bold text-purple-700 transition hover:scale-105 hover:bg-purple-200"
              >
                🔙 Back To Login
              </router-link>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-12px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
```
