<template>
  <div>
    <form @submit.prevent="add">
        <input type="hidden" v-model="form.id">
        <input type="text" v-model="form.name">
        <button type="submit" v-show="!updateSubmit">add</button>  
        <button type="button" v-show="updateSubmit" @click="update(form)">Update</button> 
    </form>
    <ul v-for="user in users" :key="user.idd">
      <li>
      <span>{{user.name}}</span> &#160;
      <button @click="edit(user)">Edit</button> ||  <button @click="del(user)">Delete</button>
      </li>
    </ul>
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
          let index = this.users.indexOf(form.name)
          this.users.splice(index,1)
      })
    }
  }
}
</script>
