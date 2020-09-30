export const state = () => ({
  user: {}
});

export const getters = {};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  createUser({ commit }, user) {
    commit("setUser", user);
  },
  joinRoom({ dispatch, state }) {
    const { user } = state;
    dispatch("socketEmit", {
      action: "joinRoom",
      payload: user
    });
  }
};
