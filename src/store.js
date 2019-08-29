import Vue from 'vue';
import Vuex from 'vuex';
import Api from './service/Api';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: null,
    token: localStorage.getItem('token') || '',
    authUser: false,
    screams: []
  },
  getters: {
    isLoggedIn: state => !!state.token,
    status: state => state.status
  },
  mutations: {
    SET_SCREAMS: (state, data) => {state.screams = data},
    AUTH_SUCCESS(state, token) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    SET_STATUS: (state, value) => {state.status = value}
  },
  actions: {
    GET_SCREAMS: async ({commit}) => {
      const response = await Api().get('screams');
      const data = response.data;
      commit('SET_SCREAMS', data)
    },
    SIGN_IN: (context, {email, password}) => Api().post('login', { email, password })
    .then((res, reject) => {
      localStorage.setItem('FBidToken', `Bearer ${res.data.token}`)
      axios.defaults.headers.common['Authorization'] = res.data.token
      commit('AUTH_SUCCESS', res.data.token);
      resolve(res);
    }),
    SIGN_UP: ({context, commit}, formNewUser) => new Promise((resolve, reject) => {
      Api().post('signup', formNewUser)
      .then((res) => {
        localStorage.setItem('FBidToken', `Bearer ${res.data.token}`);
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
    }),
    STATUS: ({commit}, value) => {
      commit('SET_STATUS', value)
    }
  }
})
