<template>
  <div id="login">
    <div>
      <div>
        <b-card-group deck>
          <b-card
            img-src="https://mstranslate.com.au/wp-content/uploads/2017/03/1437726898work.jpg"
            img-alt="Card image"
            img-top
          >
            <b-card-text>
              <input
                class="form-control"
                autocomplete="off"
                type="text"
                name="username"
                v-model="input.username"
                placeholder="Nickname"
              />
              <!-- <input type="password" name="password" v-model="input.password" placeholder="Password" /> -->
              <br />
              <b-button type="button" variant="success" @click="login">Proceed</b-button>
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.username != "") {
        this.$emit("authenticated", true);
        
        axios
          .post("http://localhost:3000/name", { name: this.input.username })
          .then(response => {
            swal("Welcome!");
            this.$router.push({ path: "/Home" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        swal("A nickname must be present!");
      }
    }
  }
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>