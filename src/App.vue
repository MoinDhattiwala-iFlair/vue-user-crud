<template>
  <v-app>
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </v-app>
</template>
<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
export default {
  name: "App",
  components: { AppHeader, AppFooter },
};
</script>
<style lang="scss">
.v-application--wrap {
  z-index: 0;
}
.v-card.v-sheet.theme--light:nth-child(2) {
  z-index: -1;
}
</style>
