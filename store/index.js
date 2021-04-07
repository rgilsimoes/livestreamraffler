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
  //Change Profile Menu State
  SET_OPEN_MENU(state, newState) {
    state.isOpen = newState;
  },

  // Clear User Related Data
  RESET_STORE: state => {
    state.authUser = null;
    state.channelUser = null;
  },

  // Set User Auth Data
  SET_AUTH_USER: (state, { authUser }) => {
    console.info(
      "SET_AUTH_USER - " +
        (process.server ? "Server Side" : "Client Side") +
        " - " +
        authUser
    );
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      photoURL: authUser.photoURL
    };
  },

  // Set User Specific Data
  SET_CHANNEL_USER: (state, { channelUser }) => {
    state.channelUser = channelUser;
  }
};

export const actions = {
  /** Load Data On Server Init */
  async nuxtServerInit({ dispatch, commit }, res) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser on the server */
    if (res && res.locals && res.locals.user) {
      const {
        allClaims: claims,
        idToken: token,
        ...authUser
      } = res.locals.user;

      console.info(
        "nuxtServerInit - User: ",
        authUser,
        "Claims:",
        claims,
        "Token:",
        token
      );

      await dispatch("onAuthStateChanged", {
        authUser,
        claims,
        token
      });
    } else {
      console.warn("nuxtServerInit - No user found.");
    }
  },

  /** If User State Changed  */
  async onAuthStateChanged({ commit, dispatch }, { authUser, claims }) {
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
    dispatch("loadUserObject", { authUser });
  },
  /** Load User Info */
  async loadUserObject({ commit }, { authUser }) {
    //Load User Object
    await this.$fire.firestore
      .collection("users")
      .where("uid", "==", authUser.uid)
      .get()
      .then(querySnapshot => {
        let channelUser;
        if (querySnapshot.size == 1) {
          channelUser = {
            docId: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
          };
        }
        commit("SET_CHANNEL_USER", { channelUser });
      });
  },
  /** Login user */
  async login() {
    try {
      this.$router.push(this.app.localeRoute({ name: "members-raffles" }));
    } catch (e) {
      console.error("ERROR:" + e);
    }
  },

  /** Logout user */
  async logout() {
    try {
      await this.$fire.auth.signOut().then(() => {
        this.$router.push(this.app.localeRoute({ name: "index" }));
      });
    } catch (e) {
      console.error("ERROR:" + e);
    }
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
