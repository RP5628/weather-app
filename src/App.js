import './App.css';
import { useState } from 'react'

const api = {
  key: "df8b4d6c65cff9a757760242f1d1e159",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
const [query, setQuery] =useState('');
const [weather, setWeather] = useState({});

const search = evt => {
  if (evt.key === 'Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      setQuery('');
      console.log(result);
      
    });
  }
}

const dateBuilder = (d) => {
  let days = ["Sunday", "Monday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"];
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let date = d.getDate();

  return `${day} ${date} ${month} ${year}`;

}


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app' ) : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
            className = "search-bar"
            placeholder = "Search..." 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>


     {(typeof weather.main != "undefined") ? (<div>

        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>

        </div>) :
         ('')}
      </main>
    </div>
  );
}

export default App;
