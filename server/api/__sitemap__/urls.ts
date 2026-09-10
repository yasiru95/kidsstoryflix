export default defineEventHandler(async () => {
  try {
    const stories: any[] = await $fetch(
      'https://api.kidsstoryflix.co.uk/api/stories'
    )

    return stories.map((story) => ({
      loc: `/story/${story.slug}`
    }))
  } catch (error) {
    console.error(
      'Failed to load stories for sitemap:',
      error
    )

    return []
  }
})