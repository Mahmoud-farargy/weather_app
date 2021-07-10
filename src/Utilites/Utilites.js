import { db } from "../config/firebase";
import Vue from "vue";
import API from "../services/API";
import { APIKey } from "../config/info";
import store from "../state/store";

const errorMsg = " An error occurred. try again later";
const handleLoading = (key, val) => {
  store.dispatch("toggleKeys/mutateKeys", { key, val });
};
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
          if (myCities && myCities.length > 0) {
            store.dispatch("savedResults/updateCities", myCities);
            const getCitiesInfo = async () => {
              return Promise.all(
                myCities.map(async (city) => {
                  return await API()
                    .get(
                      `data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
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
            getCitiesInfo().then((finalResults) => {
              const stringifiedData = JSON.parse(JSON.stringify(finalResults));
              store.dispatch("savedResults/updateResultList", stringifiedData);
              resolve(stringifiedData);
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
        (city) => city.toLowerCase() === cityToAdd.toLowerCase()
      )
    ) {
      API()
        .get(`data/2.5/weather?q=${cityToAdd}&units=imperial&appid=${APIKey}`)
        .then(() => {
          db.collection("users")
            .doc("dzN43wnwHdQCO691DyiR")
            .get()
            .then((data) => {
              // gets data
              let citiesCopy = JSON.parse(JSON.stringify(data?.data()?.cities));
              let newArr = [...citiesCopy, cityToAdd];
              newArr = [...new Set(newArr)];
              updateParts("cities", newArr);
              handleLoading("isAddingCity", false);
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

export const deleteCity = (name) => {
  handleLoading("isDeletingCity", true);
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc("dzN43wnwHdQCO691DyiR")
      .get()
      .then((data) => {
        const myCities = data.data()?.cities;
        const citiesCopy = JSON.parse(JSON.stringify(myCities));
        const index = citiesCopy
          .map((city) => city.toLowerCase())
          .indexOf(name.toLowerCase());
        if (index !== -1) {
          citiesCopy.splice(index, 1);
          updateParts("cities", citiesCopy);
          handleLoading("isDeletingCity", false);
          resolve();
        } else {
          handleLoading("isDeletingCity", false);
          notify({ type: "error", msg: errorMsg });
          reject();
        }
      })
      .catch((err) => {
        handleLoading("isDeletingCity", false);
        reject();
        notify({ type: "error", msg: err.message || errorMsg });
      });
  });
};
