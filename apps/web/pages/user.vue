<script setup lang="ts">
const { isLoggedIn } = storeToRefs(useAuthStore())
</script>

<template>
  <div>{{ isLoggedIn }}</div>
</template>

<style lang="scss" scoped></style>
