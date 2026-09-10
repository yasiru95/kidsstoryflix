import { globalStore } from '~/pinaGlobal/global'

export default defineNuxtPlugin(() => {
  const store = globalStore()

  // 🔄 restore login state after refresh
  store.initAuth()
})