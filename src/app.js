const express = require('express');
const config = require('../config/config');
const weatherRouter = require('./routes/weather.routes');

const app = express();

console.log(`NODE_ENV=${config.NODE_ENV}`);

//settings
app.set('port', config.port);

//middlewares
app.use(express.json());
app.use( express.urlencoded( 
        { extended:false })
);

//routes
app.use('/v1', weatherRouter);
module.exports = app;
