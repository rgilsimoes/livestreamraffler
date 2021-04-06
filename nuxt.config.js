const path = require("path");

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Live Stream Raffler!",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/tailwind.scss",
    "~/assets/scss/main.scss",
    "@fortawesome/fontawesome-free/css/all.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  ssr: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/firebase"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-purgecss",
    "vue-toastification/nuxt",
    "nuxt-i18n"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        "/firebase-auth-sw.js"
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === "development"
    }
  },

  //Firebase module configurations
  firebase: {
    lazy: false,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
      databaseURL:
        process.env.FIREBASE_DATABASE_URL || "https://demo.firebaseio.com",
      projectId: process.env.FIREBASE_PROJECT_ID || "demo",
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: true,
        initialize: {
          onAuthStateChangedAction: "onAuthStateChanged"
        },
        ssr: true,
        emulatorPort: process.env.NODE_ENV === "development" ? 9099 : undefined,
        disableEmulatorWarnings: true
      },
      firestore: {
        memoryOnly: false,
        //enablePersistence: true,
        emulatorPort: process.env.NODE_ENV === "development" ? 8080 : undefined
      },
      performance: true,
      analytics: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js")
      }
    }
  },
  purgeCSS: { mode: "postcss" },

  // Toast Module Configurations
  toast: {
    timeout: 3000,
    draggable: false,
    closeOnClick: true,
    transition: "Vue-Toastification__fade",
    maxToasts: 10,
    newestOnTop: true
  },

  //Translations Module Configuration
  i18n: {
    locales: [
      {
        code: "pt",
        iso: "pt-PT",
        name: "Português",
        file: "pt.json",
        flag: "pt"
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
        flag: "us"
      },
      {
        code: "es",
        iso: "es-ES",
        name: "Epanhol",
        file: "es.json",
        flag: "es"
      }
    ],
    defaultLocale: "pt",
    seo: true,
    lazy: true,
    detectBrowserLanguage: {
      cookieKey: "redirected",
      useCookie: true
    },
    langDir: "assets/locales/",
    parsePages: false,
    pages: {},
    vueI18n: {
      fallbackLocale: "pt"
    }
  }
};
