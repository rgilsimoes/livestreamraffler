/**
 * State
 */
export const initialState = () => ({
  authUser: null,
  userChannel: null
});

/**
 * Mutations (Changes)
 */
export const mutations = {
  RESET_STORE: state => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    };
  }
};

/**
 * Getters (ReadOnly)
 */
export const getters = {
  isLoggedIn: state => {
    try {
      return state.authUser.id !== null;
    } catch {
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
      commit("RESET_STORE");
      return;
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true);
        console.info("idToken", idToken);
      } catch (e) {
        console.error(e);
      }
    }
    commit("SET_AUTH_USER", { authUser });
  },

  /**
   *
   * @param {*} ctx
   */
  checkVuexStore(ctx) {
    if (this.$fire.auth === null) {
      throw "Vuex Store example not working - this.$fire.auth cannot be accessed.";
    }

    alert(
      "Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___"
    );
  }
};
