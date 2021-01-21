import React from 'react';

const City = ({ name, coord, sys, main, weather }) => {
  return (
    <>
      <h3>
        {name}, {sys.country}
      </h3>
      <div>
        <h4>{weather[0].main}</h4>
        <p>{weather[0].description}</p>
      </div>
      <div className="temp">
        <p>min temp: {main.temp_min}</p>
        <p>max temp: {main.temp_max}</p>
        <p>
          location: {coord.lon} , {coord.lat}
        </p>
      </div>
    </>
  );
};

export default City;
