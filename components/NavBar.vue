<template>
  <!-- CUSTOM HEADER (IF ENABLED IN ADMIN) -->
  <div
    v-if="customizer.headerConfig.enabled && customizer.headerConfig.customHtml"
    class="sticky top-2 z-50 w-full px-2 sm:px-4 transition-all duration-300"
  >
    <div
      :class="customizer.headerConfig.layout === 'boxed' ? 'max-w-7xl mx-auto' : 'w-full'"
      v-html="customizer.headerConfig.customHtml"
    ></div>
  </div>

  <!-- DEFAULT HEADER -->
  <header
    v-else
    class="sticky top-2 z-50 w-full px-2 sm:px-4 transition-all duration-300"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >

      <!-- LOGO (KIDSLATA STYLE) -->
      <router-link
        to="/"
        class="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div
          class="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 text-lg sm:text-xl text-white shadow-md group-hover:scale-105 transition-transform"
        >
          📖
        </div>

        <div class="leading-tight">
          <span
            class="text-lg sm:text-2xl font-black font-baloo tracking-tight bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            KidsStoryFlix
          </span>
        </div>
      </router-link>

      <!-- DESKTOP MENU (MATCHING KIDSLATA: Home, All Stories, Categories, Audio Books, Parents Zone) -->
      <nav
        class="hidden md:flex items-center gap-1.5 lg:gap-3 text-sm lg:text-base font-bold font-kids text-purple-900"
      >
        <NuxtLink
          to="/"
          class="px-3 py-1.5 rounded-full hover:bg-purple-100 hover:text-purple-700 transition cursor-pointer"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/all-stories"
          class="px-3 py-1.5 rounded-full hover:bg-purple-100 hover:text-purple-700 transition cursor-pointer"
        >
          All Stories
        </NuxtLink>

        <a
          href="#categories"
          class="px-3 py-1.5 rounded-full hover:bg-purple-100 hover:text-purple-700 transition cursor-pointer"
        >
          Categories
        </a>

        <NuxtLink
          to="/all-stories"
          class="px-3 py-1.5 rounded-full hover:bg-purple-100 hover:text-purple-700 transition cursor-pointer"
        >
          Audio Books
        </NuxtLink>

        <NuxtLink
          to="/privacy"
          class="px-3 py-1.5 rounded-full hover:bg-purple-100 hover:text-purple-700 transition cursor-pointer"
        >
          Parents Zone
        </NuxtLink>

        <!-- FAVORITES / LOVE PILL -->
        <button
          aria-label="Favorites"
          class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500 transition-transform hover:scale-110 active:scale-95 shadow-sm border border-pink-200/60 ml-1"
        >
          <span>💖</span>
        </button>

        <!-- LOGGED IN -->
        <template v-if="global.isLoggedIn">
          <router-link
            to="/kid-account"
            class="px-3.5 py-1.5 rounded-full text-purple-700 hover:bg-blue-100 transition cursor-pointer ml-1"
          >
            👦 Account
          </router-link>

          <button
            @click="global.logout()"
            class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1.5 rounded-full shadow-md hover:scale-105 transition cursor-pointer ml-1"
          >
            Logout
          </button>
        </template>

        <!-- NOT LOGGED IN: START READING CTA -->
        <template v-else>
          <NuxtLink
            :to="{ path: '/Age-Gate', query: { isAgeGate: 'reg' } }"
            class="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white px-5 py-2 rounded-full text-sm font-black font-kids shadow-[0_6px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)] hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-1.5 ml-2"
          >
            <span>Start Reading</span>
            <span class="text-sm">🚀</span>
          </NuxtLink>
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

              <NuxtLink
              to="/"
              class="rounded-2xl bg-pink-50 px-5 py-4 text-lg font-bold text-purple-700 hover:bg-pink-100 transition"
            >
              🏠 Home
            </NuxtLink>

            <NuxtLink
              to="/all-stories"
              class="rounded-2xl bg-purple-50 px-5 py-4 text-lg font-bold text-purple-700 hover:bg-purple-100 transition"
            >
              📚 All Stories
            </NuxtLink>

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

        

            <NuxtLink
              :to="{ path: '/Age-Gate', query: { isAgeGate: 'log' } }"
              class="rounded-2xl bg-pink-50 px-5 py-4 text-lg font-bold text-pink-600 hover:bg-pink-100 transition"
            >
              Login
            </NuxtLink>

            <NuxtLink

              :to="{ path: '/Age-Gate', query: { isAgeGate: 'reg' } }"
              class="rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-4 text-lg font-bold text-white shadow-xl"
            >
              Register
            </NuxtLink>

          </template>

        </div>

      </div>

    </transition>

  </header>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { globalStore } from "../pinaGlobal/global"
import { useSiteCustomizerStore } from "../pinaGlobal/siteCustomizer"
const global = globalStore()
const customizer = useSiteCustomizerStore()

onMounted(() => {
  customizer.loadFromStorage()
})

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