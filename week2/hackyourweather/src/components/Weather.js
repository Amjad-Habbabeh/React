import React, { useState } from 'react';
import CityWeather from './CityWeather';
import Search from './Search';

const Weather = () => {
  const [cityName, setCityName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const Api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const handleSearch = (e, value) => {
    const url = `
    https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${Api_key}&units=metric 
    `;

    e.preventDefault();
    setHasError(false);
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error('Failed to fetch..');
        }
        return res.json();
      })
      .then((data) => {
        if (value !== '') {
          setSearch(true);
          setFilterSearch(data);
        } else {
          setSearch(false);
        }
      })
      .catch((err) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <h1>Weather</h1>
          <Search
            handleSearch={handleSearch}
            cityName={cityName}
            setCityName={setCityName}
          />
          {isLoading && <p>Loading...</p>}
          {hasError && <p>we couldn't find {cityName}!! </p>}
          {!search && (
            <p> No city input yet, type in a city and click search!</p>
          )}
          {search && !hasError && filterSearch.name && (
            <CityWeather
              name={filterSearch.name}
              coord={filterSearch.coord}
              sys={filterSearch.sys}
              main={filterSearch.main}
              weather={filterSearch.weather}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Weather;
