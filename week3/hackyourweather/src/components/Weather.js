import React, { useState } from 'react';
import CityWeather from './CityWeather';
import Search from './Search';
import Message from './Message';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const Api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const fetchData = (url) => {
    console.log('sending http request...');
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
        setSearch(true);
        setSearchedCities([...searchedCities, data]);
        setIsLoading(false);
        setCityName('');
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
        setIsLoading(false);
      });
  };

  const handlesearch = (e, value) => {
    const url = `
  https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${Api_key}&units	=metric `;

    e.preventDefault();
    setIsLoading(true);
    if (value !== '') {
      if (searchedCities.length > 0) {
        const existCity = searchedCities.filter(
          (city) => city.name.toUpperCase() == value.toUpperCase()
        );
        if (!existCity[0]) {
          fetchData(url);
          setCityName('');
        } else {
          setSearchedCities([...searchedCities]);
          setCityName('');
          setIsLoading(false);
        }
      } else {
        fetchData(url);
        setCityName('');
      }
    } else if (value == '' && searchedCities.length > 0) {
      setIsLoading(false);
      setSearch(true);
      setSearchedCities([...searchedCities]);
    } else {
      setIsLoading(false);
      setSearch(false);
    }
  };

  const closeMessage = () => {
    setHasError(false);
  };

  const handleDelete = (id) => {
    const newCities = searchedCities.filter((city) => city.id !== id);
    setSearchedCities(newCities);
    setSearch(false);
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <h1>Weather</h1>
          <Search
            handleSearch={handlesearch}
            cityName={cityName}
            setCityName={setCityName}
          />
          {isLoading && (
            <Message message={`Loading... `} closeMessage={closeMessage} />
          )}
          {hasError && (
            <Message
              message={`we couldn't find this city!! `}
              closeMessage={closeMessage}
            />
          )}
          {!search && searchedCities.length == 0 && (
            <Message
              message={`No city input yet, type in a city and click search!`}
              closeMessage={closeMessage}
            />
          )}
          {searchedCities &&
            searchedCities.map((city) => {
              return (
                <CityWeather
                  id={city.id}
                  key={city.id}
                  name={city.name}
                  coord={city.coord}
                  sys={city.sys}
                  main={city.main}
                  weather={city.weather}
                  handleClick={() => handleDelete(city.id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Weather;
