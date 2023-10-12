
        document.getElementById("searchButton").addEventListener("click", function () {
            const cityInput = document.getElementById("cityInput").value;
            getWeatherData(cityInput);
        });

        document.getElementById("cityInput").addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                const cityInput = document.getElementById("cityInput").value;
                getWeatherData(cityInput);
            }
        });

        function getWeatherData(city) {
            const apiKey = "0d3000aedb71ffb67ef0d3f9e4546fe5";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const weatherIcon = document.getElementById("weatherIcon");
                    const temp = document.getElementById("temp");
                    const cityName = document.getElementById("cityName");
                    const wind = document.getElementById("wind");
                    const rain = document.getElementById("rain");

                    cityName.textContent = data.name;
                    temp.textContent = `${data.main.temp}°C`;
                    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

                    if (data.wind) {
                        wind.textContent = `Wind: ${data.wind.speed} m/s`;
                    } else {
                        wind.textContent = "Wind data not available";
                    }

                    if (data.rain && data.rain["1d"]) {
                        rain.textContent = `Rain: ${data.rain["1d"]} mm`;
                    } else {
                        rain.textContent = "Rain data not available";
                    }
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                    const cityName = document.getElementById("cityName");
                    cityName.textContent = "City not found";
                });
        }
