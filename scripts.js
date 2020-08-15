// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=imperial&exclude=hourly&appid=ec05db5f314ba69e685a65600301fbc2', true)

request.onload = function () {
  var data = JSON.parse(this.response);
  console.log(data)

  // Create and append data for current temperature
  var temperature = data.current.temp;
  const container = document.getElementById('current-temp');
  container.textContent = temperature;
  
  
}

// Send request
request.send()



