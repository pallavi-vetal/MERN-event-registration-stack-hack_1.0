import {FETCH_EVENTS,FETCH_EVENTS_BY_ID,FETCH_EVENTS_COUNT} from '../_constants/eventsConstants';
import axios from "axios";

export const setEvents = events =>{
    return {
        type:FETCH_EVENTS,
        payload:events
    };
}
export const setEventByID = event =>{
  return {
      type:FETCH_EVENTS_BY_ID,
      payload:event
  };
}

export const fetchEvents = () => dispatch => {
    return axios
      .get("/api/events/getAllRegisteredEvents")
      .then(res => {
        return dispatch(setEvents(res.data));
      })
      .catch(err =>
        console.log("ERror",err)
      );
  };
  export const fetchEventsByID = (id) => dispatch => {
    return axios
      .get(`/api/restaurants/search/${id}`)
      .then(res => {
        console.log(res.data);
        return dispatch(setEventByID(res.data));
      })
      .catch(err =>
        console.log("ERror",err)
      );
  };

  
  export const fetchEventCount = () => dispatch => {
    return axios
      .get("/api/events/getCountOfRegistrationsAndTickets")
      .then(res => {
        return dispatch(setEventCount(res.data));
      })
      .catch(err =>
        console.log("ERror",err)
      );
  };
export const setEventCount = event =>{
  return{
    type:FETCH_EVENTS_COUNT,
    payload:event
    }
}
   