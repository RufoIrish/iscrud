<template>
  <div>
    <router-link to="/Add">
      <b-button variant="success" id="add">Add Task</b-button>
    </router-link>
    <b-container class="bv-example-row">
      <b-row>
        <!-- <b-table hover :items="todo"></b-table> -->
        <table class="table table-striped">
          <thead>
            <th>Tasks</th>
            <th>Schedule</th>
            <th></th>
          </thead>
          <!-- <hr /> -->
          <tbody hover v-for="(item,i) in todo" :key="i">
            <tr v-if="item.done== false">
              <td>{{item.task}}</td>
              <td>{{item.schedule}}</td>
              <td>
                <b-button
                  class="btn"
                  id="btn_doing"
                  @click="done(item.id)"
                  variant="outline-success"
                >mark as done</b-button>&nbsp;
                <b-button
                  class="btn"
                  id="btn_doing"
                  @click="del(item.id)"
                  variant="outline-danger"
                >delete</b-button>&nbsp;
                <b-button
                  class="btn"
                  id="btn_doing"
                  @click="edit(item.id)"
                  variant="outline-primary"
                >Edit</b-button>&nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </b-row>
    </b-container>
  </div>
</template>
<script   src="https://code.jquery.com/jquery-3.4.1.slim.min.js"   integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="   crossorigin="anonymous"></script>
<script>
import axios from "axios";
export default {
  data() {
    return {
      todo: []
    };
  },
  mounted() {
    axios
      .post("http://localhost:3000/getdata")
      .then(response => {
        console.log(response);
        this.todo = response.data.filter(todo => !todo.done);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    done(id) {
      this.todo.map(task => {
        if (task.id == id) {
          if (task.done == false) {
            task.done = true;
          }
          console.log(task);
          axios
            .post("http://localhost:3000/done", { done: task })
            .then(response => {
              this.todo = response.data;
              console.log("to do : ", this.todo);
              // this.getdata();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    edit(item) {
      this.$router.push("/Add/" + item);
    },
    del(id) {
      this.todo.map(task => {
        if (task.id == id) {
          if (task.done == false) {
            task.done = true;
          }
          console.log(task);
          axios
            .post("http://localhost:3000/delete", { done: task })
            .then(response => {
              this.todo = response.data;
              // this.getdata();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
#add {
  margin-right: 80%;
  padding: 10px;
  margin-top: 2%;
  margin-bottom: 2%;
}
.btn {
  padding: 3px;
}
</style>
