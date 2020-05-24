import {
  FETCH_EVENTS,
  FETCH_EVENTS_BY_ID,
  FETCH_EVENTS_COUNT
} from "../_constants/eventsConstants";

const initialState = {
  events: [],
  eventID: [],
  eventCount:[]
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
    default:
      return state;
  }
}