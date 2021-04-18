<template>
  <footer class="flex flex-wrap items-center justify-between p-4">
    <div class="w-full mb-4 text-center lg:w-auto lg:mr-6 lg:mb-0">
      © 2021 @rgilsimoes
    </div>
    <div class="flex flex-col items-center w-full lg:flex-row lg:w-auto">
      <div
        class="mx-auto lg:mx-0 lg:ml-auto flex flex-col items-center sm:block"
      >
        <NuxtLink
          :to="localePath('/help')"
          class="inline-block mt-0 text-blue-900 hover:text-indigo-600"
          >{{ $t("global.link-help-faq") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/about')"
          class="inline-block mt-0 sm:ml-8 text-blue-900 hover:text-indigo-600"
          >{{ $t("global.link-about") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/terms')"
          class="inline-block mt-0 sm:ml-8 text-blue-900 hover:text-indigo-600"
          >{{ $t("global.link-terms") }}</NuxtLink
        >
      </div>
      <div class="flex justify-center mt-4 space-x-6 lg:mt-0 lg:ml-8">
        <a href="#">
          <svg
            class="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </a>
        <a href="#">
          <svg
            class="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            ></path>
          </svg>
        </a>
        <a
          href="https://github.com/rgilsimoes/livestreamraffler/issues"
          target="_blank"
        >
          <svg
            class="w-6 h-6 text-indigo-600"
            fill="currentColor"
            stroke="currentColor"
            width="24"
            heigth="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>