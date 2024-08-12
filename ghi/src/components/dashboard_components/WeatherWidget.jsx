import { useState, useEffect } from "react";
import { useGetWeatherByTimeQuery } from "../../store/endpoints/weatherApi";
import { toast } from "react-toastify";

export default function WeatherWidget(info) {
  const weather = info.props.weather;
  const user = info.props.user;
  const token = info.props.token;
  const now = new Date();

  const sunriseUnix = weather.daily[0].sunrise;
  const sunsetUnix = weather.daily[0].sunset;
  const eightDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
  );
  const eightUnix = Date.parse(eightDate) / 1000;
  const noonDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    12,
  );
  const noonUnix = Date.parse(noonDate) / 1000;

  const fiveDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    17,
  );
  const fiveUnix = Date.parse(fiveDate) / 1000;

  const {
    data: sunriseWeather,
    isLoading: sunriseLoading,
    isError: sunriseError,
  } = useGetWeatherByTimeQuery({
    unix_time: sunriseUnix,
    token: token,
  });

  const {
    data: sunsetWeather,
    isLoading: sunsetLoading,
    isError: sunsetError,
  } = useGetWeatherByTimeQuery({
    unix_time: sunsetUnix,
    token: token,
  });

  const {
    data: eightWeather,
    isLoading: eightLoading,
    isError: eightError,
  } = useGetWeatherByTimeQuery({
    unix_time: eightUnix,
    token: token,
  });

  const {
    data: noonWeather,
    isLoading: noonLoading,
    isError: noonError,
  } = useGetWeatherByTimeQuery({
    unix_time: noonUnix,
    token: token,
  });

  const {
    data: fiveWeather,
    isLoading: fiveLoading,
    isError: fiveError,
  } = useGetWeatherByTimeQuery({
    unix_time: fiveUnix,
    token: token,
  });

  const [weatherIcon, setWeatherIcon] = useState("");
  const [eightIcon, setEightIcon] = useState("");
  const [noonIcon, setNoonIcon] = useState("");
  const [fiveIcon, setFiveIcon] = useState("");

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

  const handleEightIcon = (weather) => {
    const weatherId = weather?.data[0].weather[0].id;
    if (weatherId < 300) {
      setEightIcon(thunder);
    } else if (
      (weatherId >= 300 && weatherId <= 504) ||
      (weatherId >= 520 && weatherId < 600)
    ) {
      setEightIcon(rainy);
    } else if (weatherId === 511 || (weatherId <= 600 && weatherId <= 622)) {
      setEightIcon(snowy);
    } else if (weatherId >= 701 && weatherId <= 771) {
      setEightIcon(foggy);
    } else if (weatherId === 781) {
      setEightIcon(tornado);
    } else if (weatherId === 800) {
      setEightIcon(sunny);
    } else {
      setEightIcon(cloudy);
    }
  };

  const handleNoonIcon = (weather) => {
    const weatherId = weather?.data[0].weather[0].id;
    if (weatherId < 300) {
      setNoonIcon(thunder);
    } else if (
      (weatherId >= 300 && weatherId <= 504) ||
      (weatherId >= 520 && weatherId < 600)
    ) {
      setNoonIcon(rainy);
    } else if (weatherId === 511 || (weatherId <= 600 && weatherId <= 622)) {
      setNoonIcon(snowy);
    } else if (weatherId >= 701 && weatherId <= 771) {
      setNoonIcon(foggy);
    } else if (weatherId === 781) {
      setNoonIcon(tornado);
    } else if (weatherId === 800) {
      setNoonIcon(sunny);
    } else {
      setNoonIcon(cloudy);
    }
  };

  const handleFiveIcon = (weather) => {
    const weatherId = weather?.data[0].weather[0].id;
    if (weatherId < 300) {
      setFiveIcon(thunder);
    } else if (
      (weatherId >= 300 && weatherId <= 504) ||
      (weatherId >= 520 && weatherId < 600)
    ) {
      setFiveIcon(rainy);
    } else if (weatherId === 511 || (weatherId <= 600 && weatherId <= 622)) {
      setFiveIcon(snowy);
    } else if (weatherId >= 701 && weatherId <= 771) {
      setFiveIcon(foggy);
    } else if (weatherId === 781) {
      setFiveIcon(tornado);
    } else if (weatherId === 800) {
      setFiveIcon(sunny);
    } else {
      setFiveIcon(cloudy);
    }
  };

  useEffect(() => {
    handleWeatherIcon(weather);
    handleEightIcon(eightWeather);
    handleNoonIcon(noonWeather);
    handleFiveIcon(fiveWeather);
  }, [weather, eightWeather, noonWeather, fiveWeather]);

  if (
    sunsetLoading ||
    sunriseLoading ||
    eightLoading ||
    noonLoading ||
    fiveLoading
  ) {
    return <p>Is loading...</p>;
  }
  if (sunsetError || sunriseError || eightError || noonError || fiveError) {
    toast("uh oh, something went wrong.");
  }

  return (
    <>
      <div className="mx-6 mb-4 mt-8 flex w-[80%] place-content-around items-center">
        <div className="text-6xl">
          {currentTemp}°{user.units === "imperial" ? "F" : "C"}
        </div>
        <div className="mx-4 flex flex-col text-2xl">
          <div>
            High: {highTemp}°{user.units === "imperial" ? "F" : "C"}
          </div>
          <div className="mt-2">
            Low: {lowTemp}°{user.units === "imperial" ? "F" : "C"}
          </div>
        </div>
        <div>
          <img src={weatherIcon} alt="weather icon" />
        </div>
      </div>
      <div className="mt-4 h-[70%] w-[80%]">
        <div className="relative flex h-[16%] items-end rounded-lg border-2 border-dgrey">
          <div>
            <img
              src="https://img.icons8.com/sf-ultralight/50/4b5858/sunrise.png"
              alt="sunrise"
              className="absolute bottom-[5%] left-[2%]"
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] text-lg">
            {new Date(sunriseUnix * 1000).toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </div>
          <div className="absolute bottom-[25%] left-[40%] text-lg">
            {Math.round(sunriseWeather.data[0].temp)}°
            {user.units === "imperial" ? "F" : "C"}
          </div>
          <div className="absolute bottom-[25%] left-[60%] text-lg">
            {sunriseWeather.data[0].weather[0].description}
          </div>
        </div>
        <div className="relative mt-3 flex h-[16%] items-end rounded-lg border-2 border-dgrey">
          <div>
            <img
              src={eightIcon}
              alt="8am weather icon"
              className="absolute bottom-[5%] left-[2%] w-[50px]"
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] text-lg">
            {eightDate.toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </div>
          <div className="absolute bottom-[25%] left-[40%] text-lg">
            {Math.round(eightWeather.data[0].temp)}°
            {user.units === "imperial" ? "F" : "C"}
          </div>
          <div className="absolute bottom-[25%] left-[60%] text-lg">
            {eightWeather.data[0].weather[0].description}
          </div>
        </div>
        <div className="relative mt-3 flex h-[16%] items-end rounded-lg border-2 border-dgrey">
          <div>
            <img
              src={noonIcon}
              alt="8am weather icon"
              className="absolute bottom-[5%] left-[2%] w-[50px]"
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] text-lg">
            {noonDate.toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </div>
          <div className="absolute bottom-[25%] left-[40%] text-lg">
            {Math.round(noonWeather.data[0].temp)}°
            {user.units === "imperial" ? "F" : "C"}
          </div>
          <div className="absolute bottom-[25%] left-[60%] text-lg">
            {noonWeather.data[0].weather[0].description}
          </div>
        </div>
        <div className="relative mt-3 flex h-[16%] items-end rounded-lg border-2 border-dgrey">
          <div>
            <img
              src={fiveIcon}
              alt="8am weather icon"
              className="absolute bottom-[5%] left-[2%] w-[50px]"
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] text-lg">
            {fiveDate.toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </div>
          <div className="absolute bottom-[25%] left-[40%] text-lg">
            {Math.round(fiveWeather.data[0].temp)}°
            {user.units === "imperial" ? "F" : "C"}
          </div>
          <div className="absolute bottom-[25%] left-[60%] text-lg">
            {fiveWeather.data[0].weather[0].description}
          </div>
        </div>
        <div className="relative mt-3 flex h-[16%] items-end rounded-lg border-2 border-dgrey">
          <div>
            <img
              src="https://img.icons8.com/sf-ultralight/50/4b5858/sunset.png"
              alt="sunrise"
              className="absolute bottom-[5%] left-[2%]"
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] text-lg">
            {new Date(sunsetUnix * 1000).toLocaleTimeString([], {
              timeStyle: "short",
            })}
          </div>
          <div className="absolute bottom-[25%] left-[40%] text-lg">
            {Math.round(sunsetWeather.data[0].temp)}°
            {user.units === "imperial" ? "F" : "C"}
          </div>
          <div className="absolute bottom-[25%] left-[60%] text-lg">
            {sunsetWeather.data[0].weather[0].description}
          </div>
        </div>
      </div>
    </>
  );
}
