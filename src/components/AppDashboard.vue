<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app expand-on-hover>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="user.avtar" :alt="user.name"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logoutUser">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Project 1</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <app-user></app-user>
    </v-main>
  </v-app>
</template>

<script>
import AppUser from "./AppUser";
export default {
  components: { AppUser },
  data: () => ({ drawer: true }),
  computed: {
    user: {
      get() {
        return this.$store.state.currentUser.user;
      },
    },
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("currentUser/logout");
    },
  },
  created() {
    this.$store.dispatch("currentUser/setLoggedInUser");
    if (!this.$store.getters["currentUser/isUserLoggedIn"]) {
      window.location.replace("/");
    }
  },
  mounted() {},
};
</script>

<style scoped>
.v-main {
  padding-top: 0px !important;
  padding-bottom: 40px !important;
}
</style>
