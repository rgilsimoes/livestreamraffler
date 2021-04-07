<template>
  <nav class="bg-tuna-500">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a href="/">
              <img
                class="w-8 h-8"
                src="~/assets/raffle_logo.png"
                alt="Live Stream Raffler"
            /></a>
          </div>
          <div class="flex-shrink-0">
            <a href="/">
              <span
                class="p-5 text-2xl antialiased font-extrabold tracking-wide text-white overflow-ellipsis"
                >{{ $t("global.app-title") }}</span
              ></a
            >
          </div>
          <!-- Top Menu -->
          <div v-if="isLoggedIn" class="hidden md:block topMenu">
            <div class="flex items-baseline ml-10">
              <NuxtLink
                :to="localePath('/')"
                class="px-3 py-2 text-sm font-medium"
                >{{ $t("global.link-home") }}</NuxtLink
              >
              <NuxtLink
                :to="localePath('/members/raffles')"
                class="px-3 py-2 ml-4 text-sm font-medium"
                >{{ $t("global.link-raffles") }}</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="flex gap-5">
          <!-- Right Menu -->
          <button
            v-if="!isLoggedIn"
            class="inline-flex items-center px-4 py-2 font-medium text-white bg-pink-700 rounded hover:bg-golden-600 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            <NuxtLink :to="localePath('/login')">{{
              $t("global.btn-login")
            }}</NuxtLink>
            <i class="pl-4 fas fa-sign-in-alt" style="font-size: 24px" />
          </button>

          <ProfileMenu v-else />

          <div>
            <div class="relative inline-block dropdown">
              <button
                class="inline-flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded w-32 justify-between"
              >
                <span class="mr-1">{{
                  $i18n.locales.find((x) => x.code === $i18n.locale).name
                }}</span>
                <svg
                  class="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </button>
              <ul class="absolute hidden pt-1 text-gray-700 dropdown-menu">
                <li v-for="lang in $i18n.locales" :key="lang.code">
                  <nuxt-link
                    :to="switchLocalePath(lang.code)"
                    class="items-baseline block px-4 py-2 whitespace-no-wrap bg-gray-200 rounded-t hover:bg-gray-400"
                    ><country-flag :country="lang.flag" size="small" />
                    {{ lang.name }}</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import MobileMenu from "./mobilemenu.vue";
import ProfileMenu from "./profilemenu.vue";
import CountryFlag from "vue-country-flag";

export default Vue.extend({
  components: { ProfileMenu, MobileMenu, CountryFlag },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // The Menu State
      isOpen: (state: any) => state.isOpen,
    }),
    ...mapGetters({
      // Is User LoggedIn?
      isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    ...mapMutations({
      // Open/Close Menu
      toggle: "toogleMenu",
    }),
  },
});
</script>

<style lang="scss" scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}

.topMenu a {
  @apply text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700;
}

/* .topMenu a.nuxt-link-active {
  @apply text-white bg-gray-900 rounded-md;
} */

.topMenu a.nuxt-link-exact-active {
  @apply text-white bg-gray-900 rounded-md;
}
</style>