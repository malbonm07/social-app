import Vue from 'vue';
import Vuex from 'vuex';
import Api from './service/Api';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    path: '',
    status: null,
    token: localStorage.getItem('FBidToken') || '',
    authId: false,
    screams: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    status: state => state.status
  },
  mutations: {
    SET_SCREAMS: (state, data) => {state.screams = data},
    AUTH_SUCCESS: (state, token) => {
      state.authUser = true
      state.token = token
    },
    SET_STATUS: (state, value) => {state.status = value},
    SET_AUTH_USER: (state, decodedToken) => state.authId = decodedToken.user_id,
    SET_USER: (state, data) => state.user = data,
    SET_LAND: (state, pathName) => state.path = pathName
  },
  actions: {
    GET_SCREAMS: async ({commit}) => {
      const response = await Api().get('screams');
      const data = response.data;
      commit('SET_SCREAMS', data)
    },
    SIGN_IN: ({context, commit}, {email, password}) => new Promise((resolve, reject) => {
      Api().post('login', { email, password })
      .then((res) => {
        localStorage.setItem('FBidToken', `Bearer ${res.data.token}`)
        axios.defaults.headers.common['Authorization'] = res.data.token
        commit('AUTH_SUCCESS', res.data.token);
        commit('SET_USER', res.data)
        resolve();
      })
      .catch((error) => {
        reject(error)
      })
    }),
    SIGN_UP: ({context, commit}, formNewUser) => new Promise((resolve, reject) => {
      Api().post('signup', formNewUser)
      .then((res) => {
        localStorage.setItem('FBidToken', `Bearer ${res.data.token}`);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
    }),
    FETCH_AUTH_USER: ({commit}) =>  {
      Api().get('/user')
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    AUTH_USER: ({ commit }, decodedToken) => {commit('SET_AUTH_USER', decodedToken)},
    STATUS: ({commit}, value) => {
      commit('SET_STATUS', value)
    },
    TO_LAND: ({commi}, pathName) => {commit('SET_LAND', pathName)}
  }
})
