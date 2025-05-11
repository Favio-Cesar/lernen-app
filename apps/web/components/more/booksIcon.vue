<script setup lang="ts">
interface Book {
  image: string;
}

defineProps<{
  book: Book;
}>();

const isHovered = ref(false);
</script>

<template>
  <div class="books__item">
    <div class="books__container">
      <div
        class="books__cover"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="books__back-cover" />
        <div class="books__inside">
          <div
            v-for="(_, index) in 3"
            :key="index"
            class="books__page"
            :class="{ 'books__page--hover': isHovered }"
          />
        </div>
        <div class="books__image" :class="{ 'books__image--hover': isHovered }">
          <NuxtImg :src="book.image" />
          <div
            class="books__effect"
            :class="{ 'books__effect--hover': isHovered }"
          />
          <div
            class="books__light"
            :class="{ 'books__light--hover': isHovered }"
          />
        </div>
        <div class="books__hitbox" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.books__item {
  text-align: center;
  cursor: pointer;
  perspective: 2000px;
}

.books__container {
  position: relative;
  width: 220px;
  margin: 0 auto;
}

.books__cover {
  position: relative;
  transition: transform 0.3s ease;
}

.books__back-cover {
  position: absolute;
  width: 96%;
  height: 96%;
  top: 2%;
  left: 2%;
  background: #111;
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  z-index: -10;
}

.books__inside {
  position: absolute;
  width: 90%;
  height: 94%;
  top: 3%;
  left: 5%;
  z-index: 0;
}

.books__page {
  position: absolute;
  top: 0;
  right: 0;
  width: 98%;
  height: 100%;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 6px 6px 0;
  transform: translateX(0);
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

.books__page:nth-child(1) {
  z-index: -5;
}
.books__page:nth-child(2) {
  z-index: -6;
}
.books__page:nth-child(3) {
  z-index: -7;
}

.books__page--hover:nth-child(1) {
  transform: translateX(4px);
}
.books__page--hover:nth-child(2) {
  transform: translateX(2px);
}
.books__page--hover:nth-child(3) {
  transform: translateX(0);
}

.books__image {
  position: relative;
  border-radius: 2px 6px 6px 2px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.15),
    0 30px 45px rgba(0, 0, 0, 0.12),
    0 60px 80px rgba(0, 0, 0, 0.1);
  transform: rotateY(0) translateX(0) scaleX(1);
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

.books__image--hover {
  transform: rotateY(-12deg) translateX(-6px) scaleX(0.96);
  box-shadow:
    10px 10px 20px rgba(0, 0, 0, 0.25),
    20px 20px 40px rgba(0, 0, 0, 0.2),
    40px 40px 60px rgba(0, 0, 0, 0.15);
}

.books__image img {
  width: 100%;
  border-radius: 2px 6px 6px 2px;
}

.books__effect {
  position: absolute;
  top: 0;
  width: 20px;
  height: 100%;

  border-left: 2px solid rgba(0, 0, 0, 0.06);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 100%
  );
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

.books__effect--hover {
  width: 10px;
}

.books__light {
  position: absolute;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  opacity: 0.15;
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

.books__light--hover {
  opacity: 0.2;
  transform: rotateY(-12deg);
}

.books__hitbox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
