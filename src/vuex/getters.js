export default {

    isAuthenticated: state => !!state.token,
    errors: state => state.error,
    userCredentials: state => state.authUser.credentials,
    screamList: state => state.screams,
    userLikes: state => state.authUser.likes,
    userNotifications: state => state.authUser.notifications,
    loadingUser: state => state.loading.user,
    loadingUI: state => state.loading.ui,
    loadingForm: state => state.loading.form,
    selectedScream: state => state.selectedScream.comments,
    unreadNotifications: state => {
        if(state.authUser.notifications) {
            const unread = state.authUser.notifications.filter(function(notification) {
                return notification.read === false
            })
        return !!unread.length
        }
    },
    userSelected: state => {
        if(state.dataUserSelected) {
            return state.dataUserSelected.user
        }
    }

}