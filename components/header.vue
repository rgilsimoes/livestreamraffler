<template>
  <nav class="bg-tuna-500">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="w-8 h-8"
              src="~/assets/rafle_logo.png"
              alt="Live Stream Rafler"
            />
          </div>
          <div class="flex-shrink-0">
            <span
              class="p-5 text-2xl antialiased font-extrabold tracking-wide text-white overflow-ellipsis"
              >LIVE STREAM RAFLER</span
            >
          </div>
          <!-- Top Menu -->
          <div class="hidden md:block">
            <div class="flex items-baseline ml-10">
              <NuxtLink
                to="/members/dashboard"
                class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
                >Dashboard</NuxtLink
              >
              <NuxtLink
                to="/members/rafles"
                class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Sorteios</NuxtLink
              >
            </div>
          </div>
        </div>

        <!-- Right Menu -->
        <button
          v-if="!isLoggedIn"
          class="inline-flex items-center px-4 py-2 font-medium text-white bg-pink-700 rounded hover:bg-golden-600 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          <NuxtLink to="/login">Entrar</NuxtLink>
          <i class="pl-4 fas fa-sign-in-alt" style="font-size: 24px" />
        </button>
        <ProfileMenu v-else :openMenu="isOpen" />
      </div>
    </div>

    <MobileMenu :openMenu="isOpen" />
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import MobileMenu from "./mobilemenu.vue";
import ProfileMenu from "./profilemenu.vue";

export default Vue.extend({
  components: { ProfileMenu, MobileMenu },
  data: () => ({
    isLoggedIn: false,
  }),
  mounted() {
    this.isLoggedIn = this.aisLoggedIn;
  },
  computed: {
    /**
     * Toogle Menu Flag
     */
    ...mapState({
      isOpen: (state: any) => state.isOpen,
      authUser: (state: any) => state.firebaseAuth.authUser,
    }),
    ...mapGetters({
      aisLoggedIn: "firebaseAuth/isLoggedIn",
    }),
  },
  methods: {
    ...mapMutations({
      toggle: "toogleMenu",
    }),
  },
});
</script>