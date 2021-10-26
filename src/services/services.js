'use strict';
const { default: axios } = require('axios');
const config = require('../../config/config');
const fs = require('fs');



const getLocation = async () => {
    try {
        let api_location = `${config.api_location}?apikey=${config.api_key_location}`;
        const resp = await axios.get(api_location); 
        const result = {
            "status" : resp.status,
            "data" : resp.data,
            "message" : '',
            "result" : resp
        } ;      
        return result;
    } catch (err) {

        const result = {
            "status" : ( typeof (err.response.status) === "undefined" ? 500 : err.response.status),
            "message" : ( typeof (err.message) === "undefined" ? "Error interno 500 en server": err.message),
            "data" : '',
            "result" : err
        } ;
        return result;
    }
};

const getCurrent = async (lat, lon ) => {
    try {
        let api_weather_current = `${config.api_weather}/weather?lat=${lat}&lon=${lon}&appid=${config.api_key_weather}&lang=es&units=metric`;
        const resp = await axios.get(api_weather_current);
        return resp;        

    } catch (err) {
        const result = {
            "status" : ( typeof (err.response.status) === "undefined" ? 500 : err.response.status),
            "message" : ( typeof (err.message) === "undefined" ? "Error interno 500 en server": err.message),
            "data" : '',
            "result" : err
        } ;
        return result;        
    }
}

const getForecast = async (lat, lon, next_days = 5) => {
    try {
        let dailys_next = [];
        let api_weather_forecast = `${config.api_weather}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alert&lang=es&units=metric&appid=${config.api_key_weather}`;
        const resp = await axios.get(api_weather_forecast);
        if (resp.status === 200 ) {
            let data_weather = resp.data;
            if (data_weather.daily.length < next_days + 1 ) next_days = data_weather.daily.length; 

            for (let i=1; i <= next_days; i++)
            {
                const {dt, humidity, wind_speed} = data_weather.daily[i];
                const {main, description} = data_weather.daily[i].weather[0];
                const {day, min, max} = data_weather.daily[i].temp;
                dailys_next.push({"dt": new Date(dt*1000), main, description, day, min, max, humidity, wind_speed} );
            } 
        }
        const resultado = 
            { "status" : resp.status, 
              "data": { dailys_next }
            } ; 

        return resultado;
    } catch (err) {
        const result = {
            "status" : ( typeof (err.response.status) === "undefined" ? 500 : err.response.status),
            "message" : ( typeof (err.message) === "undefined" ? "Error interno 500 en server": err.message),
            "data" : '',
            "result" : err
        } ;
        return result;        
        
    }

}

const getCity = async (id) => {
    let status = 200;
    let data = null;
    let message = 'OK';
    const ident = Number.parseInt(id);

    try {
   
        var rawdata = fs.readFileSync('./src/resources/city.list.min.json');
        var citys = JSON.parse(rawdata);
        citys.forEach( (a) => {
            if (a.id === ident)  { 
                data =  {"id" : a.id, "country_name": a.country, "city_name" : a.name, "coord": a.coord}; 
                return true;
            }
         } );
         if (data===null) {
            status = 404;
            message = 'City not found';
         }
        const result = {status, data, message};
        return result;        
    } catch (error) {
        status = 500;
        const result = {status, data, error };
        return result;
    }

               
}

module.exports = { getLocation, getCurrent, getForecast, getCity};