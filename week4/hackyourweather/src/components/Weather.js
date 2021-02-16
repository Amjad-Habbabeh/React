import React, { useState, useContext, useEffect } from 'react';
import CityWeather from './CityWeather';
import Search from './Search';
import Message from './Message';
import { AppContext } from '../Context/App_context';
import { useFetch } from './hooks/useFetch';

const defaultState = {
  hasMessage: false,
  hasError: false,
  message: `No city input yet, type in a city and click search!`,
  search: false,
};
const Weather = () => {
  const { fetchCities, setFetchCities } = useContext(AppContext);
  const [cityName, setCityName] = useState('');
  const [newUrl, setNewUrl] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [isLoading, fetchedData, hasError] = useFetch(newUrl, [newUrl]);
  const [state, setState] = useState(defaultState);
  const Api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (fetching && fetchedData) {
      setFetchCities([fetchedData, ...fetchCities]);
      setState({
        ...state,
        search: true,
        message: `${cityName} weather added!`,
      });
    }
    setFetching(false);
  }, [fetchedData, setCityName]);
  useEffect(() => {
    if (hasError && newUrl) {
      setState({
        ...state,
        hasError: true,
        hasMessage: true,
        message: `failed to fetch this city's weather!`,
      });
      closeMessage();
    }
  }, [newUrl, hasError, state.search, setCityName]);

  const handlesearch = (e, value) => {
    const url = `
  https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${Api_key}&units=metric `;

    e.preventDefault();
    setState({ ...state, search: true });
    if (value) {
      if (fetchCities.length > 0) {
        const existCity = fetchCities.filter(
          (city) => city.name.toUpperCase() === value.toUpperCase()
        );
        if (!existCity[0]) {
          setFetching(true);
          setNewUrl(url);
          setState({
            ...state,
            search: true,
            hasMessage: true,
            message: `city weather added!`,
          });
          closeMessage();
        } else {
          setState({
            ...state,
            message: `City information already here `,
            hasMessage: true,
          });
          closeMessage();
        }
      } else {
        setFetching(true);
        setNewUrl(url);
        setState({
          ...state,
          search: true,
          hasMessage: true,
          message: `city weather added!`,
        });
        closeMessage();
      }
    } else if (!value && fetchCities.length > 0) {
      setState({
        ...state,
        search: true,
        message: `Please, inter a value`,
        hasMessage: true,
      });
      closeMessage();
    } else {
      setState({
        ...state,
        hasError: false,
        hasMessage: true,
        message: `No city input yet, type in a city and click search!`,
        search: false,
      });

      closeMessage();
    }
  };

  const closeMessage = () => {
    setTimeout(() => {
      setState({ ...state, hasMessage: false, hasError: false });
    }, 1000);
    setCityName('');
  };

  const handleDelete = (id) => {
    const deletedCity = fetchCities.filter((city) => city.id === id);
    const newCities = fetchCities.filter((city) => city.id !== id);
    setFetchCities(newCities);

    setState({
      ...state,
      search: false,
      message: `${deletedCity[0].name} weather information deleted`,
      hasMessage: true,
    });
    closeMessage();
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <h1>Weather</h1>
          {isLoading && <Message message={`Loading...`} />}
          {state.hasMessage && !isLoading && (
            <Message message={state.message} />
          )}
          <Search
            handleSearch={handlesearch}
            cityName={cityName}
            setCityName={setCityName}
          />

          {fetchCities.length === 0 && (
            <Message
              message={`No city input yet, type in a city and click search!`}
            />
          )}
          {fetchCities.length !== 0 &&
            fetchCities.map((city) => {
              return (
                <CityWeather
                  id={city.id}
                  key={city.id}
                  name={city.name}
                  coord={city.coord}
                  sys={city.sys}
                  main={city.main}
                  weather={city.weather}
                  handleDelete={() => handleDelete(city.id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Weather;
