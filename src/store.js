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
    screams: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    status: state => state.status,
    errors: state => state.error,
    userCredentials: state => state.user.credentials
  },
  mutations: {
    SET_SCREAMS: (state, data) => {state.screams = data},
    SET_AUTHORIZATION: (state, token) => {
      state.token = token
    },
    SET_STATUS: (state, value) => {state.status = value},
    SET_USER: (state, data) => state.user = data,
    SET_LAND: (state, pathName) => state.path = pathName,
    SET_ERROR: (state, error) => state.error = error,
    SET_USER_UNAUTHENTICATED: (state, emptyData) => {
      state.user = emptyData;
      state.token = '';
    }
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
        dispatch('AUTH_SUCCESS', FBidToken);
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
        let FBidToken = `Bearer ${res.data.token}`
        commit('AUTH_SUCCESS', FBidToken);
        commit('SET_STATUS', false);
        resolve(res);
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data);
        commit('SET_STATUS', false);
      })
    }),
    LOGOUT_USER: ({commi}) => {
      localStorage.removeItem('FBidToken');
      delete axios.defaults.headers.common['Authorization'];
      commit('SET_USER_UNAUTHENTICATED', {})
    },
    FETCH_AUTH_USER: ({commit}) =>  {
      Api().get('user')
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((error) => {
      })
    },
    AUTH_SUCCESS: ({commit}, FBidToken) => {
      localStorage.setItem('FBidToken', FBidToken)
      axios.defaults.headers.common['Authorization'] = FBidToken
      commit('SET_AUTHORIZATION', FBidToken);
    },
    AUTH_USER: ({ commit }, token) => {commit('SET_AUTHORIZATION', token)},
    STATUS: ({commit}, value) => {
      commit('SET_STATUS', value)
    },
    TO_LAND: ({commi}, pathName) => {commit('SET_LAND', pathName)}
  }
})
