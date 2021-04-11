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
                class="absolute inset-y-0 flex items-center fas fa-qrcode"
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
                class="absolute inset-y-0 flex items-center fas fa-anchor"
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
                class="absolute inset-y-0 flex items-center fas fa-gift"
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
                class="absolute inset-y-0 flex items-center fas fa-calendar text-gray-500"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <hr />
        <div class="flex w-full px-4 pb-4 ml-auto text-gray-500 md:w-2/3">
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i
              class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-hourglass"
            />
            {{ $t("raffles.btn-raffle") }}
          </button>
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i
              class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-ban"
            />
            {{ $t("raffles.btn-cancelar") }}
          </button>
        </div>
      </div>
    </form>

    <div class="container max-w-2xl mx-auto shadow-md md:w-3/4">
      <div
        class="flex flex-col p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5 mt-5"
      >
        <div class="max-w-sm mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-600 font-abel">
              {{ $t("raffles.participants") }}
            </h1>
          </div>
        </div>
      </div>

      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-left text-gray-800 bg-white border-b border-gray-200 w-3/5"
                >
                  E-Mail
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200 w-1/5"
                >
                  Data
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
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ participant.email }}
                  </p>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
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
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <NuxtLink
                    class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-pink-700 rounded shadow-md hover:bg-golden-600 focus:outline-none focus:text-white focus:bg-gray-700"
                    :to="localePath(`/members/raffles/${raffle.id}`)"
                  >
                    <i class="fas fa-trash"
                  /></NuxtLink>
                </td>
              </tr>
              <tr v-if="!raffle.participants">
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
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import toastaction from "~/components/ui/toastaction.vue";
import Participant from "~/types/models/participant";
import Raffle from "~/types/models/raffle";

export default Vue.extend({
  name: "view-raffle",
  middleware: ["members"],
  data: () => {
    return {
      userId: 0,
      channelId: 0,
      raffle: {
        code: "",
      } as Raffle,
    };
  },
  computed: {
    ...mapState({
      channelUser: (state: any) => state.channelUser,
      raffles: (state: any) => state.datastore.raffles,
    }),
  },
  created() {
    var tempRaffle = this.raffles.filter((raffle: Raffle) => {
      return raffle.id == this.$route.params.id;
    });

    this.raffle = { ...tempRaffle[0] };
    this.loadParticipants();
  },
  methods: {
    async loadParticipants() {
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
                enterDate: doc.data().enterDate.toDate(),
              };
              participantsCol.push(participant);
            });
          });
        this.raffle.participants = participantsCol;
      } catch (error) {
        console.log(error);
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
