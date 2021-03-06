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
  async createMessage({ state, dispatch }, msg) {
    const { user } = state;
    const response = await axios
      .post("/messages", {
        username: user.username,
        text: msg,
        room: user.room
      })
      .then(response => {
        if (response.data._id) {
          console.log("record created");
        }
      })
      .catch(error => {
        console.log("record not created", error);
      });
    dispatch("socketEmit", {
      action: "messageToServer",
      payload: msg
    });
    dispatch("getMessages");
  },
  async updateMessageTrue({ state, dispatch }, id) {
    const { user } = state;
    const response = await axios
      .patch(`/messages/${id}`, {
        isDone: true
      })
      .then(response => {
        if (response.data._id) {
          console.log("record updated");
        }
      })
      .catch(error => {
        console.log("record not updated", error);
      });
    dispatch("socketEmit", {
      action: "messageToServer",
      payload: id
    });
    dispatch("getMessages");
  },
  async updateMessageFalse({ state, dispatch }, id) {
    const { user } = state;
    const response = await axios
      .patch(`/messages/${id}`, {
        isDone: false
      })
      .then(response => {
        if (response.data._id) {
          console.log("record updated");
        }
      })
      .catch(error => {
        console.log("record not updated", error);
      });
    dispatch("socketEmit", {
      action: "messageToServer",
      payload: id
    });
    dispatch("getMessages");
  },
  async deleteMessage({ state, dispatch }, id) {
    const { user } = state;
    const response = await axios
      .delete(`/messages/${id}`)
      .then(response => {
        if (response.data._id) {
          console.log("record deleted");
        }
      })
      .catch(error => {
        console.log("record not deleted", error);
      });
    dispatch("socketEmit", {
      action: "messageToServer",
      payload: id
    });
    dispatch("getMessages");
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
    const response = await axios.get(`/messages/${user.room}`);

    const saved_messages = response.data;

    const sorted_messages = saved_messages.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

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
        isDone: item.isDone,
        _id: item._id,
        __v: item.__v,
        date: new Intl.DateTimeFormat("it-IT", options).format(
          new Date(item.date)
        )
      };
      return new_item;
    }
    const format_messages = sorted_messages.map(formatDate);

    commit("setMessages", format_messages);
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      dispatch("createUser", user);
      dispatch("getMessages");
      dispatch("joinRoom");
    }
  }
};
