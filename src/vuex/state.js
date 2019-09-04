export default {
    loading: {
        user: false,
        form: false,
        ui: false,
    },
    error: null,
    path: '',
    token: localStorage.getItem('FBidToken') || '',
    screams: [],
    selectedScream: {},
    authUser: {},
    dataUserSelected: null
};