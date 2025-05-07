let input = document.getElementById("city-input");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const city = document.getElementById("city-input").value;
    if (city) {
      getWeather(city);
    }
  }
});

document.getElementById("search-button").addEventListener("click", function () {
  if (input.value === "") {
    alert("Input field can't be empty");
  }

  const city = document.getElementById("city-input").value;
  if (city) {
    getWeather(city);
  }
});

// Function to fetch weather data from the API
async function getWeather(city) {
  const apiKey = "f00c38e0279b7bc85480c3fe775d518c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Send request to the weather API
    const response = await fetch(url);
    if (!response.ok) {
      displayError(error.message);
      throw new Error(`City not found: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data);
    displayWeather(data); // Display the weather data if successful
  } catch (error) {
    displayError(error.message); // Display error msg
  }
}

// Function to display the fetched weather data
function displayWeather(data) {
  document.querySelector(".weather-info").style.display = "block";
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("weather-description").textContent =
    data.weather[0].description;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const icon = (document.getElementById("imgWeather").src = iconUrl);

  // console.log(icon);

  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;

  // console.log(data.main.temp);

  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
}

// Function to display error mmsg to the user
function displayError(message) {
  alert(message);
  document.querySelector(".weather-info").style.display = "none";
}
