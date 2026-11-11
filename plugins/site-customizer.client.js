import { useSiteCustomizerStore } from "~/pinaGlobal/siteCustomizer"

export default defineNuxtPlugin(() => {
  const customizer = useSiteCustomizerStore()
  customizer.loadFromStorage()
})

