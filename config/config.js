require('dotenv').config();


module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',    
    port : process.env.PORT || 3000,
    api_weather : process.env.API_WEATHER,
    api_key_weather : process.env.API_KEY_WEATHER,
    api_location : process.env.API_LOCATION,
    api_key_location : process.env.API_KEY_LOCATION
}