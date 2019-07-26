<template>
  <div align="center">
    <form @submit.prevent="add">
        <input type="hidden" v-model="form.id" id="inputAdd">
        <input type="text" v-model="form.name" id="inputAdd">
        <v-btn type="submit" v-show="!updateSubmit">
          Adicionar
          <v-icon>add_circle_outline</v-icon>
        </v-btn>
        <v-btn v-show="updateSubmit" @click="update(form)">
          Alterar
          <v-icon>update</v-icon>
        </v-btn>
    </form>
    <br>
    <table border="1">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Aplicações</th>
        </tr>
        <tr v-for="user in users" :key="user.idd">
          <td><span>{{user.id}}</span> &#160;</td>
          <td><span>{{user.name}}</span> &#160;</td>
          <td>
            <v-icon @click="edit(user)">create</v-icon>
            <v-icon @click="del(user)">delete</v-icon>
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
/* eslint-disable */ 
import axios from 'axios'
export default {
  data(){
    return{
        form: {
          id: '',
          name: ''
        },
        users: '',
        updateSubmit: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://localhost:3000/users').then(res => {
        this.users = res.data
      }).catch ((err) => {
        console.log(err);
        
      })
    },
      add(){
      axios.post('http://localhost:3000/users/', this.form).then(res => {
          this.load()
          this.form.name = ''
      })
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id 
        this.form.name = user.name 
    },
    update(form){ 
       return axios.put('http://localhost:3000/users/' + form.id , {name: this.form.name}).then(res => {
        this.load()
        this.form.id = ''
        this.form.name = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
        
      })
    },
    del(user){
      axios.delete('http://localhost:3000/users/' + user.id).then(res =>{
          this.load()
          let index = this.users.indexOf(this.form.name)
          this.users.splice(index,1)
      })
    }
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
  width: 755px;
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
</style>