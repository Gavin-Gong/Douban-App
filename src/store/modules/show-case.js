const state = {
  showCaseWidth: '',
};

const mutations = {
  setWidth (state, width) {
    state.showCaseWidth = width;
  },
};

const actions = {
  setWidth ({ commit }) {
    commit('setWidth');
  },
};

export default {
  state,
  mutations,
  actions,
};
