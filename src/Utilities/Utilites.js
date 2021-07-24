import { db } from "../config/firebase";
import Vue from "vue";
import API from "../services/API";
import { APIKey } from "../config/info";
import store from "../state/store";

const errorMsg = " An error occurred. try again later";
const handleLoading = (key, val) => {
  store.dispatch("toggleKeys/mutateKeys", { key, val });
};
export const generateNewId = () =>
  `${Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 20)}_${Math.random() * 10}`;
export const notify = ({ type, msg }) => {
  Vue.$toast.open({
    message: msg,
    type: type,
    duration: 5000,
    pauseOnHover: true,
  });
};
export const confirmDialog = ({ msg, buttonLabels, confirmedFunc }) => {
  Vue.$confirm({
    message: msg || "Are you sure?",
    button: {
      no: buttonLabels?.no || "No",
      yes: buttonLabels?.yes || "Yes",
    },
    callback: (confirm) => {
      if (confirm) {
        confirmedFunc();
      }
    },
  });
};

export const refreshCitiesResults = () => {
  handleLoading("isLoading", true);
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc("dzN43wnwHdQCO691DyiR")
      .get()
      .then((data) => {
        handleLoading("isLoading", false);
        const receivedData = data.data();
        if (receivedData) {
          const myCities = receivedData?.cities;
          if (myCities) {
            store.dispatch("savedResults/updateCities", myCities);
            const getCitiesInfo = async () => {
              return Promise.all(
                myCities.map(async (city) => {
                  return await API()
                    .get(
                      `data/2.5/weather?q=${city.cityName}&units=imperial&appid=${APIKey}`
                    )
                    .then((res) => {
                      return res.data;
                    })
                    .catch(() => {
                      handleLoading("isLoading", false);
                      reject([]);
                      return "";
                    });
                })
              );
            };
            getCitiesInfo()
              .then((finalResults) => {
                const stringifiedData = JSON.parse(
                  JSON.stringify(finalResults)
                );
                store.dispatch(
                  "savedResults/updateResultList",
                  stringifiedData
                );
                store.dispatch(
                  "savedResults/updateResultsCopy",
                  stringifiedData
                );
                resolve(stringifiedData);
              })
              .catch(() => {
                notify({
                  type: "error",
                  msg:
                    "Failed to fetch data. This might be because your requests limit has been expired. If that's the case, then come back tommorrow.",
                });
              });
          } else {
            reject([]);
            handleLoading("isLoading", false);
          }
        }
      });
  });
};
export const updateParts = (prop, newVal) => {
  return new Promise((resolve, reject) => {
    if (
      prop &&
      newVal &&
      (typeof newVal === "object"
        ? Object.values(newVal).map((val) => val !== undefined)
        : true)
    ) {
      db.collection("users")
        .doc("dzN43wnwHdQCO691DyiR")
        .update({
          [prop]: newVal,
        })
        .then(() => {
          refreshCitiesResults();
          prop === "cities" &&
            store.dispatch("savedResults/updateCities", newVal);
          resolve();
        })
        .catch((err) => {
          notify({ type: "error", msg: err.message || errorMsg });
          reject();
        });
    } else {
      notify({ type: "error", msg: errorMsg });
      reject();
    }
  });
};
export const addCity = (cityToAdd) => {
  handleLoading("isAddingCity", true);
  return new Promise((resolve, reject) => {
    if (
      !store.getters["savedResults/getCities"].some(
        (city) => city.cityName.toLowerCase() === cityToAdd.toLowerCase()
      )
    ) {
      API()
        .get(`data/2.5/weather?q=${cityToAdd}&units=imperial&appid=${APIKey}`)
        .then((fetchInfo) => {
          const city = fetchInfo.data;
          db.collection("users")
            .doc("dzN43wnwHdQCO691DyiR")
            .get()
            .then((data) => {
              // gets data
              let citiesCopy = JSON.parse(JSON.stringify(data?.data()?.cities));

              const objToAdd = {
                cityName: cityToAdd,
                cityId: city.id,
              };
              let newArr = [objToAdd, ...citiesCopy];
              newArr = Array.from(
                new Set(newArr?.map((itemId) => itemId.cityName))
              ).map((ID) => newArr?.find((el) => el.cityName === ID));
              updateParts("cities", newArr);
              handleLoading("isAddingCity", false);
              notify({ type: "success", msg: `${city.name} has been added.` });
              resolve();
            })
            .catch(() => {
              handleLoading("isAddingCity", false);
              reject();
            });
        })
        .catch(() => {
          handleLoading("isAddingCity", false);
          notify({
            type: "error",
            msg: `${cityToAdd} does not exist as a city. Please make sure to spell it correctly.`,
          });
        });
    } else {
      handleLoading("isAddingCity", false);
      notify({
        type: "error",
        msg: `${cityToAdd} is already added. Please add another different one.`,
      });
    }
  });
};

export const deleteCity = (cityEl) => {
  handleLoading("isDeletingCity", true);
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc("dzN43wnwHdQCO691DyiR")
      .get()
      .then((data) => {
        const deleteFunc = (index) => {
          citiesCopy.splice(index, 1);
          updateParts("cities", citiesCopy);
          handleLoading("isDeletingCity", false);
          notify({ type: "success", msg: "City has been deleted." });
          store.dispatch("toggleKeys/mutateKeys", {key: "editCities", val: false});
          resolve();
        };
        const myCities = data.data()?.cities;
        // Attempts to delete by city id first
        var citiesCopy = JSON.parse(JSON.stringify(myCities));
        const indexById =
          citiesCopy &&
          citiesCopy.length > 0 &&
          citiesCopy.map((city) => city.cityId).indexOf(cityEl.id);
        if (indexById !== -1) {
          deleteFunc(indexById);
        } else {
          // and if some reason that failed, then it will attempt to delete by city name
          const indexByName = citiesCopy
            .map((city) => city.cityName)
            .indexOf(cityEl.name);
          if (indexByName !== -1) {
            deleteFunc(indexByName);
          } else {
            // If both ways failed,
            // then will show an error message indicating that the city does not exist in the data
            handleLoading("isDeletingCity", false);
            notify({ type: "error", msg: errorMsg });
            reject();
          }
        }
      })
      .catch((err) => {
        handleLoading("isDeletingCity", false);
        reject();
        notify({ type: "error", msg: err.message || errorMsg });
      });
  });
};
