export const state = {
    keys : {
        editCities: false,
        isDayWeather: false,
        isLoading: false,
        isFahrenheit: true,
    }
}
export const mutations = {
    mutateKeys: (state, payload) => {
        console.log(payload);
        const { key, val } = payload;
        if(key && (Object.keys(state.keys).map(el => el).indexOf(key) !== -1)){
            state.keys[key] = (val !== undefined) ? val : !state.keys[key];
        }
    }
}
export const actions = {
    mutateKeys: (state, payload) => {
        return state.commit("mutateKeys", payload);
    }
}
export const getters = {
    getKeys: state => {
        return state.keys;
    }
}