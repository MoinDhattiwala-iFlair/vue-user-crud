<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
    sort-by="calories"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-0" v-bind="attrs" v-on="on">
              New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="10">
                    <v-file-input
                      v-bind:value="null"
                      @change="editedItem.photo = $event"
                      show-size
                      accept="image/*"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="2">
                    <v-avatar>
                      <v-img :src="editedItem.avtar"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      :rules="[rules.required]"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      :rules="[rules.required, rules.email]"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-select
                      v-model="editedItem.country_id"
                      :rules="[rules.required]"
                      :items="country"
                      :item-text="'name'"
                      :item-value="'id'"
                      label="Select Country"
                      solo
                      @change="getState"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-select
                      v-model="editedItem.state_id"
                      :rules="[rules.required]"
                      :items="state"
                      :item-text="'name'"
                      :item-value="'id'"
                      label="Select State"
                      solo
                      @change="getCity"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.city_id"
                      :rules="[rules.required]"
                      :items="city"
                      :item-text="'name'"
                      :item-value="'id'"
                      label="Select City"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.password"
                      :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_password ? 'text' : 'password'"
                      :rules="editedIndex > -1 ? [] : [rules.required, rules.min]"
                      label="Password"
                      hint="At least 8 characters"
                      @click:append="show_password = !show_password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.password_confirmation"
                      :append-icon="
                        show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="show_password_confirmation ? 'text' : 'password'"
                      :rules="
                        editedIndex > -1
                          ? []
                          : [
                              rules.required,
                              rules.min,
                              rules.confirmPasswordMatch(editedItem.password),
                            ]
                      "
                      label="Confirm Password"
                      hint="At least 8 characters"
                      @click:append="
                        show_password_confirmation = !show_password_confirmation
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
    </template>
    <template v-slot:item.avtar="{ item }">
      <v-avatar>
        <v-img :src="item.avtar"></v-img>
      </v-avatar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    search: "",
    dialog: false,
    dialogDelete: false,
    show_password: false,
    show_password_confirmation: false,
    rules: {
      required: (value) => !!value || "Required.",
      email: (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",
      min: (v) => v.length >= 8 || "Min 8 characters",
      confirmPasswordMatch: (password) => {
        return (v) =>
          v === password || "The password and confirm password you entered don't match";
      },
    },
    headers: [
      {
        text: "Photo",
        align: "start",
        sortable: false,
        value: "avtar",
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "City",
        value: "city_name",
      },
      {
        text: "State",
        value: "state_name",
      },
      {
        text: "Country",
        value: "country_name",
      },
      {
        text: "Registered At",
        value: "registered_at",
      },
      {
        text: "Updated At",
        value: "last_updated_at",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    editedIndex: -1,
    editedItem: {
      photo: "",
      avtar: "",
      name: "",
      email: "",
      city_id: 0,
      state_id: 0,
      country_id: 0,
      password: "",
      password_confirmation: "",
    },
    defaultItem: {
      photo: "",
      avtar: "",
      name: "",
      email: "",
      city_id: 0,
      state_id: 0,
      country_id: 0,
      password: "",
      password_confirmation: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    users() {
      let a = this.$store.state.allUsers.users;
      return Object.values(a);
    },
    currentUser() {
      return this.$store.state.currentUser.user;
    },
    country() {
      return this.$store.state.location.country;
    },
    state() {
      return this.$store.state.location.state;
    },
    city() {
      return this.$store.state.location.city;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    users() {
      this.loading = false;
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({ password: "", password_confirmation: "" }, item);
      this.editedItem.photo = "";
      if (this.editedIndex > -1) {
        this.getState();
        this.getCity();
      }
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("allUsers/deleteUser", {
        id: this.editedItem.id,
        index: this.editedIndex,
      });
      if (this.editedItem.id === this.$store.state.currentUser.user.id) {
        this.$store.dispatch("currentUser/logout");
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let formData = new FormData();
      Object.keys(this.editedItem).forEach((key) => {
        if (this.editedItem[key] != null && this.editedItem[key] != "") {
          formData.append(key, this.editedItem[key]);
        }
      });
      if (this.editedIndex > -1) {
        formData.append("_method", "PUT");
        this.$store.dispatch("allUsers/updateUser", {
          id: this.editedItem.id,
          index: this.editedIndex,
          formData: formData,
        });
        if (this.editedItem.id === this.$store.state.currentUser.user.id) {
          this.$store.dispatch("currentUser/setLoggedInUser");
        }
      } else {
        this.$store.dispatch("allUsers/saveUser", formData);
      }
      this.close();
    },
    getState() {
      this.$store.dispatch("location/setState", this.editedItem.country_id);
    },
    getCity() {
      this.$store.dispatch("location/setCity", this.editedItem.state_id);
    },
    processFile(event) {
      this.editedItem.photo = event;
    },
  },
  created() {
    this.$store.dispatch("allUsers/setUsers");
    this.$store.dispatch("location/setCountry");
    this.$store.dispatch("currentUser/setLoggedInUser");
  },
};
</script>
