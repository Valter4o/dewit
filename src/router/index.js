import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import TodoList from '../views/TodoList';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/todolist',
            component: TodoList
        }
    ],
    mode: 'history'
})