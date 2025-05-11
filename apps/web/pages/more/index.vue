<script setup lang="ts">
import { ref, computed } from "vue";

const config = useRuntimeConfig();

const { data: fieldsRaw } = await $fetch(
  `${config.public.STRAPI_URL}/api/fields-of-studies?populate=bookCover`,
  {
    headers: {
      Authorization: `Bearer ${config.public.STRAPI_TOKEN}`,
    },
  }
);

const expandedCard = ref<number | null>(null);
const searchQuery = ref("");

const toggleExpand = (index: number) => {
  expandedCard.value = expandedCard.value === index ? null : index;
};

const filteredFields = computed(() => {
  return fieldsRaw?.filter((field: unknown) =>
    field.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <section v-if="filteredFields" class="fields-container">
    <h1>Fields of Study</h1>
    <p class="subtitle">
      Explore the fields of study available in our platform.
    </p>

    <input
      v-model="searchQuery"
      class="search-bar"
      type="text"
      placeholder="Search by title..."
    />

    <TransitionGroup name="card" tag="div" class="card-grid">
      <div
        v-for="(field, index) in filteredFields"
        :key="field.id"
        class="card"
        :class="{ expanded: expandedCard === index }"
        @click="toggleExpand(index)"
      >
        <MoreBooksIcon
          :book="{
            image: `${config.public.STRAPI_URL}${field.bookCover.url}`,
          }"
        />

        <div class="card-body">
          <h3>{{ field.title }}</h3>
          <div class="description-wrapper">
            <p class="description">
              {{ field.description?.[0]?.children?.[0]?.text }}
            </p>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </section>

  <IconsLoadingIcon v-else />
</template>

<style lang="scss" scoped>
.fields-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #dcdcdc;
    margin-bottom: 1rem;
  }

  .search-bar {
    width: 100%;
    max-width: 400px;
    padding: 0.8rem 1rem;
    margin: 1rem 0 2rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background: #ffffff22;
    color: #fff;

    &::placeholder {
      color: #cccccc;
    }
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  align-items: start; // <- importante para que no se alineen todas por el centro
}

.card {
  background-color: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 350px; // <- fuerza una altura mínima común (ajusta según el contenido base)
  position: relative; // <- si quieres agregar sombra interna o posición absoluta luego

  &:hover {
    transform: translateY(-5px);
  }

  .card-body {
    width: 100%;
    padding: 1.5rem;
    background: #ffffff11;
    text-align: center;
    transition: background 0.3s ease;

    h3 {
      font-size: 1.4rem;
      color: #fff;
      margin-bottom: 0.75rem;
    }

    .description-wrapper {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .description {
      font-size: 1rem;
      color: #e2e2e2;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: pre-wrap;
    }
  }

  &.expanded .card-body .description-wrapper {
    max-height: 300px;
    opacity: 1;
    margin-top: 1rem;
  }
}
.card-enter-active,
.card-leave-active {
  transition: all 0.3s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.card-enter-to,
.card-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
