<template>
  <v-main>
    <div v-for="item in merchandises" v-bind:key="item">
      <v-card :style="{ backgroundColor: randomColor(item.id) }">{{
        item.merchandise
      }}</v-card>
    </div>
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
import { ref, onValue } from "@firebase/database";
// get belum ditambahin

export default {
  name: "MerchandisePage",
  data() {
    return {
      colorCache: {},
      load: false,
      search: "",
      filter: "",
      snackbar: false,
      error_message: "",
      color: "",
      headers: [
        { text: "Merchandies Name", value: "merchandise" },
        { text: "Artist Name", value: "artist" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Packaging", value: "package" },
        { text: "", value: "actions" },
      ],
      type: ["Hot", "Cool", "Cold"],
      inputRules: [(v) => !!v || "Must be filled!"],
      merchandise: new FormData(),
      merchandises: [],
      dialog: false,
      dialogConfirm: false,
      form: {
        merchandise: "",
        artist: "",
        price: "",
        stock: "",
        package: "",
      },
      formType: 0,
      selectedId: "",
    };
  },

  created() {
    // tambahkan fungsi untuk retrieve data
    onValue(ref(db, "merchandises"), (snapshot) => {
      (this.merchandises = []),
        snapshot.forEach((merchandise) => {
          this.merchandises.push({
            id: merchandise.key,
            merchandise: merchandise.val().merchandise,
            artist: merchandise.val().artist,
            price: merchandise.val().price,
            stock: merchandise.val().stock,
            package: merchandise.val().package,
          });
        });
    });
  },

  methods: {
    closeDialog() {
      this.dialog = false;
      this.formType = 0;
      this.$refs.form.reset();
    },
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      );
    },
  },

  computed: {
    formTitle() {
      return this.formType === 0 ? "Create Merchandise" : "Update Merchandise";
    },
  },
};
</script>
