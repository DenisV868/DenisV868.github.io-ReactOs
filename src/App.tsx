import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// @ts-ignore
import Clock from "./Clock.tsx";
//@ts-ignore
import Menu from "./Menu.tsx";
//@ts-ignore
import Settings from "./Settings.tsx";
//@ts-ignore
import Home from "./Home.tsx";
//@ts-ignore
import Weather from "./Weather.tsx";
//@ts-ignore
import SettingsBg from "./SettingsBg.tsx";
//@ts-ignore
import FileManager from "./FileManager.tsx";
//@ts-ignore
import Docs from "./Docs.tsx";
//@ts-ignore
import FileMIcon from "./FileMIcon.tsx";



const getDate = ():string =>{
    let date:Date = new Date();
    let day:number = date.getDate();
    let month:number = date.getMonth()+1;
    let year:number = date.getFullYear();
    return ` | ${day}.${month}.${year}`;
}

function App() {

    const [weather, setWeather] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch weather from Open-Meteo API
        const fetchWeather = async () => {
            try {
                // Latitude and longitude for the location (you can use the browser's Geolocation API for dynamic data)
                const latitude = 50.0755; // Example: London
                const longitude = 14.4378;

                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                );
                const data = await response.json();

                // Extract weather code
                const weatherCode = data.current_weather.weathercode;

                // Map weather codes to conditions (refer to Open-Meteo's documentation for codes)
                if ([0].includes(weatherCode)) {
                    setWeather("clearsky");
                } else if ([1, 2, 3].includes(weatherCode)) {
                    setWeather("cloudy");
                } else if ([45, 48].includes(weatherCode)) {
                    setWeather("foggy");
                } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
                    setWeather("rainy");
                } else if ([56, 57, 66, 67].includes(weatherCode)) {
                    setWeather("freezingrain");
                } else if ([71, 73, 75, 85, 86].includes(weatherCode)) {
                    setWeather("snowy");
                } else if ([95, 96, 99].includes(weatherCode)) {
                    setWeather("thunderstorm");
                } else if ([77].includes(weatherCode)) {
                    setWeather("windy");
                } else {
                    setWeather("unknown");
                }
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        };

        // Fetch weather on component mount
        fetchWeather();
    }, []); // Empty dependency array to only run once on mount // Empty dependency array to only run once on mount


    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    //const [hovered2, setHovered2] = useState(false);
    //const [clicked2, setClicked2] = useState(false);
    const hoverHandler = () => {
        setHovered(true);
    }

    const mouseOf = () => {
        if(!clicked) {
            setHovered(false);
        }
    }

    const clickHandler = () => {
        if(!clicked){
            setClicked(true);
        }
        if(clicked){
            setClicked(false);
        }
    }

    /*const hoverHandler2 = () => {
        setHovered2(true);
    }

    const mouseOf2 = () => {
        if(!clicked) {
            setHovered2(false);
        }
    }

    const clickHandler2 = () => {
        if(!clicked){
            setClicked2(true);
        }
        if(clicked){
            setClicked2(false);
        }
    }*/

    return (
    <Router>
        <div className="App">
            <header className="App-header">

            </header>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={Home} />
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/settings/wallpapers" element={<SettingsBg/>}/>
                    <Route path="/fileManager/user/home" element={<FileManager/>}/>
                    <Route path = "/fileManager/user/home/documents" element={<Docs/>}></Route>
                </Routes>
            </main>


            <footer className="panel-background">
                <div className="panel">
                    <p className="date">
                        {getDate()}
                    </p>
                    <Clock/>
                    <p className="menu" onMouseOver={hoverHandler} onMouseOut={mouseOf} onClick={clickHandler}>
                        <img src="/icons8-react-30.png" alt="menu"/>
                    </p>
                    <Weather weather={weather} />
                    <FileMIcon/>
                    {hovered && <Menu />}
                </div>
            </footer>
        </div>
    </Router>
    );
}

export default App;
