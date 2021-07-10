export const state = {
    resultList: [],
    cities: []
}

export const mutations = {
    updateResultList(state, payload) {
        state.resultList = payload;
    },
    updateCities(state, payload) {
        state.cities = payload;
    }
}

export const actions = {
    updateResultList(state, payload) {
        state.commit("updateResultList", payload);
    },
    updateCities(state, payload) {
        state.commit("updateCities", payload);
    }
}

export const getters = {
    getResultList: state => {
        return state.resultList;
    },
    getCities: state => {
        return state.cities;
    }
}