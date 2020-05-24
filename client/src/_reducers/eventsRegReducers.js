import {
  FETCH_EVENTS,
  FETCH_EVENTS_BY_ID,
  FETCH_EVENTS_COUNT,
  FETCH_EVENTS_TYPE
} from "../_constants/eventsConstants";

const initialState = {
  events: [],
  eventID: [],
  eventCount:[],
  eventType:[]
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
    default:
      return state;
  }
}