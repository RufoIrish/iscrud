<template>
<div>
  <b-form >
    <b-input type="number" task = "age" id="task" v-model="user.age" placeholder="task"></b-input>
   </b-form>
     <b-button  variant="primary"  @click="login">Add to task</b-button>
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
    axios.post('http://localhost:3000/Add',{user})
    .then(response => (alert('added!')))
    .catch(error =>{
      console.log(error)
    })
  }
};
</script>
<style lang="stylus" scoped>

</style>