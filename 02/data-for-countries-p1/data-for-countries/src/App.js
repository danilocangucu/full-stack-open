import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import { Country } from "./components/Country";
import "./App.css";

function App() {
  const [countries, setCountries] = useState(null);
  const [results, setResults] = useState(null);
  const [country, setCountry] = useState(null);
  
  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {}, [country]);

  if (!countries) return "Loading....";

  const handleCountries = (event) => {
    const filter = event.target.value;
    const setResultsAndCountry = (results, country) => {
      setResults(results);
      setCountry(country);
    };

    if (!filter) {
      return setResultsAndCountry("", null);
    }

    const regex = new RegExp(filter, "i");
    const matchedCountries = countries.filter((country) =>
      regex.test(country.name.common)
    );

    if (matchedCountries.length > 10) {
      setResultsAndCountry("Too many matches, specify another filter", null);
    } else if (matchedCountries.length <= 10 && matchedCountries.length > 1) {
      const upToTenCountries = matchedCountries.map(
        (country) => country.name.common
      );
      setResultsAndCountry(upToTenCountries, null);
    } else if (matchedCountries.length === 1) {
      const [country] = matchedCountries;
      setResultsAndCountry("", country);
    } else {
      setResultsAndCountry("No matches found", null);
    }
  };

  const handleShowCountry = (event) => {
    const clickedCountry = countries.find((country) => {
      return country.name.common === event.target.previousSibling.innerHTML
    })
    setCountry(clickedCountry)
    setResults(null)
 }

  const appStyle = {
    padding: "5px",
  };
  return (
    <div style={appStyle}>
      <div>
        find countries <input type="text" onChange={handleCountries}></input>
      </div>
      {results ? (
        <div>
          <div id="results">
            <ul>
              {Array.isArray(results) ? (
                <>
                  {results.map((result, i) => {
                    return <li key={i}><label>{result}</label><button onClick={handleShowCountry}>Show</button></li>;
                  })}
                </>
              ) : (
                <>{results}</>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Country country={country} />
        </div>
      )}
    </div>
  );
}

export default App;
