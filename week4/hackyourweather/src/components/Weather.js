import React, { useState, useReducer, useContext, useEffect } from 'react';
import CityWeather from './CityWeather';
import Search from './Search';
import Message from './Message';
import { reducer } from '../reducer';
import { AppContext } from '../Context/App_context';

const defaultState = {
  isLoading: false,
  hasError: false,
  hasMessage: false,
  message: `No city input yet, type in a city and click search!`,
  search: false,
};
const Weather = () => {
  const [cityName, setCityName] = useState('');
  const { fetchCities, setFetchCities } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const Api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const abortControler = new AbortController();
  useEffect(() => {
    return () => abortControler.abort();
  }, []);

  const fetchData = (url) => {
    dispatch({
      type: 'LOADING',
      payload: {
        isLoading: true,
        hasMessage: true,
      },
    });

    fetch(url, { signal: abortControler.signal })
      .then((res) => {
        if (!res.ok) {
          dispatch({
            type: 'LOADING',
            payload: {
              isLoading: false,
              hasMessage: true,
            },
          });

          throw new Error('Failed to fetch..');
        }
        return res.json();
      })
      .then((data) => {
        closeMessage();
        setFetchCities([data, ...fetchCities]);
        dispatch({
          type: 'FETCH_DATA',
          payload: {
            data: data,
            search: true,
            isLoading: false,
            hasMessage: true,
            message: `${cityName} weather added!`,
          },
        });

        setCityName('');
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return console.log('fetch aborted');
        }
        dispatch({
          type: 'ERROR',
          payload: {
            isLoading: false,
            hasError: true,
            message: `we couldn't find ${cityName} `,
            hasMessage: true,
          },
        });
        closeMessage();
      });
  };

  const handlesearch = (e, value) => {
    const url = `
  https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${Api_key}&units=metric `;

    e.preventDefault();
    dispatch({
      type: 'LOADING',
      payload: { isLoading: true, hasMessage: true },
    });

    if (value) {
      if (fetchCities.length > 0) {
        const existCity = fetchCities.filter(
          (city) => city.name.toUpperCase() === value.toUpperCase()
        );
        if (!existCity[0]) {
          fetchData(url);
          setCityName('');
        } else {
          dispatch({
            type: 'EXIST_CITY',
            payload: {
              isLoading: false,
              message: `City information already here `,
              hasMessage: true,
            },
          });
          setCityName('');
          closeMessage();
        }
      } else {
        fetchData(url);
        setCityName('');
      }
    } else if (!value && fetchCities.length > 0) {
      dispatch({
        type: 'NO_VALUE',
        payload: {
          isLoading: false,
          search: true,
          message: `Please, inter a value`,
          hasMessage: true,
        },
      });
      closeMessage();
    } else {
      dispatch({
        type: 'NO_VALUE',
        payload: {
          isLoading: false,
          hasError: false,
          hasMessage: true,
          message: `No city input yet, type in a city and click search!`,
          search: false,
        },
      });
      closeMessage();
    }
  };

  const closeMessage = () => {
    setTimeout(() => {
      dispatch({
        type: 'CLOSE_MESSAGE',
        payload: {
          hasMessage: false,
        },
      });
    }, 500);
  };

  const handleDelete = (id) => {
    const deletedCity = fetchCities.filter((city) => city.id === id);
    const newCities = fetchCities.filter((city) => city.id !== id);
    setFetchCities(newCities);
    dispatch({
      type: 'DELETE',
      payload: {
        search: false,
        message: `${deletedCity[0].name} weather information deleted`,
        hasMessage: true,
      },
    });
    closeMessage();
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <h1>Weather</h1>
          {state.hasMessage && <Message message={state.message} />}
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
