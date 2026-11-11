<template>
  <AdminLayout title="Story Library" subtitle="Create, edit, organize and publish kids stories">
    <!-- TOP TOOLBAR -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <!-- SEARCH -->
        <div class="relative flex-1 sm:w-72">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            🔍
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stories by title..."
            class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
          />
        </div>

        <!-- CATEGORY FILTER -->
        <select
          v-model="selectedCategory"
          class="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:border-purple-500"
        >
          <option value="All">All Categories</option>
          <option value="Fairy Tale">Fairy Tale</option>
          <option value="Animals">Animals</option>
          <option value="Adventure">Adventure</option>
          <option value="Bedtime">Bedtime</option>
        </select>
      </div>

      <!-- CREATE NEW STORY BUTTON -->
      <button
        @click="openModal = true"
        class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-md shadow-purple-600/30 transition flex items-center justify-center gap-2"
      >
        <span>✨ Add New Story</span>
      </button>
    </div>

    <!-- STORIES GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="story in filteredStories"
        :key="story.id"
        class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
      >
        <!-- IMAGE COVER -->
        <div class="relative h-48 overflow-hidden bg-slate-900">
          <img
            :src="story.image"
            :alt="story.title"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 rounded-full text-xs font-black bg-white/90 text-purple-800 backdrop-blur-md shadow-xs">
              {{ story.category }}
            </span>
          </div>
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <div class="text-xs font-semibold text-pink-300 flex items-center gap-1">
              <span>🎯 {{ story.age }}</span>
              <span>•</span>
              <span>⏱️ {{ story.duration || '5 mins' }}</span>
            </div>
            <h3 class="text-lg font-black truncate drop-shadow-md">
              {{ story.title }}
            </h3>
          </div>
        </div>

        <!-- DETAILS BODY -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <p class="text-xs text-slate-600 font-medium leading-relaxed mb-4 line-clamp-2">
            {{ story.description }}
          </p>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Published
            </span>

            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/story/${story.slug}`"
                target="_blank"
                class="p-2 rounded-xl text-purple-600 hover:bg-purple-50 transition text-xs font-bold"
                title="Preview"
              >
                👁️ Preview
              </NuxtLink>
              <button
                @click="deleteStory(story.id)"
                class="p-2 rounded-xl text-red-500 hover:bg-red-50 transition text-xs font-bold"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD STORY MODAL -->
    <div
      v-if="openModal"
      class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 class="text-xl font-black text-slate-800 flex items-center gap-2">
            <span>✨ Add Magical Story</span>
          </h3>
          <button
            @click="openModal = false"
            class="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="createStory" class="mt-6 space-y-4 text-sm font-semibold">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Story Title</label>
            <input
              v-model="newStory.title"
              type="text"
              required
              placeholder="e.g. 🦊 The Clever Little Fox"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Slug (URL friendly)</label>
            <input
              v-model="newStory.slug"
              type="text"
              required
              placeholder="clever-fox"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 font-mono text-xs"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
              <select
                v-model="newStory.category"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option value="Fairy Tale">Fairy Tale</option>
                <option value="Animals">Animals</option>
                <option value="Adventure">Adventure</option>
                <option value="Bedtime">Bedtime</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Age Group</label>
              <input
                v-model="newStory.age"
                type="text"
                placeholder="Ages 4-8"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Cover Image URL</label>
            <input
              v-model="newStory.image"
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 font-mono text-xs"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Short Description</label>
            <textarea
              v-model="newStory.description"
              rows="3"
              required
              placeholder="Brief summary of the story..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 text-xs"
            ></textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              @click="openModal = false"
              class="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold shadow-md"
            >
              Publish to Catalog 🌟
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
useSeoMeta({
  title: "Story Catalog - KidsStoryFlix Admin",
  robots: "noindex, nofollow"
})

import { ref, reactive, computed } from "vue"
import AdminLayout from "~/components/admin/AdminLayout.vue"

const searchQuery = ref("")
const selectedCategory = ref("All")
const openModal = ref(false)

const stories = ref([
  {
    id: 1,
    title: "🦁 The Brave Lion",
    slug: "brave-lion",
    category: "Animals",
    age: "Ages 4-8",
    duration: "5 mins",
    image: "https://res.cloudinary.com/dxe23gtsc/image/upload/v1779278768/65f805ad-831f-46bd-aa54-35f8cc2bf01a_ijee9c.png",
    description: "A brave lion protects the jungle animals and discovers friendship."
  },
  {
    id: 2,
    title: "🐰 Magic Rabbit",
    slug: "magic-rabbit",
    category: "Fairy Tale",
    age: "Ages 3-7",
    duration: "4 mins",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    description: "A rabbit discovers enchanted woodland powers deep inside the willow grove."
  },
  {
    id: 3,
    title: "🚀 Space Adventure",
    slug: "space-adventure",
    category: "Adventure",
    age: "Ages 5-10",
    duration: "6 mins",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    description: "Kids explore galaxies, singing moons and extraterrestrial friendly critters."
  },
  {
    id: 4,
    title: "🦄 Unicorn Forest",
    slug: "unicorn-forest",
    category: "Bedtime",
    age: "All Ages",
    duration: "7 mins",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "A glowing unicorn lulls the enchanted forest to peaceful sleep."
  },
  {
    id: 5,
    title: "🐼 Panda Dreams",
    slug: "panda-dreams",
    category: "Animals",
    age: "Ages 3-6",
    duration: "4 mins",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7",
    description: "A cheerful panda searches for delicious bamboo treats across misty mountains."
  }
])

const filteredStories = computed(() => {
  return stories.value.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCat = selectedCategory.value === "All" || s.category === selectedCategory.value
    return matchesSearch && matchesCat
  })
})

const newStory = reactive({
  title: "",
  slug: "",
  category: "Animals",
  age: "Ages 4-8",
  image: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
  description: ""
})

const createStory = () => {
  stories.value.unshift({
    id: Date.now(),
    ...newStory,
    duration: "5 mins"
  })

  // reset form
  newStory.title = ""
  newStory.slug = ""
  newStory.description = ""
  openModal.value = false
  alert("🎉 New story added successfully!")
}

const deleteStory = (id) => {
  if (confirm("Are you sure you want to remove this story from the catalog?")) {
    stories.value = stories.value.filter((s) => s.id !== id)
  }
}
</script>

