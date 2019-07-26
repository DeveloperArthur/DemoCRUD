import Home from './components/Home.vue';
import usuario from './components/usuario.vue';
import departamento from './components/departamento.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/usuario', component: usuario },
    { path: '/departamento', component: departamento }
];