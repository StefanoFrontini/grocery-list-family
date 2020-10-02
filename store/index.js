import axios from "axios";

export const state = () => ({
  user: {},
  format_messages: []
});

export const getters = {};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setMessages(state, messages) {
    state.format_messages = messages;
  },
  clearData(state) {
    state.user = {};
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
  },
  leftRoom({ dispatch, commit }) {
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null
    });
    commit("clearData");
  },
  async getMessages({ state, commit }) {
    const { user } = state;
    const response = await axios.get(
      `http://localhost:3000/messages/${user.room}`
    );
    const saved_messages = response.data;

    console.log("saved_messages", saved_messages);

    function formatDate(item) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      const new_item = {
        room: item.room,
        text: item.text,
        username: item.username,
        _id: item._id,
        __v: item.__v,
        date: new Intl.DateTimeFormat("it-IT", options).format(
          new Date(item.date)
        )
      };
      return new_item;
    }
    const format_messages = saved_messages.map(formatDate);

    commit("setMessages", format_messages);
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      dispatch("createUser", user);
      dispatch("joinRoom");
    }
  }
};
