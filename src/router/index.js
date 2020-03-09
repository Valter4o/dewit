import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import TodoList from '../views/TodoList';
import ProjectHome from '@/views/ProjectHome'

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
            path: '/projects/',
            component: ProjectHome,
            props: {

            }
        }
    ],
    mode: 'history'
})