import React from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const CityWeather = ({ name, coord, sys, main, weather, handleDelete, id }) => {
  return (
    <div className="cityInfo" id={id}>
      <div className="city-weather">
        <div className="remove-div">
          <Link to={`/${id}`}>
            {name}, {sys.country}
          </Link>

          <button className="remove-btn" onClick={handleDelete}>
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
