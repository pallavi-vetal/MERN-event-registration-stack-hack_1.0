/**
 * server.js : Main file where execution starts.
 */

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
const path = require("path")
require('./configurations/passport')(passport);
app.use(passport.initialize());

app.use(nocache());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "client", "build")))
routes.navigateRoutes(app);

const port = process.env.PORT || 8000;


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log('Listening on Port', port));
