// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=hourly&appid=ec05db5f314ba69e685a65600301fbc2', true)

request.onload = function () {
  var data = JSON.parse(this.response);

  // Create and append data for current temperature
  var temperature = data.current.temp;
  const tempContainer = document.getElementById('current-temp');
  tempContainer.textContent = temperature; // no child containers needed
  
  // Create and append data for 5 day forecast
  var daily = data.daily

  const forecastContainer = document.getElementById('forecast');
  
  var i;
  for (i = 0; i < 6; i++) {
    var dailyTemp = daily[i].temp.day;
    if (i > 0) {
      const day = document.createElement('div')
      day.setAttribute('class', 'day')
      day.textContent = dailyTemp;
      forecastContainer.appendChild(day);
    }
  }
}

// Send request
request.send()



