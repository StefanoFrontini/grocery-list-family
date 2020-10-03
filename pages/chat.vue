<template>
  <div>
    <v-btn color="error" icon class="mx-1" @click="exit">Logout</v-btn>
    <p>Username: {{ username }}</p>
    <p>Room: {{ room }}</p>
    <p>Users:</p>
    <p v-for="user in users" :key="user.id">{{ user.username }}</p>
    <v-form ref="form" @submit.prevent="sendMessage">
      <v-text-field
        v-model="text"
        label="Message..."
        outlined
        :rules="rules"
        append-icon="mdi-send-circle-outline"
        @input="typing"
        @click:append="sendMessage"
        @blur="resetValidation"
      />
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      messages: [],
      text: "",
      room: "",
      users: [],
      username: "",
      rules: [v => !!v || "Text is required"]
      //format_messages: ""
    };
  },
  /*   async asyncData({ $axios }) {
    let saved_messages = await $axios.$get(`http://localhost:3000/messages/:${this.room}`);

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
  }, */
  methods: {
    ...mapActions(["joinRoom", "getMessages", "leftRoom"]),
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    },
    sendMessage(e) {
      if (this.$refs.form.validate()) {
        this.$socket.emit("messageToServer", this.text);
        this.$axios
          .post("http://localhost:3000/messages", {
            username: this.username,
            text: this.text,
            room: this.room
          })
          .then(response => {
            if (response.data._id) {
              console.log("record created");
            }
          })
          .catch(error => {
            console.log("record not created", error);
          });
        this.text = "";
        this.resetValidation();
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  computed: {
    ...mapState(["user", "format_messages"])
  },
  middleware: "auth",
  created() {
    this.joinRoom(this.user);
    this.getMessages();
  },

  sockets: {
    connect() {},
    message(data) {
      this.messages.push(data);
    },
    roomUsers(data) {
      this.room = data.room;
      this.users = data.users;
    },
    user(data) {
      this.username = data.username;
    }
  }

  /*   mounted() {
    setTimeout(async () => {
      console.log("room:", this.room);
      console.log("username:", this.username);
      let saved_messages = await this.$axios.$get(
        `http://localhost:3000/messages/${this.room}`
      );

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

      this.format_messages = format_messages;
    }, 100);

    if (this.username == "") {
      console.log("mounted-username: ", this.username);
      //this.$router.push("/");
    } */
};
</script>
