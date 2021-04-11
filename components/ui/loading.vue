<template>
  <div
    v-show="isLoading"
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-10 overflow-hidden bg-tuna-700 flex flex-col items-center justify-center bg-opacity-70"
  >
    <div
      class="bg-tuna-500 z-20 flex flex-col items-center justify-center w-1/3 h-1/4"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
      <h2 class="text-center text-white text-xl font-semibold">
        {{ $t("global.loading-text") }}
      </h2>
      <p v-show="loadingMessage" class="w-full mt-4 text-center text-white">
        {{ loadingMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Loading",
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    loadingMessage: {
      type: String,
      default: null,
    },
  },
  methods: {
    toogle(value: boolean) {
      this.isLoading = value;
    },
  },
  created() {
    this.$parent.$on("toogleLoading", this.toogle);
  },
});
</script>

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
