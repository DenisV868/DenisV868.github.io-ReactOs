import React from "react";

const Weather = ({weather}) => {


    const renderWeatherIcon = () => {
        switch (weather) {
            case "clearsky":
                return <img src="/sun.png" alt="Clear Sky" className= "weather-icon"/>;
            case "cloudy":
                return <img src="/cloud.png" alt="Cloudy" className= "weather-icon"/>;
            case "foggy":
                return <img src="/icons/fog.png" alt="Foggy" className= "weather-icon"/>;
            case "rainy":
                return <img src="/icons/rain.png" alt="Rainy" className= "weather-icon"/>;
            case "snowy":
                return <img src="/icons/snow.png" alt="Snowy" className= "weather-icon"/>;
            case "windy":
                return <img src="/icons/windy.png" alt="Windy" className= "weather-icon"/>;
            case "thunderstorm":
                return <img src="/icons/thunderstorm.png" alt="Thunderstorm" className= "weather-icon"/>;
            case "freezingrain":
                return <img src="/icons/freezingrain.png" alt="Freezing Rain" className= "weather-icon"/>;
            default:
                return <p>?</p>;
        }
    };
    return (
        <p className="weather">
            {renderWeatherIcon()}
        </p>
    );
}

export default Weather;