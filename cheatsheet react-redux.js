// *********************** installing react packages ********************
const installReactApp = "npx create-react-app folder";
const installBootstrap = "npm install react-bootstrap bootstrap@4.6.0";
const installRedux = "npm install @reduxjs/toolkit  and npm install redux";
const installReactRouter = "npm i react-router-dom";
const installReactPersist = "npm i redux-persist";
const installReactPersistEncrypt = "npm i redux-persist-transform-encrypt";

// *************** IF STATEMENT TERNARY ****************
{
  smth ? /*if true do this*/ <div></div> : /*if false do this*/ <div></div>;
}
// *************** MATH RANDOM *************************
{
  Math.floor(Math.random() * 1400);
}
// **************** ARRAY MAPPING WITH SLICE *******************
{
  array
    .slice(0, 3)
    .map((profile) => (
      <div
        className="otherUserData2"
        key={profile._id}
        onClick={() => guestPage(profile, profile._id)}
      ></div>
    ));
}
// *************** ASYNC AWAIT PUT FETCH WITH IMAGE UPLOAD *****************

const submitChanges = async () => {
  const formData = new FormData();
  formData.append("post", image);
  const options2 = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer key",
    },
  };

  try {
    const endpoint = `endpointurl/updatedUnit`;
  } catch (error) {
    console.log(error);
  }

  const options = {
    method: "PUT",
    body: JSON.stringify(postInformation),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer key",
    },
  };
  try {
    const endpoint = `endpointurl/updatedUnit`;
    const response = await fetch(endpoint, options);
    if (response.ok) {
      alert("Post edited successfully");
    } else {
      throw new Error("Error while uploading information");
    }
  } catch (error) {
    console.log(error);
  }
  /*some function to do after fetch*/
};

// *************** ASYNC AWAIT DELETE FETCH ***************

const deletePost = async () => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer API Key",
    },
  };
  try {
    const endpoint = `endpointUrl/idOfDeletedUnit`;
    const response = await fetch(endpoint, options);
    if (response.ok) {
      alert("Post deleted successfully ");
    } else {
      throw new Error("Error while uploading information");
    }
  } catch (error) {
    console.log(error);
  }
  /*some function to do after fetch*/
};

// *************** CLASS COMPONENT REACT *****************
import React, { Component } from "react";

export /*default*/ class cheatsheet extends Component {
  render() {
    return <div></div>;
  }
}

// ******************* FUNCTIONAL COMPONENT REACT **************
import React from "react";

export /*default*/ function cheatsheet() {
  return <div></div>;
}

// ************* REACT ROUTER DOM *******************

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import MainPage from "./Components/MainPage";

export /*default*/ function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
// *********** SETTING WINDOW TO TOP AFTER NAVIGATING TO ANOTHER COMPONENT **************/
useEffect(() => {
  window.scrollTo(0, 0);
}, [guest]);
//// *********************************************** SETTING REDUX STORE ***********************************************

// ********** STORE JS ************
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/userReducer";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  tranforms: [
    encryptTransform({
      secretKey: "SECRET_KEY",
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};

const bitReducer = combineReducers({
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, bitReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// *********** INDEX JS *********************
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// ************ REDUCER JS ********************

import { SAVE_USER } from "../Actions";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

//******************** ACTIONS JS ***************** */

export const GET_EXPERIENCE = "GET_EXPERIENCE";

export const getExperienceAction = (experience) => {
  return {
    type: GET_EXPERIENCE,
    payload: experience,
  };
};

export const fetchExperienceAction = (userId) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAzMWM5NmRmYjAwMTUyMWE1YmIiLCJpYXQiOjE2NzA4MzYyODAsImV4cCI6MTY3MjA0NTg4MH0.-mjIeGuDeV798UyGFGMsc5ORRw1nL5qqVP2qkCqN7MY",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        dispatch(getExperienceAction(data));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
