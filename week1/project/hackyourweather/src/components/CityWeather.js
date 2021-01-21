import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import weatherData from '../city-weather.json';
import City from './City';

const cityInfo = weatherData.map(({ name, coord, sys, main, weather }) => {
  return (
    <div className="city-weather" key={uuidv4()}>
      <City name={name} coord={coord} sys={sys} main={main} weather={weather} />
    </div>
  );
});

const CityWeather = () => {
  return <div className="cityInfo">{cityInfo}</div>;
};
export default CityWeather;
