<template>
  <div>
    <hr />
    <center>
      <b-card
        title="Task"
        img-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQwWO3MN6M_t8-OMSvBVcUYeD1WfeIO8m07KUnm-5p4styavFB"
        img-top
        tag="article"
        style="max-width: 20rem;background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQwWO3MN6M_t8-OMSvBVcUYeD1WfeIO8m07KUnm-5p4styavFB')"
        class="mb-2"
        id="card"
      >
        <b-card-text >
          <b-form-input
            v-model="task"
            id="input_task"
            :state="null"
            type="text"
            autocomplete="off"
            placeholder="Task to add ..."
            required
          ></b-form-input>
          <br />
          <b-form-input
            v-model="schedule"
            id="schedule"
            :state="null"
            type="text"
            autocomplete="off"
            placeholder="Schedule ..."
            required
          ></b-form-input>
        </b-card-text>

        <b-button @click="submit" variant="primary">
          <span v-if="item == null">Add task</span>
          <span v-else>Update</span>
        </b-button>&nbsp;
        <b-button @click="$router.push('/Home')" variant="danger">cancel</b-button>
      </b-card>
    </center>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
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
      if (this.task != "" && this.schedule != "") {
        var Item = {
          task: this.task,
          schedule: this.schedule,
          done: 0,
          delete: 0
        };
        var path = "http://localhost:3000/Add";
        if (this.item != null) {
          path = "http://localhost:3000/edit";
          Item["id"] = this.item;
        }
        axios
          .post(path, Item)
          .then(response => {
            this.$router.push({ path: "/Home" });
          })
          .catch(error => {
            console.log(error);
          });
      }else{
        swal("Kindly complete the specified fields!")
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
          this.task = res.data[0].task;
          this.schedule = res.data[0].schedule;
          console.log(res.data[0].task)
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
#card {
  margin-top: 10%;
  /* background-color:  */
}
</style>