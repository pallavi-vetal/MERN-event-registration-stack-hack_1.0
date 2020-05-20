exports.registerEvent = async (p_registration_details) => {
    try {
        let user_defined_error = require('../../utils/error');
        let event = require('./event.DAL');
        
        if (p_registration_details == null || p_registration_details == undefined) {
            let error = user_defined_error.basicError('Object cannot be null or undefined.');
            throw error;
        }

        let result = await event.registerEvent(p_registration_details);
        return (result);
    } catch (error) {
        throw error;
    }
};