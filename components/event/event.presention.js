
exports.registerEvent = async (p_body) => {
    try {
        let { basicError } = require('../../utils/error');
        let { registerEvent } = require('./event.controller');
        let { eventValidator } = require('./event.validation');

        if (typeof p_body.fullName != 'string' || typeof p_body.email != 'string' || typeof p_body.registrationType != 'string' || typeof p_body.numberOfTickets != 'number') {
            let error = basicError('Invalid type of fields.');
            throw error;
        }

        let { errors, flag } = eventValidator(p_body);

        if (!flag) {
            throw errors;
        }

        if (p_body.registrationType == "Self" || p_body.registrationType == 'Group' || p_body.registrationType == 'Corporate' || p_body.registrationType == 'Others') {
            let result = await registerEvent(p_body);
            return (result);
        } else {
            let error = basicError('Invalid registration type.');
            throw error;
        }
    } catch (error) {
        throw error;
    }
};

exports.uploadImage = (req, res) => {
    try {
        let { uploadImage } = require('./event.controller');
        let result = uploadImage(req, res);
    } catch (error) {
        throw error;
    }
};

exports.getAllRegisteredEvents = async () => {
    try {
        let { getAllRegisteredEvents } = require('./event.controller');
        let result = await getAllRegisteredEvents();
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getCountOfRegistrationsAndTickets = async () => {
    try {
        let { getCountOfRegistrationsAndTickets } = require('./event.controller');
        let result = await getCountOfRegistrationsAndTickets();
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getRegisteredEventById = async (p_registration_id) => {
    try {
        let { basicError } = require('../../utils/error');
        let { getRegisteredEventById } = require('./event.controller');

        if (typeof p_registration_id != "string") {
            let error = basicError('Registration Id is invalid.');
            throw error;
        }
        let result = await getRegisteredEventById(p_registration_id);
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getRegistrationTypeDetails = async () => {
    try {
        let { getRegistrationTypeDetails } = require('./event.controller');
        let result = await getRegistrationTypeDetails();
        return (result);
    } catch (error) {
        throw error;
    }
};
