<template>
  <div>
    <router-link to="/Add">
      <b-button variant="success" id="add">Add Task</b-button>
    </router-link>
    <b-button
      class="btn"
      id="btn_history"
      @click="main = false,viewHistory = true"
      variant="primary"
      v-if="main"
    >View Done Task</b-button>

    <b-button
      class="btn"
      id="btn_todo"
      @click="viewHistory = false,main= true"
      variant="primary"
      v-else
    >To Do</b-button>
    <b-container class="bv-example-row" id="table_todo" v-show="main">
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
            <tr v-if="item.done== 0">
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
    <div id="table_history" v-show="viewHistory">
      <table class="table table-striped">
        <thead>
          <th>Done</th>
          <th>
            <b-button class="btn" id="btn_todo" @click="clear" variant="danger">CLEAR</b-button>
          </th>
        </thead>
        <tbody v-for="(item,i) in todo" :key="i">
          <tr v-if="item.done==1">
            <td>{{item.task}}</td>
            <span>
              <img
                id="star"
                src="https://graphiccave.com/wp-content/uploads/2015/03/Blue-Star-PNG.png"
                alt
              >
            </span>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script   src="https://code.jquery.com/jquery-3.4.1.slim.min.js"   integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="   crossorigin="anonymous"></script>
<script>
import axios from "axios";
export default {
  data() {
    return {
      todo: [],
      viewHistory: false,
      main: true
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
          if (task.done == 0) {
            task.done = 1;
          }
          console.log(task);
          axios
            .post("http://localhost:3000/done", { done: task })
            .then(response => {
              this.todo = response.data;
              console.log("to do : ", this.todo);
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
      axios
        .post("http://localhost:3000/delete",{task: id})
        .then(response => {
          this.todo = response.data;
          // this.getdata();
        })
        .catch(error => {
          console.log(error);
        });
    },
    clear() {
      axios
        .post("http://localhost:3000/clear")
        .then(response => {
          this.todo = response.data;
          // this.getdata();
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
  margin-right: 10%;
  padding: 10px;
  margin-top: 2%;
  margin-bottom: 2%;
}
.btn {
  padding: 3px;
}
#table_history {
  /* margin-top: 20%; */
  margin-right: 12%;
  margin-left: 12%;

  padding: 10px;
  margin-bottom: 2%;
}
#btn_history {
  padding: 10px;
}
#star {
  height: 20px;
  width: auto;
}
</style>