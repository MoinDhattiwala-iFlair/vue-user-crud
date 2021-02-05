<template>
  <v-card>
    <v-toolbar :color="bar.class" :dark="bar.dark">
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text">Project 1</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-badge :content="5" color="green" overlap>
        <v-icon large> mdi-bell </v-icon>
      </v-badge>
      <div class="hidden-sm-and-down">
        <router-link to="/about">
          <v-btn text> About </v-btn>
        </router-link>
        <router-link to="/contact">
          <v-btn text> Contact </v-btn>
        </router-link>
        <router-link to="/login" v-if="!isUserLogedIn">
          <v-btn text> Login </v-btn>
        </router-link>
        <router-link to="/dashboard" v-if="isUserLogedIn">
          <v-btn text> Dashboard </v-btn>
        </router-link>
      </div>
      <div class="hidden-md-and-up">
        <v-navigation-drawer v-model="drawer" absolute temporary height="350px">
          <v-list dense>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <router-link to="/home" link>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    bar: { class: "primary", dark: true },
    drawer: null,
    items: [
      { title: "About", icon: "mdi-domain", link: "about" },
      { title: "Contact", icon: "mdi-email", link: "contact" },
      { title: "Login", icon: "mdi-login", link: "login" },
    ],
  }),
  computed: {
    isUserLogedIn: {
      get() {
        if (this.$store.getters["currentUser/isUserLoggedIn"]) {
          return true;
        }
        return false;
      },
    },
  },
  created() {
    this.$store.dispatch("currentUser/setLoggedInUser");
  },
};
</script>
