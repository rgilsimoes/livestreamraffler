<template>
  <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
    <div class="px-2 pt-2 pb-3 sm:px-3">
      <a
        href="#"
        class="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
        >Dashboard</a
      >
      <a
        href="#"
        class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >Sorteios</a
      >
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="flex items-center px-5">
        <div class="flex-shrink-0">
          <img
            class="w-10 h-10 rounded-full"
            src="~/assets/my_avatar.jpg"
            alt
          />
        </div>
        <div class="ml-3">
          <div class="text-base font-medium leading-none text-white">
            Ricardo Simões
          </div>
          <div class="mt-1 text-sm font-medium leading-none text-gray-400">
            @rgilsimoes
          </div>
        </div>
      </div>
      <div class="px-2 mt-3">
        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Perfil</a
        >
        <a
          href="#"
          class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Definições</a
        >
        <a
          href="#"
          class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Terminar Sessão</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapGetters } from "vuex";

export default Vue.extend({
  name: "MobileMenu",
  props: {
    openMenu: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    /**
     * Toogle Menu Flag
     */
    ...mapGetters({
      isOpen: "isOpen",
    }),
  },
  methods: {
    ...mapMutations({
      toggle: "toogleMenu",
    }),
  },
});
</script>
