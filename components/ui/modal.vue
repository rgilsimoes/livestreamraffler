<template>
  <transition name="fade">
    <div v-show="show_modal" class="fixed inset-0 z-30">
      <!--       background -->
      <div
        v-show="show_modal"
        @click="showModal()"
        class="fixed inset-0 z-20 w-full h-full bg-white opacity-25 bg-filter"
      ></div>
      <!--          -->
      <main class="flex flex-col items-center justify-center w-full h-full">
        <transition name="fade-up-down">
          <div
            v-show="show_modal"
            class="z-30 flex items-center inline-block modal-wrapper"
          >
            <div
              class="relative flex-row max-w-md max-h-screen mx-auto bg-white rounded shadow-lg modal xl:max-w-5xl lg:max-w-5xl md:max-w-2xl"
            >
              <div class="p-5 text-gray-900 bg-gray-900 rounded-t modal-header">
                <h5 class="text-2xl text-white uppercase">this is header</h5>
              </div>
              <div class="w-full h-full p-5 overflow-y-auto modal-body">
                <p class="text-justify">
                  cilis omnis nam illum maiores, porro velit deserunt neque.
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Esse, voluptates eveniet labore dolorum molestiae, modi saepe
                  fugiat minima repudiandae repellendus obcaecati voluptatibus
                  ab tenetur recusandae eius quos at maiores atque consectetur
                  facilis! Nisi fuga
                </p>
              </div>
              <div class="px-5 py-3 text-right modal-footer border0-t">
                <button
                  class="px-5 py-2 text-white bg-green-500"
                  @click="showModal()"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </transition>
      </main>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "modal",
  data() {
    return {
      show_modal: true,
    };
  },
  props: {
    mensagem: {
      type: String,
      default: "Substitua esta mensagem.<br>Pode ser?",
    },
  },
  methods: {
    showModal() {
      this.show_modal = !this.show_modal;
    },
  },
});
</script>

<style scoped>
.modal-body {
  max-height: 500px;
}
.bg-gray-800-opacity {
  background-color: #2d374850;
}
@media screen and (max-width: 768px) {
  .modal-body {
    max-height: 400px;
  }
}

/* animation for vue transition tag */

.fade-up-down-enter-active {
  transition: all 0.3s ease;
}
.fade-up-down-leave-active {
  transition: all 0.3s ease;
}
.fade-up-down-enter {
  transform: translateY(10%);
  opacity: 0;
}
.fade-up-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}

.fade-enter-active {
  -webkit-transition: opacity 2s;
  transition: opacity 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>