import { db } from "../config/firebase";
import Vue from "vue";
import API from "../services/API";
import { APIKey } from "../config/info";
import store from "../state/store";

const errorMsg =" An error occurred. try again later";

export const notify = ({type, msg}) => {
    Vue.$toast.open({
        message: msg,
        type: type,
        duration: 1000
    })
}

export const refreshCitiesResults = () => {
   const handleLoading = (val) => {
       store.dispatch("toggleKeys/mutateKeys", {key:"isLoading", val});
   }
   handleLoading(true);
    return new Promise((resolve, reject) => {
    db.collection("users").doc("dzN43wnwHdQCO691DyiR").
        get().then(data => {
            handleLoading(false);
            const receivedData = data.data();
            if(receivedData){ 
                const myCities = receivedData?.cities;
                if(myCities && myCities.length > 0){
                store.dispatch("savedResults/updateCities", myCities);
                const getCitiesInfo = async () => {
                    return Promise.all(myCities.map( async (city) => {
                        return await API().get(`data/2.5/weather?q=${ city }&units=imperial&appid=${ APIKey }`).then(res => {
                                    return res.data;
                                    }).catch(() => {
                                    handleLoading(false);
                                    reject([]);
                                    return '';
                        });
                    }));
                }
                    getCitiesInfo().then(finalResults => {
                        const stringifiedData = JSON.parse(JSON.stringify(finalResults));
                        store.dispatch("savedResults/updateResultList", stringifiedData );
                        resolve(stringifiedData);
                    });
                }else{
                    reject([]);
                    handleLoading(false);
                }
            }
        })
    })

}
export const updateParts = (prop, newVal) => {
    return new Promise((resolve, reject) => {
        if(prop && newVal && (typeof newVal === "object" ? Object.values(newVal).map(val => val !== undefined) :  true )){
           
                db.collection("users").doc("dzN43wnwHdQCO691DyiR")
                .update({
                    [prop] : newVal
                }).then(() => { 
                    refreshCitiesResults();
                    prop === "cities" && store.dispatch("savedResults/updateCities", newVal);
                    console.log("completed");
                    resolve();
                }).catch(err => {
                    notify({type: "error", msg: err.message || errorMsg});
                    reject();
                }) ;
        }else{
            notify({type: "error", msg: errorMsg});
            reject();
        }
    })


} 
export const addCity = (cityToAdd) => {
    return new Promise((resolve, reject) => {
        console.log(store.getters["savedResults/getCities"]);
        if(!store.getters["savedResults/getCities"].some(city => city.toLowerCase() === cityToAdd.toLowerCase())){
            API().get(`data/2.5/weather?q=${ cityToAdd }&units=imperial&appid=${ APIKey }`).then(() => {
                        db.collection("users").doc("dzN43wnwHdQCO691DyiR").
                        get().then(data => {
                            // gets data
                            console.log(data?.data());
                            let citiesCopy = JSON.parse(JSON.stringify(data?.data()?.cities));
                            let newArr = [...citiesCopy, cityToAdd];
                            newArr = [...new Set(newArr)];
                            updateParts("cities", newArr);
                            resolve();
                        }).catch(() => {
                            reject();
                        });   
            }).catch(() => {
                notify({type: "error", msg: "This city does not exist. Please make sure it was spelled correctly."});
            });
 
        }else{
            notify({type: "error", msg: "This city already added. Please add another different one."});
        }

    })
   
}




export const deleteCity = (name) => {
    db.collection("users").doc("dzN43wnwHdQCO691DyiR")
        .get().then(data => {
            const myCities = data.data()?.cities;
           const citiesCopy = JSON.parse(JSON.stringify(myCities));
           const index = citiesCopy.map( city => city.toLowerCase()).indexOf(name.toLowerCase());
           console.log(index, citiesCopy, name);
           if(index !== -1){
               
            citiesCopy.splice(index,1);
            updateParts("cities", citiesCopy);
           }else{
            console.log("ERR," , index);
            notify({type: "error", msg: errorMsg});
           }
        }).catch(err => {
            notify({type: "error", msg: err.message || errorMsg});
        })
}