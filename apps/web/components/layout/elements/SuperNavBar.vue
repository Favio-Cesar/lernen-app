<script setup>
import { ref, reactive, onMounted, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

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
  <ul ref="navbarRef" class="navbar-nav">
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
        <i :class="item.icon" />
        <span class="text">{{ item.title }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.navbar-nav {
  position: relative;
  display: flex;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
  list-style: none;

  .nav-item {
    position: relative;
    z-index: 1;

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      text-decoration: none;
      transition: color 0.3s ease;

      i {
        font-size: 1.1rem;
        color: #fff;
        transition: color 0.3s ease;
      }

      .text {
        font-size: 0.95rem;
        font-weight: 500;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: color 0.3s ease;
      }

      &:hover {
        i,
        .text {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    &.active {
      .nav-link {
        i,
        .text {
          color: #171717;
        }
      }
    }
  }
}

.hori-selector {
  position: absolute;
  height: 2.2rem;
  background: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 0;

  .left,
  .right {
    position: absolute;
    width: 20px;
    height: 15px;
    background: #fff;

    &::before {
      content: "";
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #171717;
    }
  }

  .left {
    left: -20px;

    &::before {
      bottom: 0;
      left: -25px;
    }
  }

  .right {
    right: -20px;

    &::before {
      bottom: 0;
      right: -25px;
    }
  }

  &.inverted {
    transform: rotate(180deg);
    border-radius: 0;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
}

@media (max-width: 991px) {
  .navbar-nav {
    flex-direction: column;
    gap: 0.5rem;

    .nav-item .nav-link {
      padding: 0.75rem;
    }
  }

  .hori-selector {
    margin-left: 10px;
    border-radius: 0;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
}
</style>
