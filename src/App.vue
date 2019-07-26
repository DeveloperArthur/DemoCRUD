<template>
  <div id="app">
    <app-home></app-home>
    <h1 align="center">CRUD com API REST + Vue.js + Axios + Vuetify + Vue Router</h1>
    <br>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import home from './components/home.vue';

export default {
  components:{
    AppHome: home
  }  
}
</script>


<style>
table {
  width: 70%;
  font-size: 20px;
  border: 1px solid black;
  border-collapse: collapse;
}
input {
  width: 295px;
  border: 1px solid black
}
#inputAdd {
  height: 30px;
  border: 1px solid black
}
select{
  height: 30px;
  border: 1px solid black
}
body{
  background-color: white;
  font-family: Helvetica, Arial, sans-serif;
  margin: 0;
}

*{
  font-size: 20px;
}

header{
    background-color: #0040FF;
    display: flex;
    flex-direction: column;
}
header ul li { 
  display: inline;
}
header ul li a:hover {
  background-color:#2E9AFE;
  color: black;
  border-bottom:3px solid #EA0000;
}
a{
  font-size: 25px;
  border: 2px solid white;
  color: white
}
</style>
