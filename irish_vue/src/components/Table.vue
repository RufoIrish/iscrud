<template>
  <div>
      <router-link to= '/Add'> <b-button variant = "success"> Add </b-button> </router-link>
    <b-table hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          age: 89,
          first_name: "Irish",
          last_name: "Rufo"
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
