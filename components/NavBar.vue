<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-sm"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
    >

      <!-- LOGO -->
      <router-link
        to="/"
        class="flex items-center gap-3 cursor-pointer"
      >
        <div
          class="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-lg sm:text-2xl text-white shadow-xl"
        >
          📚
        </div>

        <div class="leading-tight">
          <h1
            class="text-sm sm:text-lg md:text-xl font-extrabold text-purple-700"
          >
            Kids Story
          </h1>

          <p
            class="hidden sm:block text-xs text-pink-500 font-semibold"
          >
            Magical Story World ✨
          </p>
        </div>
      </router-link>

      <!-- DESKTOP MENU -->
      <nav
        class="hidden md:flex items-center gap-3 lg:gap-5"
      >

        <!-- LOGGED IN -->
        <template v-if="global.isLoggedIn">

      

          <router-link
            to="/kid-account"
            class="px-4 py-2 rounded-full text-sm lg:text-base font-bold text-purple-700 hover:bg-blue-100 hover:text-blue-600 transition cursor-pointer"
          >
            👦 Kid Account
          </router-link>

          <button
            @click="global.logout()"
            class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 lg:px-6 py-2.5 rounded-full text-sm lg:text-base font-bold shadow-xl hover:scale-105 transition cursor-pointer"
          >
            Logout
          </button>

        </template>

        <!-- NOT LOGGED IN -->
        <template v-else>

          <router-link
            to="/"
            class="px-4 py-2 rounded-full text-sm lg:text-base font-bold text-purple-700 hover:bg-pink-100 hover:text-pink-600 transition cursor-pointer"
          >
            🏠 Home
          </router-link>

          <router-link
            :to="{ path: '/login', query: { isAgeGate: 'log' } }"
            class="px-4 py-2 rounded-full text-sm lg:text-base font-bold text-purple-700 hover:bg-pink-100 hover:text-pink-600 transition cursor-pointer"
          >
            Login
          </router-link>

          <router-link
          :to="{ path: '/register', query: { isAgeGate: 'reg' } }"            
          class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 lg:px-6 py-2.5 rounded-full text-sm lg:text-base font-bold shadow-xl hover:scale-105 transition cursor-pointer"
          >
            Register
          </router-link>

        </template>

      </nav>

      <!-- MOBILE BUTTON -->
      <button
        @click="global.mobileMenu = !global.mobileMenu"
        class="md:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-700 shadow-lg cursor-pointer"
      >
        ☰
      </button>

    </div>

    <!-- MOBILE MENU -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-5"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-5"
    >

      <div
        v-if="global.mobileMenu"
        class="md:hidden border-t border-pink-100 bg-white/95 backdrop-blur-xl px-4 py-5 shadow-xl"
      >

        <div class="flex flex-col gap-3">

          <!-- LOGGED IN -->
          <template v-if="global.isLoggedIn">

         

            <router-link
              to="/kid-account"
              class="rounded-2xl bg-blue-50 px-5 py-4 text-lg font-bold text-blue-700 hover:bg-blue-100 transition"
            >
              👦 Kid Account
            </router-link>

            <button
              @click="global.logout()"
              class="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-4 text-lg font-bold text-white shadow-xl"
            >
              Logout
            </button>

          </template>

          <!-- NOT LOGGED IN -->
          <template v-else>

            <router-link
              to="/"
              class="rounded-2xl bg-pink-50 px-5 py-4 text-lg font-bold text-purple-700 hover:bg-pink-100 transition"
            >
              🏠 Home
            </router-link>

            <router-link
              :to="{ path: '/login', query: { isAgeGate: 'log' } }"
              class="rounded-2xl bg-pink-50 px-5 py-4 text-lg font-bold text-pink-600 hover:bg-pink-100 transition"
            >
              Login
            </router-link>

            <router-link

              :to="{ path: '/register', query: { isAgeGate: 'reg' } }"
              class="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-4 text-lg font-bold text-white shadow-xl"
            >
              Register
            </router-link>

          </template>

        </div>

      </div>

    </transition>

  </header>
</template>

<script setup>
import { ref } from "vue"
import { globalStore } from "../pinaGlobal/global"
const global = globalStore()

/* ========================= */
/* LOGIN STATE */
/* ========================= */

/* ========================= */
/* MOBILE MENU */
/* ========================= */


/* ========================= */
/* LOGOUT */
/* ========================= */


</script>