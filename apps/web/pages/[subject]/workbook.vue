<template>
  <div class="workbook-">
    <div class="workbook-container">
      <div class="workbook-header">
        <div class="segmented-control">
          <input
            id="tab-ejercicios"
            type="radio"
            name="section"
            value="ejercicios"
            checked
          />
          <label for="tab-ejercicios" class="segmented-control__1"
            ><p>Ejercicios</p></label
          >

          <input id="tab-problemas" type="radio" name="section" value="problemas" />
          <label for="tab-problemas" class="segmented-control__2"><p>Problemas</p></label>

          <div class="segmented-control__color"></div>
        </div>

        <div class="timer">
          <div class="circle">
            <span class="circle__btn" @click="toggleTimer">
              <ion-icon class="pause" name="pause"></ion-icon>
              <ion-icon class="play" name="play"></ion-icon>
            </span>
            <span class="circle__back-1"></span>
            <span class="circle__back-2"></span>
          </div>
          <div class="clock">
            <div class="hand hours"></div>
            <div class="hand minutes"></div>
            <div class="point"></div>
          </div>
        </div>
      </div>

      <!-- Lista de ejercicios -->
      <div class="exercise-list">
        <div v-for="(exercise, index) in exercises" :key="index" class="exercise-item">
          <div class="checkbox">
            <input
              :id="`exercise-${index}`"
              v-model="exercise.completed"
              type="checkbox"
            />
            <label :for="`exercise-${index}`">
              <i class="material-icons">done</i>
            </label>
          </div>
          <div class="exercise-content">
            <h3>{{ exercise.title }}</h3>
            <p>{{ exercise.description }}</p>
            <div class="difficulty-slider">
              <div class="slider__box">
                <span class="slider__btn"></span>
                <span class="slider__color"></span>
              </div>
              <span>Dificultad: {{ exercise.difficulty }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat AI -->
      <div class="ai-chat">
        <div class="chat-messages">
          <div v-for="(msg, index) in chatMessages" :key="index" class="message">
            <div class="message-icon">
              <ion-icon :name="msg.sender === 'user' ? 'person' : 'sparkles'"></ion-icon>
            </div>
            <div class="message-content">{{ msg.text }}</div>
          </div>
        </div>
        <div class="chat-input">
          <div class="form">
            <input
              v-model="newMessage"
              class="form__input"
              placeholder="Escribe tu pregunta..."
              type="text"
              @keyup.enter="sendMessage"
            />
          </div>
          <div class="btn btn__primary" @click="sendMessage">
            <p>Enviar</p>
          </div>
        </div>
      </div>
    </div>

    <!-- RESOURCES UI -->
    <div class="resources-container">
      <!-- Barra de búsqueda y filtros -->
      <div class="resources-header">
        <div class="search">
          <input type="text" class="search__input" placeholder="Buscar recursos..." />
          <div class="search__icon">
            <ion-icon name="search"></ion-icon>
          </div>
        </div>
        <div class="filter-chips">
          <div v-for="(tag, index) in filters" :key="index" class="chip">
            <p>{{ tag }}</p>
            <div class="chip__close">
              <ion-icon name="close"></ion-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de recursos -->
      <div class="resources-grid">
        <div v-for="(resource, index) in resources" :key="index" class="resource-card">
          <div class="card-header">
            <div class="icon__account">
              <ion-icon name="person"></ion-icon>
            </div>
            <h3>{{ resource.title }}</h3>
            <div class="card-actions">
              <div class="bookmark">
                <input :id="`bookmark-${index}`" type="checkbox" />
                <label :for="`bookmark-${index}`">
                  <ion-icon name="bookmark"></ion-icon>
                </label>
              </div>
            </div>
          </div>
          <div class="card-content">
            <p>{{ resource.description }}</p>
            <div class="resource-tags">
              <span v-for="(tag, tagIndex) in resource.tags" :key="tagIndex" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="card-footer">
            <div class="btn btn__secondary">
              <p>Ver más</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercises: [
        {
          title: 'Álgebra Básica',
          description: 'Resolver ecuaciones de primer grado',
          difficulty: 60,
          completed: false,
        },
      ],
      chatMessages: [{ sender: 'ai', text: '¿En qué puedo ayudarte hoy?' }],
      newMessage: '',

      filters: ['Matemáticas', 'Ejercicios Resueltos'],
      resources: [
        {
          title: 'Guía de Geometría',
          description: 'Conceptos básicos de geometría euclidiana...',
          tags: ['geometría', 'educación básica'],
        },
      ],
    }
  },
  methods: {
    toggleTimer() {},
    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatMessages.push({
          sender: 'user',
          text: this.newMessage,
        })

        setTimeout(() => {
          this.chatMessages.push({
            sender: 'ai',
            text: 'Esta es una respuesta simulada de la IA',
          })
        }, 1000)
        this.newMessage = ''
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin shadow-transition {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
:root {
  --primary-light: #8abdff;
  --primary: #6d5dfc;
  --primary-dark: #5b0eeb;

  --white: #ffffff;
  --greyLight-1: #e4ebf5;
  --greyLight-2: #c8d0e7;
  --greyLight-3: #bec8e4;
  --greyDark: #9baacf;
}
$primary-light: #8abdff;
$primary: #6d5dfc;
$primary-dark: #5b0eeb;
$white: #ffffff;
$greyLight-1: #e4ebf5;
$greyLight-2: #c8d0e7;
$greyLight-3: #bec8e4;
$greyDark: #9baacf;

$shadow:
  0.3rem 0.3rem 0.6rem $greyLight-2,
  -0.2rem -0.2rem 0.5rem $white;
$inner-shadow:
  inset 0.2rem 0.2rem 0.5rem $greyLight-2,
  inset -0.2rem -0.2rem 0.5rem $white;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

html {
  font-size: 62.5%;
  background: $greyLight-1;
}

.workbook-container,
.resources-container {
  max-width: 1200px;
  margin: 2rem auto 0 auto;
  padding: 2rem;
  border-radius: 2rem;

  background: $greyLight-1;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.workbook-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  .segmented-control {
    position: relative;
    display: flex;
    height: 4rem;
    box-shadow: $shadow;
    border-radius: 1rem;
    overflow: hidden;

    input {
      display: none;
      transition: all 0.3s ease;
      &:checked + label {
        color: $primary;
        transition: all 0.3s ease;
      }
    }

    label {
      padding: 0 2rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: $greyDark;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        color: $primary;
        transform: translateY(-1px);
      }
    }

    &__color {
      position: absolute;
      height: 3.4rem;
      width: 6.2rem;
      background: $white;
      border-radius: 0.8rem;
      box-shadow: $inner-shadow;
      transition:
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.2s ease;
    }
  }

  .timer {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    .circle {
      &__btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          transform: scale(0.95) rotate(180deg);
        }

        ion-icon {
          transition: opacity 0.2s ease;
        }
      }

      &__back-1,
      &__back-2 {
        transition: opacity 0.4s ease;
      }
    }

    .clock {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      box-shadow: $shadow;
      position: relative;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      .hand {
        position: absolute;
        background: $primary;
        transform-origin: bottom;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .point {
        width: 0.6rem;
        height: 0.6rem;
        background: $primary;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

$shadow-hover:
  0.5rem 0.5rem 1.2rem $greyLight-2,
  -0.4rem -0.4rem 1rem $white;

.exercise-list {
  .exercise-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    box-shadow:
      inset 0.2rem 0.2rem 1rem var(--primary-light),
      inset -0.2rem -0.2rem 1rem var(--primary-dark),
      $shadow;
    @include shadow-transition;

    &:hover {
      transform: translateY(-3px);
      box-shadow:
        inset 0.2rem 0.2rem 1rem var(--primary-dark),
        inset -0.2rem -0.2rem 1rem var(--primary-light);
    }

    .checkbox {
      input {
        display: none;
      }

      label {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.5rem;
        box-shadow: $shadow;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition:
          box-shadow 0.3s ease,
          transform 0.2s ease;

        i {
          color: $greyDark;
          transition: color 0.2s ease;
        }
      }

      input:checked ~ label {
        box-shadow: $inner-shadow;
        transform: scale(0.95);

        i {
          color: $primary;
        }
      }
    }

    .difficulty-slider {
      margin-top: 1rem;

      .slider__box {
        height: 0.6rem;
        border-radius: 1rem;
        box-shadow: $inner-shadow;
        position: relative;
        transition: box-shadow 0.3s ease;

        &__color {
          height: 100%;
          width: 50%;
          background: $primary;
          border-radius: inherit;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &__btn {
          position: absolute;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          background: $white;
          box-shadow: $shadow;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          transition:
            left 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.2s ease;

          &:hover {
            transform: translateY(-50%) scale(1.1);
          }
        }
      }
    }
  }
}

@mixin shadow-transition {
  transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow;
}

.ai-chat {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: $shadow;
  transition: transform 0.3s ease;
  @include shadow-transition;

  .chat-messages {
    height: 300px;
    overflow-y: auto;
    transition: height 0.3s ease;
    @include shadow-transition;

    .message {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      transition: opacity 0.3s ease;
      @include shadow-transition;

      &-icon {
        min-width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        box-shadow: $shadow;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
        @include shadow-transition;

        &:hover {
          transform: rotate(15deg);
          box-shadow:
            0.4rem 0.4rem 1rem $greyLight-2,
            -0.3rem -0.3rem 1rem $white;
        }
      }

      &-content {
        padding: 1rem;
        border-radius: 1rem;
        background: $white;
        box-shadow: $inner-shadow;
        transition:
          box-shadow 0.3s ease,
          background-color 0.3s ease;

        &:hover {
          box-shadow:
            0.3rem 0.3rem 0.6rem $greyLight-2,
            -0.2rem -0.2rem 0.5rem $white;
        }
      }
    }
  }

  .chat-input {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    @include shadow-transition;

    .form__input {
      flex-grow: 1;
      padding: 1rem;
      border: none;
      border-radius: 1rem;
      box-shadow: $inner-shadow;
      background: $white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      @include shadow-transition;

      &:focus {
        outline: none;
        box-shadow: $shadow;
        transform: scale(1.01);
      }
    }

    .btn__primary {
      padding: 1rem 2rem;
      border-radius: 1rem;
      background: $primary;
      color: $white;
      box-shadow: $shadow;
      cursor: pointer;
      transition:
        box-shadow 0.2s ease,
        transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0.4rem 0.4rem 1.2rem $greyLight-2,
          -0.3rem -0.3rem 1rem $white;
      }

      &:active {
        box-shadow: $inner-shadow;
        transform: translateY(0);
      }
    }
  }
}

.resources-container {
  .search {
    position: relative;
    transition: filter 0.3s ease;

    &__input {
      width: 100%;
      padding: 1rem 1rem 1rem 3.5rem;
      border: none;
      border-radius: 1rem;
      box-shadow: $inner-shadow;
      background: $white;
      transition:
        box-shadow 0.3s ease,
        padding 0.3s ease;

      &:focus {
        box-shadow: $shadow;
        padding-left: 4rem;
      }
    }

    &__icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: $greyDark;
      transition:
        color 0.3s ease,
        transform 0.2s ease;
    }

    &:hover &__icon {
      color: $primary;
      transform: translateY(-50%) scale(1.1);
    }
  }

  .filter-chips {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    .chip {
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      box-shadow: $shadow;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition:
        transform 0.2s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow:
          0.4rem 0.4rem 1rem $greyLight-2,
          -0.3rem -0.3rem 1rem $white;
      }

      &__close {
        cursor: pointer;
        transition:
          color 0.3s ease,
          transform 0.2s ease;

        &:hover {
          color: $primary;
          transform: rotate(90deg);
        }
      }
    }
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;

    .resource-card {
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: $shadow;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow:
          0.5rem 0.5rem 1.5rem $greyLight-2,
          -0.4rem -0.4rem 1.2rem $white;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;

        .icon__account {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          box-shadow: $shadow;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .resource-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 1rem;

        .tag {
          padding: 0.3rem 0.8rem;
          border-radius: 0.5rem;
          background: $greyLight-2;
          box-shadow: $inner-shadow;
          font-size: 0.8rem;
          transition:
            transform 0.2s ease,
            background-color 0.3s ease;

          &:hover {
            transform: scale(1.05);
            background: $white;
          }
        }
      }

      .card-footer {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;

        .btn__secondary {
          padding: 0.8rem 1.5rem;
          border-radius: 1rem;
          box-shadow: $shadow;
          cursor: pointer;
          transition:
            box-shadow 0.2s ease,
            transform 0.2s ease;

          &:hover {
            transform: translateX(3px);
            box-shadow:
              0.4rem 0.4rem 1rem $greyLight-2,
              -0.3rem -0.3rem 1rem $white;
          }

          &:active {
            box-shadow: $inner-shadow;
          }
        }
      }
    }
  }
}

@keyframes bookmark {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .workbook-header {
    flex-direction: column;
    gap: 1.5rem;
    transition: gap 0.3s ease;
  }

  .exercise-item {
    flex-direction: column;
    transition: flex-direction 0.3s ease;
  }

  .resources-grid {
    grid-template-columns: 1fr;
    transition: grid-template-columns 0.3s ease;
  }
}

@keyframes bookmark {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .workbook-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .exercise-item {
    flex-direction: column;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>
