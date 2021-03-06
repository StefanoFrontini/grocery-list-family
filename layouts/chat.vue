<template>
  <v-app style="background: #303030">
    <v-navigation-drawer
      v-model="drawer"
      app
      mobile-breakpoint="650"
      color="$accent"
    >
      <v-list subheader>
        <v-subheader>{{ $t("utenti") }}</v-subheader>

        <v-list-item
          v-for="(item, index) in users"
          :key="`user-${index}`"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.username" />
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id === item.id ? 'primary' : 'grey'">
              mdi-account-circle-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#424242">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        {{ $t("stanza") }}
        <v-chip color="grey">
          {{ user.room }}
        </v-chip>
        <v-chip color="secondary">
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            >{{ locale.name }}</nuxt-link
          >
        </v-chip>
      </v-toolbar-title>
      <v-spacer />

      <v-spacer />
      <v-btn icon class="mx-1" @click="exit">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid style="height: 100%">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      users: []
    };
  },
  computed: {
    ...mapState(["user"]),
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  middleware: "auth",
  created() {
    this.joinRoom(this.user);
  },
  methods: {
    ...mapActions(["joinRoom", "leftRoom", "createUser"]),
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    }
  },
  sockets: {
    roomUsers(data) {
      this.users = data.users;
    },
    user(data) {
      this.createUser(data);
    }
  }
};
</script>
