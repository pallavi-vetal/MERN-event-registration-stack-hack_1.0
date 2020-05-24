const event = require('./wsEvent');
const user = require('./wsUser');

exports.navigateRoutes = async (app) => {
    app.post('/api/events/registerEvent', event.registerEvent);
    app.post('/api/events/uploadImage', event.uploadImage);
    app.get('/api/events/getAllRegisteredEvents', event.getAllRegisteredEvents);
    app.get('/api/events/getCountOfRegistrationsAndTickets', event.getCountOfRegistrationsAndTickets);
    app.get('/api/events/getRegisteredEventById/:id', event.getRegisteredEventById);
    app.post('/api/user/registerUser', user.registerUser);
    app.post('/api/user/login', user.loginUser);
};
