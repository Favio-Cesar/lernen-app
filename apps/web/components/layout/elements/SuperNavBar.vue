<script setup>
import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
/* import { useI18n } from "vue-i18n"; */
/* 
const { t } = useI18n(); */
const route = useRoute();
const isMenuOpen = ref(false);
const activeIndex = ref(1);
const navbarRef = ref(null);

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (val) => val.every((item) => "path" in item && "title" in item),
  },
  basePath: {
    type: String,
    default: "/",
  },
  isSubNav: {
    type: Boolean,
    default: false,
  },
  inverted: {
    type: Boolean,
    default: false,
  },
});

const fullPaths = computed(() =>
  props.items.map((item) => ({
    ...item,
    path: `${props.basePath}/${item.path}`.replace(/\/+/g, "/"),
  }))
);

const selectorStyle = reactive({
  top: "0",
  left: "0",
  width: "0",
});

const isActive = (path) => {
  return props.isSubNav ? route.path === path : route.path.startsWith(path);
};

const updateSelector = () => {
  const activeElement = navbarRef.value?.querySelector(".nav-item.active");
  const navbar = navbarRef.value;

  if (activeElement && navbar) {
    const navRect = navbar.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();

    Object.assign(selectorStyle, {
      top: `${activeRect.top - navRect.top}px`,
      left: `${activeRect.left - navRect.left}px`,
      width: `${activeElement.offsetWidth}px`,
    });
  }
};

const setActive = (index) => {
  activeIndex.value = index;
  isMenuOpen.value = false;
  nextTick(updateSelector);
};

/*const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};*/

const handleResize = () => {
  updateSelector();
  if (window.innerWidth > 991) isMenuOpen.value = false;
};

onMounted(() => {
  updateSelector();
  window.addEventListener("resize", handleResize);
});

watch(
  () => route.path,
  () => nextTick(updateSelector)
);
</script>

<template>
  <ul ref="navbarRef" class="navbar-nav ml-auto">
    <div class="hori-selector" :class="{ inverted }" :style="selectorStyle">
      <div class="left" />
      <div class="right" />
    </div>
    <li
      v-for="(item, index) in fullPaths"
      :key="index"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
      @click="setActive(index)"
    >
      <NuxtLink class="nav-link" :to="item.path">
        <i
          :class="item.icon"
          :style="{ color: isActive(item.path) ? 'black' : '' }"
        />
        <span
          class="text"
          :style="{ color: isActive(item.path) ? 'black' : '' }"
          >{{ item.title }}</span
        >
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.text {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.5s ease;
}

.navbar-nav {
  position: relative;
}

.nav-item.active .nav-link {
  color: #171717;
  background-color: transparent;
  transition: all 0.7s;
}

.hori-selector {
  display: inline-block;
  position: absolute;
  height: 2.2rem;
  top: 0;
  left: 0;
  transition-duration: 0.2s;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: 0.5rem;

  &.inverted {
    transform: rotate(180deg);
    border-radius: 0;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  .right,
  .left {
    position: absolute;
    width: 20px;
    height: 15px;
    margin-top: 20px;
    background-color: #fff;
  }

  /* Resto de estilos específicos */
}
</style>
