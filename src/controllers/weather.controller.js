
const services = require('../services/services');


const location = async (req, res) => {
    try {
        const location = await services.getLocation();
        res.status(location.status);
        if (location.status === 200)
            res.status(200).json(location.data);
        else
            res.status(location.status).json(location.result);

    } catch (error) {
        res.status(500).json(error);
    }
}


const currentById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await services.getCity(Number.parseInt(id));
        if (city.status === 200) {
            const { lat, lon } = city.data.coord;
            const { country_name, city_name } = city.data;
            const resp = await services.getCurrent(lat, lon);
            if (resp.status === 200) {
                const { main, description } = resp.data.weather[0];
                const { temp, feels_like, temp_min, temp_max, humidity } = resp.data.main;
                const { speed } = resp.data.wind;

                result = {
                    "location": { country_name, city_name },
                    "weather": { main, description, temp, feels_like, temp, temp_min, temp_max, humidity, "wind_speed": speed },
                };
                res.status(200).json(result);
            }
            else {
                res.status(resp.status).json(resp);
            }
        }
        else {
            res.status(city.status).json(city);
        }

    } catch (error) {
        res.status(500).json(error.message);
    }

}

const currentByLocation = async (req, res) => {
    try {
        const location = await services.getLocation();
        if (location.status === 200) {
            const { latitude, longitude, country_name, city, country_code, zip_code, ip } = location.data;
            const resp = await services.getCurrent(latitude.toString(), longitude.toString());
            if (resp.status === 200) {

                const { main, description } = resp.data.weather[0];
                const { temp, feels_like, temp_min, temp_max, humidity } = resp.data.main;
                const { speed } = resp.data.wind;

                result = {
                    "location": { country_name, city, country_code, zip_code, ip },
                    "weather": { main, description, temp, feels_like, temp, temp_min, temp_max, humidity, "wind_speed": speed },
                };
                res.status(200).json(result);
            }
            else {
                res.status(resp.status).json(resp);
            }
        }
        else {
            res.status(location.status).json(location.result);
        }

    } catch (error) {
        res.status(typeof (error.response.status) === 'undefined' ? 500 : error.response.status)
            .json(error.message || '. An internal server error occurred');
    }

}


const forecastById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await services.getCity(Number.parseInt(id));
        if (city.status === 200) {
            const { lat, lon } = city.data.coord;
            const { country_name, city_name } = city.data;
            const resp = await services.getForecast(lat, lon);
            if (resp.status === 200) {
                const { dailys_next } = resp.data;
                result = {
                    "location": { country_name, city_name },
                    dailys_next,
                };

                res.status(200).json(result);
            }
            else {
                res.status(resp.status).json(resp);
            }
        }
        else {
            res.status(city.status).json(city);
        }


    } catch (error) {
        res.json(error);
    }
}

const forecastByLocation = async (req, res) => {
    try {
        const location = await services.getLocation();

        if (location.status == 200) {

            let lat = location.data.latitude.toString();
            let lon = location.data.longitude.toString();

            const resp = await services.getForecast(lat, lon, 5);
            if (resp.status == 200) {
                const { country_name, city, country_code, zip_code, ip } = location.data;
                const { dailys_next } = resp.data;
                result = {
                    "location": { country_name, city, country_code, zip_code, ip },
                    dailys_next,
                };
                res.status(200).json(result);
            }
            else {
                res.status(resp.status).json(resp);
            }

        }
        else
            res.status(location.status).json(location.result);

    } catch (error) {
        if (typeof error.response != 'undefined')
            res.status(error.response.status).json(error);
        else {
            console.error(error);
            res.status(500).json('An internal server error occurred');
        }

    }

}

const cityById = async (req, res) => {
    const { id } = req.params;
    try {
        let resp = await services.getCity(id);
        res.status(resp.status).json(resp);
    } catch (error) {
        res.status(error.status).json(error);
    }
}


module.exports = { location, currentByLocation, currentById, forecastByLocation, forecastById, cityById }

