import Vue from 'vue';
import Vuex from 'vuex';
import Api from './service/Api';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modals: {
      mainModal: false,
      editProfile: false,
      postComment: false
    },
    error: null,
    path: '',
    status: 'loading',
    token: localStorage.getItem('FBidToken') || '',
    screams: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    status: state => state.status,
    errors: state => state.error,
    userCredentials: state => state.user.credentials,
    screamList: state => state.screams.slice(0, 10),
    userLikes: state => state.user.likes,
    modals: state => state.modals
  },
  mutations: {
    SET_SCREAMS: (state, data) => {
      state.screams = data
      state.status = false
    },
    SET_AUTHORIZATION: (state, token) => {
      state.token = token
      state.status = false
    },
    SET_STATUS: (state, value) => {state.status = value},
    SET_USER: (state, data) => {
      state.user = data; 
      state.status = false;
    },
    SET_LAND: (state, pathName) => state.path = pathName,
    SET_ERROR: (state, error) => state.error = error,
    SET_USER_UNAUTHENTICATED: (state, emptyData) => {
      state.user = emptyData;
      state.token = '';
    },
    SET_SCREAM: (state, data) => {
      let index = state.screams.findIndex(scream => scream.screamId === data.screamId)
      Vue.set(state.screams, index, data);
    },
    SET_LIKE: (state, data) => {
      let index = state.user.likes.length
      let likedScream = {
        screamId: data.screamId,
        userHandle: state.user.credentials.handle
      }
      Vue.set(state.user.likes, index, likedScream)
    },
    SET_UNLIKE: (state, data) => {
      let index = state.user.likes.findIndex(scream => scream.screamId === data.screamId);
      Vue.delete(state.user.likes, index)
    },
    SET_MODAL: (state, {name, value}) => { state.modals[name] = value }
  },
  actions: {
    GET_SCREAMS: async ({commit, dispatch}) => {
      dispatch('STATUS', 'loading')
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
    LOGOUT_USER: ({commit}) => {
      localStorage.removeItem('FBidToken');
      delete axios.defaults.headers.common['Authorization'];
      commit('SET_USER_UNAUTHENTICATED', {})
    },
    FETCH_AUTH_USER: ({commit}) =>  {
      commit('SET_STATUS', 'loading');
      Api().get('user')
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((error) => {
      })
    },
    UPLOAD_IMAGE: ({commit, dispatch}, formData) => {
      Api().post('user/image', formData)
      .then((res) => {
        dispatch('FETCH_AUTH_USER')
      })
      .catch((error) => console.log(error))
    },
    AUTH_SUCCESS: ({commit}, FBidToken) => {
      localStorage.setItem('FBidToken', FBidToken)
      axios.defaults.headers.common['Authorization'] = FBidToken
      commit('SET_AUTHORIZATION', FBidToken);
    },
    EDIT_USER_DETAILS: ({dispatch}, userDetails) => new Promise((resolve, err) => {
      Api().post('user', userDetails)
      .then((res) => {
        dispatch('FETCH_AUTH_USER');
        resolve(res)
      })
      .catch((error) => console.log(error))
    }),
    AUTH_USER: ({ commit }, token) => {commit('SET_AUTHORIZATION', token)},
    STATUS: ({commit}, value) => {
      commit('SET_STATUS', value)
    },
    LIKE_SCREAM: ({dispatch,commit}, screamId) => {
      Api().get(`scream/${screamId}/like`)
      .then((res) => {
        commit('SET_SCREAM', res.data);
        commit('SET_LIKE', res.data);
      })
    },
    UNLIKE_SCREAM: ({commit}, screamId) => {
      Api().get(`scream/${screamId}/unlike`)
      .then((res) => {
        commit('SET_SCREAM', res.data);
        commit('SET_UNLIKE', res.data);
      })
    },
    TO_LAND: ({commi}, pathName) => {commit('SET_LAND', pathName)},
    TOGGLE_MODAL_STATE: ({commit}, {name, value}) => commit('SET_MODAL', {name, value})
  }
})
