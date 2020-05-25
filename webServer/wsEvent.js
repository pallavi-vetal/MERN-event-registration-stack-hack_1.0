

exports.registerEvent = async (req, res) => {
    let { basicError, errorObject } = require('../utils/error');
    let { registerEvent } = require('../components/event/event.presention');
    
    try {
        if (!req._body) {
            let error = basicError('Body cannot be empty.');
            throw error;
        } else if (Object.keys(req.body).length == 0) {
            let error = basicError('Object cannot be empty.');
            throw error;
        }
        let body = req.body;
        let result = await registerEvent(body);
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        if (!error.hasOwnProperty('message')) {
            res.status(400).json(error);
        } else {
            res.status(400).json(errorObject(error.message, error.status));
            console.error(error);
        }
    }
};

exports.uploadImage = (req, res) => {
    let { errorObject } = require('../utils/error');
    let { uploadImage } = require('../components/event/event.presention');
    
    try {
        let result = uploadImage(req, res);
    } catch (error) {
        error.status = 400;
        res.status(400).json(errorObject(error.message, error.status));
    }
};

exports.getAllRegisteredEvents = async (req, res) => {
    let { errorObject } = require('../utils/error');
    let { getAllRegisteredEvents } = require('../components/event/event.presention');
    
    try {
        let result = await getAllRegisteredEvents();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(errorObject(error.message, error.status));
    }
};

exports.getCountOfRegistrationsAndTickets = async (req, res) => {
    let { errorObject } = require('../utils/error');
    let { getCountOfRegistrationsAndTickets } = require('../components/event/event.presention');
    
    try {
        let result = await getCountOfRegistrationsAndTickets();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(errorObject(error.message, error.status));
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
    let { errorObject } = require('../utils/error');
    let { getRegistrationTypeDetails } = require('../components/event/event.presention');
    
    try {
        let result = await getRegistrationTypeDetails();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        res.status(400).json(errorObject(error.message, error.status));
    }
};
