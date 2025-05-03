<script setup lang="ts">
const config = useRuntimeConfig();
const { data: categories } = await useAsyncData("categories", () =>
  $fetch(`${config.public.STRAPI_URL}/api/categories`)
);
console.log(config.public.STRAPI_URL);
</script>

<template>
  <div>
    <h2>Categorías</h2>
    <section v-if="categories?.data?.length">
      <article v-for="item in categories.data" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>Slug: {{ item.slug }}</p>
      </article>
    </section>
    <p v-else>No hay categorías</p>
  </div>
</template>

<style scoped lang="scss">
article {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
