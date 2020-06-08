//import all constants related to events
import {
  FETCH_EVENTS, FETCH_EVENTS_BY_ID,
  FETCH_EVENTS_COUNT, FETCH_EVENTS_TYPE,
  FETCH_EVENTS_IMAGE, FETCH_EVENT_TIMESERIES_DATA
} from '../_constants/eventsConstants';

import axios from "axios"; //axios to create GET/POST request to server

/* Dispatch setEvents action to get all registrations */
export const fetchEvents = () => dispatch => {
  return axios
    .get("/api/events/getAllRegisteredEvents")
    .then(res => {
      return dispatch(setEvents(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
}

/* Dispatch setEventByID action to get registration details by registration ID */
export const fetchEventsByID = (id) => dispatch => {
  return axios
    .get(`/api/events/getRegisteredEventById/${id}`)
    .then(res => {
      console.log(res.data);
      return dispatch(setEventByID(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setEventByID = event => {
  return {
    type: FETCH_EVENTS_BY_ID,
    payload: event
  };
}

/* Dispatch setEventCount action to get total number of registrations made and total tickets sold */
export const fetchEventCount = () => dispatch => {
  return axios
    .get("/api/events/getCountOfRegistrationsAndTickets")
    .then(res => {
      return dispatch(setEventCount(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setEventCount = event => {
  return {
    type: FETCH_EVENTS_COUNT,
    payload: event
  }
}

/* Dispatch setRegistrationTypeData action to get different registration type data which 
 * we will use to render pie chart
 */
export const fetchRegistrationTypeDetails = () => dispatch => {
  return axios
    .get("/api/events/registrationTypeDetails")
    .then(res => {
      return dispatch(setRegistrationTypeData(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setRegistrationTypeData = event => {
  return {
    type: FETCH_EVENTS_TYPE,
    payload: event
  }
}

/* Dispatch setImage action to upload id card image on server */
export const fetchImage = (id) => dispatch => {
  return axios
    .get(`/api/events/getImageById/${id}`)
    .then(res => {
      console.log(res.data);
      return dispatch(setImage(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setImage = img => {
  return {
    type: FETCH_EVENTS_IMAGE,
    payload: img
  }
}

/* Dispatch setTimeSeriesData action to get details of registration count
 * and tickets count on each day in current month.
 * We will use this data to render time series area graph
 */
export const fetchTimeSeriesData = (id) => dispatch => {
  return axios
    .post(`/api/events/month/getTimeSeriesData`,id)
    .then(res => {
      console.log(res.data);
      return dispatch(setTimeSeriesData(res.data));
    })
    .catch(err =>
      console.log("ERror", err)
    );
};
export const setTimeSeriesData = data => {
  return {
    type: FETCH_EVENT_TIMESERIES_DATA,
    payload: data
  }
}