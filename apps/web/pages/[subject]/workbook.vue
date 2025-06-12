<template>
  <div class="modules-container">
    <UiTheModule
      v-for="(mod, i) in modules"
      :key="mod.id"
      @duplicate="addModule"
      @close="removeModule(i)"
    />
  </div>
</template>

<script setup>
import { UiTheModule } from '#components'
const modules = ref([{ id: Date.now() }])

const addModule = () => {
  modules.value.push({ id: Date.now() })
}

const removeModule = (index) => {
  modules.value.splice(index, 1)
}
</script>

<style scoped>
.modules-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
}
</style>
