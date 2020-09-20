<template>
  <div>
    <v-layout column justify-center align-center>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field
            v-model="room"
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
export default {
  components: {},
  data() {
    return {
      room: "",
      name: ""
    };
  },
  methods: {
    submit() {
      this.$router.push("/chat");

      console.log("Message sent to server:", {
        username: this.name,
        room: this.room
      });
      setTimeout(() => {
        this.$socket.emit("joinRoom", {
          username: this.name,
          room: this.room
        });
      }, 100);
    }
  }
};
</script>
