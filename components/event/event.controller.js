exports.registerEvent = async (p_registration_details) => {
    try {
        let { basicError } = require('../../utils/error');
        let { registerEvent } = require('./event.DAL');

        if (p_registration_details == null || p_registration_details == undefined) {
            let error = basicError('Object cannot be null or undefined.');
            throw error;
        }

        let result = await registerEvent(p_registration_details);
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.uploadImage = (req, res) => {
    try {
        let { uploadImage } = require('./event.DAL');
        let result = uploadImage(req, res);
    } catch (error) {
        throw error;
    }
};

exports.getAllRegisteredEvents = async () => {
    try {
        let { getAllRegisteredEvents } = require('./event.DAL');
        let result = await getAllRegisteredEvents();
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getCountOfRegistrationsAndTickets = async () => {
    try {
        let { getCountOfRegistrationsAndTickets } = require('./event.DAL');
        let result = await getCountOfRegistrationsAndTickets();
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getRegisteredEventById = async (p_registration_id) => {
    try {
        let { getRegisteredEventById } = require('./event.DAL');
        let result = await getRegisteredEventById(p_registration_id);
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getRegistrationTypeDetails = async () => {
    try {
        let { getRegistrationTypeDetails } = require('./event.DAL');
        let result = await getRegistrationTypeDetails();
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getImageById = (req, res) => {
    try {
        let { getImageById } = require('./event.DAL');
        getImageById(req, res);
    } catch (error) {
        throw error;
    }
};

exports.getTimeSeriesDataForCurrentMonth = async (month) => {
    try {
        let { getTimeSeriesDataForCurrentMonth } = require('./event.DAL');
        let result = await getTimeSeriesDataForCurrentMonth(month);
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.submitFeedback = async (p_body) => {
    try {
        let { submitFeedback } = require('./event.DAL');
        let result = await submitFeedback(p_body);
        return (result);
    } catch (error) {
        throw error;
    }
};

exports.getAllFeedbacks = async () => {
    try {
        let { getAllFeedbacks } = require('./event.DAL');
        let result = await getAllFeedbacks();
        return (result);
    } catch (error) {
        throw error;
    }
};
