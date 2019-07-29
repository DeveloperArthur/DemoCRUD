<template>
    <div align="center">
        <v-icon large>business_center</v-icon>
        <h1>Tela de Departamento</h1>
        <br>
        <form @submit.prevent="add">
            <input type="hidden" v-model="form.id" id="inputAdd">
            <input type="text" v-model="form.departamento" id="inputAdd" placeholder="Digite o departamento">
            <input type="text" v-model="form.descricao" id="inputAdd" placeholder="Digite a descrição">
            <v-btn type="submit" v-show="!updateSubmit">
                <v-icon large>add_circle_outline</v-icon>
            </v-btn>
            <v-btn v-show="updateSubmit" @click="update(form)">
                <v-icon large>update</v-icon>
            </v-btn>
        </form>
        <h3 style="color: red; font-size: 15px">
            <strong>{{erro}}</strong>
        </h3>
        <br>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Departamento</th>
                <th>Descrição</th>
                <th>Ações</th>
            </tr>
            <tr v-for="departament in departamentos" :key="departament.idd">
            <td><span>{{departament.id}}</span> &#160;</td>
            <td><span>{{departament.departamento}}</span> &#160;</td>
            <td><span>{{departament.descricao}}</span> &#160;</td>
            <td>
                <v-icon @click="edit(departament)">create</v-icon>
                <v-icon @click="del(departament)">delete</v-icon>
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
          departamento: '',
          descricao: ''
        },
        departamentos: '',
        updateSubmit: false,
        erro: '',
        users: '',
        UsuariosVinculados: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://localhost:3000/departamentos').then(res => {
            this.departamentos = res.data
        }).catch ((err) => {
            console.log(err);
        })
        axios.get('http://localhost:3000/users').then(res => {
            this.users = res.data
        }).catch ((err) => {
            console.log(err);
        })
    },
    add(){
      if(this.form.descricao.length == '' || this.form.descricao.length == ''){
        this.erro = "Preencha todos os campos";
      }else{
        this.erro = '';
        axios.post('http://localhost:3000/departamentos/', this.form).then(res => {
          this.load()
          this.form.departamento = ''
          this.form.descricao = ''
        })
      }
    },
    edit(departament){ 
        this.updateSubmit = true
        this.form.id = departament.id 
        this.form.departamento = departament.departamento
        this.form.descricao = departament.descricao
    },
    update(form){ 
        return axios.put('http://localhost:3000/departamentos/' + form.id , {
           departamento: this.form.departamento,
           descricao: this.form.descricao
        }).then(res => {
            this.load()
            this.form.id = ''
            this.form.departamento = ''
            this.form.descricao = ''
            this.updateSubmit = false
            alert("Usuário alterado");
        }).catch((err) => {
            console.log(err);
        })
    },
    del(departament){
        this.verificaSeTemUsuariosVinculados(departament);
        if(this.UsuariosVinculados){
            alert('ERRO: Usuarios estao vinculados a este departamento');
        }else if(confirm("Tem certeza que deseja deletar este usuário?")){
            axios.delete('http://localhost:3000/departamentos/' + departament.id).then(res =>{
                this.load()
                let index = this.departamentos.indexOf(this.form.name)
                this.departamentos.splice(index,1)
            })
        }
    },
    verificaSeTemUsuariosVinculados(departament){
        for(var i = 0; i < this.users.length; i++){
            try{
                if(this.users[i].departamento == departament.departamento){
                    return this.UsuariosVinculados = true;
                }
            }catch(e){
                console.log('Nao existe nenhum usuario cadastrado com este departamento, eh possivel realizar a exclusão! '+e)
            }
        }
        return this.UsuariosVinculados = false;
    }
  }
}
</script>