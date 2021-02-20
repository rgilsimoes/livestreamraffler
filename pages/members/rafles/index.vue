<template>
  <section class="w-full px-4 mx-auto sm:px-8">
    <div class="py-8">
      <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 class="text-2xl leading-tight">Sorteios</h2>
        <div class="text-end">
          <form class="flex w-full max-w-sm space-x-3">
            <div class="relative">
              <input
                type="text"
                id="form-subscribe-Filter"
                class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="texto a pesquisar"
              />
            </div>
            <button
              class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Aplicar
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
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rafle in rafles" :key="rafle.id">
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ rafle.code }}
                  </p>
                </td>
                <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ rafle.liveUrl }}
                  </p>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ rafle.createdAt.toDate().toLocaleDateString("pt-PT") }}
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
                    <span class="relative"> {{ rafle.status }} </span>
                  </span>
                </td>
                <td
                  class="px-5 py-5 text-sm text-center bg-white border-b border-gray-200"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Editar
                  </a>
                  |
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Sortear
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <Paginator />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";

import toastaction from "~/components/ui/toastaction.vue";
import Paginator from "~/components/ui/paginator.vue";
import Rafle from "~/types/models/rafle.ts";

interface DataObject {
  channelId: number;
  searchStr: string;
  rafles: Rafle[];
  newRafle: Rafle;
}

const pageSize = 20;
let page = 1;

export default Vue.extend({
  data(): DataObject {
    return {
      channelId: 0,
      searchStr: "",
      rafles: [],
      newRafle: {
        code: "ABCDEFG",
        liveUrl: "www.youtube.com",
        status: 1, // Active
      },
    };
  },
  mounted() {
    this.loadRafles(page);
    console.log(this.rafles);
  },
  computed: {
    //...mapActions({
    //  addSorteio: "datastore/addSorteio",
    //})
  },
  methods: {
    async loadRafles(page: number) {
      try {
        await this.$fire.firestore
          .collection("channels")
          .doc("YQ6ul7G8O0yVAnIZeWCd")
          .collection("rafles")
          .orderBy("created_at", "desc")
          .limit(pageSize)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let data: Rafle = {
                id: doc.id,
                channelId: doc.data().channelId,
                code: doc.data().code,
                liveUrl: doc.data().liveUrl,
                status: doc.data().status,
                createdAt: doc.data().created_at,
              };
              this.rafles.push(data);
            });
          });
      } catch (e) {
        console.error(e);
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

    /*
    async criarSorteio() {
      try {
        // await this.addSorteio(
        //   this.novoSorteio.email,
        //   this.novoSorteio.password
        // ).then(() => {
        //   this.$toast.success(
        //     {
        //       component: toastaction,
        //       props: {
        //         mensagem: "Bem vindo!",
        //       },
        //     },
        //     {
        //       hideProgressBar: true,
        //       icon: "fas fa-info-circle",
        //     }
        //   );
        // });
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
    },*/
  },
});
</script>