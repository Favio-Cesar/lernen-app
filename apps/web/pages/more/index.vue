<script setup lang="ts">
const {
  fields,
  filteredFields,
  searchQuery,
  expandedCard,
  toggleExpand,
  isSubscribed,
  subscribe,
  unsubscribe,
  config,
} = await useFieldsOfStudy()
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

  <IconsLoadingIcon status="1" v-else />
</template>

<style lang="scss" scoped>
@include themify($themes) {
  .card {
    background-color: themed('primary');
    .card-body {
      background-color: themed('tertiary');
      h3 {
        color: themed('text');
      }
      .description {
        color: themed('text');
      }
    }
  }
  .fields-container {
    h1 {
      color: themed('text');
    }

    .subtitle {
      color: themed('text');
    }
    .search-bar {
      border: 0.2rem dotted themed('primary');

      color: themed('text');
      &::placeholder {
        color: themed('text');
      }
    }
  }
  .subscribe-btn,
  .unsubscribe-btn {
    background-color: themed('secondary');
    color: themed('text');
    &:hover {
      background-color: themed('primary');
      color: themed('secondary');
    }
  }

  .unsubscribe-btn {
    color: rgb(190, 49, 49);
  }
}
.subscribe-btn,
.unsubscribe-btn {
  padding: $button-padding;
  border-radius: $button-radius;
  transition: all 0.2s ease;
}

.fields-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;

    margin-bottom: 0.25rem;
  }

  .subtitle {
    font-size: 1.2rem;

    margin-bottom: 1rem;
  }

  .search-bar {
    width: 100%;

    padding: 0.8rem 1rem;
    margin: 1rem 0 2rem;
    font-size: 1rem;

    border-radius: 8px;
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
