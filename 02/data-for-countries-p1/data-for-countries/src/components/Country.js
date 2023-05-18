import axios from "axios";
import { useEffect, useState } from "react";

export const Country = ({ country }) => {
  if (!country) return null;

  const languages = Object.values(country.languages);

  const languagesStyle = {
    color: "green",
    margin: 0,
    padding: "2px",
  };

  const headerStyle = {
    margin: 0,
    padding: 0,
  };

  return (
    <div>
      <h1 style={headerStyle}>{country.name.common}</h1>
      <p>Capital(s):</p>{" "}
      {country.capital.length > 1 ? (
        <ul>
          {country.capital.map((capital, i) => {
            return <li key={i}>{capital}</li>;
          })}
        </ul>
      ) : (
        country.capital
      )}
      <p>Area: {country.area}</p>
      <p>Language(s):</p>
      <ul style={languagesStyle}>
        {languages.map((language, i) => {
          return <li key={i}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <CapitalWeather city={country.capital} />
    </div>
  );
};

export const CapitalWeather = ({ city }) => {
  const [firstCity, setFirstCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [icon, setIcon] = useState(null);
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API;

  useEffect(() => {
    if (Array.isArray(city)) {
      setFirstCity(city[0]);
    } else {
      setFirstCity(city);
    }
  }, [city]);

  let lat = 0;
  let lon = 0;

  if (!firstCity) {
    return;
  }

  axios
    .get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${firstCity}&limit=1&appid=${apiKey}`
    )
    .then((response) => {
      const [cityInfo] = response.data;
      lat = cityInfo.lat;
      lon = cityInfo.lon;

      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        .then((response) => {
          setTemperature(response.data.main.temp);
          setWindSpeed(response.data.wind.speed);
          setIcon(response.data.weather[0].icon);
        });
    });

  return (
    <>
      <h2>Weather in {firstCity}</h2>
      <p>Temperature {temperature}</p>
      {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />}
      <p>Wind speed {windSpeed}</p>
    </>
  );
};
