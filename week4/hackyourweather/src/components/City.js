import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Chart from './Chart';

const City = () => {
  const { id } = useParams();
  const cityId = parseInt(id);

  const Api_key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const url = `
  https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${Api_key}&units=metric
  `;
  // `
  // https://history.openweathermap.org/data/2.5/aggregated/year?id=${cityId}&appid=${Api_key}&units	=metric

  //
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchApi = (abort) => {
    fetch(url, { signal: abort.signal })
      .then((res) => {
        setIsLoading(true);
        if (!res.ok) {
          throw Error('failed to fetch ');
        }
        return res.json();
      })
      .then((data) => {
        setCityData(data.list);
        const cityName = data.city.name;
        setCityName(cityName);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return console.log('fetch aborted');
        }
        console.log(err);
        setIsError(true);
      });
  };
  useEffect(() => {
    const abortControler = new AbortController();
    fetchApi(abortControler);

    return () => abortControler.abort();
  }, []);
  let fiveDaysWeather = [];

  if (cityData.length > 0) {
    for (let i = 0; i < cityData.length; i = i + 8) {
      fiveDaysWeather.push(cityData[i]);
    }
  }

  return (
    <div>
      <h1>5 day Forecast</h1>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>
          Sorry! failed to fetch the wither history for {cityName} ..please try
          agine later!
        </p>
      )}
      {!isError && fiveDaysWeather.length === 5 && (
        <div>
          <h2>{cityName}</h2>
          <Chart fiveDaysWeather={fiveDaysWeather} />
        </div>
      )}

      <Link to="/">Go Back</Link>
    </div>
  );
};

export default City;
