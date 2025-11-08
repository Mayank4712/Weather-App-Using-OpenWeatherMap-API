var cityInput = document.getElementById("searchCity");

// Function to get background image based on weather condition and time of day
function getBackgroundImage(weatherMain, sunrise, sunset) {
  var currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
  var isNight = currentTime < sunrise || currentTime > sunset;
  
  var backgroundImages = {
    "Clear": isNight ? ["night1.jpg", "night2.jpg", "night3.jpg", "night4.jpg", "night5.jpg"] : ["day1.jpg", "day2.jpg", "day3.jpg", "day4.jpg", "day5.jpg"],
    "Clouds": ["cloudy1.jpg", "cloudy2.jpg", "cloudy3.jpg", "cloudy4.jpg", "cloudy5.jpg"],
    "Rain": ["rainy1.jpg", "rainy2.jpg", "rainy3.jpg", "rainy4.jpg", "rainy5.jpg"],
    "Drizzle": ["rainy1.jpg", "rainy2.jpg", "rainy3.jpg", "rainy4.jpg", "rainy5.jpg"],
    "Thunderstorm": ["rainy1.jpg", "rainy2.jpg", "rainy3.jpg", "rainy4.jpg", "rainy5.jpg"],
    "Snow": isNight ? ["night1.jpg", "night2.jpg", "night3.jpg", "night4.jpg", "night5.jpg"] : ["day1.jpg", "day2.jpg", "day3.jpg", "day4.jpg", "day5.jpg"],
    "Mist": ["cloudy1.jpg", "cloudy2.jpg", "cloudy3.jpg", "cloudy4.jpg", "cloudy5.jpg"],
    "Fog": ["cloudy1.jpg", "cloudy2.jpg", "cloudy3.jpg", "cloudy4.jpg", "cloudy5.jpg"],
    "Haze": ["cloudy1.jpg", "cloudy2.jpg", "cloudy3.jpg", "cloudy4.jpg", "cloudy5.jpg"]
  };
  
  // Default to day images if weather type not found
  var imageList = backgroundImages[weatherMain] || (isNight ? ["night1.jpg", "night2.jpg", "night3.jpg", "night4.jpg", "night5.jpg"] : ["day1.jpg", "day2.jpg", "day3.jpg", "day4.jpg", "day5.jpg"]);
  
  // Randomly select one image from the appropriate list
  var randomImage = imageList[Math.floor(Math.random() * imageList.length)];
  return randomImage;
}

// Set default background on page load
var defaultBackground = "day1.jpg";
document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url('media/" + defaultBackground + "')";

cityInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    loader();
    function loader() {

      document.getElementById("locationName").innerHTML = "";
      document.getElementById("temperatureValue").innerHTML = "";
      document.getElementById("weatherType").innerHTML = "";

      const img1 = document.createElement("img");
      const img2 = document.createElement("img");
      const img3 = document.createElement("img");

      img1.id = "loader1";
      img2.id = "loader2";
      img3.id = "loader3";

      img1.src = "icons/loader.gif";
      img2.src = "icons/loader.gif";
      img3.src = "icons/loader.gif";

      const parentElement1 = document.getElementById("locationName");
      const parentElement2 = document.getElementById("temperatureValue");
      const parentElement3 = document.getElementById("weatherType");

      parentElement1.appendChild(img1);
      parentElement2.appendChild(img2);
      parentElement3.appendChild(img3);

      // document.getElementById("loader1").src = "icons/loader.gif";
      // document.getElementById("loader2").src = "icons/loader.gif";
      // document.getElementById("loader3").src = "icons/loader.gif";
    }

    var cityInputValue = cityInput.value;

    var apiKey = "b1fd6e14799699504191b6bdbcadfc35"; // Default
    var unit = "metric";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${unit}`;

    if (cityInputValue != "") {
      async function getWeather() {
        try {
          var response = await fetch(apiUrl);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          var data = await response.json();

          if (data.cod === 200 || (data.message != "city not found" && data.cod != "404")) {
          var location = data.name;
          var temperature = data.main.temp;
          var weatherType = data.weather[0].description;
          var weatherMain = data.weather[0].main; // Main weather condition (Clear, Clouds, Rain, etc.)
          var realFeel = data.main.feels_like;
          var windSpeed = data.wind.speed;
          var windDirectionDeg = data.wind.deg;
          // Convert degrees to compass direction
          var windDirection = 'N/A';
          if (windDirectionDeg !== undefined) {
            var directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
            windDirection = directions[Math.round(windDirectionDeg / 22.5) % 16] + ' (' + windDirectionDeg + '°)';
          }
          var visibility = data.visibility / 1000;
          var pressure = data.main.pressure;
          var maxTemperature = data.main.temp_max;
          var minTemperature = data.main.temp_min;
          var humidity = data.main.humidity;
          var sunriseTimestamp = data.sys.sunrise; // Unix timestamp for sunrise
          var sunsetTimestamp = data.sys.sunset; // Unix timestamp for sunset
          var sunrise = new Date(sunriseTimestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          var sunset = new Date(sunsetTimestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          
          // Change background based on weather condition and time of day
          var backgroundImage = getBackgroundImage(weatherMain, sunriseTimestamp, sunsetTimestamp);
          var isMobile = window.innerWidth <= 600;
          document.body.style.background = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) , url('media/" + backgroundImage + "')";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundPosition = "center center";
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundAttachment = isMobile ? "scroll" : "fixed";

          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInputValue}&appid=${apiKey}&units=${unit}`)
            .then(response => response.json())
            .then(data => {
              const forecastContainer = document.getElementById('forecast-container');

              forecastContainer.innerHTML = '';

              const dailyForecasts = {};
              data.list.forEach(entry => {
                const dateTime = new Date(entry.dt * 1000);
                const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
                if (!dailyForecasts[date]) {
                  dailyForecasts[date] = {
                    date: date,
                    icon: `https://openweathermap.org/img/w/${entry.weather[0].icon}.png`,
                    maxTemp: -Infinity,
                    minTemp: Infinity,
                    weatherType: entry.weather[0].main
                  };
                }

                if (entry.main.temp_max > dailyForecasts[date].maxTemp) {
                  dailyForecasts[date].maxTemp = entry.main.temp_max;
                }
                if (entry.main.temp_min < dailyForecasts[date].minTemp) {
                  dailyForecasts[date].minTemp = entry.main.temp_min;
                }
              });

              Object.values(dailyForecasts).forEach(day => {
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('daily-forecast-card');

                forecastCard.innerHTML = `
        <p class="daily-forecast-date">${day.date}</p>
        <div class="daily-forecast-logo"><img class="imgs-as-icons" src="${day.icon}"></div>
        <div class="max-min-temperature-daily-forecast">
          <span class="max-daily-forecast">${Math.round(day.maxTemp)}<sup>o</sup>C</span>
          <span class="min-daily-forecast">${Math.round(day.minTemp)}<sup>o</sup>C</span>
        </div>
        <p class="weather-type-daily-forecast">${day.weatherType}</p>
      `;

                forecastContainer.appendChild(forecastCard);
              });
            })
            .catch(error => {
              console.error('Error fetching forecast data:', error);
              document.getElementById('forecast-container').innerHTML = '<p style="color: #fff;">Forecast unavailable</p>';
            });



          document.getElementById("locationName").innerHTML = location;
          document.getElementById("temperatureValue").innerHTML = temperature + "<sup>o</sup>C";
          document.getElementById("weatherType").innerHTML = weatherType;
          document.getElementById("realFeelAdditionalValue").innerHTML = realFeel + "<sup>o</sup>C";
          document.getElementById("windSpeedAdditionalValue").innerHTML = windSpeed + " km/h";
          document.getElementById("windDirectionAdditionalValue").innerHTML = windDirection;
          document.getElementById("visibilityAdditionalValue").innerHTML = visibility + " km";
          document.getElementById("pressureAdditionalValue").innerHTML = pressure;
          document.getElementById("maxTemperatureAdditionalValue").innerHTML = maxTemperature + "<sup>o</sup>C";
          document.getElementById("minTemperatureAdditionalValue").innerHTML = minTemperature + "<sup>o</sup>C";
          document.getElementById("humidityAdditionalValue").innerHTML = humidity;
          document.getElementById("sunriseAdditionalValue").innerHTML = sunrise;
          document.getElementById("sunsetAdditionalValue").innerHTML = sunset;
        }
        else {
          document.getElementById("locationName").innerHTML = "City Not Found";
          document.getElementById("temperatureValue").innerHTML = "";
          document.getElementById("weatherType").innerHTML = "";
          document.getElementById("forecast-container").innerHTML = "";
        }
        } catch (error) {
          console.error('Error fetching weather data:', error);
          document.getElementById("locationName").innerHTML = "Error loading weather data";
          document.getElementById("temperatureValue").innerHTML = "";
          document.getElementById("weatherType").innerHTML = "";
          document.getElementById("forecast-container").innerHTML = "";
        }
      }

      getWeather();
    }
    else document.getElementById("locationName").innerHTML = "Enter a city name...";
  }
});


document.getElementById("resetBtn").addEventListener("click", function (event) {
  event.preventDefault(); // Prevents page reload if reset button is <a>

  // Clear input field (correct ID is "searchCity")
  document.getElementById("searchCity").value = "";

  // Reset main weather display
  document.getElementById("locationName").innerHTML = "";
  document.getElementById("temperatureValue").innerHTML = "";
  document.getElementById("weatherType").innerHTML = "";

  // Reset additional weather details
  document.getElementById("realFeelAdditionalValue").innerHTML = "";
  document.getElementById("windSpeedAdditionalValue").innerHTML = "";
  document.getElementById("windDirectionAdditionalValue").innerHTML = "";
  document.getElementById("visibilityAdditionalValue").innerHTML = "";
  document.getElementById("pressureAdditionalValue").innerHTML = "";
  document.getElementById("maxTemperatureAdditionalValue").innerHTML = "";
  document.getElementById("minTemperatureAdditionalValue").innerHTML = "";
  document.getElementById("humidityAdditionalValue").innerHTML = "";
  document.getElementById("sunriseAdditionalValue").innerHTML = "";
  document.getElementById("sunsetAdditionalValue").innerHTML = "";

  // Clear forecast cards
  document.getElementById("forecast-container").innerHTML = "";

  // Show default message
  document.getElementById("locationName").innerHTML = "Search City...";
});

