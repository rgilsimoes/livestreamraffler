import Cookies from "js-cookie";

/**
 * General App State Handling
 */

export const state = () => ({
  //Profile Menu State
  isOpen: false,

  //Logged User
  authUser: null,

  //Channel User
  channelUser: null
});

export const mutations = {
  //Change Menu State
  SET_OPEN_MENU(state, newState) {
    state.isOpen = newState;
  },

  RESET_STORE: state => {
    Object.assign(state, state);
  },

  SET_AUTH_USER: (state, { authUser }) => {
    console.info(
      "SET_AUTH_USER - " + (process.server ? "Server Side" : "Client Side")
    );
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName
    };
  },

  SET_CHANNEL_USER: (state, { channelUser }) => {
    state.channelUser = channelUser;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    console.log("NUXTINIT");

    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      console.info(
        "Auth User verified on server-side. User: ",
        authUser,
        "Claims:",
        claims
      );

      await dispatch("onAuthStateChanged", {
        authUser,
        claims
      });
    } else {
      console.info("No user found?..");
    }
  },
  async onAuthStateChanged({ commit }, { authUser, claims }) {
    if (!authUser) {
      console.info(
        "AUTH_STATE_CHANGED - User is null - " +
          (process.server ? "Server Side" : "Client Side")
      );
      commit("RESET_STORE");
      return;
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true);

        Cookies.set("access-token", idToken);
        console.info(
          "AUTH_STATE_CHANGED - User exists - " +
            (process.server ? "Server Side" : "Client Side")
        );
        console.info("AUTH_STATE_CHANGED - idToken", idToken);
      } catch (e) {
        console.error("AUTH_STATE_CHANGED - " + e);
      }
    }
    commit("SET_AUTH_USER", { authUser });
  },
  async loadUserObject({ commit }, { authUser }) {
    //Load User Object
    const channelUser = await this.$fire.firestore
      .collection("users")
      .where("uid", "==", authUser.uid)
      .get()
      .then(querySnapshot => {
        //It Supposed to be only one...
        querySnapshot.forEach(docs => {
          return {
            channelUser: { docId: docs.id, ...docs.data() }
          };
        });
      });

    commit("SET_CHANNEL_USER", { channelUser });
  },
  //Toogle Menu
  toogleMenu(context) {
    context.commit("SET_OPEN_MENU", !context.state.isOpen);
  }
};

/**
 * Getters (ReadOnly)
 */
export const getters = {
  isLoggedIn: state => {
    return state.authUser?.uid !== undefined;
  }
};
