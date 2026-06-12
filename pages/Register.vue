<template>
  <div
    class="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-yellow-100 overflow-hidden relative"
  >
    <!-- FLOATING ICONS -->
    <div class="absolute top-10 left-6 text-5xl animate-bounce">🌈</div>
    <div class="absolute top-20 right-10 text-5xl animate-pulse">⭐</div>
    <div class="absolute bottom-10 left-10 text-5xl animate-bounce">🧸</div>
    <div class="absolute bottom-10 right-10 text-5xl animate-pulse">📚</div>

    <!-- CONTAINER -->
    <div
      class="relative z-10 flex min-h-screen items-center justify-center px-4 py-10"
    >
      <div
        class="w-full max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl border-[10px] border-white grid lg:grid-cols-2"
      >
        <!-- LEFT SIDE -->
        <div
          class="relative hidden lg:flex items-center justify-center bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400 p-10 overflow-hidden"
        >
          <div class="absolute top-10 left-10 text-6xl animate-bounce">🦄</div>
          <div class="absolute top-16 right-10 text-6xl animate-pulse">🌟</div>
          <div class="absolute bottom-10 left-10 text-6xl animate-bounce">🚀</div>
          <div class="absolute bottom-10 right-10 text-6xl animate-pulse">🎈</div>

          <div class="text-center relative z-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2436/2436636.png"
              class="mx-auto w-72 drop-shadow-2xl animate-float"
            />

            <h1
              class="mt-8 text-5xl font-extrabold text-white drop-shadow-lg"
            >
              Kids Story World
            </h1>

            <p class="mt-6 text-2xl leading-10 text-white/95 font-semibold">
              Create your magical account ✨
              <br />
              Read amazing stories every day 📚
            </p>
          </div>
        </div>

        <!-- FORM -->
        <div class="p-6 sm:p-10 lg:p-14">
          <div class="text-center">
            <div
              class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-5xl text-white shadow-2xl"
            >
              🧒
            </div>

            <h2
              class="mt-6 text-4xl sm:text-5xl font-extrabold text-purple-700"
            >
              Create Account
            </h2>

            <p class="mt-4 text-lg text-gray-600">
              Join the magical kids story adventure 🌈
            </p>
          </div>

          <!-- SUCCESS -->
          <div
            v-if="successMessage"
            class="mt-6 rounded-3xl border-4 border-green-200 bg-green-50 p-4 text-center"
          >
            <p class="text-lg font-bold text-green-600">
              {{ successMessage }}
            </p>
          </div>

          <!-- FORM -->
          <form @submit.prevent="submitForm" class="mt-10 space-y-6">
            <!-- NAME -->
            <div>
              <label class="mb-3 block text-lg font-bold text-purple-700">
                👦 Full Name
              </label>

              <input
                v-model="form.name"
                type="text"
                placeholder="Enter your name"
                :class="[
                  'w-full rounded-3xl border-4 px-6 py-5 text-lg font-semibold text-purple-700 outline-none transition',
                  errors.name
                    ? 'border-red-400 bg-red-50'
                    : 'border-pink-100 bg-pink-50 focus:border-pink-400 focus:bg-white'
                ]"
              />

              <p
                v-if="errors.name"
                class="mt-2 text-sm font-bold text-red-500 animate-bounce"
              >
                {{ errors.name }}
              </p>
            </div>

            <!-- EMAIL -->
            <div>
              <label class="mb-3 block text-lg font-bold text-purple-700">
                📧 Email Address
              </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                :class="[
                  'w-full rounded-3xl border-4 px-6 py-5 text-lg font-semibold text-purple-700 outline-none transition',
                  errors.email
                    ? 'border-red-400 bg-red-50'
                    : 'border-blue-100 bg-blue-50 focus:border-blue-400 focus:bg-white'
                ]"
              />

              <p
                v-if="errors.email"
                class="mt-2 text-sm font-bold text-red-500 animate-bounce"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- GENDER -->
            <div>
              <label class="mb-4 block text-lg font-bold text-purple-700">
                🌈 Choose Gender
              </label>

              <div class="grid grid-cols-2 gap-4">
                <!-- BOY -->
                <label
                  class="group cursor-pointer rounded-3xl border-4 p-5 transition hover:scale-105 hover:shadow-2xl"
                  :class="
                    form.gender === 'B'
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-blue-100 bg-blue-50'
                  "
                >
                  <input
                    v-model="form.gender"
                    type="radio"
                    value="B"
                    class="hidden"
                  />

                  <div class="text-center">
                    <div
                      class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-200 text-5xl shadow-lg transition group-hover:scale-110"
                    >
                      👦
                    </div>

                    <h3 class="mt-4 text-2xl font-extrabold text-blue-600">
                      Boy
                    </h3>

                    <p class="mt-2 text-sm font-semibold text-gray-600">
                      Adventure Hero 🚀
                    </p>
                  </div>
                </label>

                <!-- GIRL -->
                <label
                  class="group cursor-pointer rounded-3xl border-4 p-5 transition hover:scale-105 hover:shadow-2xl"
                  :class="
                    form.gender === 'G'
                      ? 'border-pink-500 bg-pink-100'
                      : 'border-pink-100 bg-pink-50'
                  "
                >
                  <input
                    v-model="form.gender"
                    type="radio"
                    value="G"
                    class="hidden"
                  />

                  <div class="text-center">
                    <div
                      class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-200 text-5xl shadow-lg transition group-hover:scale-110"
                    >
                      👧
                    </div>

                    <h3 class="mt-4 text-2xl font-extrabold text-pink-600">
                      Girl
                    </h3>

                    <p class="mt-2 text-sm font-semibold text-gray-600">
                      Magical Princess ✨
                    </p>
                  </div>
                </label>
              </div>

              <p
                v-if="errors.gender"
                class="mt-3 text-center text-sm font-bold text-red-500 animate-bounce"
              >
                {{ errors.gender }}
              </p>
            </div>

            <!-- PASSWORD -->
            <div>
              <label class="mb-3 block text-lg font-bold text-purple-700">
                🔒 Password
              </label>

              <input
                v-model="form.password"
                type="password"
                placeholder="Create password"
                :class="[
                  'w-full rounded-3xl border-4 px-6 py-5 text-lg font-semibold text-purple-700 outline-none transition',
                  errors.password
                    ? 'border-red-400 bg-red-50'
                    : 'border-yellow-100 bg-yellow-50 focus:border-yellow-400 focus:bg-white'
                ]"
              />

              <p
                v-if="errors.password"
                class="mt-2 text-sm font-bold text-red-500 animate-bounce"
              >
                {{ errors.password }}
              </p>

              <!-- PASSWORD STRENGTH -->
              <div v-if="form.password" class="mt-4">
                <div
                  class="h-3 overflow-hidden rounded-full bg-gray-200"
                >
                  <div
                    class="h-full transition-all duration-300"
                    :class="passwordStrengthClass"
                  ></div>
                </div>

                <p class="mt-2 text-sm font-bold text-purple-700">
                  {{ passwordStrengthText }}
                </p>
              </div>
            </div>

            <!-- CONFIRM PASSWORD -->
            <div>
              <label class="mb-3 block text-lg font-bold text-purple-700">
                🔐 Confirm Password
              </label>

              <input
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm password"
                :class="[
                  'w-full rounded-3xl border-4 px-6 py-5 text-lg font-semibold text-purple-700 outline-none transition',
                  errors.password_confirmation
                    ? 'border-red-400 bg-red-50'
                    : 'border-green-100 bg-green-50 focus:border-green-400 focus:bg-white'
                ]"
              />

              <p
                v-if="errors.password_confirmation"
                class="mt-2 text-sm font-bold text-red-500 animate-bounce"
              >
                {{ errors.password_confirmation }}
              </p>
            </div>

            <!-- TERMS -->
            <div>
              <label
                class="flex items-center gap-3 cursor-pointer text-gray-700 font-semibold"
              >
                <input
                  v-model="form.terms"
                  type="checkbox"
                  class="h-5 w-5"
                />

                I agree to the Terms & Privacy Policy 📜
              </label>

              <p
                v-if="errors.terms"
                class="mt-2 text-sm font-bold text-red-500 animate-bounce"
              >
                {{ errors.terms }}
              </p>
            </div>

            <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-5 text-2xl font-extrabold text-white shadow-2xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <span v-if="loading">
            ⏳ Creating Account...
            </span>

            <span v-else>
            🌈 Create Magical Account
            </span>
            </button>

            <!-- BUTTON -->
            <!-- <button
              type="submit"
              class="w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-5 text-2xl font-extrabold text-white shadow-2xl transition hover:scale-105"
            >
              🌈 Create Magical Account
            </button> -->

            <!-- LOGIN -->
            <div class="text-center">
              <p class="text-lg font-semibold text-gray-600">
                Already have an account?
              </p>

              <router-link
              :to="{ path: '/login', query: { isAgeGate: 'log' } }"
                class="mt-4 inline-block rounded-full bg-purple-100 px-8 py-3 text-lg font-bold text-purple-700 transition hover:scale-105 hover:bg-purple-200"
              >
                🎈 Login Here
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import api from "../services/Api"; // Assuming you have an api.js file for axios instance

import { useRouter, useRoute } from "vue-router"
const router = useRouter()

const successMessage = ref("");

const form = reactive({
  name: "",
  email: "",
  gender: "",
  password: "",
  password_confirmation: "",
  terms: false,
});

const errors = reactive({
  name: "",
  email: "",
  gender: "",
  password: "",
  password_confirmation: "",
  terms: "",
});

const passwordStrengthText = computed(() => {
  const len = form.password.length;

  if (len < 4) return "🐣 Weak";
  if (len < 6) return "🧸 Fair";
  if (len < 8) return "🚀 Good";
  return "🌈 Super Strong";
});

const passwordStrengthClass = computed(() => {
  const len = form.password.length;

  if (len < 4) return "bg-red-400 w-1/4";
  if (len < 6) return "bg-yellow-400 w-2/4";
  if (len < 8) return "bg-blue-400 w-3/4";
  return "bg-green-400 w-full";
});

const validate = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  let valid = true;

  if (!form.name.trim()) {
    errors.name = "🌈 Please enter your name";
    valid = false;
  } else if (form.name.length < 3) {
    errors.name = "🧸 Name must be at least 3 letters";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email) {
    errors.email = "📧 Email is required";
    valid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = "⭐ Please enter a valid email";
    valid = false;
  }

  if (!form.gender) {
    errors.gender = "🎈 Please choose a gender";
    valid = false;
  }

  if (!form.password) {
    errors.password = "🔒 Password is required";
    valid = false;
  } else if (form.password.length < 6) {
    errors.password = "🚀 Password must be at least 6 characters";
    valid = false;
  }

  if (!form.password_confirmation) {
    errors.password_confirmation = "🔐 Please confirm password";
    valid = false;
  } else if (form.password !== form.password_confirmation) {
    errors.password_confirmation = "❌ Passwords do not match";
    valid = false;
  }

  if (!form.terms) {
    errors.terms = "📜 Please accept Terms & Privacy Policy";
    valid = false;
  }

  return valid;
};

const loading = ref(false);

const submitForm = async () => {
  successMessage.value = "";

  if (!validate()) return;

  try {
    loading.value = true;

    const response = await api.post(
      "/register",{
        name: form.name,
        email: form.email,
        gender: form.gender,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }
    );

    successMessage.value =
      "🎉 Hooray! Your magical account has been created!";
      alert(successMessage.value);

    console.log('register response: ' + response.data);

    // reset form
    form.name = "";
    form.email = "";
    form.gender = "";
    form.password = "";
    form.password_confirmation = "";
    form.terms = false;

    router.push('/parent-login');

  } catch (error) {
    console.log(error);

    // Laravel validation errors
    if (error.response?.status === 422) {
      const backendErrors = error.response.data.errors;
      console.log('Backend validation errors:', backendErrors);

      Object.keys(backendErrors).forEach((key) => {
        if (errors[key] !== undefined) {
          errors[key] = backendErrors[key][0];
          alert(errors[key]);
        }
      });
    } else {
      alert("😢 Something went wrong. Please try again.");
    }
  } finally {
    loading.value = false;
  }
};
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