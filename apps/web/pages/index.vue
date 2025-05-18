<script setup lang="ts">
import type { FieldOfStudy, StrapiResponse } from '~/interfaces/strapi/fields-of-studies'

const { data: fieldsRaw } = await useStrapiFetch<StrapiResponse<FieldOfStudy>>(
  'fields-of-studies?populate=bookCover',
)
</script>

<template>
  <div>
    <h2>Categorías</h2>
    <section v-if="fieldsRaw.length">
      <article v-for="item in fieldsRaw" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>Slug: {{ item.publishedAt }}</p>
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
