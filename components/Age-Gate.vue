<template>
  <div
    v-if="showGate"
  class="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm px-4 py-6 overflow-y-auto flex items-start sm:items-center justify-center"  >

    <!-- CARD -->
    <div
      class="w-full max-w-2xl rounded-[40px] bg-white p-6 sm:p-10 shadow-2xl border-[8px] border-pink-200 relative overflow-hidden"
    >

     

      <!-- TITLE -->
      <div class="text-center">

        <div
          class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-5xl text-white shadow-2xl"
        >
          🔐
        </div>

        <h1
          class="mt-6 text-4xl sm:text-5xl font-extrabold text-purple-700"
        >
          Parent Check
        </h1>

        <p
          class="mt-4 text-lg sm:text-xl text-gray-600 leading-8"
        >
          Solve this math question to continue ✨
        </p>

      </div>

      <!-- QUESTION -->
      <div class="mt-10 text-center">

        <div
          class="inline-flex items-center gap-4 rounded-[30px] bg-gradient-to-r from-yellow-100 to-pink-100 px-8 py-6 shadow-xl"
        >

          <span class="text-5xl font-extrabold text-purple-700">
            {{ num1 }}
          </span>

          <span class="text-5xl font-extrabold text-pink-500">
            {{ operator }}
          </span>

          <span class="text-5xl font-extrabold text-purple-700">
            {{ num2 }}
          </span>

          <span class="text-5xl font-extrabold text-blue-500">
            =
          </span>

        </div>

      </div>

      <!-- INPUT -->
      <div class="mt-10">

        <input
          ref="answerInput"
          v-model="answer"
          type="number"
          placeholder="Type answer here..."
          class="w-full rounded-3xl border-4 border-pink-100 bg-pink-50 px-6 py-5 text-center text-3xl font-extrabold text-purple-700 outline-none transition focus:border-pink-400 focus:bg-white focus:shadow-xl"
        />

      </div>

      <!-- ERROR -->
      <transition
        enter-active-class="transition duration-300"
        enter-from-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >

        <div
          v-if="error"
          class="mt-6 rounded-3xl bg-red-100 border-4 border-red-200 px-6 py-5 text-center"
        >

          <div class="text-5xl mb-3">
            👨‍👩‍👧
          </div>

          <p
            class="text-xl font-bold text-red-600 leading-8"
          >
            Oops! Wrong answer 😢
            <br />
            Please get your parents help ✨
          </p>

        </div>

      </transition>

      <!-- BUTTON -->
      <button
        @click="checkAnswer"
        class="mt-8 w-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 py-5 text-2xl font-extrabold text-white shadow-2xl transition hover:scale-105 cursor-pointer"
      >
        🚀 Continue
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
//pass data from NavBar to here using route query

import { useRouter, useRoute } from "vue-router"
const route = useRoute()
const router = useRouter()
const isAgeGate = route.query.isAgeGate





const showGate = ref(true)

const num1 = ref(0)
const num2 = ref(0)
const operator = ref("+")
const correctAnswer = ref(0)
const answerInput = ref(null)

const answer = ref("")
const error = ref(false)

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    checkAnswer()
  }
}

onMounted(() => {
  generateQuestion()

  window.addEventListener("keydown", handleKeyDown)
  // 👇 focus again after wrong answer
    setTimeout(() => {
      answerInput.value?.focus()
    }, 100)
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown)
})

/* ========================= */
/* RANDOM QUESTION */
/* ========================= */

const generateQuestion = () => {
  const operators = ["+", "-"]

  operator.value =
    operators[Math.floor(Math.random() * operators.length)]

  num1.value = Math.floor(Math.random() * 10) + 1
  num2.value = Math.floor(Math.random() * 10) + 1

  if (operator.value === "+") {
    correctAnswer.value = num1.value + num2.value
  } else {
    correctAnswer.value = num1.value - num2.value
  }

  answer.value = ""
}

/* ========================= */
/* CHECK */
/* ========================= */

const checkAnswer = () => {
  if (Number(answer.value) === correctAnswer.value) {
    showGate.value = false
    error.value = false

    // 👉 NAVIGATE IF 
    if (isAgeGate === 'log') {
      router.push("/parent-login")
    } else if (isAgeGate === 'reg') {
      router.push("/parent-register")
    }else if(isAgeGate === 'subs') {
      router.push("/parent-subscribe")
    }
  } else {
    error.value = true
    generateQuestion()

    // 👇 focus again after wrong answer
    setTimeout(() => {
      answerInput.value?.focus()
    }, 100)
  }
}

/* ========================= */
/* INIT */
/* ========================= */


</script>