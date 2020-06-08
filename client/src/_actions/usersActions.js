import axios from "axios"; //axios to create GET/POST request to server
import setAuthToken from "../utils/setAuthToken"; //require for jwt authentication token
import jwt_decode from "jwt-decode"; //require to decode jwt token

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, REGISTER_EVENT,FETCH_FEEDBACKS } from "../_constants/authConst";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/registerUser", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/user/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.clear();
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//Submit feedback
export const submitFeedback = (userData, history) => dispatch => {
  axios
    .post("/api/feedback/submitFeedback", userData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Register for event
export const registerEvent = userData => dispatch => {
  axios
    .post("/api/events/registerEvent", userData)
    .then(res => {
      
      const { token } = res.data;
      //save registerID to localStorage
      localStorage.setItem("registerID", token);
      //set current registration
      dispatch(setCurrentRegistration(res.data.insertedId));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set current registration
export const setCurrentRegistration = decoded => {
  return {
    type: REGISTER_EVENT,
    payload: decoded
  };
};

/* Dispatch setFeedbacks action to get all feedbacks */
export const fetchFeedbacks = () => dispatch => {
  return axios
    .get("/api/feedback/getAllFeedbacks")
    .then(res => {
      return dispatch(setFeedbacks(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setFeedbacks = feedbacks => {
  return {
    type: FETCH_FEEDBACKS,
    payload: feedbacks
  };
}
