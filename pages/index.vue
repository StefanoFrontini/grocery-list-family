<template>
  <div>
    <v-layout column justify-center align-center>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="user.username"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.room"
            label="Enter the room"
            required
          ></v-text-field>
          <v-btn color="primary" class="mr-4" type="submit">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      user: {
        room: "",
        username: ""
      }
    };
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
  }
};
</script>
