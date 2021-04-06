<template>
  <section
    class="flex items-center justify-center px-4 py-6 mb-auto sm:px-6 lg:px-8"
  >
    <form
      class="container max-w-2xl mx-auto shadow-md md:w-3/4"
      @submit.prevent="createUser"
    >
      <div
        class="flex flex-col p-4 bg-gray-200 border-t-2 border-indigo-400 rounded-lg bg-opacity-5"
      >
        <div class="max-w-sm mx-auto md:w-full md:mx-0">
          <div class="inline-flex items-center space-x-4">
            <h1 class="text-xl font-semibold text-gray-600 font-abel">
              Introduz os teus dados
            </h1>
          </div>
        </div>
      </div>
      <div class="space-y-3 bg-white">
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">Email:</h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userData.email"
                type="email"
                autocomplete="email"
                required
                id="userData-email"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Email"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-at"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <hr />
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">Nome:</h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userData.name"
                type="text"
                autocomplete="name"
                required
                id="userData-name"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Nome abreviado"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-user"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
            URL do canal:
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userData.channelUrl"
                type="text"
                id="userData-channelUrl"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="URL do canal das lives"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-anchor"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">Password:</h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userPassWord"
                type="password"
                id="userData-password"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Password"
              />
              <i
                class="absolute inset-y-0 flex items-center fas fa-key"
                style="right: 20px"
              />
            </div>
          </div>
        </div>
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
            Confirmação:
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userPassConf"
                type="password"
                id="userData-passwordConfirmation"
                class="flex-1 w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Confirma a password"
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
            Confirmar
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import toastaction from "~/components/ui/toastaction.vue";
import User from "~/types/models/user";

interface DataObject {
  userData: User;
  userPassWord: string;
  userPassConf: string;
}

export default Vue.extend({
  name: "register",
  data(): DataObject {
    return {
      userData: {
        email: "",
        name: "",
        channelUrl: "",
        status: 1, // Ativo
      },
      userPassWord: "",
      userPassConf: "",
    };
  },
  methods: {
    /**
     * Create Firebase User and Store aditional Data
     */
    async createUser() {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.userData.email,
            this.userPassWord
          )
          .then((registeredUser) => {
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

