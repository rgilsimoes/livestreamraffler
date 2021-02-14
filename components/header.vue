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
            >
          </div>
          <div class="flex-shrink-0"><span class="p-5 text-2xl antialiased font-extrabold tracking-wide text-white overflow-ellipsis">LIVE STREAM RAFLER</span></div>
          <!-- Top Menu -->
          <div class="hidden md:block">
            <div class="flex items-baseline ml-10">
              <a
                href="/login"
                class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
              >Dashboard</a>
              <a
                href="#"
                class="px-3 py-2 ml-4 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >Sorteios</a>

            </div>
          </div>
        </div>

        <!-- Right Menu -->
        <ProfileMenu/>
      </div>
    </div>
    <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <a
          href="#"
          class="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md focus:outline-none focus:text-white focus:bg-gray-700"
        >Dashboard</a>
        <a
          href="#"
          class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >Sorteios</a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="w-10 h-10 rounded-full"
              src="~/assets/my_avatar.jpg"
              alt
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">Ricardo Simões</div>
            <div class="mt-1 text-sm font-medium leading-none text-gray-400">@rgilsimoes</div>
          </div>
        </div>
        <div class="px-2 mt-3">
          <a
            href="#"
            class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Perfil</a>
          <a
            href="#"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Definições</a>
          <a
            href="#"
            class="block px-3 py-2 mt-1 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >Terminar Sessão</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import ProfileMenu from './profilemenu.vue'
export default Vue.extend({
  components: { ProfileMenu },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    }
  }
})
</script>