<template>
  <div class="flex flex-col h-screen">
    <Header />

    <header class="bg-white shadow">
      <div
        class="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-between"
      >
        <h1
          class="text-3xl font-extrabold leading-tight text-gray-900 font-nunito"
        >
          {{ $t("global.sub-title") }}
        </h1>
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_blank"
          class="text-end flex my-2"
        >
          <input type="hidden" name="business" value="UP72LSUN9V5YY" />
          <input
            type="hidden"
            name="item_name"
            value="Suportar o Site Live Stream Raffler"
          />
          <input type="hidden" name="currency_code" value="EUR" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/pt_PT/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </div>
    </header>

    <!-- Main Area -->
    <main class="h-full">
      <div class="h-full py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="h-full px-4 sm:px-0">
          <div
            class="h-full border-4 border-gray-200 border-dashed rounded-lg overflow-y-scroll"
          >
            <Nuxt />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>


<style scoped>
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}
</style>