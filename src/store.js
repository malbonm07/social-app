import Vue from 'vue';
import Vuex from 'vuex';
import Api from './service/Api';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    path: '',
    status: null,
    token: localStorage.getItem('FBidToken') || '',
    authId: false,
    screams: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    status: state => state.status,
    errors: state => state.error
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
    SET_LAND: (state, pathName) => state.path = pathName,
    SET_ERROR: (state, error) => state.error = error
  },
  actions: {
    GET_SCREAMS: async ({commit}) => {
      const response = await Api().get('screams');
      const data = response.data;
      commit('SET_SCREAMS', data)
    },
    SIGN_IN: ({context, dispatch, commit}, {email, password}) => new Promise((resolve, reject) => {
      commit('SET_STATUS', 'loading');
      Api().post('login', { email, password })
      .then((res) => {
        let FBidToken = `Bearer ${res.data.token}`
        localStorage.setItem('FBidToken', FBidToken)
        axios.defaults.headers.common['Authorization'] = FBidToken
        commit('AUTH_SUCCESS', res.data.token);
        dispatch('FETCH_AUTH_USER');
        commit('SET_STATUS', false);
        resolve();
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data);
        commit('SET_STATUS', false);
      })
    }),
    SIGN_UP: ({context, commit}, formNewUser) => new Promise((resolve, reject) => {
      commit('SET_STATUS', 'loading');
      Api().post('signup', formNewUser)
      .then((res) => {
        localStorage.setItem('FBidToken', `Bearer ${res.data.token}`);
        axios.defaults.headers.common['Authorization'] = res.data.token;
        commit('SET_STATUS', false);
        resolve(res);
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data);
        commit('SET_STATUS', false);
      })
    }),
    FETCH_AUTH_USER: ({commit}) =>  {
      Api().get('user')
      .then((res) => {
        console.log(res)
        commit('SET_USER', res.data)
      })
      .catch((error) => {
      })
    },
    AUTH_USER: ({ commit }, decodedToken) => {commit('SET_AUTH_USER', decodedToken)},
    STATUS: ({commit}, value) => {
      commit('SET_STATUS', value)
    },
    TO_LAND: ({commi}, pathName) => {commit('SET_LAND', pathName)}
  }
})
