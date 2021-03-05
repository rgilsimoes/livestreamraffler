/**
 * State
 */
export const initialState = () => ({
  //Logged User
  authUser: null,
  //Channel User
  channelUser: null
});

/**
 * Mutations (Changes)
 */
export const mutations = {
  RESET_STORE: state => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    console.info(
      "SET_AUTH_USER - " + (process.server ? "Server Side" : "Client Side")
    );
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    };
  },

  SET_CHANNEL_USER: (state, { channelUser }) => {
    state.channelUser = channelUser;
  }
};

/**
 * Getters (ReadOnly)
 */
export const getters = {
  isLoggedIn: state => {
    try {
      console.info(
        "isLoggedIn - " + (process.server ? "Server Side" : "Client Side")
      );
      console.info({ authUser: state.authUser });
      return state.authUser.id !== null;
    } catch (e) {
      console.error(
        "isLoggedIn - " +
          e +
          " - " +
          (process.server ? "Server Side" : "Client Side")
      );
      return false;
    }
  }
};

/**
 * Actions (Like Events)
 */
export const actions = {
  /**
   *
   * @param {*} param0
   * @param {*} ctx
   */
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

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
    }
  },

  /**
   *
   * @param {*} param0
   * @param {*} param1
   */
  async onAuthStateChanged({ commit }, { authUser }) {
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

  /**
   *
   */
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
            channelUser: docs.data()
          };
        });
      });

    commit("SET_CHANNEL_USER", { channelUser });
  }
};
