<template>
  <div>
    <v-form ref="form" @submit.prevent="sendMessage">
      <v-text-field
        v-model="text"
        label="Message..."
        outlined
        :rules="rules"
        append-icon="mdi-send-circle-outline"
        @click:append="sendMessage"
        @blur="resetValidation"
      />
    </v-form>

    <p v-for="(message, index) in messages" :key="`message-${index}`">
      {{ message }}
    </p>
    <p>Saved messages:</p>
    <v-card class="mx-auto" max-width="400" tile>
      <v-list-item
        two-line
        v-for="(message, index) in format_messages"
        :key="`saved_message-${index}`"
      >
        <v-list-item-content>
          <v-list-item-title v-text="message.text"></v-list-item-title>
          <v-list-item-subtitle
            >Inserito da: {{ message.username }} il
            {{ message.date }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: "chat",
  data() {
    return {
      messages: [],
      text: "",
      room: "",

      username: "",
      rules: [v => !!v || "Text is required"]
    };
  },

  methods: {
    ...mapActions(["getMessages", "createMessage"]),
    sendMessage(e) {
      if (this.$refs.form.validate()) {
        this.createMessage(this.text);
        this.text = "";
        this.resetValidation();
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  created() {
    this.getMessages();
  },
  computed: {
    ...mapState(["format_messages"])
  },
  sockets: {
    connect() {},
    message(data) {
      this.messages.push(data);
      this.getMessages();
    },
    roomUsers(data) {
      this.room = data.room;
      this.users = data.users;
    },
    user(data) {
      this.username = data.username;
    }
  }
};
</script>
