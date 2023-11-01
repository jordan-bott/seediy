import { useState, useEffect } from "react";

export default function WeatherWidget(info) {
  const weather = info.props.weather;
  const user = info.props.user;

  const [weatherIcon, setWeatherIcon] = useState("");

  const thunder = "https://img.icons8.com/sf-ultralight/100/4b5858/storm.png";
  const rainy =
    "https://img.icons8.com/sf-ultralight/100/4b5858/rainy-weather.png";
  const snowy =
    "https://img.icons8.com/sf-ultralight/100/4b5858/snow-storm.png";
  const foggy = "https://img.icons8.com/sf-ultralight/100/4b5858/dry.png";
  const tornado = "https://img.icons8.com/sf-ultralight/100/4b5858/tornado.png";
  const sunny = "https://img.icons8.com/sf-ultralight/100/4b5858/sun.png";
  const cloudy = "https://img.icons8.com/sf-ultralight/100/4b5858/clouds.png";

  const currentTemp = Math.round(weather.current.temp);
  const highTemp = Math.round(weather?.daily[0].temp.max);
  const lowTemp = Math.round(weather?.daily[0].temp.min);

  const handleWeatherIcon = (weather) => {
    const weatherId = weather?.current.weather[0].id;
    if (weatherId < 300) {
      setWeatherIcon(thunder);
    } else if (
      (weatherId >= 300 && weatherId <= 504) ||
      (weatherId >= 520 && weatherId < 600)
    ) {
      setWeatherIcon(rainy);
    } else if (weatherId === 511 || (weatherId <= 600 && weatherId <= 622)) {
      setWeatherIcon(snowy);
    } else if (weatherId >= 701 && weatherId <= 771) {
      setWeatherIcon(foggy);
    } else if (weatherId === 781) {
      setWeatherIcon(tornado);
    } else if (weatherId === 800) {
      setWeatherIcon(sunny);
    } else {
      setWeatherIcon(cloudy);
    }
  };

  useEffect(() => {
    handleWeatherIcon(weather);
  }, [weather]);

  const theTime = new Date(weather.daily[0].sunrise * 1000);
  console.log(theTime.toLocaleTimeString());

  return (
    <div className="flex m-6 items-center place-content-around w-[80%]">
      <div className="text-6xl">
        {currentTemp}°{user.units === "imperial" ? "F" : "C"}
      </div>
      <div className="flex flex-col mx-4 text-2xl">
        <div>
          High: {highTemp}°{user.units === "imperial" ? "F" : "C"}
        </div>
        <div>
          Low: {lowTemp}°{user.units === "imperial" ? "F" : "C"}
        </div>
      </div>
      <div>
        <img src={weatherIcon} alt="weather icon" />
      </div>
      <div>
        <div>
          <div></div>
          <div>{Math.ceil(weather.daily[0].sunrise * 1000)}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
