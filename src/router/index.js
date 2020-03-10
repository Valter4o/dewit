import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import ProjectHome from '@/views/ProjectHome'
import TodoGroups from '@/views/TodoGroups'
import UsersList from '@/views/UsersList'
import TaskerMain from '@/views/TaskerMain'
import TodoList from '@/views/TodoList'

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
            path: '/todoGroups/:id',
            name: 'TodoGroups',
            component: TodoGroups,
            props: true
        },
        {
            path: '/users/:id',
            name: 'UsersList',
            component: UsersList,
            props: true
        },
        {
            path: '/tasker/:id',
            name: 'Tasker',
            component: TaskerMain,
            props: true
        },
        {
            path: '/todoList/:id',
            name: 'TodoList',
            component: TodoList,
            props: true
        }
    ]
})