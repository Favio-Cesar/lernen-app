<template>
  <div class="user-button">
    <button @click="toggleModal" class="icon-button" aria-label="User menu">
      <Icon name="heroicons-outline:user" class="user-icon" />
    </button>
    <div v-if="showModal" class="modal">
      <ul class="modal-list">
        <li>
          <button @click="handleLogout" class="modal-option">Cerrar sesión</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false)
const { logout } = useAuthStore()

function toggleModal() {
  showModal.value = !showModal.value
}

function handleLogout() {
  showModal.value = false
  logout()
}
</script>
<style scoped lang="scss">
@include themify($themes) {
  .user-button {
    .modal {
      background-color: themed('background');
      border: 1px solid #ccc;
      color: themed('text');
    }
    .modal-option {
      &:hover {
        background-color: themed('tertiary');
      }
    }
  }
}
.user-button {
  position: relative;
  display: inline-block;

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
  }

  .user-icon {
    width: 2rem;
    height: 2rem;
  }

  .modal {
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    width: 12rem;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
    padding: 0.5rem;
    z-index: 1000;
  }

  .modal-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .modal-option {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    text-align: left;
    font: inherit;
    color: inherit;
    border-radius: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f0f0f0;
    }

    body.dark & {
      &:hover {
        background-color: #333;
      }
    }
  }
}
</style>
