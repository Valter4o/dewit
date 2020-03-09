import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  modules: {
    projects
  },

  getters: {
  },

  actions,

  mutations,
})
