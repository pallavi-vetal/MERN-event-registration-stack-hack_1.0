const dot_env = require('dotenv');
dot_env.config();

const database = {
    url: process.env.DATABASE_URL,
    name: process.env.DATABASE_NAME
};

module.exports = {
    environment: process.env.NODE_ENV,
    http_port: process.env.HTTP_PORT,
    host_name: process.env.HOST_NAME,
    database: database
};
