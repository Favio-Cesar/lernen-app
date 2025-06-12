<template>
  <section class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Artículos</h1>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="article in articles"
        :key="article.id"
        class="rounded-xl shadow-md overflow-hidden bg-white"
      >
        <img
          v-if="article.attributes.cover?.data?.attributes?.url"
          :src="strapiURL(article.attributes.cover.data.attributes.url)"
          alt="cover"
          class="w-full h-48 object-cover"
        />

        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ article.attributes.title }}</h2>
          <p class="text-gray-600 mt-2">
            {{ article.attributes.description }}
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="topic in article.attributes.topics.data"
              :key="topic.id"
              class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {{ topic.attributes.theme }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { find } = useStrapi()
const { data } = await useAsyncData('articles', () =>
  find('articles', {
    populate: {
      cover: true,
      topics: true,
    },
  }),
)

const articles = data.value?.data || []

const strapiURL = (path: string) => {
  const baseURL = useRuntimeConfig().public.strapiURL || 'http://localhost:1337'
  return path.startsWith('http') ? path : baseURL + path
}
</script>
