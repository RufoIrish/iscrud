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

        <div variant="primary">
          <b-button variant="primary" style="float:left"  v-if="item == null"  @click="submit">Add task</b-button>
          <b-button style="float:left; margin-right:0" variant="primary" v-else @click="check">Update</b-button>
        </div>&nbsp;
        <b-button @click="$router.push('/Home')" variant="danger" style="margin-left: 40%">cancel</b-button>
      </b-card>
    </center>
          <div>
          <b-modal v-model="updateStat" ok-only ok-variant="secondary" ok-title="">Are you sure you want to update this task to {{task}} ?
            <br>
            <br>
             <b-button
             style="width: 80px"
                  class="btn"
                  id="btn_doing"
                  @click="submit"
                  @click.prevent="updateStat = false"
                  variant="outline-danger"
                >Update</b-button>&nbsp;
                <b-button
                style="width: 60px"
                  class="btn"
                  id="btn_doing"
                  @click.prevent="updateStat = false"
                  variant="outline-primary"
                >No</b-button>
          </b-modal>
        </div>
  </div>

</template>
<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      task1:'',
      temptask: '',
      tempsched: '',
      schedule1:'',
      task: "",
      schedule: "",
      updateStat: false
    };
  },
  props: {
    item: String
  },
  methods: {
    submit() {
      if (this.task != "" && this.schedule != "") {
        this.schedule1 = this.schedule
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

    },
    check() {
      if (this.temptask == this.task && this.tempsched == this.schedule) {
        swal("You haven't change anything!");
      } else {
      this.updateStat = true;
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
        .post("http://localhost:3000/getItem",{ id: this.item })
        .then(res => {
          this.task = res.data[0].task;
          this.schedule = res.data[0].schedule;
          console.log(res.data[0].task)
          this.temptask = this.task;
          this.tempsched = this.schedule;
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