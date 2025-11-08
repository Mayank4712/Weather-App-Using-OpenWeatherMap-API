# Weather-App-Using-OpenWeatherMap-API

A modern, responsive weather application built using HTML, CSS, and JavaScript.
It fetches real-time weather data and 5-day forecasts using the OpenWeatherMap API, providing a sleek and interactive experience for both desktop and mobile users.

🚀 Features

🌎 Search Any City: Get real-time weather updates by entering a city name.

🌡️ Detailed Weather Info: Displays temperature, humidity, pressure, visibility, real feel, and wind data.

🌅 Sunrise & Sunset: Shows local sunrise and sunset times for the searched city.

📆 5-Day Forecast: Visual forecast with weather icons and temperature highs/lows.

🌗 Dynamic Backgrounds: Automatically changes based on weather condition and time (day/night, cloudy, rainy, etc.).

📱 Responsive Design: Optimized layout for both mobile and desktop screens.

🔁 Quick Reset: One-click option to clear results and start a new search.

🧩 Project Structure
weather-app/

│

├── index.html          # Main HTML file

├── styles/

│   └── style.css       # Styling for the app

├── scripts/

│   ├── script.js       # Main desktop logic

│   └── mobile.js       # Mobile-specific logic

├── media/              # Weather background images (day, night, rainy, cloudy)

├── icons/              # App icons and loader animation

├── settings.json       # Local development settings (Live Server port)

└── README.md           # Project documentation


⚙️ Technologies Used

HTML5 – For structured layout

CSS3 – For clean, responsive design

JavaScript (ES6) – For dynamic data handling and API integration

OpenWeatherMap API – For real-time weather and forecast data

Google Fonts (Montserrat) – For modern typography

🔑 API Setup

This project uses the OpenWeatherMap API.
You can obtain your own API key from https://openweathermap.org/api
.

To use your own key:

Open script.js and mobile.js

Locate this line:

var apiKey = "b1fd6e14799699504191b6bdbcadfc35";


Replace it with your own key:

var apiKey = "YOUR_API_KEY";

🧠 How It Works

User searches for a city using the input bar.

JavaScript fetches live weather data via the OpenWeatherMap API.

Background, icons, and text update dynamically based on conditions.

The 5-day forecast is displayed with daily temperature ranges and icons.

Responsive scripts adjust layout for mobile and desktop users.
