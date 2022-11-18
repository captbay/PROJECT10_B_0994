<template>
  <v-main>
    <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px">
      <v-row justify="center" align="center" style="margin: 3px auto">
        <v-col>
          <v-text-field
            v-model="search"
            class="font-weight-bold"
            color="black"
            style="
              width: 70%;
              font-family: Poppins;
              font-size: 20px;
              font-style: bold;
              border-radius: 10px;
            "
            rounded
            append-icon="mdi-magnify"
            outlined
            placeholder="Search..."
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            class="font-weight-bold"
            style="
              margin: 10px auto;
              font-family: Poppins;
              font-size: 20px;
              text-transform: capitalize;
              float: right;
              color: #f7caca;
            "
            x-large
            color="#93A9D1"
            @click="dialog = true"
            >New Album</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card elevation="3" style="border-radius: 6px" class="mt-5 mx-6">
      <v-data-table
        :headers="headers"
        :items="albumPage"
        :search="search"
        :items-per-page="10"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="green darken-2" class="mr-2" @click="editData(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            color="red"
            @click="
              selectedId = item.id;
              dialogConfirm = true;
            "
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
      style="border-radius: 10px"
    >
      <v-card style="border-radius: 10px">
        <v-card-title class="pa-0">
          <v-toolbar
            color="#93A9D1"
            elevation="0"
            style="border-radius: 10px 10px 0px 0px"
            height="90%"
          >
            <span
              style="
                color: #f7caca;
                font-family: Poppins;
                font-weight: 800;
                font-size: 160%;
                margin-left: 3%;
              "
              >{{ formTitle }}</span
            >
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-container>
            <v-form ref="form">
              <v-text-field
                outlined
                color="black"
                class="textfield mt-3"
                v-model="form.album"
                label="Album Name"
                required
                :rules="inputRules"
              >
              </v-text-field>
              <v-text-field
                outlined
                color="black"
                class="textfield mt-3"
                v-model="form.artist"
                label="Artist Name"
                required
                :rules="inputRules"
              >
              </v-text-field>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.date"
                    label="Realese Date"
                    outlined
                    color="black"
                    class="textfield mt-3"
                    readonly
                    required
                    :rules="inputRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
              <v-select
                outlined
                color="black"
                class="textfield"
                :items="['HYBE', 'SM', 'JYP', 'YG']"
                v-model="form.agency"
                label="Agency"
                required
                :rules="inputRules"
              >
              </v-select>
              <v-text-field
                outlined
                color="black"
                class="textfield"
                v-model="form.price"
                label="Price"
                :rules="inputRules"
                prefix="Rp"
                type="numeric"
              >
              </v-text-field>
              <v-text-field
                outlined
                color="black"
                class="textfield"
                v-model="form.stock"
                label="Stock"
                :rules="inputRules"
                type="numeric"
              >
              </v-text-field>
              <!-- <v-combobox
                outlined
                color="black"
                class="textfield"
                v-model="form.date"
                label="date"
                required
                :rules="inputRules"
                :items="['Sticker', 'Photocards', 'Poster']"
                multiple
                dense
              >
              </v-combobox> -->
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn
            color="#EEEEEE"
            large
            style="
              font-family: Poppins;
              font-size: 20px;
              text-transform: capitalize;
              font-weight: 900;
              color: #001d38;
            "
            @click="closeDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#93A9D1"
            large
            style="
              font-family: Poppins;
              font-size: 20px;
              text-transform: capitalize;
              font-weight: 700;
              color: #f7caca;
            "
            @click="saveData()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      transition="dialog-top-transition"
      max-width="400"
      v-model="dialogConfirm"
      style="border-radius: 10px"
    >
      <v-card style="border-radius: 10px">
        <v-card-title class="pa-0">
          <v-toolbar
            color="#EF5350"
            elevation="0"
            style="border-radius: 10px 10px 0px 0px"
            height="80%"
          >
            <span
              style="
                color: white;
                font-family: Poppins;
                font-weight: 800;
                font-size: 160%;
                margin-left: 3%;
              "
              >Alert!</span
            >
          </v-toolbar>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text
          style="
            font-family: Poppins;
            font-size: 100%;
            color: #001d38;
            margin-top: 5%;
          "
        >
          Are you sure want to delete this data?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#EEEEEE"
            large
            style="
              font-family: Poppins;
              font-size: 20px;
              text-transform: capitalize;
              font-weight: 900;
              color: #001d38;
            "
            @click="dialogConfirm = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#EF5350"
            large
            style="
              font-family: Poppins;
              font-size: 20px;
              text-transform: capitalize;
              font-weight: 700;
              color: #eeeeee;
            "
            @click="deleteData"
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <V-snackbar
      v-model="snackbar"
      style="font-family: Poppins"
      :color="color"
      timeout="2000"
      top
      >{{ error_message }}</V-snackbar
    >
  </v-main>
</template>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap");

thead tr th span {
  font-size: 160% !important;
  font-family: Poppins !important;
  letter-spacing: 2%;
  font-weight: 600;
  color: black !important;
}

tbody tr td {
  font-size: 100% !important;
  font-family: Poppins !important;
  letter-spacing: 2%;
  font-weight: 100;
  color: black !important;
}

.textfield {
  font-family: Poppins !important;
  color: black;
}

.v-list-item__title {
  font-family: Poppins !important;
  color: black;
}
</style>

<script>
//tambahkan code untuk import database reference dan fungsi bawaan dari firebase database
import { db } from "../firebase";
import { ref, set, remove, push, onValue } from "@firebase/database";
// get belum di masukin

export default {
  name: "AlbumPage",
  data() {
    return {
      load: false,
      // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //   .toISOString()
      //   .substr(0, 10),
      menu2: false,
      search: "",
      filter: "",
      snackbar: false,
      error_message: "",
      color: "",
      headers: [
        { text: "Album Name", value: "album" },
        { text: "Artist", value: "artist" },
        { text: "Realese Date", value: "date" },
        { text: "Agency", value: "agency" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "", value: "actions" },
      ],
      type: ["Hot", "Cool", "Cold"],
      inputRules: [(v) => !!v || "Must be filled!"],
      album: new FormData(),
      albumPage: [],
      dialog: false,
      dialogConfirm: false,
      form: {
        album: "",
        artist: "",
        date: "",
        agency: "",
        price: "",
        stock: "",
      },
      formType: 0,
      selectedId: "",
    };
  },

  created() {
    // tambahkan fungsi untuk retrieve data
    onValue(ref(db, "albumPage"), (snapshot) => {
      (this.albumPage = []),
        snapshot.forEach((album) => {
          this.albumPage.push({
            id: album.key,
            album: album.val().album,
            artist: album.val().artist,
            agency: album.val().agency,
            price: album.val().price,
            stock: album.val().stock,
            date: album.val().date,
          });
        });
    });
  },

  methods: {
    saveData() {
      //tambahkan fungsi untuk create dan update data
      if (this.formType == -1) {
        set(ref(db, "albumPage/" + this.selectedId), this.form)
          .then(() => {
            this.snackbar = true;
            this.error_message = "Update Data Success!";
            this.color = "green";
            this.closeDialog();
          })
          .catch((err) => {
            this.error_message = "Update Data Failed:!" + err;
            this.color = "red";
            this.closeDialog();
          });
      } else {
        push(ref(db, "albumPage"), this.form)
          .then(() => {
            this.snackbar = true;
            this.error_message = "Add Data Success!";
            this.color = "green";
            this.closeDialog();
          })
          .catch((err) => {
            this.error_message = "Add Data Failed:!" + err;
            this.color = "red";
            this.closeDialog();
          });
      }
    },

    editData(item) {
      this.dialog = true;
      this.formType = -1;
      this.form = Object.assign({}, item);
      this.selectedId = item.id;
    },

    deleteData() {
      //tambahkan fungsi untuk delete data
      remove(ref(db, "albumPage/" + this.selectedId))
        .then(() => {
          this.dialogConfirm = false;
          this.snackbar = true;
          this.error_message = "Delete Data Success!";
          this.color = "green";
        })
        .catch((err) => {
          this.dialogConfirm = false;
          this.snackbar = true;
          this.error_message = "Add Data Failed:!" + err;
          this.color = "red";
        });
    },

    closeDialog() {
      this.dialog = false;
      this.formType = 0;
      this.$refs.form.reset();
    },
  },

  computed: {
    formTitle() {
      return this.formType === 0 ? "Create albumPage" : "Update Album";
    },
  },
};
</script>
