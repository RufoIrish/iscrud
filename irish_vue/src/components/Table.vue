<template>
  <div>
    <router-link to="/Add">
      <b-button variant="success" id="add">Add Task</b-button>
    </router-link>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <!-- <b-table hover :items="todo"></b-table> -->
          <table>
            <thead>
              <th>To Do</th>
            </thead>
            <hr />
            <tbody hover v-for="(item,i) in todo" :key="i">
              <tr>
                <td>
                  <b-row>
                    <b-col>{{item.task}}</b-col>
                    <b-col>
                      <b-button class="btn" pill variant="outline-danger">del</b-button>&nbsp;
                      <b-button class="btn" pill variant="primary">update</b-button>&nbsp;
                      <b-button class="btn" id="btn_doing" pill variant="outline-success">doing</b-button>
                    </b-col>
                  </b-row>
                </td>
              </tr>
              <hr>
            </tbody>
          </table>
        </b-col>
        <b-col>
          <b-table hover :task="task"></b-table>
        </b-col>
        <b-col>
          <b-table hover :task="task">Done</b-table>
        </b-col>
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
      doing: [],
      todo: [],
      done: []
    };
  },
  beforeMount() {
    axios
      .post("http://localhost:3000/getdata")
      .then(response => {
        this.todo = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    doing() {
      axios
        .post("http://localhost:3000/getdata/doing")
        .then(response => {
          this.todo = response.data;
        })
        .catch(error => {
          console.log(error);
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
