<template>
  <section
    class="flex items-center justify-center px-4 py-6 mb-auto sm:px-6 lg:px-8"
  >
    <form
      class="container max-w-2xl mx-auto shadow-md md:w-3/4"
      @submit.prevent="updateUser"
    >
      <div
        class="flex flex-col p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5"
      >
        <div class="max-w-sm mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <h1 class="text-xl font-semibold text-gray-600 font-abel">
              {{ $t("account.account-data") }}
            </h1>
          </div>
        </div>
      </div>
      <div class="space-y-3 bg-white">
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto sm:text-right md:w-1/4">
            {{ $t("account.email") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              {{ userData.email }}
            </div>
          </div>
        </div>
        <hr />
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto sm:text-right md:w-1/4">
            {{ $t("account.name") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userData.name"
                type="text"
                id="userData-name"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('account.name-placeholder')"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-person"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto sm:text-right md:w-1/4">
            {{ $t("account.channelURL") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userData.channelUrl"
                type="text"
                id="userData-channelUrl"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('account.channel-url-placeholder')"
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
          <h2 class="max-w-sm px-2 mx-auto sm:text-right md:w-1/4">
            {{ $t("account.password") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userPassWord"
                type="password"
                id="userData-password"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('account.password-placeholder')"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-key"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="sm:flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto sm:text-right md:w-1/4">
            {{ $t("account.confirm-password") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userPassConf"
                type="password"
                id="userData-passwordConfirmation"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('account.confirm-password-placeholder')"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-key"
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
            <i
              class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-check"
            />
            {{ $t("account.btn-update") }}
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
import User from "~/types/models/user";

export default Vue.extend({
  name: "account",
  middleware: ["members"],
  data() {
    return {
      userData: {
        email: "",
        name: "",
        channelUrl: "",
      } as User,
      userPassWord: "",
      userPassConf: "",
    };
  },
  mounted() {
    this.userData = this.channelUser;
  },
  computed: {
    ...mapState({
      channelUser: (state: any) => state.channelUser,
    }),
  },
  methods: {
    /**
     * Create Firebase User and Store aditional Data
     */
    async updateUser() {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.userData.email,
            this.userPassWord
          )
          .then((registeredUser) => {
            //this.fillUserData(registeredUser);
            this.$fire.firestore
              .collection("users")
              .add({
                uid: registeredUser.user?.uid,
                email: this.userData.email,
                name: this.userData.name,
                channelUrl: this.userData.channelUrl,
                status: this.userData.status,
                created_at: this.$fireModule.firestore.Timestamp.now(),
              })
              .then((data) => {
                console.log(data);
                debugger;
                this.$toast.success(
                  {
                    component: toastaction,
                    props: {
                      mensagem: "Bem vindo " + data + "!",
                    },
                  },
                  {
                    icon: "fas fa-exclamation-info",
                  }
                );
                this.$router.push("/members/raffles");
              });
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              alert("A password é demasiado fraca!");
            } else {
              alert("Ocorreu um erro: " + errorMessage);
            }
            console.log(error);
          });
      } catch (e) {
        this.$toast.error(
          {
            component: toastaction,
            props: {
              mensagem: "Ocorreu um erro!<br>" + e,
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
