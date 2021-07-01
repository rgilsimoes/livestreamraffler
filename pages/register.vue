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
              {{ $t("register.header") }}
            </h1>
          </div>
        </div>
      </div>
      <div class="space-y-3 bg-white">
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
            {{ $t("register.email") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="newUser.email"
                type="email"
                autocomplete="email"
                required
                id="newUser-email"
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
        <hr />
        <div
          class="flex items-center w-full p-2 space-y-4 text-gray-500 md:space-y-0"
        >
          <h2 class="max-w-sm px-2 mx-auto text-right md:w-1/4">
            {{ $t("register.name") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="newUser.name"
                type="text"
                autocomplete="name"
                required
                id="newUser-name"
                class="flex-1 w-full px-4 py-2 font-medium text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('register.name-placeholder')"
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
            {{ $t("register.channel-url") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="newUser.channelUrl"
                type="text"
                id="newUser-channelUrl"
                class="flex-1 w-full px-4 py-2 font-medium text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('register.channel-url-placeholder')"
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
                required
                autocomplete
                minlength="8"
                id="newUser-userPassWord"
                class="flex-1 w-full px-4 py-2 font-medium text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('register.password-placeholder')"
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
            {{ $t("register.confirmpassword") }}
          </h2>
          <div class="max-w-sm mx-auto md:w-3/4">
            <div class="relative">
              <input
                v-model="userPassConf"
                type="password"
                required
                id="newUser-userPassConf"
                class="flex-1 w-full px-4 py-2 font-medium text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent border-gray-400 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                :placeholder="$t('register.confirmpassword-placeholder')"
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
            {{ $t("register.btn-confirm") }}
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import toastaction from "~/components/ui/toast-action.vue";
import User from "~/types/models/user";

export default Vue.extend({
  name: "register",
  data() {
    return {
      newUser: {
        email: "",
        name: "",
        channelUrl: "",
        status: 1, // Active
      } as User,
      userPassWord: "",
      userPassConf: "",
    };
  },
  methods: {
    /**
     * Create Firebase User and Store aditional Data
     */
    async createUser() {
      if (this.userPassWord !== this.userPassConf) {
        this.$toast.warning(
          {
            component: toastaction,
            props: {
              mensagem: this.$t("register.msgs.error-password-mismatch"),
            },
          },
          {
            icon: "fas fa-exclamation-triangle",
          }
        );
        return;
      }
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(this.newUser.email, this.userPassWord)
          .then((registeredUser) => {
            this.$fire.firestore
              .collection("users")
              .add({
                uid: registeredUser.user?.uid,
                email: this.newUser.email,
                name: this.newUser.name,
                channelUrl: this.newUser.channelUrl,
                status: this.newUser.status,
                created_at: this.$fireModule.firestore.Timestamp.now(),
              })
              .then((data) => {
                data.get().then((user) => {
                  //TODO - Update AuthUser DisplayName on Firebase
                  const userData = user.data();

                  this.$toast.success(
                    {
                      component: toastaction,
                      props: {
                        mensagem: this.$t("global.msgs.welcome", {
                          name: userData?.name,
                        }),
                      },
                    },
                    {
                      icon: "fas fa-exclamation-info",
                    }
                  );
                  this.$router.push("/members/raffles");
                });
              });
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage;
            if (errorCode == "auth/weak-password") {
              errorMessage = this.$t("register.msgs.error-pass-weak");
            } else if (errorCode == "auth/email-already-in-use") {
              errorMessage = this.$t("register.msgs.error-email-exists");
            } else {
              errorMessage =
                this.$t("global.msgs.general-error") + "<br>" + error.message;
            }

            this.$toast.error(
              {
                component: toastaction,
                props: {
                  mensagem: errorMessage,
                },
              },
              {
                icon: "fas fa-exclamation-triangle",
              }
            );
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

