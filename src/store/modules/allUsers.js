import axios from "@/plugins/axios";

const state = {
    users: {},
};

const getters = {

};
const actions = {
    setUsers(context) {
        context.commit('fetchUsers');
    },
    saveUser(context, user) {
        context.commit('insert', user);
    },
    updateUser(context, data) {
        context.commit('update', data);
    },
    deleteUser(context, data) {
        context.commit('delete', data);
    },
};
const mutations = {
    fetchUsers(state) {
        axios.get('/users').
            then((result) => {
                if (result.status == 200) {
                    state.users = result.data;
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    insert(state, user) {
        axios
            .post('/user', user).then((result) => {
                if (result.status == 200) {
                    state.users.unshift(result.data.user);
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    update(state, data) {
        axios
            .post('/user/' + data.id, data.formData).then((result) => {
                if (result.status == 200) {
                    Object.assign(state.users[data.index], result.data.user);
                    localStorage.setItem('testl8_auth_user', JSON.stringify(result.data.user));
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    delete(state, data) {
        axios
            .delete('/user/' + data.id).then((result) => {
                if (result.status == 200) {
                    state.users.splice(data.index, 1);
                }
            }).catch((err) => {
                console.log(err);
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}