import Vue from 'vue';
import Vuex from 'vuex';
import Api from './service/Api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screams: []
  },
  getters: {

  },
  mutations: {
    GET_SCREAMS: (state) => {
      Api().get('screams')
      .then((res) => {
        state.screams = res.data
        console.log(state.screams)
      })
    }
  },
  actions: {
    GET_SCREAMS: ({commit}) => commit('GET_SCREAMS')
  }
})
