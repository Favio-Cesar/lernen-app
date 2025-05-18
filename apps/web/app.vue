<script setup lang="ts"></script>
<template>
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
</template>
<style lang="scss">
@import 'flag-icons/css/flag-icons.min.css';
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
