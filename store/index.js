/**
 * General App State Handling
 */

export const state = () => ({
  isOpen: false
});

export const mutations = {
  toogleMenu(state) {
    state.isOpen = !state.isOpen;
  }
};

export const getters = {
  isOpen(state) {
    return state.isOpen;
  }
};
