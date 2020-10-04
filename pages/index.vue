<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="auto">
      <v-card min-width="290" color="#424242">
        <Snackbar v-model="snackbar" :text="message" />

        <v-card-title>
          <h2>Login</h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="isValid"
            lazy-validation
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="user.username"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            />
            <v-text-field
              v-model="user.room"
              :counter="16"
              :rules="roomRules"
              label="Enter the room"
              required
            />
            <v-btn
              :disabled="!isValid"
              color="primary"
              class="mt-3"
              type="submit"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/components/Snackbar";
import messageDict from "@/utils/messageDict";
export default {
  layout: "login",
  components: {
    Snackbar
  },
  data() {
    return {
      isValid: true,
      user: {
        room: "",
        username: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 16) || "Name must be less than 16 characters"
      ],
      roomRules: [
        v => !!v || "Enter the room",
        v => (v && v.length <= 16) || "Room must be less than 16 characters"
      ],
      snackbar: false
    };
  },
  computed: {
    message() {
      const { message } = this.$route.query;
      return messageDict[message] || "";
    }
  },
  mounted() {
    this.snackbar = !!this.message;
  },

  methods: {
    ...mapActions(["createUser"]),
    submit() {
      this.createUser(this.user);
      this.$router.push("/chat");

      //console.log("Message sent to server:", {
      //  username: this.name,
      //  room: this.room
      //});
      /*  setTimeout(() => {
        this.$socket.emit("joinRoom", this.user);
      }, 100); */
    }
  },
  head: {
    title: "Grocery List Family Edition"
  }
};
</script>
