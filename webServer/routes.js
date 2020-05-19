const event = require('./wsEvent');

exports.navigateRoutes = async (app) => {
    app.post('/api/registerEvent', event.registerEvent);
};
