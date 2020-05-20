
exports.registerEvent = async (p_body) => {
    try {
        let user_defined_error = require('../../utils/error');
        let event = require('./event.controller');

        if(typeof p_body.fullName != 'string' || typeof p_body.email != 'string' || typeof p_body.registrationType != 'string' || typeof p_body.numberOfTickets != 'number') {
            let error = user_defined_error.basicError('Invalid type of fields.');
            throw error;
        }

        let regex_for_email_validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if(!regex_for_email_validation.test(p_body.email)) {
            let error = user_defined_error.basicError('Invalid email id entered.');
            throw error;
        }

        if(p_body.registrationType == "self" || p_body.registrationType == 'group' || p_body.registrationType == 'corporate' || p_body.registrationType == 'others') {
            let result = await event.registerEvent(p_body);
            return (result);
        } else {
            let error = user_defined_error.basicError('Invalid registration type.');
            throw error;
        }
    } catch (error) {
        throw error;
    }
};