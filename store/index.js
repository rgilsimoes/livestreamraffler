/**
 * General App State Handling
 */

export const state = () => ({
  //Profile Menu State
  isOpen: false
});

export const mutations = {
  //Change Menu State
  SET_OPEN_MENU(state, newState) {
    state.isOpen = newState;
  }
};

export const actions = {
  //Toogle Menu
  toogleMenu(context) {
    context.commit("SET_OPEN_MENU", !context.state.isOpen);
  }
};
