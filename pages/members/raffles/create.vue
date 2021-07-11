<template>
  <!-- Create Raffle Form -->
  <section
    class="flex items-center justify-center px-4 py-6 mb-auto sm:px-6 lg:px-8"
  >
    <form
      class="container max-w-2xl mx-auto shadow-md md:w-3/4"
      @submit.prevent="createRaffle"
    >
      <div
        class="flex flex-col p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5"
      >
        <div class="max-w-sm mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-600 font-abel">
              {{ $t("raffles.new") }}
            </h1>
          </div>
        </div>
      </div>
      <div class="space-y-3 bg-white">
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm mx-auto sm:text-right md:w-1/4">
            {{ $t("raffles.code") }}
          </h2>
          <div class="flex max-w-sm gap-3 mx-auto md:w-3/5">
            <div class="relative w-3/4">
              <input
                v-model="newRaffle.code"
                type="text"
                required
                readonly
                id="newRaffle-code"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('raffles.code')"
              />
              <i
                class="absolute flex items-center fas fa-qrcode"
                style="right: 20px"
              />
            </div>
            <div class="w-2/5">
              <button
                type="button"
                v-on:click="generateOTC()"
                class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
              >
                <i
                  class="absolute left-0 flex items-center pl-3 fas fa-retweet"
                />
                {{ $t("raffles.generate") }}
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm mx-auto sm:text-right md:w-1/4">
            {{ $t("raffles.liveUrl") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="newRaffle.liveUrl"
                type="text"
                required
                id="newRaffle-name"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('raffles.liveUrl-placeholder')"
              />
              <i
                class="absolute flex items-center fas fa-anchor"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm mx-auto sm:text-right md:w-1/4">
            {{ $t("raffles.winners") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="newRaffle.winners"
                type="number"
                min="1"
                max="10"
                required
                id="newRaffle-status"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none noarrow focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('raffles.winners-placeholder')"
              />
              <i
                class="absolute flex items-center fas fa-gift"
                style="right: 20px"
              />
            </div>
          </div>
        </div>

        <hr />
        <div class="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i class="absolute left-0 flex items-center pl-3 fas fa-check" />
            {{ $t("raffles.btn-confirm") }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import toastaction from "~/components/ui/toast-action.vue";
import Raffle from "~/types/models/raffle";

export default Vue.extend({
  name: "create-raffle",
  middleware: ["members"],
  data() {
    return {
      userId: 0,
      channelId: 0,
      newRaffle: {
        code: "",
        status: 0, //0 - Active, 1 - Drawn, 2 - Canceled
      } as Raffle,
    };
  },
  computed: {
    ...mapState({
      channelUser: (state: any) => state.channelUser,
    }),
  },
  mounted() {
    this.generateOTC();
  },
  methods: {
    /**
     * Generator ONE TIME CODE
     */
    generateOTC() {
      var string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let OTC = "";

      var len = string.length;
      for (let i = 0; i < 8; i++) {
        OTC += string[Math.floor(Math.random() * len)];
      }

      this.newRaffle.code = OTC;
      console.info("GENERATED RAFFLE CODE: " + this.newRaffle.code);
    },

    /**
     *  Create Raffle
     */
    async createRaffle() {
      try {
        // Reference to owner
        let refUser = this.$fire.firestore.doc(
          `users/${this.channelUser.docId}`
        );

        this.newRaffle.user = refUser;
        this.newRaffle;

        await this.$fire.firestore
          .collection("raffles")
          .add({
            code: this.newRaffle.code,
            liveUrl: this.newRaffle.liveUrl,
            status: this.newRaffle.status,
            winners: this.newRaffle.winners,
            user: refUser,
            uid: this.channelUser.uid,
            created_at: this.$fireModule.firestore.Timestamp.now(),
          })
          .then((data) => {
            this.$toast.success(
              {
                component: toastaction,
                props: {
                  mensagem: this.$t("raffles.msgs.raffle-created"),
                },
              },
              {
                icon: "fas fa-exclamation-info",
              }
            );
            this.$router.push(this.localePath(`/members/raffles/${data.id}`));
          });
      } catch (e) {
        this.$toast.error(
          {
            component: toastaction,
            props: {
              mensagem: this.$t("global.msgs.general-error") + "<br>" + e,
            },
          },
          {
            icon: "fas fa-exclamation-triangle",
          }
        );
      }
    },
  },
});
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>