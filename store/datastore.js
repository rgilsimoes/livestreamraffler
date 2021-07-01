export const state = () => ({
  raffles: []
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
    let raffleCol = [];
    try {
      await this.$fire.firestore
        .collection("raffles")
        .where("uid", "==", rootState.authUser.uid)
        .orderBy("created_at", "desc")
        .get()
        .then(querySnapshot => {
          let raffle;

          querySnapshot.forEach(doc => {
            raffle = {
              id: doc.id,
              uid: doc.data().uid,
              code: doc.data().code,
              liveUrl: doc.data().liveUrl,
              status: doc.data().status,
              winners: doc.data().winners,
              createdAt: doc.data().created_at.toDate(),
              participants: []
            };

            raffleCol.push(raffle);
          });
          commit("SET_RAFLES", raffleCol);
        });
    } catch (err) {
      console.log(err);
    }
  }
};

/**
 * Getters (ReadOnly)
 */
export const getters = {
  listRaffles: state => {
    return state.raffles;
  }
};
