import Vue from 'vue';
import Vuex from 'vuex';
import currentUser from './modules/currentUser';
import allUsers from './modules/allUsers';
import location from './modules/location';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        currentUser,
        allUsers,
        location
    },    
});
