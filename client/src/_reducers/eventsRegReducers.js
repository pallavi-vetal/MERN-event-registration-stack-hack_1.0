import {
  FETCH_EVENTS,
  FETCH_EVENTS_BY_ID,
  FETCH_EVENTS_COUNT,
  FETCH_EVENTS_TYPE,
  FETCH_EVENTS_IMAGE,
  FETCH_EVENT_TIMESERIES_DATA
} from "../_constants/eventsConstants";

const initialState = {
  events: [],
  eventID: [],
  eventCount:[],
  eventType:[],
  eventImage:[],
  eventTimeSeries:[],
};

export default function (state = initialState, action) {
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
    case FETCH_EVENTS_COUNT:
      return {
        ...state,
        eventCount: action.payload
      };
    case FETCH_EVENTS_TYPE:
      return {
        ...state,
        eventType: action.payload
      };
    case FETCH_EVENTS_IMAGE:
        return {
          ...state,
          eventImage: action.payload
        };  
    case FETCH_EVENT_TIMESERIES_DATA:
      return {
        ...state,
        eventTimeSeries: action.payload
      };     
    default:
      return state;
  }
}