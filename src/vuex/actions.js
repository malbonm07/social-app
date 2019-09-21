import axios from 'axios';
import Api from '../service/Api';

export default {

    // GET SCREAMS IN STATE
    GET_SCREAMS: async ({commit, dispatch}) => {
      const response = await Api().get('screams');
      const data = response.data;
      commit('SET_SCREAMS', data)
    },


    // LOGIN / REGISTRATION / LOGOUT / CLEAR ERRORS
    SIGN_IN: ({dispatch, commit}, {email, password}) => new Promise((resolve, reject) => {
      commit('SET_LOADING', { name: 'form', value: true});
      Api().post('login', { email, password })
      .then((res) => {
        const FBidToken = `Bearer ${res.data.token}`
        dispatch('AUTH_SUCCESS', FBidToken);
        dispatch('FETCH_AUTH_USER');
        commit('SET_LOADING', { name: 'form', value: false});
        resolve();
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data);
        commit('SET_LOADING', { name: 'form', value: false});
      })
    }),
    SIGN_UP: ({dispatch, commit}, formNewUser) => new Promise((resolve, reject) => {
      commit('SET_LOADING', { name: 'form', value: true});
      Api().post('signup', formNewUser)
      .then((res) => {
        const FBidToken = `Bearer ${res.data.token}`
        dispatch('AUTH_SUCCESS', FBidToken);
        dispatch('FETCH_AUTH_USER');
        commit('SET_LOADING', { name: 'form', value: false});
        resolve(res);
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data);
        commit('SET_LOADING', { name: 'form', value: false});
      })
    }),
    LOGOUT_USER: ({commit}) => new Promise((response) => {
      localStorage.removeItem('FBidToken');
      delete axios.defaults.headers.common['Authorization'];
      commit('SET_USER_UNAUTHENTICATED', {})
      response()
    }),
    AUTH_SUCCESS: ({commit}, FBidToken) => {
        localStorage.setItem('FBidToken', FBidToken)
        axios.defaults.headers.common['Authorization'] = FBidToken
        commit('SET_AUTHORIZATION', FBidToken);
    },
    AUTH_USER: ({ commit }, token) => {commit('SET_AUTHORIZATION', token)},
    CLEAR_ERROR: ({commit}) => commit('SET_CLEAR_ERROR'),


    // FETCH/GET USER AUTHTENTICATED
    FETCH_AUTH_USER: ({commit}) =>  {
      // commit('SET_LOADING', { name: 'user', value: true});
      Api().get('user')
      .then((res) => {
        commit('SET_AUTH_USER', res.data)
      })
      .catch((error) => {
      })
    },


    // EDIT AUTH USER PROFILE
    UPLOAD_IMAGE: ({commit, dispatch}, formData) => {
      Api().post('user/image', formData)
      .then((res) => {
        dispatch('FETCH_AUTH_USER')
      })
      .catch((error) => console.log(error))
    },
    EDIT_USER_DETAILS: ({dispatch, commit}, userDetails) => new Promise((resolve, err) => {
      commit('SET_LOADING', { name: 'form', value: true});
      Api().post('user', userDetails)
      .then((res) => {
        dispatch('FETCH_AUTH_USER');
        commit('SET_LOADING', { name: 'form', value: false});
        resolve(res)
      })
      .catch((error) => {
        commit('SET_LOADING', { name: 'form', value: false});
      })
    }),


    // USER INTERACTIONS
    LIKE_SCREAM: ({commit}, screamId) => {
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
    POST_NEW_SCREAM: ({commit}, newScream) => new Promise((response, reject) => {
      commit('SET_LOADING', { name: 'user', value: true});
      Api().post('scream', newScream)
      .then((res) => {
        commit('SET_NEW_SCREAM', res.data);
        commit('SET_LOADING', { name: 'user', value: false});
        response()
      })
      .catch((error) => {
        commit('SET_LOADING', { name: 'user', value: false});
      })
    }),
    DELETE_SCREAM: ({commit}, screamId) => new Promise((response) => {
        commit('SET_LOADING', { name: 'user', value: true});
        Api().delete(`scream/${screamId}/`)
        .then((res) => {
          commit('SET_DELETE_SCREAM', screamId);
          commit('SET_LOADING', { name: 'user', value: false});
          response();
        })
        .catch((error) => {
          commit('SET_LOADING', { name: 'user', value: false});
        })
    }),


    // SELECT A SCREAM
    GET_SCREAM: ({commit}, screamId) => new Promise((response, reject) => {
        commit('SET_LOADING', { name: 'user', value: true});
        Api().get(`scream/${screamId}/`)
        .then((res) => {
          commit('SET_SELECTED_SCREAM', res.data)
          commit('SET_LOADING', { name: 'user', value: false});
        })
        .catch((error) => {
          commit('SET_LOADING', { name: 'user', value: false});
        })
    }),


    // COMMENT IN SCREAM
    SUBMIT_COMMENT: ({commit}, commentData) => new Promise((response, reject) => {
        commit('SET_LOADING', { name: 'form', value: true});
        Api().post(`scream/${commentData.screamId}/comment`, commentData.comment)
        .then((res) => {
          commit('SET_IN_SELECTED_SCREAM_COMMENTS', res.data)
          commit('SET_LOADING', { name: 'form', value: false});
          response()
        })
        .catch((error) => {
          reject(error)
          commit('SET_LOADING', { name: 'form', value: false});
        })
    }),
    CLEAN_SELECTED_SCREAM: ({commit}) => commit('SET_CLEAN_SCREAM'),


    // NOTIFICATIONS
    MARK_NOTIFICATIONS: ({commit}, notificationId) => {
        Api().post('notifications', notificationId)
        .then(() => {
          commit('SET_NOTIFICATIONS', notificationId);
        })
        .catch((error) => {
          reject(error)
        })
    },
    

    // SELECT A USER NAME AND GET THE DATA TO SEE IN PROFILE USERS PAGE
    GET_USER: ({commit}, handle) => {
      commit('SET_LOADING', { name: 'ui', value: true});
        Api().get(`user/${handle}`)
        .then((res) => {
          commit('SET_DATA_USER_PROFILE', res.data)
          commit('SET_LOADING', { name: 'ui', value: false});
        })
        .catch((error) => {
          commit('SET_LOADING', { name: 'ui', value: false});
        })
    },

    
    // SET A PATH TO AUTHENTICATED/UNAUTHENTICATED USER BEFORE CREATE (LOGIN OR SIGNUP)
    TO_LAND: ({commit}, pathName) => {commit('SET_LAND', pathName)},
  }