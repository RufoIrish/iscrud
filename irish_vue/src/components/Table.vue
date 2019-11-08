<template>
  <div>
      <router-link to= '/Add'> <b-button variant = "success"> Add </b-button> </router-link>
    <b-table hover :items="items"></b-table>
  </div>
</template>
<script   src="https://code.jquery.com/jquery-3.4.1.slim.min.js"   integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="   crossorigin="anonymous"></script>
<script>
export default {
  data() {
    return {
      items: [
        {
          age: 89,
          first_name: "",
          last_name: ""
        //   _rowVariant: "danger"
        },
        {
          age: 40,
          first_name: "ddfd",
          last_name: "fdfdf",    
        //   _cellVariants: { age: "info", first_name: "warning" }
        },
        { age: 29, first_name: "dfdf", last_name: "df" }
      ]
    };
  }
};
</script>
