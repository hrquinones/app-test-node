
var express = require('express');
var weather = require('../controllers/weather.controller');
const file = require('../controllers/file.controller');

var api = express.Router();

api.get('/location', weather.location);
api.get('/current', weather.currentByLocation);
api.get('/current/:id', weather.currentById);
api.get('/forecast',weather.forecastByLocation);
api.get('/forecast/:id',weather.forecastById);
api.get('/city/:id',weather.cityById);
api.post('/upload', file.upload);
api.get('/files', file.getListFiles);
api.get('/files/:name', file.download);

module.exports = api;
