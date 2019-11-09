<template>
  <div>
    <center>
      <b-card
        title="Task"
        img-src="https://project-management.com/wp-content/uploads/2019/09/task-management-software.png"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          <b-form-input v-model="task" id="input-none" :state="null" autocomplete="off" placeholder="Task to add ..."></b-form-input>
        </b-card-text>
        <b-button @click="submit" variant="primary">Add task!</b-button>
      </b-card>
    </center>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      task: ""
    };
  },
  methods: {
    submit() {
      axios
        .post("http://localhost:3000/Add", { "task": this.task })
        .then(response => {
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style  scoped>
div {
  text-align: center;
}
</style>