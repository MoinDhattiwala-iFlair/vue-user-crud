<template>
  <v-container>
    <v-alert type="success" :value="alert">Login Successfull</v-alert>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    alert: false,
    dialog: false,
    user: {
      email: "",
      password: "",
    },
    passwordRules: [(v) => !!v || "Password is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    validate() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.$store.dispatch("currentUser/loginUser", this.user);
        this.dialog = true;
        /*setTimeout(() => {
          this.dialog = false;
          console.log(`Email is ${this.email} and password is ${this.password}`);
          this.$refs.form.reset();
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }, 3000); */
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  created() {
    this.$store.dispatch("currentUser/setLoggedInUser");
    if (this.$store.getters["currentUser/isUserLoggedIn"]) {
      this.$router.push({ path: "/dashboard" });
    }
  },
};
</script>
<style lang="scss">
.v-application--wrap .container {
  z-index: -1;
}
</style>
