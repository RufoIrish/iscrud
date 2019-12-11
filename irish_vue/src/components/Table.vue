<template>
  <div>
    <hr />
    <h5
      style="font-style: oblique;color:#ad6e10"
    >"The key is not to prioritize what's on your schedule, but to schedule your priorities."</h5>
    <p style="font-style: oblique;color:#ad6e10">- Steven Covey</p>
    <router-link to="/Add">
      <b-button variant="success" id="add">Add Task</b-button>
    </router-link>
    <!-- <div id ="loading" style="display:none"><img src="https://www.tunerstop.com/public/images/loading.gif" alt=""></div> -->
    <b-button
      class="btn_history"
      @click.prevent="main = false,viewHistory = true"
      variant="primary"
      v-if="main"
    >View Done Task</b-button>

    <b-button
      class="btn_history"
      @click.prevent="viewHistory = false,main= true"
      variant="primary"
      v-else
    >To Do</b-button>
    <b-button
      style="margin-left:55%"
      class="btn_history"
      variant="danger"
      @click="loginPage"
      v-if="main"
    >Log Out</b-button>
    <b-container class="bv-example-row" id="table_todo" v-show="main">
      <b-row>
        <!-- <b-table hover :items="todo"></b-table> -->
        <table id="scrolldown" class="table table-striped">
          <thead>
            <th>Tasks</th>
            <th>Schedule</th>
            <th></th>
          </thead>
          <!-- <hr /> -->
          <tbody hover v-for="(item,i) in todo" :key="i" id="maintable">
            <tr v-if="item.done== 0">
              <td>{{item.task}}</td>
              <td>{{item.schedule}}</td>
              <td>
                <b-button
                  class="btn"
                  id="btn_doing"
                  @click.prevent="goingDone(item.id,item.task)"
                  variant="outline-success"
                >mark as done</b-button>&nbsp;
                <b-button
                  class="btn"
                  id="btn_doing"
                  @click.prevent="goingToDel(item.id,item.task,item.date)"
                  variant="outline-danger"
                >delete</b-button>&nbsp;
                <b-button
                  class="btn"
                  id="btn_doing"
                  @click.prevent="edit(item.id,item.task,item.schedule)"
                  variant="outline-primary"
                >Edit</b-button>&nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </b-row>
      <div>
        <b-modal v-model="delmodalShow" ok-only ok-variant="secondary" ok-title>
          Are you sure you want to delete {{task}} ?
          <br />
          <br />
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="del()"
            variant="outline-danger"
          >Delete</b-button>&nbsp;
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="delmodalShow = false"
            variant="outline-primary"
          >No</b-button>
        </b-modal>
      </div>
      <div>
        <b-modal v-model="doneStat" ok-only ok-variant="secondary" ok-title>
          Are you sure this task is done?
          <br />
          task: {{task}}
          <br />
          <br />
          <b-button
            style="width: 80px"
            class="btn"
            id="btn_doing"
            @click="done"
            @click.prevent="doneStat = false"
            variant="outline-danger"
          >Done</b-button>&nbsp;
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="doneStat = false"
            variant="outline-primary"
          >No</b-button>
        </b-modal>
      </div>
      <div>
        <b-modal v-model="updatemodalShow" ok-only ok-variant="secondary" ok-title>
          Are you sure you want to delete {{task}} ?
          <br />
          <br />
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="del()"
            variant="outline-danger"
          >Update</b-button>&nbsp;
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="updatemodalShow = false"
            variant="outline-primary"
          >No</b-button>
        </b-modal>
      </div>
      <div>
        <b-modal v-model="clearmodalShow" ok-only ok-variant="secondary" ok-title>
          Are you sure you want to clear done task ?
          <br />
          <br />
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="clear()"
            variant="outline-danger"
          >Clear</b-button>&nbsp;
          <b-button
            style="width: 60px"
            class="btn"
            id="btn_doing"
            @click.prevent="clearmodalShow = false"
            variant="outline-primary"
          >No</b-button>
        </b-modal>
      </div>
    </b-container>
    <div v-show="viewHistory">
      <span style="font-size:30px;margin-left:0%">Done</span>
      <b-button
        style="margin-left:30%;margin-buttom :1%"
        class="btn"
        id="btn_todo"
        @click="clearmodalShow = true"
        variant="danger"
      >CLEAR</b-button>
      <p></p>
      <div id="table_history">
        <table class="table table-striped">
          <tbody v-for="(item,i) in todo" :key="i" id="table">
            <tr v-if="item.done==1">
              <td>{{item.task}}</td>
              <span>
                <img
                  id="star"
                  src="https://graphiccave.com/wp-content/uploads/2015/03/Blue-Star-PNG.png"
                  alt
                />
              </span>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      todo: [],
      viewHistory: false,
      main: true,
      delmodalShow: false,
      updatemodalShow: false,
      id: "",
      task: "",
      date: "",
      clearmodalShow: false,
      doneStat: false,
      task1: "",
      schedule2: ""
    };
  },
  mounted() {
    axios
      .post("http://localhost:3000/getdata")
      .then(response => {
        // console.log(response);
        this.todo = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    goingDone(id, task) {
      (this.id = id), (this.task = task), (this.doneStat = true);
    },
    loginPage() {
      //  $("#loading").show() ``

      //  setTimeout(function() { $("#loading").hide(); }, 5000);
      this.$router.push("/");
    },
    done() {
      this.todo.map(task => {
        if (task.id == this.id) {
          if (task.done == 0) {
            task.done = 1;
          }
          // console.log(task);
          axios
            .post("http://localhost:3000/done", { done: task })
            .then(response => {
              axios
                .post("http://localhost:3000/getdata")
                .then(response => {
                  // console.log(response);
                  this.todo = response.data;
                })
                .catch(error => {
                  console.log(error);
                });
              // console.log("to do : ", this.todo);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    edit(id, task, schedule) {
      this.task1 = task;
      this.schedule2 = schedule;
      this.$router.push("/Add/" + id);
    },
    goingToDel(id, task, date) {
      (this.id = id),
        (this.task = task),
        (this.date = date),
        (this.delmodalShow = true);
    },
    del() {
      this.todo.map(task => {
        if (task.id == this.id) {
          if (task.delete == 0) {
            task.delete = 1;
          }
          // console.log(task);
          axios
            .post("http://localhost:3000/delete", { delete: task })
            .then(response => {
              axios
                .post("http://localhost:3000/getdata")
                .then(response => {
                  // console.log(response);
                  this.todo = response.data;
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
      this.delmodalShow = false;
    },
    clear(nickname) {
      axios
        .post("http://localhost:3000/clear", { name: nickname })
        .then(response => {
          axios
            .post("http://localhost:3000/getdata")
            .then(response => {
              // console.log(response);
              this.todo = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
      swal({
        title: "Deleted successfully!",
        // text: "You clicked the button!",
        icon: "success",
        button: "Thanks!"
      });
      this.clearmodalShow = false;
    }
  }
};
</script>
<style scoped>
#add {
  margin-right: 2%;
  padding: 10px;
  margin-top: 2%;
  margin-bottom: 2%;
}
.btn {
  padding: 3px;
}
#table_history {
  margin-right: 12%;
  margin-left: 12%;
  padding: 10px;
  margin-bottom: 2%;
  position: relative;
  height: 500px;
  overflow-x: hidden;
  /* overflow-y: auto; */
  height: 450px;
  overflow-y: scroll;
  /* border: 2px solid #f5d7e5; */
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
  /* overflow: hidden; */
  /* max-height: 600px */
}
#maintable {
  margin-right: 12%;
  margin-left: 12%;
  padding: 10px;
  margin-bottom: 2%;
  position: relative;
  height: 500px;
  overflow-x: hidden;
  /* overflow-y: auto; */
  height: 600px;
  overflow-y: scroll;
  /* border: 2px solid #f5d7e5; */
  -moz-box-shadow: 3px 3px 5px 6px #ccc;
  -webkit-box-shadow: 3px 3px 5px 6px #ccc;
  box-shadow: 3px 3px 5px 6px #ccc;
}
.btn_history {
  padding: 10px;
}
#star {
  height: 30px;
  width: auto;
}

/* table {
  margin-left: 9%;
  position: relative;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
} */


</style>