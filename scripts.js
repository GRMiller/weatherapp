// Get current user's longitude and latitude
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(havePosition);
} else {
  alert("Location services must be enabled for this application to work.");
}

// Only make request if getCurrentPosition succeeds. 
function havePosition(position) {

  // Save variables we need
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=ec05db5f314ba69e685a65600301fbc2', true);

  // Wait for response to load before parsing it
  request.onload = function () {
    var data = JSON.parse(this.response);
  
    // Get container and append data for current temperature

    if (document.getElementById('current-temp') != undefined) {
      var temperature = data.current.temp;
      const tempContainer = document.getElementById('current-temp');
      tempContainer.textContent = 'The current temperature at your location is: ' + temperature + '°F'; // no child containers needed for current temp
    }
    /**
     * Create and append data for 5 day forecast
     *  */ 

    // Get forecast container
    const forecastContainer = document.getElementById('forecast');

    // Make daily data easier to access
    var daily = data.daily

    // Loop through response
    for (var i = 0; i < 6; i++) {

      // Save the data we need to variables
      var dailyDay = daily[i].dt;
      var dailyTemp = daily[i].temp.day;
      var dailyFeels = daily[i].feels_like.day
      var dailyMin = daily[i].temp.min;
      var dailyMax = daily[i].temp.max;
      var dailyMorning = daily[i].temp.morn;
      var dailyEvening = daily[i].temp.eve;
      var dailyNight = daily[i].temp.night;
      var dailyIcon = daily[i].weather[0].icon;
      var dailyDescription = daily[i].weather[0].description;
      
      // Only create containers and content for days after today e.g. > 0
      if (i > 0) {

        // Create container for each day with that day's date
        const day = document.createElement('div');
        day.setAttribute('class', 'day');
        forecastContainer.appendChild(day);
        
        // Add date
        const dayDate = document.createElement('div');
        dayDate.setAttribute('class', 'day-date');
        day.textContent = unixConverter(dailyDay);
        day.appendChild('dayDate');
        
        // Add weather icon
        const dayIcon = document.createElement('img');
        dayIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + dailyIcon + '.png');
        day.appendChild(dayIcon);

        // Add weather description
        const dayDescription = document.createElement('div');
        dayDescription.setAttribute('class', 'day-description');
        dayDescription.textContent = dailyDescription;
        day.appendChild(dayDescription);

        // Add daily temperature
        const dayTemp = document.createElement('div');
        dayTemp.setAttribute('class', 'day-temp');
        dayTemp.textContent = dailyTemp + '°F';
        day.appendChild(dayTemp);

        // Add daily minimum & maximum
        const dayMaxMin = document.createElement('div');
        dayMaxMin.setAttribute('class', 'day-maxmin');
        dayMaxMin.textContent = 'Max / Min: ' + dailyMax + '° / ' + dailyMin + '°';
        day.appendChild(dayMaxMin);

        // Add daily morning temperature
        const dayMorning = document.createElement('div');
        dayMorning.setAttribute('class', 'day-morning');
        dayMorning.textContent = 'Morning: ' + dailyMorning + '°';
        day.appendChild(dayMorning);

        // Add daily evening temperature
        const dayEvening = document.createElement('div');
        dayEvening.setAttribute('class', 'day-evening');
        dayEvening.textContent = 'Evening: ' + dailyEvening + '°';
        day.appendChild(dayEvening);

        // Add daily night temperature
        const dayNight = document.createElement('div');
        dayNight.setAttribute('class', 'day-night');
        dayNight.textContent = 'Night: ' + dailyNight + '°';
        day.appendChild(dayNight);    
      }
    }
  }
  
  // Send request
  request.send()
}

// Unix to date helper
function unixConverter(ts) {
  var dateObj = new Date(ts * 1000);

  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

  var date = ("0" + dateObj.getDate()).slice(-2);

  return month + "/" + date;
}

