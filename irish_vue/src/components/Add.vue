<template>
<div>
  <b-form >
    <b-input type="number" id="age" placeholder="Age"></b-input>
    <b-input type="text" id="firstname" placeholder="first name"></b-input>
    <b-input type="text" id="lastname" placeholder="last name"></b-input>
   </b-form>
     <button v-on:click="counter += 1">Add 1</button>
</div>
</template>