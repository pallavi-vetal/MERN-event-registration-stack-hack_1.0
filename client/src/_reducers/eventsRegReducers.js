import {
   FETCH_EVENTS,
   FETCH_EVENTS_BY_ID
  
  } from "../_constants/eventsConstants";
  
  const initialState = {
    events: [],
    eventID: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_EVENTS:
        return {
          ...state,
          events: action.payload
        };
        case FETCH_EVENTS_BY_ID:
          return {
            ...state,
            eventID: action.payload
          };
       
      default:
        return state;
    }
  }