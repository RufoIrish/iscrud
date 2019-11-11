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
          <b-form-input
            v-model="task"
            id="input_task"
            :state="null"
            autocomplete="off"
            placeholder="Task to add ..."
          ></b-form-input>
          <br>
          <b-form-input
            v-model="schedule"
            id="schedule"
            :state="null"
            autocomplete="off"
            placeholder="Schedule ..."
          ></b-form-input>
        </b-card-text>

        <b-button @click="submit" variant="primary">
          <span v-if="item == null">Add task</span>
          <span v-else>Update</span>
        </b-button>&nbsp;
        <b-button @click="$router.push('/')" variant="danger">cancel</b-button>
      </b-card>
    </center>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      task: "",
      schedule: ""
    };
  },
  props: {
    item: String
  },
  methods: {
    submit() {
      if (this.task != null && this.schedule != null) {
        var Item = { task: this.task, schedule: this.schedule, done: false };
        var path = "http://localhost:3000/Add";
        if (this.item != null) {
          path = "http://localhost:3000/edit";
          Item["id"] = this.item;
        }
        axios
          .post(path, Item)
          .then(response => {
            this.$router.push({ path: "/" });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  watch: {
    item(val) {
      console.log(val);
    }
  },
  created() {
    if (this.item != null) {
      axios
        .post("http://localhost:3000/getItem", { id: this.item })
        .then(res => {
          this.task = res.data.item.task;
          this.schedule = res.data.item.schedule;
        })
        .catch(err => {
          console.log(err);
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