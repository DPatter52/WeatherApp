async function getWeather() {
  const cityInput = document.getElementById("cityInput").value;

  try {
    const response = await fetch("http://localhost:3000/getWeather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityInput }),
    });

    const data = await response.json();

    const weatherInfoDiv = document.getElementById("WeatherInfo");
    weatherInfoDiv.innerHTML = `
        <p>City: ${data.name}<p>
        <p>Temperature: ${data.main.temp}<p>
        <p>Feels Like: ${data.main.feels_like}<p>
        <p>Wind: ${data.wind.speed}<p>
        `;

    if (cityInput) {
      console.log(`Searching for weather in ${cityInput}`);

      updateSearchHistory(cityInput);

      displaySearchHistory();
    } else {
      alert("Please enter a city before searching.");
    }

    console.log(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data. Please try again.");
  }
}

// West Valley City
