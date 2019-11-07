<template>
<div>
  <b-form >
    <b-input type="number" name = "age" id="age" v-model="user.age" placeholder="Age"></b-input>
    <b-input type="text" id="firstname" v-model="user.firstname" placeholder="first name"></b-input>
    <b-input type="text" id="lastname" v-model="user.lastname" placeholder="last name"></b-input>
   </b-form>
     <button @click="login">Add</button>
</div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
import axios from "axios"
export default {
  name: "Add",
  data() {
    return {
      user: {
        age: "",
        firstname: "",
        lastname: ""
      }
    }
  },
  methods: {
    login() {
     alert(document.getElementById("age").value)
    }
  },
  submit(){
    axios.post('http://localhost:8080/Add',{user})
    .then(response => (alert('added!')))
    .catch(error =>{
      console.log(error)
    })
  }
};
</script>