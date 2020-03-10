import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import ProjectHome from '@/views/ProjectHome'
import TodoGroups from '@/views/TodoGroups'
import UsersList from '@/views/UsersList'
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
            component: Home
        },
        {
            path: '/projects/:id',
            name: 'ProjectHome',
            component: ProjectHome,
            props: true
        },
        {
            path: '/todoList',
            name: 'TodoGroups',
            component: TodoGroups,
            props: true
        },
        {
            path: '/users',
            name: 'UsersList',
            component: UsersList,
            props: true
        },
        {
            path: '/tasker',
            name: 'Tasker',
            component: TaskerMain,
            props: true
        }
    ]
})