import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import projects from './modules/projects'
import todoGroups from './modules/todoGroups'
import tasker from './modules/tasker'
import auth from './modules/auth'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  modules: {
    projects,
    todoGroups,
    tasker,
    auth,
    user
  },

  getters: {
  },

  actions,

  mutations,
})
