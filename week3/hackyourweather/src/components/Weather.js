import React, { useState, useReducer } from 'react';
import CityWeather from './CityWeather';
import Search from './Search';
import Message from './Message';
import { reducer } from '../reducer';

const defaultState = {
  isLoading: false,
  hasError: false,
  hasMessage: true,
  message: ``,
  search: false,
  searchedCities: [],
};
const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);
  const Api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const fetchData = (url) => {
    dispatch({ type: 'LOADING', payload: true });

    fetch(url)
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
        dispatch({
          type: 'ERROR',
          payload: {
            isLoading: false,
            hasError: true,
            message: `we couldn't find ${cityName} `,
            hasMessage: true,
          },
        });
      });
  };

  const handlesearch = (e, value) => {
    const url = `
  https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${Api_key}&units=metric `;

    e.preventDefault();
    dispatch({ type: 'LOADING', payload: true });

    if (value) {
      if (state.searchedCities.length > 0) {
        const existCity = state.searchedCities.filter(
          (city) => city.name.toUpperCase() == value.toUpperCase()
        );
        if (!existCity[0]) {
          fetchData(url);
          setCityName('');
        } else {
          dispatch({
            type: 'EXIST_CITY',
            payload: {
              searchedCities: [...state.searchedCities],
              isLoading: false,
              message: `City information already here `,
              hasMessage: true,
            },
          });
          setCityName('');
        }
      } else {
        fetchData(url);
        setCityName('');
      }
    } else if (!value && state.searchedCities.length > 0) {
      dispatch({
        type: 'NO_VALUE',
        payload: {
          isLoading: false,
          search: true,
          searchedCities: [...state.searchedCities],
          message: `Please, inter a value`,
          hasMessage: true,
        },
      });
    } else {
      dispatch({
        type: 'NO_VALUE',
        payload: {
          isLoading: false,
          hasError: false,
          hasMessage: true,
          message: `No city input yet, type in a city and click search!`,
          search: false,
          searchedCities: [...state.searchedCities],
        },
      });
    }
  };

  const closeMessage = () => {
    dispatch({
      type: 'CLOSE_MESSAGE',
      payload: {
        hasMessage: false,
      },
    });
  };

  const handleDelete = (id) => {
    const deletedCity = state.searchedCities.filter((city) => city.id === id);
    const newCities = state.searchedCities.filter((city) => city.id !== id);
    dispatch({
      type: 'DELETE',
      payload: {
        search: false,
        searchedCities: newCities,
        message: `${deletedCity[0].name} weather information deleted`,
        hasMessage: true,
      },
    });
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <h1>Weather</h1>
          {state.hasMessage && (
            <Message message={state.message} closeMessage={closeMessage} />
          )}
          <Search
            handleSearch={handlesearch}
            cityName={cityName}
            setCityName={setCityName}
          />

          {!state.search && state.searchedCities.length == 0 && (
            <Message
              message={`No city input yet, type in a city and click search!`}
              closeMessage={closeMessage}
            />
          )}
          {state.searchedCities &&
            state.searchedCities.map((city) => {
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
