<template>
  <div>
    <p>Username: {{ username }}</p>
    <p>Room: {{ room }}</p>
    <p>Users:</p>
    <p v-for="user in users" :key="user.id">{{ user.username }}</p>
    <v-form @submit.prevent="sendMessage">
      <v-text-field
        v-model="messageToServer"
        type="text"
        placeholder="Enter message"
      ></v-text-field>
    </v-form>
    <p v-for="(message, index) in messages" :key="`message-${index}`">
      {{ message }}
    </p>
    <p>Saved messages:</p>
    <p
      v-for="(message, index) in format_messages"
      :key="`saved_message-${index}`"
    >
      User: {{ message.username }} said: {{ message.text }} in room:
      {{ message.room }} at: {{ message.date }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      messageToServer: "",
      room: "",
      users: [],
      username: ""
    };
  },
  async asyncData({ $axios }) {
    let saved_messages = await $axios.$get("http://localhost:3000/messages");

    function formatDate(item) {
      const options = { dateStyle: "medium" };
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

    return { format_messages };
  },
  methods: {
    sendMessage(e) {
      this.$socket.emit("messageToServer", this.messageToServer);
      console.log("Message sent to server:", this.messageToServer);
    }
  },
  sockets: {
    connect() {},
    message(data) {
      console.log(data);
      this.messages.push(data);
    },
    roomUsers(data) {
      console.log(data);
      this.room = data.room;
      this.users = data.users;
    },
    user(data) {
      console.log("user:", data);
      this.username = data.username;
    }
  }
};
</script>
