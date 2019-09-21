import Vue from 'vue';

export default {
    // USER LOGIN/REGISTRATION/AUTH
    SET_AUTHORIZATION: (state, token) => {
        state.token = token
    },
    SET_AUTH_USER: (state, data) => {
        state.authUser = data;
    },
    SET_USER_UNAUTHENTICATED: (state, emptyData) => {
        state.authUser = emptyData;
        state.token = '';
    },

    // USER INTERACTIONS
    SET_LIKE: (state, data) => {
        const index = state.authUser.likes.length
        const likedScream = {
          screamId: data.screamId,
          userHandle: state.authUser.credentials.handle
        }
        Vue.set(state.authUser.likes, index, likedScream)
    },
    SET_UNLIKE: (state, data) => {
        const index = state.authUser.likes.findIndex(scream => scream.screamId === data.screamId);
        Vue.delete(state.authUser.likes, index)
    },
    
    // SCREAMS/POST
    SET_SCREAMS: (state, data) => {
      state.screams = data
    },
    SET_SCREAM: (state, data) => {
        const index = state.screams.findIndex(scream => scream.screamId === data.screamId)
        Vue.set(state.screams, index, data);
    },
    SET_NEW_SCREAM: (state, newScream) => {
        state.screams.unshift(newScream);
        state.loading.user = false;
    },
    SET_DELETE_SCREAM: (state, screamId) => {
        const index = state.screams.findIndex(scream => scream.screamId === screamId)
        Vue.delete(state.screams, index)
    },
    SET_CLEAN_SCREAM: (state) => state.selectedScream = {},
    SET_SELECTED_SCREAM: (state, scream) => state.selectedScream = scream,

    //NEW COMMENT IN A SCREAM
    SET_IN_SELECTED_SCREAM_COMMENTS: (state, commentData) => {
        const index = state.screams.findIndex(scream => scream.screamId === commentData.screamId);
        state.screams[index].commentCount += 1
        state.selectedScream.comments.unshift(commentData)
    },

    // LOADING/ERRORS
    SET_LOADING: (state, {name, value}) => state.loading[name] = value,
    SET_ERROR: (state, error) => state.error = error,
    SET_LAND: (state, pathName) => state.path = pathName,
    SET_CLEAR_ERROR: (state) => state.error = '',
    SET_MODAL: (state, {name, value}) => { state.modals[name] = value },

    //NOTIFICATIONS
    SET_NOTIFICATIONS: (state, notificationId) => {
      const index = state.authUser.notifications.findIndex(notification => notification.notificationId === notificationId[0]);
      state.authUser.notifications[index].read = true
    },

    // SET USER IN PROFILE PAGE
    SET_DATA_USER_PROFILE: (state, userData) => state.dataUserSelected = userData
}