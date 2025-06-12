<script setup lang="ts">
defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['toggle'])

const handleClick = () => {
  emit('toggle')
}
</script>

<template>
  <div class="icon" @click="handleClick">
    <div class="circle">
      <div class="hamburger" :class="{ open: isOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$size: 6rem;
$circle-size: 4.5rem;
$circle-size-l: 5.2rem;

.hamburger {
  width: 2rem;
  height: 2rem;
  position: relative;
  transform: translateX(-0.5rem);
  cursor: pointer;
  z-index: 10;

  span {
    display: block;
    position: absolute;
    height: 6px;
    width: 3rem;
    background-image: linear-gradient(to right, $primary-color, $secondary-color);
    border-radius: 4px;
    transition:
      transform 0.4s ease,
      opacity 0.3s ease;

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }
    &:nth-child(3) {
      bottom: 0;
    }
  }

  &.open {
    span:nth-child(1) {
      transform: translateY(0.8rem) rotate(45deg);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: translateY(-0.8rem) rotate(-45deg);
    }
  }
}

.icon {
  width: $size;
  height: $size;
  background: $secondary-color-lighter;
  border-radius: 50%;
  margin: 0 auto;
  position: fixed;
  box-shadow: 0px 3px 7px -1px $secondary-color-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.9);
  }
  &::before {
    content: '';
    position: absolute;
    width: $circle-size-l;
    height: $circle-size-l;
    background-image: linear-gradient(
      to right,
      $tertiary-color-light,
      $secondary-color-lighter
    );
    border-radius: 50%;
    animation: rotate 4s linear infinite;
    z-index: 0;
  }

  .circle {
    width: $circle-size;
    height: $circle-size;
    background: $secondary-color-lighter;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
