<template>
  <section class="w-full px-4 mx-auto sm:px-8">
    <div class="py-8">
      <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 class="text-2xl font-extrabold leading-tight font-nunito">
          {{ $t("raffles.raffles-title") }}
        </h2>
        <div class="text-end">
          <form class="flex w-full max-w-sm space-x-3">
            <NuxtLink
              :to="localePath('/members/raffles/create')"
              class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-pink-700 rounded shadow-md hover:bg-golden-600 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              <i class="fas fa-plus pr-2" />Novo</NuxtLink
            >
            <div class="relative">
              <input
                type="text"
                disabled
                id="form-subscribe-Filter"
                class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="texto a pesquisar"
              />
            </div>
            <button
              class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
              disabled
            >
              <i class="fas fa-search pr-2" />Procurar
            </button>
          </form>
        </div>
      </div>
      <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
        <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-left text-gray-800 bg-white border-b border-gray-200"
                >
                  Código
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-left text-gray-800 bg-white border-b border-gray-200"
                >
                  Link
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200"
                >
                  Data
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200"
                >
                  Participantes
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 text-sm font-bold text-center text-gray-800 bg-white border-b border-gray-200"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="raffle in raffles" :key="raffle.id">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ raffle.code }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ raffle.liveUrl }}
                  </p>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{
                      raffle.createdAt != undefined
                        ? raffle.createdAt.toLocaleDateString($i18n.locale)
                        : ""
                    }}
                  </p>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
                  >
                    <span
                      aria-hidden="true"
                      class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                    >
                    </span>
                    <span class="relative">
                      {{ $t(`raffles.status[${raffle.status}]`) }}
                    </span>
                  </span>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <span
                    class="relative inline-block px-3 py-1 font-semibold leading-tight text-golden-900"
                  >
                    <span
                      aria-hidden="true"
                      class="absolute inset-0 rounded-full opacity-50 bg-golden-200"
                    >
                    </span>
                    <span class="relative"> {{ raffle.status }} </span>
                  </span>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <NuxtLink
                    class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-pink-700 rounded shadow-md hover:bg-golden-600 focus:outline-none focus:text-white focus:bg-gray-700"
                    :to="localePath(`/members/raffles/${raffle.id}`)"
                  >
                    <i class="fas fa-eye pr-2" />Ver</NuxtLink
                  >
                </td>
              </tr>
              <tr v-if="!raffles">
                <td
                  class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  colspan="5"
                >
                  <p class="text-lg text-gray-900 whitespace-no-wrap">
                    {{ $t("raffles.msgs.no-raffles-found") }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <ui-paginator v-if="raffles.length > 20" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";

import toastaction from "~/components/ui/toastaction.vue";

export default Vue.extend({
  name: "raffles",
  middleware: ["members"],
  data: () => ({
    channelId: 0,
    searchStr: "",
  }),
  mounted() {
    this.$store.dispatch("datastore/getRaffles");
  },
  computed: {
    ...mapState({
      raffles: (state: any) => state.datastore.raffles,
    }),
  },
});
</script>