<template>
  <div>
    <div class="hidden md:block">
      <div class="flex items-center ml-4 md:ml-6 place-content-evenly">
        <!-- Notifications Bell -->
        <button
          class="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
          aria-label="Notificações"
        >
          <i class="far fa-bell" />
        </button>

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button
              @click="toggle"
              class="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
              id="user-menu"
              aria-label="User menu"
              aria-haspopup="true"
            >
              <div class="p-3">
                <div
                  class="mt-1 text-sm font-medium leading-none text-gray-400"
                >
                  Ricardo Simões
                </div>
              </div>
              <img
                class="w-8 h-8 rounded-full"
                src="~/assets/my_avatar.jpg"
                alt
              />
            </button>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-show="isOpen"
              class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
            >
              <div
                class="py-1 bg-white rounded-md shadow-xs"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <NuxtLink
                  to="/members/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  ><span class="pr-3"><i class="fas fa-user" /></span
                  >Perfil</NuxtLink
                >
                <NuxtLink
                  to="/members/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  ><span class="pr-3"><i class="fas fa-cog" /></span
                  >Definições</NuxtLink
                >
                <Button
                  v-on:click="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  ><span class="pr-3"><i class="fas fa-sign-out-alt" /></span
                  >Terminar Sessão</Button
                >
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="flex -mr-2 md:hidden">
      <!-- Mobile menu button -->
      <button
        @click="toggle"
        class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
      >
        <svg
          :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <svg
          :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "ProfileMenu",

  computed: {
    ...mapState({
      //Menu State
      isOpen: (state: any) => state.isOpen,
    }),
  },
  methods: {
    ...mapActions({
      // Open/Close Menu
      toggle: "toogleMenu",
      logout: "logout",
    }),

    // async logout() {
    //   try {
    //     await this.$fire.auth.signOut().then(() => {
    //       this.toggle();
    //       // this.$store.dispatch("onAuthStateChanged", {
    //       //   authUser: null,
    //       // });
    //       this.$router.push("/");
    //     });
    //   } catch (e) {
    //     alert(e);
    //   }
    // },
  },
});
</script>

<style>
</style>