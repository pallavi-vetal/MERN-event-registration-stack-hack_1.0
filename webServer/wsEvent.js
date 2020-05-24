

exports.registerEvent = async (req, res) => {
    let user_defined_error = require('../utils/error');
    try {
        let event = require('../components/event/event.presention');
        if (!req._body) {
            let error = user_defined_error.basicError('Body cannot be empty.');
            throw error;
        } else if (Object.keys(req.body).length == 0) {
            let error = user_defined_error.basicError('Object cannot be empty.');
            throw error;
        }
        let body = req.body;
        let result = await event.registerEvent(body);
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(user_defined_error.errorObject(error.message, error.status));
    }
};

exports.uploadImage = (req, res) => {
    let user_defined_error = require('../utils/error');
    let event = require('../components/event/event.presention');
    try {
        let result = event.uploadImage(req, res);

    } catch (error) {
        error.status = 400;
        res.status(400).json(user_defined_error.errorObject(error.message, error.status));
    }
};

exports.getAllRegisteredEvents = async (req, res) => {
    let user_defined_error = require('../utils/error');
    let event = require('../components/event/event.presention');
    try {
        let result = await event.getAllRegisteredEvents();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(user_defined_error.errorObject(error.message, error.status));
    }
};
