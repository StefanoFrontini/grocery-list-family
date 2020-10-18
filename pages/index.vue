<template>
  <v-row no-gutters align="center" justify="center">
    <v-col cols="auto">
      <v-card min-width="290" color="#424242">
        <Snackbar v-model="snackbar" :text="message" />
        <v-card-title>
          <h1>{{ $t("title") }}</h1>
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
              :label="$t('nome')"
              required
            />
            <v-text-field
              v-model="user.room"
              :counter="16"
              :rules="roomRules"
              :label="$t('inserisciStanza')"
              required
            />
            <v-btn
              :disabled="!isValid"
              color="primary"
              class="mt-3"
              type="submit"
            >
              {{ $t("entra") }}
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
        v => !!v || this.$t("obbligatorio"),
        v => (v && v.length <= 16) || this.$t("caratteri")
      ],
      roomRules: [
        v => !!v || this.$t("obbligatorio"),
        v => (v && v.length <= 16) || this.$t("caratteri")
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
      if (this.$refs.form.validate()) {
        this.createUser(this.user);
        this.$router.push("/chat");
      }
    }
  },
  head: {
    title: "Lista della spesa"
  }
};
</script>
