export const state = {
    resultList: [],
    cities: [],
    currentCityTimezone: "",
    resultsCopy: []
}

export const mutations = {
    updateResultList(state, payload) {
        state.resultList = payload;
    },
    updateCities(state, payload) {
        state.cities = payload;
    },
    updateTimezone: (state, payload) => {
        state.currentCityTimezone = payload;
    },
    updateResultsCopy: (state, payload) => {
        state.resultsCopy = payload;
    },
}

export const actions = {
    updateResultList(state, payload) {
        state.commit("updateResultList", payload);
    },
    updateCities(state, payload) {
        state.commit("updateCities", payload);
    },
    updateTimezone:  ({commit}, payload) => {
        commit("updateTimezone", payload);
    },
    updateResultsCopy: ({commit}, payload) => {
        commit("updateResultsCopy", payload);
    }
}

export const getters = {
    getResultList: state => {
        return state.resultList;
    },
    getCities: state => {
        return state.cities;
    },
    getCityTimezone: state => {
        return state.currentCityTimezone;
    },
    getResultsCopy: state => {
        return state.resultsCopy;
    }
}