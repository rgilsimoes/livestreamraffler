<template>
  <!-- Index -->
  <div>
    <section>
      <div class="flex items-center justify-center">
        <div class="px-12 py-6">
          <div class="text-center">
            <h2
              class="w-full my-3 text-5xl font-semibold font-abel leading-light font-heading"
            >
              {{ $t("index.participate-heading") }}
            </h2>
            <span class="text-xl font-semibold">{{
              $t("index.participate-subheading")
            }}</span>
            <div class="w-full py-10 text-center">
              <form @submit.prevent="registerInRaffle">
                <div class="flex items-center max-w-lg p-1 pr-0 mx-auto">
                  <input
                    v-model="raffleCode"
                    type="text"
                    required
                    :placeholder="$t('index.enter-code')"
                    class="flex-auto p-3 mr-2 text-gray-900 placeholder-gray-600 rounded shadow appearance-none focus:outline-none"
                  />
                  <button
                    type="submit"
                    class="w-2/5 p-3 font-semibold text-white bg-indigo-600 rounded shadow hover:bg-indigo-700"
                  >
                    {{ $t("index.btn-participate") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-4 text-center">
      <div class="w-full max-w-2xl mx-auto">
        <h2
          class="mt-2 mb-6 text-5xl font-semibold leading-tight font-abel font-heading"
        >
          {{ $t("index.create-heading") }}
        </h2>
        <span class="text-xl font-semibold">{{
          $t("index.create-subheading")
        }}</span>

        <div class="py-10">
          <NuxtLink
            class="inline-block px-8 py-4 mr-6 font-semibold leading-none text-white bg-indigo-600 rounded shadow hover:bg-indigo-700"
            :to="localePath('/register')"
            >{{ $t("index.btn-register") }}</NuxtLink
          >
          <NuxtLink
            class="font-extrabold text-indigo-600 hover:underline"
            :to="localePath('/about')"
            >{{ $t("index.link-howto") }}</NuxtLink
          >
        </div>
      </div>
      <ui-modal v-if="showModal" @close="showModal = false" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "index",
  data: () => ({
    raffleCode: "",
    showModal: false,
  }),
  methods: {
    registerInRaffle() {
      alert("teste");
      if (this.raffleCode !== "") {
        this.showModal = true;
      }
    },
  },
});
</script>

