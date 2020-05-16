import Home from '@/views/Home'
import ProjectHome from '@/views/ProjectHome'
import TaskerMain from '@/views/TaskerMain'
import { authenticationGuard } from './guards'

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      name: 'Home',
    },
    {
      path: '/projects/:id',
      name: 'ProjectHome',
      component: ProjectHome,
      props: true,
      beforeEnter: authenticationGuard,
    },

    {
      path: '/tasker/:id',
      name: 'Tasker',
      component: TaskerMain,
      props: true,
      beforeEnter: authenticationGuard,
    },
  ],
}
