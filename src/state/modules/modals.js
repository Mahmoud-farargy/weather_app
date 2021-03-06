export const state = {
    modals: {
       addCity: false,
       share: false
    }
}

export const mutations = {
    toggleModal: (state, payload) =>{
        const { type, val } = payload;
        if(type === "closeAll" || type && (Object.keys(state.modals).map(key => key).indexOf(type) !== -1)){
            if(type === "closeAll"){
                Object.keys(state.modals).map( key => {
                    state.modals[key] = false;
                });
            }else{
                state.modals[type] =  (val !== undefined) ? val : !state.modals[type];
            }   
        }else {
            throw "type should be a valid key";
        }
    }
}

export const actions = {
    toggleModal(state, payload){
        state.commit("toggleModal", payload);
    }
}
export const getters = { 
    getModals: state => {
        return state.modals;
    }
}