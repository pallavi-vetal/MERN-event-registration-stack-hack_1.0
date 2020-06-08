import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./_components/Admin/Register";
import Login from "./_components/Admin/Login";
import Home from "./_components/Admin/Home";
import PrivateRoute from "./_components/PrivateRoute/PrivateRoute.js";
import store from './store/store';
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./_actions/usersActions";
import jwt_decode from "jwt-decode";
import RegistrationDetails from "./_components/EventRegistration/RegistrationDetails";
import 'mapbox-gl/dist/mapbox-gl.css';
import Feedback from "./_components/Other/Feedback";
import About from "./_components/Other/About";
import RegistrationsTable from './_components/Admin/Dashboard/RegistrationsTable';
import HomeEvent from './_components/Navigation/HomeEvent';
import AdminFeedbacks from './_components/Admin/Dashboard/AdminFeedbacks';

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component{
 
  render(){
    return (
      <Provider store={store}> 
      <Router>
      <div className="App">
       
        <Route exact path="/" component={HomeEvent} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/feedback" component={Feedback} />
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute  path="/registration/:id" component={RegistrationDetails} />
          <PrivateRoute  path="/registrations" component={RegistrationsTable} />
          <PrivateRoute  path="/adminfeedbacks" component={AdminFeedbacks} />
        </Switch>
        
        </div>
    </Router>
    </Provider>
    )
  }
}

export default App;
