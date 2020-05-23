const event = require('./wsEvent');
const user = require('./wsUser');

exports.navigateRoutes = async (app) => {
    app.post('/api/registerEvent', event.registerEvent);
    app.post('/api/uploadImage', event.uploadImage);
    app.post('/api/registerUser', user.registerUser);
    app.post('/api/login', user.loginUser);
};
