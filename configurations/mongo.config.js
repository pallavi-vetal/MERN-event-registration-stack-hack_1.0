/**
 * mongo.config.js : Contains database name, url and collection names.
 */

const database = {
    url: 'mongodb://127.0.0.1:27017/',
    name: 'events',
    secretOrKey: 'secret'
};

const collection_names = {
    registeredEvents: 'registeredEvents',
    users: 'users',
    photos: 'photos',
    feedbacks: 'feedbacks'
};

module.exports = { database, collection_names };
