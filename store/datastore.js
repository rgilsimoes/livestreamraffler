export const state = () => ({
  isLoading: false,
  canais: [],
  sorteios: []
});

export const mutations = {
  setLoading: (state, loading) => (state.isLoading = !!loading),
  setUser: (state, user) => (state.user = user),

  // Sorteios
  setSorteio: (state, sorteio) => state.sorteios.push(sorteio),
  setSorteios: (state, sorteios) => (state.sorteios = sorteios)
};

export const getters = {
  isLoading: state => state.isLoading,
  user: state => state.user,
  getSorteios: state => state.sorteios
};

export const actions = {
  setLoading({ commit }, loading) {
    commit("setLoading", loading);
  },
  async setUser({ commit }, user) {
    if (!user) return;
    await usersRef.doc(user.uid).set({
      email: user.email,
      name: user.displayName,
      icon: user.photoURL,
      last_login: new Date()
    });
    commit("setUser", {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      icon: user.photoURL
    });
  },
  async resetUser({ commit }) {
    commit("setUser", null);
  },

  async addSorteio({ commit }, sorteio) {
    if (!sorteio) return;

    const novoSorteio = {
      codigo: sorteio.codigo,
      link: sorteio.link,
      data: new Date(),
      estado: 1 // Ativo
    };
    await firestore
      .collection("sorteios")
      .add(novoSorteio)
      .then(res => {
        console.log(res);
      });
    commit("addSorteio", novoSorteio);
  },
  async fetchPost({ commit }, user) {
    if (!user || !user.uid) return;
    await firestore
      .doc(`users/${user.uid}`)
      .collection("posts")
      .get()
      .then(function(querySnapshot) {
        commit("setPosts", []);
        querySnapshot.forEach(function(doc) {
          commit("setPost", doc.data());
        });
      });
  }
};
