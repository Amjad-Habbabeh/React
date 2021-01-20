import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

const CityWeather = ({ name, coord, sys, main, weather, handleClick, id }) => {
  return (
    <div className="cityInfo" id={id}>
      <div className="city-weather">
        <div className="remove-div">
          <h2>
            {name}, {sys.country}
          </h2>

          <button className="remove-btn" onClick={handleClick}>
            <TiDeleteOutline className="delete" />
          </button>
        </div>
        <div className="weather-desc">
          <h3>{weather[0].main}</h3>
          <p style={{ fontWeight: 'bold' }}>{weather[0].description}</p>
        </div>
        <div className="temp">
          <p>min temp: {main.temp_min}°C</p>
          <p>max temp: {main.temp_max}°C</p>
          <p>
            location: {coord.lon} , {coord.lat}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CityWeather;
