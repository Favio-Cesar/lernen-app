<script setup lang="ts">
import { ref, computed } from 'vue'
import { set } from 'zod'
import type { FieldOfStudy, StrapiResponse } from '~/interfaces/strapi/fields-of-studies'

const config = useRuntimeConfig()
const jwt = localStorage.getItem('jwt')

const { data: fieldsRaw } = await useStrapiFetch<StrapiResponse<FieldOfStudy>>(
  'fields-of-studies',
  jwt,
  {
    params: { populate: 'bookCover' },
  },
)
const expandedCard = ref<number | null>(null)
const searchQuery = ref('')

const toggleExpand = (index: number) => {
  expandedCard.value = expandedCard.value === index ? null : index
}

const filteredFields = computed(() => {
  return fieldsRaw?.filter((field: FieldOfStudy) =>
    field.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Obtener usuario autenticado
const user = await useStrapiFetch<any>('users/me', jwt, {
  params: { populate: 'fields_of_studies', status: 'published' },
})
console.log('user', user)

// Relación actual
const subscribedFieldIds = ref<number[]>(user?.fields_of_studies?.map((f) => f.id) ?? [])

const isSubscribed = (fieldId: number) => {
  return subscribedFieldIds.value.includes(fieldId)
}

// Suscribir (añadir ID)
const subscribe = async (fieldId: number) => {
  if (isSubscribed(fieldId)) return

  const newFields = [...subscribedFieldIds.value, fieldId]
  console.log('newFields', newFields)
  const updated = await useStrapiFetch('user/me', jwt, {
    method: 'PUT',
    body: {
      fields_of_studies: {
        connect: [fieldId],
      },
    },
  })

  subscribedFieldIds.value = updated.fields_of_studies.map((f) => f.id)
}

// Desuscribir (remover ID)
const unsubscribe = async (fieldId: number) => {
  const newFields = subscribedFieldIds.value.filter((id) => id !== fieldId)

  const updated = await useStrapiFetch('users/me', jwt, {
    method: 'PUT',
    body: {
      fields_of_studies: newFields,
    },
  })

  subscribedFieldIds.value = updated.fields_of_studies.map((f) => f.id)
}
</script>

<template>
  <section v-if="filteredFields" class="fields-container">
    <h1>Fields of Study</h1>
    <p class="subtitle">Explore the fields of study available in our platform.</p>

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

          <!-- Botones -->
          <div class="mt-4">
            <button
              v-if="!isSubscribed(field.id)"
              class="subscribe-btn"
              @click.stop="subscribe(field.id)"
            >
              Subscribirse
            </button>
            <button v-else class="unsubscribe-btn" @click.stop="unsubscribe(field.id)">
              Desubscribirse
            </button>
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
    color: $secondary-color;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: $secondary-color-light;
    margin-bottom: 1rem;
  }

  .search-bar {
    width: 100%;
    max-width: 400px;
    padding: 0.8rem 1rem;
    margin: 1rem 0 2rem;
    font-size: 1rem;
    border: 0.2rem dotted $secondary-color;
    border-radius: 8px;
    background: $secondary-color-light;
    color: $tertiary-color-light;

    &::placeholder {
      color: $secondary-color-light;
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
  align-items: start;
}

.card {
  background-color: $primary-color-dark;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 350px;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }

  .card-body {
    width: 100%;
    padding: 1.5rem;
    background: $primary-color-light;
    text-align: center;
    transition: background 0.3s ease;

    h3 {
      font-size: 1.4rem;
      color: $primary-color-dark;
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
      color: $primary-color-dark;
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
