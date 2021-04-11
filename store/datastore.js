export const state = () => ({
  raffles: [],
  participants: []
});

export const mutations = {
  SET_RAFLES(state, rafles) {
    state.raffles = rafles;
  }
};

export const actions = {
  /**
   * Get RAFFLES
   * @param {*} param0
   */
  async getRaffles({ commit, rootState }) {
    await this.$fire.firestore
      .collection("raffles")
      .where("uid", "==", rootState.authUser.uid)
      .orderBy("created_at", "desc")
      .get()
      .then(querySnapshot => {
        let raffleCol = [];

        querySnapshot.forEach(doc => {
          let raffle = {
            id: doc.id,
            uid: doc.data().uid,
            code: doc.data().code,
            liveUrl: doc.data().liveUrl,
            status: doc.data().status,
            winners: doc.data().winners,
            createdAt: doc.data().created_at.toDate()
          };
          raffleCol.push(raffle);
        });
        commit("SET_RAFLES", raffleCol);
      });
  }
};
