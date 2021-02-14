<template>
  <main>
    <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 sm:px-0">
        <div class="border-4 border-gray-200 border-dashed rounded-lg h-96">

          <!-- component -->
          <section>
              <div class="flex items-center justify-center">
                  <div class="px-12 py-6">
                    <div class="text-center">
                      <h2 class="w-full my-3 text-5xl font-semibold leading-light font-heading">Participar num sorteio?</h2>
                      <span class="text-xl font-semibold">Introduz o código do sorteio</span>
                      <span class="fa fa-cog"></span>
                      <div class="w-full text-center">
                        <form action="#">
                          <div class="flex items-center max-w-lg p-1 pr-0 mx-auto">
                            <input type="text" placeholder="Código do sorteio" class="flex-auto p-3 mr-2 text-gray-900 placeholder-gray-600 rounded shadow appearance-none focus:outline-none">
                            <button type="submit" class="w-2/5 p-3 font-semibold text-white bg-indigo-600 rounded shadow hover:bg-indigo-700">Participar</button>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
              </div>
          </section>

          <section class="px-4 py-4 text-center">
            <div class="w-full max-w-2xl mx-auto">
              <h2 class="mt-2 mb-6 text-5xl font-semibold leading-tight font-heading">Quero fazer um sorteio com quem está a assitir às minhas "Lives"</h2>
              <span class="text-xl font-semibold">É fácil! Esqueça os processos manuais!</span>

              <div class="py-10">
                <a class="inline-block px-8 py-4 mr-6 font-semibold leading-none text-white bg-indigo-600 rounded shadow hover:bg-indigo-700" href="#">Registe-se</a><a class="text-indigo-600 hover:underline" href="#">Saiba mais!</a>
              </div>
            </div>
          </section>

        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

