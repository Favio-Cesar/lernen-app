<script setup lang="ts">
definePageMeta({
  layout: "content-center",
});

const page = ref(0);
</script>

<template>
  <section class="card__container">
    <h1>{{ $t("phrase") }}</h1>
    <TheLogin />
  </section>
</template>

<style lang="scss" scoped></style>
