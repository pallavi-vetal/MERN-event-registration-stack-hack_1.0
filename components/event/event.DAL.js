const mongo_util = require('../../utils/mongo.util');
const mongo_config = require('../../configurations/mongo.config');

exports.registerEvent = async (p_registration_details) => {
    try {
        let mongo_client = await mongo_util.dbClient();
        let response = await mongo_client.collection(mongo_config.collection_names.registeredEvents).insertOne(p_registration_details);
        
        response.result.insertedId = response.insertedId;
        
        return(response.result);
    } catch (error) {
        throw error;
    }
};  
