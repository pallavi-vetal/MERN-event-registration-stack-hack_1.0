const database = {
    url: 'mongodb://127.0.0.1:27017/',
    name: 'events'
};

const collection_names = {
    registeredEvents: 'registeredEvents',
    users: 'users',
    photos: 'photos'
};

module.exports = { database, collection_names };
