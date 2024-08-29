const MY_API_KEY = import.meta.env.VITE_API_KEY;
console.log(MY_API_KEY);
const startCity = "Poltava";

const loader = document.getElementById("loader");
const cityNameHTML = document.getElementById("city-name");
const temperatureHTML = document.getElementById("temperature");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const cloudscover = document.getElementById("cloudscover");
const pressure = document.getElementById("pressure");
const imageWeather = document.getElementById("image-weather");
// src="weather-img/cloudy.svg"

const input = document.getElementById("input");
const button = document.getElementById("button");

async function getData(city) {
  loader.style.display = "block";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${MY_API_KEY}`
    );
    if (!response.ok) {
      input.value = "";
      alert("Перевірте правильність написання!");
      loader.style.display = "none";
      throw new Error("Error HTTP: " + response.status);
    }
    const dataWeather = await response.json();
    loader.style.display = "none";

    if (dataWeather.weather[0].main == "Clear") {
      imageWeather.src = "/weather-img/sun.svg";
    } else if (dataWeather.weather[0].main == "Rain") {
      imageWeather.src = "/weather-img/rain.svg";
    } else if (
      dataWeather.weather[0].main == "Drizzle" ||
      dataWeather.weather[0].main == "Mist"
    ) {
      imageWeather.src = "/weather-img/drizzle.svg";
    } else if (dataWeather.weather[0].main == "Clouds") {
      imageWeather.src = "/weather-img/cloudy.svg";
    }

    cityNameHTML.innerHTML = dataWeather.name;
    temperatureHTML.innerHTML = Math.round(dataWeather.main.temp) + "&#xb0";
    windSpeed.innerHTML = dataWeather.wind.speed + " km/h";
    cloudscover.innerHTML = dataWeather.clouds.all + "%";
    humidity.innerHTML = dataWeather.main.humidity + "%";
    pressure.innerHTML = dataWeather.main.pressure * 0.75 + "мм";

    input.value = "";
    console.log(dataWeather);
  } catch (error) {
    console.log("Ошибка при виконанні запроса: " + error.message);
  }
}

getData(startCity);

button.addEventListener("click", () => {
  let inputValue = input.value;
  getData(inputValue);
});
