

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

exports.getCountOfRegistrationsAndTickets = async (req, res) => {
    let user_defined_error = require('../utils/error');
    let event = require('../components/event/event.presention');
    try {
        let result = await event.getCountOfRegistrationsAndTickets();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(user_defined_error.errorObject(error.message, error.status));
    }
};

exports.getRegisteredEventById = async (req, res) => {
    let { basicError, errorObject } = require('../utils/error');
    let { isValid } = require('mongodb').ObjectId;
    let { getRegisteredEventById } = require('../components/event/event.presention');

    try {
        let registration_id = req.params.id;
        if (!isValid(registration_id)) {
            let error = basicError('Registration Id is invalid.');
            throw error;
        }
        let result = await getRegisteredEventById(registration_id);
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(errorObject(error.message, error.status));
    }
};

exports.getRegistrationTypeDetails = async (req, res) => {
    let user_defined_error = require('../utils/error');
    let event = require('../components/event/event.presention');
    try {
        let result = await event.getRegistrationTypeDetails();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(user_defined_error.errorObject(error.message, error.status));
    }
};
