const express = require('express');
const nocache = require('nocache');
const body_parser = require('body-parser');
const cors = require('cors');
const http = require('http');
const configuration = require('./configurations/config');
const app = express();
const host_name = configuration.host_name;
const routes = require('./webServer/routes');
const fileUpload = require('express-fileupload')
const passport = require('passport');

require('./configurations/passport')(passport);
app.use(passport.initialize());

app.use(nocache());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());
app.use(fileUpload());  

routes.navigateRoutes(app);

const http_server = http.createServer(app);
http_server.listen(configuration.http_port, host_name);

console.info(`Node express server is running on port : ${configuration.http_port} with host name : ${host_name}`);
