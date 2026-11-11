<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- DECORATIVE BACKGROUND GLOW -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>

    <div class="w-full max-w-xl relative z-10">
      <!-- BRAND BADGE -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-4xl shadow-2xl shadow-purple-500/40 border-2 border-purple-300/30 mb-4 animate-bounce">
          👑
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
          KidsStoryFlix <span class="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Admin</span>
        </h1>
        <p class="mt-2 text-sm text-purple-200/70 font-medium">
          Authorized personnel only • Token-protected administrative console
        </p>
      </div>

      <!-- MAIN LOGIN CARD -->
      <div class="bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60">
        <!-- SAMPLE CREDENTIALS CALLOUT -->
        <div class="mb-6 rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/40 p-4">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              🔑 Sample Admin Credentials
            </span>
            <button
              type="button"
              @click="quickFill"
              class="text-xs font-bold px-2.5 py-1 rounded-lg bg-pink-500 hover:bg-pink-400 text-white transition shadow-sm"
            >
              1-Click Auto Fill
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div class="bg-slate-950/60 p-2 rounded-xl border border-purple-800/40">
              <span class="text-slate-400 block text-[10px]">Email:</span>
              <span class="font-mono text-purple-200 truncate block">admin@kidsstoryflix.co.uk</span>
            </div>
            <div class="bg-slate-950/60 p-2 rounded-xl border border-purple-800/40">
              <span class="text-slate-400 block text-[10px]">Password:</span>
              <span class="font-mono text-purple-200 block">Admin@1234</span>
            </div>
            <div class="bg-slate-950/60 p-2 rounded-xl border border-pink-500/40">
              <span class="text-pink-300 block text-[10px]">Security Token:</span>
              <span class="font-mono font-bold text-pink-400 block">yasiru123</span>
            </div>
          </div>
        </div>

        <!-- ERROR ALERT -->
        <div
          v-if="errorMessage"
          class="mb-6 rounded-2xl bg-red-500/20 border border-red-500/40 p-4 flex items-start gap-3"
        >
          <div class="text-xl">⚠️</div>
          <div class="text-sm font-bold text-red-200">
            {{ errorMessage }}
          </div>
        </div>

        <!-- LOGIN FORM -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- EMAIL -->
          <div>
            <label class="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-purple-400">
                📧
              </span>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="admin@kidsstoryflix.co.uk"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/70 border border-purple-800/50 text-white font-semibold placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition text-sm"
              />
            </div>
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-purple-400">
                🔒
              </span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-950/70 border border-purple-800/50 text-white font-semibold placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition text-sm"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
              >
                {{ showPassword ? '👁️' : '🙈' }}
              </button>
            </div>
          </div>

          <!-- SECURITY TOKEN (yasiru123) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>🛡️ Security Key / Admin Token</span>
                <span class="text-[10px] bg-pink-500/30 text-pink-300 px-2 py-0.5 rounded-full font-extrabold">Required</span>
              </label>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-pink-400">
                🔑
              </span>
              <input
                v-model="form.token"
                type="text"
                required
                placeholder="Enter security token (yasiru123)"
                class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/70 border-2 border-pink-500/60 text-pink-200 font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40 transition text-sm"
              />
            </div>
            <p class="text-[11px] text-purple-300/60 mt-1.5">
              Access is strictly restricted to valid admin token holders (<code class="text-pink-400">yasiru123</code>).
            </p>
          </div>

          <!-- SUBMIT BUTTON -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ loading ? 'Verifying Admin Token...' : 'Enter Admin Panel 🚀' }}</span>
          </button>
        </form>

        <!-- BACK TO SITE -->
        <div class="mt-8 pt-6 border-t border-purple-800/40 text-center">
          <NuxtLink
            to="/"
            class="text-xs font-bold text-purple-300 hover:text-pink-300 transition inline-flex items-center gap-1"
          >
            ← Return to KidsStoryFlix Homepage
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Admin Login - KidsStoryFlix",
  robots: "noindex, nofollow"
})

import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useAdminStore } from "~/pinaGlobal/admin"

const router = useRouter()
const adminStore = useAdminStore()

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref("")

const form = reactive({
  email: "",
  password: "",
  token: ""
})

const quickFill = () => {
  form.email = adminStore.DEFAULT_ADMIN_EMAIL
  form.password = adminStore.DEFAULT_ADMIN_PASSWORD
  form.token = adminStore.ADMIN_SECRET_TOKEN
  errorMessage.value = ""
}

const handleLogin = async () => {
  errorMessage.value = ""
  loading.value = true

  // Simulate short realistic network check
  await new Promise((resolve) => setTimeout(resolve, 350))

  const result = adminStore.loginAdmin({
    email: form.email,
    password: form.password,
    token: form.token
  })

  loading.value = false

  if (result.success) {
    router.push("/admin")
  } else {
    errorMessage.value = result.message
  }
}
</script>

