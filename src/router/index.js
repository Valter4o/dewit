import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import ProjectHome from '@/views/ProjectHome'
import TaskerMain from '@/views/TaskerMain'

Vue.use(Router);
// component: () => import(/*webpackChunkName:projectHome*/'./views/ProjectHome'),

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home,
            name: 'Home'
        },
        {
            path: '/projects/:id',
            name: 'ProjectHome',
            component: ProjectHome,
            props: true
        },

        {
            path: '/tasker/:id',
            name: 'Tasker',
            component: TaskerMain,
            props: true
        },
    ]
})