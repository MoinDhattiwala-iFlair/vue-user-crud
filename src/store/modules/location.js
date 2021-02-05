import axios from '@/plugins/axios'
const state = {
    country: [],
    state: [],
    city: [],
};

const getters = {

};

const actions = {
    setCountry(context) {
        context.commit('fetchCountry');
    },
    setState(context, id) {
        context.commit('fetchState', id);
    },
    setCity(context, id) {
        context.commit('fetchCity', id);
    }
};

const mutations = {
    fetchCountry(state) {
        axios.get('/country')
            .then((result) => {
                if (result.status == 200) {
                    state.country = result.data
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    fetchState(state, id) {
        axios.get('/state/' + id)
            .then((result) => {
                if (result.status == 200) {
                    state.state = result.data
                }
            }).catch((err) => {
                console.log(err);
            });
    },
    fetchCity(state, id) {
        axios.get('/city/' + id)
            .then((result) => {
                if (result.status == 200) {
                    state.city = result.data
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