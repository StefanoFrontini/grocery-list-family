module.exports = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s",
    title: "Lista della spesa",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: "~/plugins/socket.client.js" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-i18n"
  ],
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "it",
      messages: {
        it: {
          title: "Lista della spesa",
          entra: "Entra",
          nome: "Nome",
          inserisciStanza: "Inserisci la stanza",
          stanza: "stanza",
          obbligatorio: "Campo obbligatorio",
          caratteri: "Deve essere inferiore ai 16 caratteri",
          torna: "Torna",
          fatto: "Fatto",
          aggiunto: "Aggiunto da",
          il: "il",
          comprare: "Cosa devo comprare?",
          manca: "Inserisci qui quello che ti manca",
          utenti: "Utenti nella stanza",
          inserisci: "Inserisci nome e stanza",
          lascia: "Hai lasciato la stanza"
        },
        en: {
          title: "Grocery list",
          entra: "Submit",
          nome: "Name",
          inserisciStanza: "Enter the room",
          stanza: "room",
          obbligatorio: "Required",
          caratteri: "Must be less than 16 characters",
          torna: "Back",
          fatto: "Done",
          aggiunto: "Added by",
          il: "on",
          comprare: "What do I have to buy?",
          manca: "Enter here what you are missing",
          utenti: "Users in room",
          inserisci: "Enter room and name",
          lascia: "You left the room"
        }
      }
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: `http://localhost:${process.env.PORT || 3000}`
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {}
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  telemetry: false
};
