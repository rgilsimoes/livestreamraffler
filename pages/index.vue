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
              <form @submit.prevent="checkRaffle">
                <div class="flex items-center max-w-lg p-1 pr-0 mx-auto">
                  <input
                    v-model="raffleCode"
                    type="text"
                    required
                    maxlength="8"
                    :placeholder="$t('index.enter-code')"
                    class="flex-auto p-3 mr-2 font-medium text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent uppercase"
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

      <!-- Raffle participation modal form -->
      <form @submit.prevent="registerInRaffle">
        <ui-modal
          v-if="showModal"
          @close="showModal = false"
          :title="$t('global.participate')"
        >
          <template v-slot:body>
            <div
              class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
            >
              <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
                {{ $t("raffles.code") }}
              </h2>
              <div class="max-w-sm mx-auto md:w-3/4">
                <div
                  class="relative font-medium text-lg tracking-wider text-gray-900"
                >
                  {{ raffle.code }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
            >
              <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
                {{ $t("raffles.liveUrl") }}
              </h2>
              <div class="max-w-sm mx-auto md:w-3/4">
                <div
                  class="relative font-medium text-lg tracking-wider text-gray-900"
                >
                  {{ raffle.liveUrl }}
                </div>
              </div>
            </div>
            <!-- EMail -->
            <div
              class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
            >
              <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
                {{ $t("register.email") }}
              </h2>
              <div class="max-w-sm mx-auto md:w-3/4">
                <div class="relative">
                  <input
                    v-model="participantEmail"
                    type="email"
                    required
                    class="flex-1 w-full px-4 py-2 font-medium text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    :placeholder="$t('register.email-placeholder')"
                  />
                  <i
                    class="absolute inset-y-0 flex items-center fas fa-at"
                    style="right: 20px"
                  />
                </div>
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <button
              type="submit"
              class="px-5 py-2 text-white bg-pink-400 border border-transparent rounded-md group hover:bg-pink-800 focus:outline-none"
            >
              {{ $t("index.btn-participate") }}
            </button>
          </template>
        </ui-modal>
      </form>

      <!-- Loading Spinner -->
      <ui-loading :loadingMessage="$t('index.verify-raffle')" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import toastaction from "~/components/ui/toastaction.vue";
import Raffle from "~/types/models/raffle";
import Participant from "~/types/models/participant";

export default Vue.extend({
  name: "index",
  data: () => ({
    raffleCode: "",
    raffle: {} as Raffle,
    participant: {} as Participant,
    participantEmail: "",
    showModal: false,
  }),
  methods: {
    /** Check Raffle and Show Modal Participation Form */
    async checkRaffle() {
      this.$emit("toogleLoading", true);
      if (this.raffleCode !== "") {
        //Find Raffle
        await this.$fire.firestore
          .collection("raffles")
          .where("code", "==", this.raffleCode)
          .where("status", "==", 0)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size == 1) {
              this.raffle = {
                id: querySnapshot.docs[0].id,
                ...querySnapshot.docs[0].data(),
              };
              this.showModal = true;
            } else {
              this.$toast.error(
                {
                  component: toastaction,
                  props: {
                    mensagem: this.$t("index.msgs.raffle-not-found"),
                  },
                },
                {
                  icon: "fas fa-exclamation-triangle",
                }
              );
            }
          })
          .catch((error) => {
            console.error("Erro:" + error);
          });
        this.$emit("toogleLoading", false);
      }
    },
    /** Register EMail in Participan List */
    async registerInRaffle() {
      //Check if user as entered before
      await this.$fire.firestore
        .collection("raffles")
        .doc(this.raffle.id)
        .collection("participants")
        .where("email", "==", this.participantEmail)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size == 1) {
            this.participant = {
              id: querySnapshot.docs[0].id,
              ...querySnapshot.docs[0].data(),
            };

            this.$toast.warning(
              {
                component: toastaction,
                props: {
                  mensagem: this.$t("index.msgs.email-already-registered"),
                },
              },
              {
                icon: "fas fa-exclamation-triangle",
              }
            );

            this.participantEmail = "";
          } else {
            //Register participant
            try {
              var raffleRef = this.$fire.firestore
                .collection("raffles")
                .doc(this.raffle.id)
                .collection("participants");

              raffleRef
                .add({
                  email: this.participantEmail,
                  enterDate: this.$fireModule.firestore.Timestamp.now(),
                })
                .then((data) => {
                  this.$toast.success(
                    {
                      component: toastaction,
                      props: {
                        mensagem: this.$t("index.msgs.email-registered"),
                      },
                    },
                    {
                      icon: "fas fa-exclamation-info",
                    }
                  );
                  this.participantEmail = "";
                  this.showModal = false;
                });
            } catch (e) {
              this.$toast.error(
                {
                  component: toastaction,
                  props: {
                    mensagem:
                      this.$t("global.msgs.general-error") + "<br/>" + e,
                  },
                },
                {
                  icon: "fas fa-exclamation-triangle",
                }
              );
            }
          }
        })
        .catch((error) => {
          console.error("Erro:" + error);
        });
    },
  },
});
</script>

