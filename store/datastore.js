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
  async getRaffles({ commit }) {
    await this.$fire.firestore
      //.collection("channels")
      //.doc("YQ6ul7G8O0yVAnIZeWCd")
      .collection("raffles")
      //.orderBy("created_at", "desc")
      .get()
      .then(querySnapshot => {
        let raffleCol = [];
        querySnapshot.forEach(doc => {
          let raffle = {
            id: doc.id,
            //channelId: doc.data().channelId,
            code: doc.data().code,
            liveUrl: doc.data().liveUrl,
            status: doc.data().status,
            createdAt: doc.data().created_at.toDate()
          };
          raffleCol.push(raffle);
        });
        commit("SET_RAFLES", raffleCol);
      });
  }
};
