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
          src="~/assets/rafle_logo.png"
          alt="Live Stream Rafler"
        />
        <h2
          class="mt-6 text-5xl font-black text-center text-gray-900 font-abel"
        >
          Começa a sortear
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
            <label for="email" class="sr-only">Endereço de EMail</label>
            <input
              v-model="formData.email"
              type="email"
              name="email"
              autocomplete="email"
              required
              placeholder="Endereço de EMail"
              class="relative block w-full px-3 py-2 font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-lg"
            />
            <i
              class="absolute inset-y-0 flex items-center text-gray-500 fas fa-at"
              style="right: 20px"
            />
          </div>
          <div class="relative">
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              placeholder="Password"
              class="relative block w-full px-3 py-2 font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-lg"
            />
            <i
              class="absolute inset-y-0 flex items-center text-gray-500 fas fa-key"
              style="right: 20px"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="remember_me" class="block ml-2 text-sm text-gray-900">
              Lembrar-me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="/recoverpassword"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Perdeste a password?
            </a>
          </div>
        </div>

        <div class="flex items-center mx-4">
          <button
            type="submit"
            class="relative flex justify-center w-full px-4 py-2 mr-5 font-medium text-white border border-transparent rounded-md bg-golden-500 group hover:bg-golden-800 focus:outline-none"
          >
            <i
              class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-lock"
            />
            Entrar
          </button>
          <button
            class="relative flex justify-center w-full px-4 py-2 font-medium text-white bg-pink-400 border border-transparent rounded-md group hover:bg-pink-800 focus:outline-none"
          >
            <nuxt-link to="/register">
              <i
                class="absolute inset-y-0 left-0 flex items-center pl-3 fas fa-user-plus"
              />
              Registar
            </nuxt-link>
          </button>
        </div>
      </form>

      <div v-else>
        <p>És o {{ authUser.email }}? Senão faz "logout"</p>
        <Btn color="primary" outlined>Logout</Btn>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
import toastaction from "~/components/ui/toastaction.vue";

export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state: any) => state.firebaseAuth.authUser,
    }),
    ...mapGetters({
      isLoggedIn: "firebaseAuth/isLoggedIn",
    }),
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
  }),
  methods: {
    // async createUser() {
    //    try {
    //      await this.$fire.auth.createUserWithEmailAndPassword(
    //        this.formData.email,
    //        this.formData.password
    //      )
    //    } catch (e) {
    //      alert(e)
    //    }
    //  },
    async signInUser() {
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then((data) => {
            console.log(data);
            debugger;
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
            this.$router.push("/members/rafles");
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
            //hideProgressBar: false,
            icon: "fas fa-exclamation-triangle",
          }
        );
        //alert(e);
      }
    },
    // async logout() {
    //   try {
    //     await this.$fire.auth.signOut()
    //   } catch (e) {
    //     alert(e)
    //   }
    // },
  },
});
</script>
