<template>
    <div align="center">
    <h1>Tela de Usuario</h1>
    <br>
    <form @submit.prevent="add">
        <input type="hidden" v-model="form.id" id="inputAdd">
        <input type="text" v-model="form.name" id="inputAdd" placeholder="Digite o nome" style="width:200px; height:34px;">
        <input type="date" v-model="form.data" id="inputAdd" style="width:177px; height:34px;">
        <input type="email" v-model="form.email" id="inputAdd" placeholder="Digite o email" style="width:200px; height:34px;">
        <select v-model="form.departamento" style="width:177px; height:34px;">
            <option value="">Departamento</option>
            <option v-for="departamento in departamentos">{{departamento.departamento}}</option>
        </select>
        <v-btn type="submit" v-show="!updateSubmit">
          Adicionar
          <v-icon>add_circle_outline</v-icon>
        </v-btn>
        <v-btn v-show="updateSubmit" @click="update(form)">
          Alterar
          <v-icon>update</v-icon>
        </v-btn>
    </form>
    <h3 style="color: red; font-size: 15px">
      <strong>{{erro}}</strong>
    </h3>
    <br>
    <table border="1">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Data de cadastro</th>
          <th>Email</th>
          <th>Departamento</th>
          <th>Ações</th>
        </tr>
        <tr v-for="user in users" :key="user.idd">
          <td><span>{{user.id}}</span> &#160;</td>
          <td><span>{{user.name}}</span> &#160;</td>
          <td><span>{{user.data}}</span> &#160;</td>
          <td><span>{{user.email}}</span> &#160;</td>
          <td><span>{{user.departamento}}</span> &#160;</td>
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
          name: '',
          data: '',
          email: '',
          departamento: ''
        },
        users: '',
        updateSubmit: false,
        erro: '',
        departamentos: ''
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
        axios.get('http://localhost:3000/departamentos').then(res => {
            this.departamentos = res.data
        }).catch ((err) => {
            console.log(err);
        })
    },
    add(){
      if(this.form.name.length == '' || this.form.data.length == '' || this.form.email.length == '' || this.form.departamento.length == ''){
        this.erro = "Preencha todos os campos";
      }else{
        this.erro = '';
        axios.post('http://localhost:3000/users/', this.form).then(res => {
          this.load()
          this.form.name = ''
          this.form.data = ''
          this.form.email = ''
          this.form.departamento = ''
        })
      }
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id 
        this.form.name = user.name
        this.form.data = user.data
        this.form.email = user.email
        this.form.departamento = user.departamento
    },
    update(form){ 
        return axios.put('http://localhost:3000/users/' + form.id , {
           name: this.form.name,
           data: this.form.data,
           email: this.form.email,
           departamento: this.form.departamento
        }).then(res => {
            this.load()
            this.form.id = ''
            this.form.name = ''
            this.form.data = ''
            this.form.email = ''
            this.form.departamento = ''
            this.updateSubmit = false
            alert("Usuário alterado");
        }).catch((err) => {
            console.log(err);
        })
    },
    del(user){
      if(confirm("Tem certeza que deseja deletar este usuário?")){
        axios.delete('http://localhost:3000/users/' + user.id).then(res =>{
            this.load()
            let index = this.users.indexOf(this.form.name)
            this.users.splice(index,1)
        })
      }
    }
  }
}
</script>