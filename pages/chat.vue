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
      username: "",
    };
  },
  methods: {
    sendMessage(e) {
      this.$socket.emit("messageToServer", this.messageToServer);
      console.log("Message sent to server:", this.messageToServer);
    },
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
      console.log('user:', data);
      this.username = data.username;
    },
  },
};
</script>
