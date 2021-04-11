<template>
  <!-- Login Form -->
  <section
    class="flex items-center justify-center px-4 py-12 mb-auto sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="w-auto mx-auto"
          style="height: 80px"
          src="~/assets/raffle_logo.png"
          alt="Live Stream Raffler"
        />
        <h2
          class="mt-6 text-5xl font-black text-center text-gray-900 font-abel"
        >
          {{ $t("login.start-heading") }}
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        v-if="!isLoggedIn"
        @submit.prevent="signInUser"
      >
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div class="relative">
            <label for="email" class="sr-only">{{ $t("login.email") }}</label>
            <input
              v-model="formData.email"
              type="email"
              name="email"
              autocomplete="email"
              required
              :placeholder="$t('login.email-placeholer')"
              class="relative block w-full px-3 py-2 font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-lg"
            />
            <i
              class="absolute inset-y-0 flex items-center text-gray-500 fas fa-at"
              style="right: 20px"
            />
          </div>
          <div class="relative">
            <label for="password" class="sr-only">{{
              $t("login.password")
            }}</label>
            <input
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :placeholder="$t('login.password')"
              class="relative block w-full px-3 py-2 my-1 font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-lg"
            />
            <i
              class="absolute inset-y-0 flex items-center text-gray-500 fas fa-key"
              style="right: 20px"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <!-- <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="remember_me" class="block ml-2 text-sm text-gray-900">
              Lembrar-me
            </label> -->
          </div>

          <div class="text-sm">
            <NuxtLink
              :to="localePath('/recoverpassword')"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {{ $t("login.forgot_password") }}
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center mx-4">
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-3 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i
              class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-lock"
            />
            {{ $t("login.login") }}
          </button>
          <button
            class="relative flex justify-center w-full px-4 py-3 font-medium text-white bg-pink-400 border border-transparent rounded-md group hover:bg-pink-800 focus:outline-none"
          >
            <NuxtLink :to="localePath('/register')">
              <i
                class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-user-plus"
              />
              {{ $t("login.register") }}
            </NuxtLink>
          </button>
        </div>

        <div class="flex items-center">
          <button
            type="button"
            @click="googleSignIn"
            class="m-3 px-4 py-3 border-2 w-full text-gray-700 rounded-md hover:text-white hover:bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            <i class="fab fa-google pr-3"></i>
            {{ $t("login.btn-login-google") }}
          </button>
        </div>
      </form>

      <div v-else>
        <p
          class="py-3 my-3 text-2xl font-medium text-center font-abel"
          v-html="$t('login.msgs.logged-in', { email: authUser.email })"
        ></p>
        <button
          type="button"
          @click="logout"
          class="relative flex justify-center w-full px-4 py-2 font-medium text-white bg-pink-400 border border-transparent rounded-md group hover:bg-pink-800 focus:outline-none"
        >
          {{ $t("login.logout") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
import toastaction from "~/components/ui/toastaction.vue";

export default Vue.extend({
  name: "login",
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
  }),
  computed: {
    ...mapState({
      authUser: (state: any) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },

  methods: {
    ...mapActions({
      logout: "logout",
      login: "login",
    }),
    async signInUser() {
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then((data) => {
            this.$toast.success(
              {
                component: toastaction,
                props: {
                  mensagem: "Bem vindo!",
                },
              },
              {
                hideProgressBar: true,
                icon: "fas fa-info-circle",
              }
            );
          });

        this.$store.dispatch("login");
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
    /** Sign In with Google Authentication Provider */
    googleSignIn: async function () {
      // Get the Google provider
      var provider = new this.$fireModule.auth.GoogleAuthProvider();

      // Use Google provider on signWithPopup
      await this.$fire.auth.signInWithPopup(provider).then((registeredUser) => {
        // For new users register Custom User Data
        if (registeredUser.additionalUserInfo?.isNewUser) {
          this.$fire.firestore
            .collection("users")
            .add({
              uid: registeredUser.user?.uid,
              email: registeredUser.user?.email,
              name: registeredUser.user?.displayName,
              channelUrl: "",
              status: 1, // Active
              created_at: this.$fireModule.firestore.Timestamp.now(),
            })
            .then((data) => {
              console.log(data);
              this.$toast.success(
                {
                  component: toastaction,
                  props: {
                    mensagem: "Bem vindo!",
                  },
                },
                {
                  icon: "fas fa-exclamation-info",
                }
              );
            });
        } else {
          // Existing User
          this.$toast.success(
            {
              component: toastaction,
              props: {
                mensagem: "Bem vindo de volta!",
              },
            },
            {
              hideProgressBar: true,
              icon: "fas fa-info-circle",
            }
          );
        }
      });
    },
  },
});
</script>
