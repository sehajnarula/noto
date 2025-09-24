import axios from "axios";

const apiKey = '1783f58893d345b787841935251808';

export const CurrentWeatherApi = async(deviceLatitude,deviceLongitude)=>{

    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${deviceLatitude},${deviceLongitude}&aqi=no`);
        return response.data;
    } catch (error) {
        console.log("weatherfetcherror",error);
    };

};