<template>
  <transition name="fade">
    <div class="fixed inset-0 z-30">
      <!-- modal background -->
      <div
        @click="$emit('close')"
        class="fixed inset-0 z-20 w-full h-full bg-tuna-700 bg-opacity-70 bg-filter"
      ></div>
      <!-- modal box-->
      <main class="flex flex-col items-center justify-center w-full h-full">
        <transition name="fade-up-down">
          <div class="z-30 flex items-center modal-wrapper w-full">
            <div
              class="relative flex-row w-1/2 max-h-screen mx-auto bg-white rounded shadow-lg modal xl:max-w-5xl lg:max-w-2xl md:max-w-xl"
            >
              <div
                class="p-3 text-gray-900 bg-gray-900 rounded-t modal-header flex justify-between"
              >
                <h5 class="text-2xl text-white">{{ title }}</h5>
                <button
                  type="button"
                  class="px-2 py-2 text-white bg-pink-700 rounded hover:bg-golden-600 focus:outline-none focus:text-white focus:bg-gray-700"
                  @click="$emit('close')"
                >
                  {{ $t("global.btn-close") }}
                </button>
              </div>
              <div class="w-full h-full p-5 overflow-y-auto modal-body">
                <p class="text-justify">
                  <slot name="body"><span v-html="content"></span></slot>
                </p>
              </div>
              <div class="px-5 py-3 modal-footer border0-t">
                <slot name="footer"></slot>
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
    return {};
  },
  props: {
    title: {
      type: String,
      default: "Tittle",
    },
    content: {
      type: String,
      default: "Inline content",
    },
  },
  methods: {},
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