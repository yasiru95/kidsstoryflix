<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 p-4">
    <div class="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8">
      <div class="text-center">
        <div class="text-6xl">📚</div>
        <h1 class="text-4xl font-extrabold text-purple-700 mt-4">Login</h1>
        <p class="text-gray-600 mt-2">Enter your magical account ✨</p>
      </div>

      <div
        v-if="successMessage"
        class="mt-6 p-4 rounded-2xl bg-green-50 border-2 border-green-200 text-green-600 font-bold text-center"
      >
        {{ successMessage }}
      </div>

      <div
        v-if="errors.general"
        class="mt-6 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-500 font-bold text-center"
      >
        {{ errors.general }}
      </div>

      <form class="mt-6 space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="block font-bold text-purple-700 mb-2">📧 Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            :class="[
              'w-full rounded-2xl border-4 px-4 py-3 outline-none',
              errors.email ? 'border-red-400 bg-red-50' : 'border-blue-100 bg-blue-50'
            ]"
          />
          <p v-if="errors.email" class="text-red-500 font-bold mt-2">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label class="block font-bold text-purple-700 mb-2">🔒 Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            :class="[
              'w-full rounded-2xl border-4 px-4 py-3 outline-none',
              errors.password ? 'border-red-400 bg-red-50' : 'border-pink-100 bg-pink-50'
            ]"
          />
          <p v-if="errors.password" class="text-red-500 font-bold mt-2">
            {{ errors.password }}
          </p>
        </div>

        <label class="flex items-center gap-2">
          <input v-model="form.remember" type="checkbox" />
          Remember Me 🌈
        </label>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold text-xl py-4 disabled:opacity-50"
        >
          <span v-if="loading">⏳ Logging In...</span>
          <span v-else>🚀 Login Now</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { globalStore } from "../pinaGlobal/global";
import api from "../services/Api"; // Assuming you have an api.js file for axios instance

const global = globalStore();
const router = useRouter();

const loading = ref(false);
const successMessage = ref("");

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = reactive({
  email: "",
  password: "",
  general: "",
});

const validate = () => {
  errors.email = "";
  errors.password = "";
  errors.general = "";

  let valid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email) {
    errors.email = "📧 Please enter your email";
    valid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = "🌈 Please enter a valid email";
    valid = false;
  }

  if (!form.password) {
    errors.password = "🔒 Please enter your password";
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  successMessage.value = "";

  if (!validate()) return;

  try {
    loading.value = true;

    const response = await api.post(
      "/login",
      {
        email: form.email,
        password: form.password,
      }
    );
    global.isLoggedIn = true;

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    successMessage.value = "🎉 Welcome back to Kids Story World!";
    global.login(response.data.user, response.data.token)

    // setTimeout(() => {
    //   router.push("/dashboard");
    // }, 1000);

  } catch (error) {
    if (error.response?.status === 422) {
      const backendErrors = error.response.data.errors;

      Object.keys(backendErrors).forEach((key) => {
        if (errors[key] !== undefined) {
          errors[key] = backendErrors[key][0];
          alert(errors[key]);
        }
      });
    } else if (error.response?.status === 401) {
      errors.general = "😢 Email or password is incorrect.";
    } else {
      errors.general = "🚀 Something went wrong. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
