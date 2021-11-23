let weather = {
    apiKey: "0e139ccf74c4da71aa9a0745576a29f6",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { pressure } = data.main;
      const { temp_min } = data.main;
      const { temp_max } = data.main;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;
      document.querySelector(".city").innerText = "Pogoda w " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Wilgotność: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Prędkość wiatru: " + speed + " km/h";
      document.querySelector(".pressure").innerText = 
        "Ciśnienie: " + pressure + "hPA";
      document.querySelector(".temp_min").innerText = 
        "Minimalna temp: " + temp_min + "°C";
      document.querySelector(".temp_max").innerText = 
        "Maksymalna temp: " + temp_max + "°C";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
        
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Gdynia");