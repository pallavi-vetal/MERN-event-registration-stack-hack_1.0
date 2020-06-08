import { combineReducers } from "redux";
import errorReducers from './errorReducers';
import usersReducers from './usersReducers';
import eventsRegReducers from "./eventsRegReducers";
import eventReducers from "./eventReducers"
export default combineReducers({
 events:eventsRegReducers,
 auth:usersReducers,
 errors:errorReducers,
 registrationID:eventReducers
});