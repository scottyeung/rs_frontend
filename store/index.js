import Vuex from 'vuex'
  
const createStore = () => {
  return new Vuex.Store({
    state: {
      siteInfo: [],
      projects: [],
      showMenu: false
    },
    getters: {
      // GET_FILTERACTIVE: (state) => (filtervalue) => {
      //   const trueorfalse = _.includes(state.filtervalue, filtervalue)
      //   return trueorfalse
      // },
    },
    actions: {

      // Get Index Files
      async getSiteInfo ({ commit }) {
        const info = await this.$axios.$get('http://localhost:8888/rest/site')
        commit('setSiteInfo', info)
      },

      async getProjectDetails({ commit, state }) {
        
        for (let i = 0; i < state.projects.data.length; i++) {
          let id = state.projects.data[i].id
          id = id.replace("/", "+")
          const project = await this.$axios.$get('http://localhost:8888/rest/pages/' + id)
          commit('setProjectDetails', project)
        }
      },

      async getProjects({ commit, dispatch }) {
        const projects = await this.$axios.$get('http://localhost:8888/rest/pages/projects/children')
        commit('setProjects', projects)
        await dispatch ('getProjectDetails')
      },
      
      //Nuxt Server Init
      async nuxtServerInit ({ commit, dispatch }) {
        await dispatch ('getSiteInfo')
        await dispatch ('getProjects')
      }
    },
    mutations: {
      // Set Index files
      setSiteInfo: (state, info) => {
        state.siteInfo = info.data
      },
      // Set Projects
      setProjects: (state, projects) => {
        state.projects = projects
      },
      // Set Projects
      setProjectDetails: (state, project) => {
        state.projects.data[project.data.num - 1] = project.data
      },

      changeMenu: (state, bool) => {
        state.showMenu = bool
      }
    }
  })
}

export default createStore
