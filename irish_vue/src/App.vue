<template>
  <div id="app">
    <hr>
    <!-- <div id="nav"> -->
      <router-link to="/"></router-link>
      <!-- <router-link to="/about">About</router-link> -->
      <!-- <hr /> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  components: {}
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0%;
  background-image: url("http://papers.co/wallpaper/papers.co-az51-dessert-minimal-orange-illustration-art-pink-34-iphone6-plus-wallpaper.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: #f5d7e5; */
  height: 100vh;
}
#nav{
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4C6Yx_bsevZ7fEjas8flRkhIszAA0ykx2eVBARv1kaNCGVtJc");
}
</style>

