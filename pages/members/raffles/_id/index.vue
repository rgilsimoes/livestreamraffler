<template>
  <!-- Update Raffle Form -->
  <section
    class="items-center justify-center px-4 py-6 mb-auto sm:px-6 lg:px-8"
  >
    <form
      @submit.prevent="updateRaffle"
      class="container max-w-2xl mx-auto shadow-md md:w-3/4"
    >
      <div
        class="flex flex-col p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5"
      >
        <div class="max-w-sm mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-600 font-abel">
              {{ $t("raffles.view-raffle") }}
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
                v-model="raffle.code"
                type="text"
                readonly
                id="raffle-code"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('raffles.code')"
              />
              <i
                class="absolute flex items-center fas mt-2 fa-qrcode"
                style="right: 20px"
              />
            </div>
            <div class="w-2/5"></div>
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
                v-model="raffle.liveUrl"
                type="text"
                required
                readonly
                id="raffle-name"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('raffles.liveUrl')"
              />
              <i
                class="absolute flex items-center fas mt-2 fa-anchor"
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
                v-model="raffle.winners"
                type="number"
                min="1"
                max="10"
                required
                readonly
                id="raffle-winners"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none noarrow focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('raffles.winners-placeholder')"
              />
              <i
                class="absolute flex items-center fas mt-2 fa-gift"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm mx-auto sm:text-right md:w-1/4">
            {{ $t("raffles.create-date") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div
              class="relative text-gray-900 border-gray-400 border border-transparent rounded-md p-2 shadow-sm"
            >
              {{ raffle.createdAt.toLocaleDateString($i18n.locale) }}
              <i
                class="absolute flex items-center fas mt-2 fa-calendar text-gray-500"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="flex w-full px-4 pb-4 ml-auto text-gray-500 md:w-2/3">
          <button
            @click.prevent="showModal = true"
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i
              class="absolute left-0 flex items-center pl-3 fas mt-2 fa-hourglass"
            />
            {{ $t("raffles.btn-raffle") }}
          </button>
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i class="absolute left-0 flex items-center pl-3 fas mt-2 fa-ban" />
            {{ $t("raffles.btn-cancelar") }}
          </button>
        </div>
      </div>
    </form>

    <div class="container max-w-2xl mx-auto shadow-md md:w-3/4">
      <div
        class="flex flex-col p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5 mt-5"
      >
        <div class="flex justify-between">
          <div class="inline-flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-600 font-abel">
              {{ $t("raffles.participants.participants") }}
            </h1>
          </div>
          <div class="inline-flex items-center space-x-4">
            <button
              @click="loadParticipants"
              type="button"
              class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-pink-400 rounded shadow-md hover:bg-pink-800"
            >
              <i class="fas mt-2 fa-sync-alt" />
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-left text-gray-800 bg-white border-b border-gray-200 w-3/5"
                >
                  {{ $t("raffles.participants.nick-name") }}
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-left text-gray-800 bg-white border-b border-gray-200 w-3/5"
                >
                  {{ $t("raffles.participants.email") }}
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200 w-1/5"
                >
                  {{ $t("raffles.participants.date") }}
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200 w-1/5"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="participant in raffle.participants"
                :key="participant.id"
              >
                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ participant.nickName }}
                  </p>
                </td>
                <td class="px-5 py-2 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ participant.email }}
                  </p>
                </td>
                <td
                  class="px-5 py-2 text-sm text-center bg-white border-b border-gray-200"
                >
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{
                      participant.enterDate != undefined
                        ? participant.enterDate.toLocaleDateString($i18n.locale)
                        : ""
                    }}
                  </p>
                </td>
                <td
                  class="px-5 py-2 text-sm text-center bg-white border-b border-gray-200"
                >
                  <button
                    type="button"
                    class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-pink-400 rounded shadow-md hover:bg-pink-800"
                  >
                    <i class="fas mt-2 fa-trash" />
                  </button>
                </td>
              </tr>
              <tr v-if="!raffle.participants || raffle.participants == 0">
                <td
                  class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  colspan="5"
                >
                  <p class="text-lg text-gray-900 whitespace-no-wrap">
                    {{ $t("raffles.msgs.no-participants-found") }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <ui-paginator v-if="raffles.length > 20" />
        </div>
      </div>
    </div>

    <!-- Raffle participation modal form -->
    <form @submit.prevent="drawWinners">
      <ui-modal
        v-if="showModal"
        @close="showModal = false"
        :title="$t('raffles.draw-winners')"
      >
        <template v-slot:body>
          <div
            class="flex flex-col items-center w-full p-2 space-y-4 text-gray-800 md:space-y-0"
          >
            <h1 class="max-w-sm px-2 py-4 mx-auto text-2xl">
              Sortear X vencedores
            </h1>

            <ul>
              <li>ricardo.gil.simoes@gmail.com</li>
            </ul>
          </div>
        </template>
        <template v-slot:footer>
          <button
            type="submit"
            class="px-5 py-2 text-white bg-pink-400 border border-transparent rounded-md group hover:bg-pink-800 focus:outline-none"
          >
            Teste
          </button>
        </template>
      </ui-modal>
    </form>

    <!-- Loading Spinner -->
    <ui-loading :loadingMessage="$t('raffles.msgs.loading-participants')" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import toastaction from "~/components/ui/toast-action.vue";
import Participant from "~/types/models/participant";
import Raffle from "~/types/models/raffle";

export default Vue.extend({
  name: "view-raffle",
  middleware: ["members"],
  data() {
    return {
      raffle: {
        code: "",
        createdAt: new Date(),
      } as Raffle,
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      channelUser: (state: any) => state.channelUser,
      raffles: (state: any) => state.datastore.raffles,
    }),
    ...mapGetters({
      listRaffles: "datastore/listRaffles",
    }),
  },

  async fetch() {
    await this.$store.dispatch("datastore/getRaffles");
  },

  watch: {
    /**
     *  Load current raffle passed by ID
     */
    async raffles(newRaffles) {
      this.$emit("toogleLoading", true);
      var tempRaffle = this.listRaffles.filter((raffle: Raffle) => {
        return raffle.id == this.$route.params.id;
      });

      this.raffle = { ...tempRaffle[0] };
      this.loadParticipants();
    },
  },

  methods: {
    /**
     *  Load registered participants
     */
    async loadParticipants() {
      this.$emit("toogleLoading", false);
      let participantsCol = Array<Participant>();
      try {
        await this.$fire.firestore
          .collection("raffles")
          .doc(this.raffle.id)
          .collection("participants")
          .orderBy("enterDate", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let participant = {
                id: doc.id,
                email: doc.data().email,
                nickName: doc.data().nickName,
                enterDate: doc.data().enterDate.toDate(),
              };
              participantsCol.push(participant);
            });
          });
        this.raffle.participants = participantsCol;
        this.$emit("toogleLoading", false);
      } catch (error) {
        console.error(error);
      }
    },
    /**
     *  Load registered participants
     */
    async drawWinners() {},
    /**
     *  Draw Random Winners
     */
    getRandomWinners() {
      let winners = [];
      if (this.raffle.participants && this.raffle.winners) {
        for (let winner = 0; winner < this.raffle.winners; winner++) {
          var rnd =
            Math.random() * (0 - this.raffle.participants?.length) +
            this.raffles.participants.length;

          rnd = Math.floor(rnd) - 1;
          winners.push(rnd);
        }
      }
      return winners;
    },
    //TODO - Delete participant
    //TODO - Cancel raffle
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