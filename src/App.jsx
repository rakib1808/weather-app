import React from 'react';
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div style={{ 
        fontFamily: "sans-serif", 
        textAlign: "center", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column"
      }}>
      <h1>🌤️ Weather App</h1>
      <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ 
          padding: "10px", 
          width: "200px", 
          fontSize: "16px", 
          outline: "none", 
          borderColor:"", 
          borderRadius: '8px',}}
      />
      <button
        onClick={getWeather}
        style={{
          padding: "10px 30px",
          marginTop: "10px",
          marginLeft:"10px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: '8px',
          
        }}
      >
        Search
      </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "30px", color:"whitesmoke", }}>
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.main.temp} °C</p>
          <p>🌥️ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;



