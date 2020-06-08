/**
 * routes.js : This Javascipt file contains all API endpoints routes which navigates to their respective API request.
 */

const event = require('./wsEvent');
const user = require('./wsUser');

exports.navigateRoutes = async (app) => {
    app.post('/api/events/registerEvent', event.registerEvent);
    app.post('/api/events/uploadImage', event.uploadImage);
    app.post('/api/feedback/submitFeedback', event.submitFeedback);
    app.get('/api/feedback/getAllFeedbacks', event.getAllFeedbacks);
    app.get('/api/events/getAllRegisteredEvents', event.getAllRegisteredEvents);
    app.get('/api/events/getCountOfRegistrationsAndTickets', event.getCountOfRegistrationsAndTickets);
    app.get('/api/events/getRegisteredEventById/:id', event.getRegisteredEventById);
    app.get('/api/events/registrationTypeDetails', event.getRegistrationTypeDetails);
    app.get('/api/events/getImageById/:id', event.getImageById);
    app.post('/api/events/month/getTimeSeriesData', event.getTimeSeriesDataForCurrentMonth);
    app.post('/api/user/registerUser', user.registerUser);
    app.post('/api/user/login', user.loginUser);
};
