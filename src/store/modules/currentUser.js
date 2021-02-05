import axios from "@/plugins/axios";

const state = {
    user: {}
};
const getters = {
    // eslint-disable-next-line no-unused-vars
    isUserLoggedIn(state, _getters) {
        return state.user !== null;
    },
};
const actions = {
    loginUser(context, user) {
        context.commit('authenticateUser', user);
    },
    setLoggedInUser(context) {
        context.commit('setLoggedInUser');
    },
    logout(context) {
        context.commit('logoutUser');
    },
};
const mutations = {
    // eslint-disable-next-line no-unused-vars
    authenticateUser(_state, user) {
        axios.post('user/login', {
            email: user.email,
            password: user.password,
        }).then((result) => {
            console.log(result);
            if (result.data.token) {
                localStorage.setItem('testl8_auth_token', result.data.token)
                localStorage.setItem('testl8_auth_user', JSON.stringify(result.data.user));
                window.location.replace('/dashboard');
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    setLoggedInUser(state) {
        console.log('setLoggedInUser');
        state.user = JSON.parse(localStorage.getItem('testl8_auth_user'));
    },
    logoutUser(state) {
        // eslint-disable-next-line no-unused-vars
        axios.get('/logout');
        localStorage.clear();
        state.state = {};
        window.location.replace('/login');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}