<script setup>
import { ref } from "vue";

import NavBar from "~/components/layout/elements/NavBar.vue";
import NavBarDown from "~/components/layout/elements/NavBarDown.vue";
import SuperNavBar from "~/components/layout/elements/SuperNavBar.vue";

const isMenuOpen = ref(false);
</script>
<template>
  <div>
    <nav class="navbar navbar-mainbg">
      <div
        class="navbar navbar-collapse navbarSupportedContent"
        :class="{ show: isMenuOpen }"
      >
        <NavBar />
        <NavBarDown />

        <SuperNavBar
          :items="[
            { path: 'workbook', title: 'Workbook', icon: 'fas fa-book' },
            { path: 'resources', title: 'Resources', icon: 'fas fa-box-open' },
          ]"
          base-path="/maths"
          is-sub-nav
          inverted
        />
      </div>
    </nav>

    <slot />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
.text {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.5s ease;
}
body {
  font-family: "Roboto", sans-serif;
  transition: all 0.7s;
}

* {
  margin: 0;
  padding: 0;
}
.navbar {
  display: flex;
  flex-direction: column;
  min-height: 5.5rem;
}
.navbar-mainbg {
  background-color: #171717;
  padding: 0px;
}

.navbarSupportedContent {
  overflow: hidden;
  position: relative;

  ul {
    padding: 0px;
    margin: 0px;
    margin-left: 1.4rem;
    li a i {
      margin-right: 10px;
    }
  }

  li {
    list-style-type: none;
    float: left;
  }

  ul li a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 15px;
    display: block;
    padding: 1rem 1rem 0rem 1rem;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: relative;
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    display: none;
    &.show {
      display: block;
    }
  }
}
</style>
