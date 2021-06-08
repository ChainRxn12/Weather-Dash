var timeDisplayEl = $('#time-display');

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

setInterval(displayTime, 1000);

var currentCity = "";
var lastCity = "";

// ready DOM
$(document).ready(function() {
// create event listener for form submit button
  $('#search-button').click(function(event) {
    event.preventDefault();
// create city variable and value from city search input
  var city = $("#search-city").val();
  
  // if city value is not left blank...
    if (city !== '') { 
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + 
      "&APPID=049ec4543fbcbfe824a5ad0d764bbc6d")
      .then(res => res.json())
      .then(data => {
        
            console.log(data);
            localStorage.setItem('City Name', city);
            var weatherList = currentWeather(data);
            //adds current weather to be displayed on right side of html
            $("#current-weather").html(weatherList);
            //clears out search bar
            $("#search-city").val('')
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=minutely,hourly,alerts&appid=049ec4543fbcbfe824a5ad0d764bbc6d`)
            .then(res => res.json())
            .then(fiveDayData => {
              console.log(fiveDayData);
              var fiveDayWeather = weatherForecast(fiveDayData);
              $("#five-day-forecast").html(fiveDayWeather);
            })
        })
      
   
      //error message with an empty search
    }else{
      $("#error").html('Please Enter a City Name');
    }
  }); 
});

function currentWeather(data) {
  return "<h2><strong>Current Weather For</strong>: <img src='http://openweathermap.org/img/wn/"+data.weather[0].icon+".png'> "+ data.name +" </h2>" +
         //"<h3><strong>Date</strong>: "+ data.dt +"</h3>" +
         "<h3><strong>Temperature</strong>: "+ data.main.temp +"&deg;F</h3>" +
         "<h3><strong>Weather</strong>: "+ data.weather[0].main +"</h3>" +
         "<h3><strong>Description</strong>: "+ data.weather[0].description +"</h3>" +
         "<h3><strong>Humidity</strong>: "+ data.main.humidity +"%</h3>" +
         "<h3><strong>Wind Speed</strong>: "+ data.wind.speed +"mph</h3>" +
         "<h3><strong>UV Index</strong>: "+ data.weather[0].main +"</h3>";
}

function weatherForecast(fiveDayData) {
  let fiveDayForecastHTML = `
  <h2>5-Day Forecast:</h2>
  <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
  // Loop over the forecast and build the template HTML using UTC offset and Open Weather Map icon
  for (let i = 0; i < fiveDayData.daily.length; i++) {
      let dayData = fiveDayData.daily[i];
      let dayTimeUTC = dayData.dt;
      let timeZoneOffset = fiveDayData.timezone;
      let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
      let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
      let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
      // Only displaying mid-day forecasts
      if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
          fiveDayForecastHTML += `
          <div class="weather-card card m-2 p0">
              <ul class="list-unstyled p-3">
                  <li>${thisMoment.format("MM/DD/YY")}</li>
                  <li class="weather-icon"><img src="${iconURL}"></li>
                  <li>Temp: ${dayData.daily.temp}&#8457;</li>
                  <br>
                  <li>Humidity: ${dayData.daily.humidity}%</li>
              </ul>
          </div>`;
      }
      return fiveDayForecastHTML;
  }
  // Build the HTML template
  fiveDayForecastHTML += `</div>`;
  // Append the five-day forecast to the DOM
  $('#five-day-forecast').html(fiveDayForecastHTML);
}

  
  //"<h2><strong>Five Day Weather For</strong>:  "+ fiveDayData.name +" </h2>" ;
        //  "<h3><strong>Temperature</strong>: "+ fiveDayData.daily.temp +"&deg;F</h3>" +
        //  "<h3><strong>Weather</strong>: "+ fiveDayData.daily.weather.main +"</h3>" +
        //  "<h3><strong>Description</strong>: "+ fiveDayData.daily.weather.description +"</h3>" +
        //  "<h3><strong>Humidity</strong>: "+ fiveDayData.daily.humidity +"%</h3>" +
        //  "<h3><strong>Wind Speed</strong>: "+ fiveDayData.daily.wind_speed +"mph</h3>" +
        //  "<h3><strong>UV Index</strong>: "+ fiveDayData.daily.uvi +"</h3>";




// var currentWeather = () => {
//   $('#city-results').empty();
//   // If localStorage is empty
//   if (localStorage.length===0){
//       if (lastCity){
//           $('#search-city').attr("value", lastCity);
//       } else {
//           $('#search-city').attr("value", "Austin");
//       }
//   } else {
//       // Build key of last city written to localStorage
//       let lastCityKey="cities"+(localStorage.length-1);
//       lastCity=localStorage.getItem(lastCityKey);
//       // Set search input to last city searched
//       $('#search-city').attr("value", lastCity);
//       // Append stored cities to page
//       for (let i = 0; i < localStorage.length; i++) {
//           let city = localStorage.getItem("cities" + i);
//           let cityEl;
//           // Set to lastCity if currentCity not set
//           if (currentCity===""){
//               currentCity=lastCity;
//           }
//           // Set button class to active for currentCity
//           if (city === currentCity) {
//               cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
//           } else {
//               cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
//           } 
//           // Append city to page
//           $('#city-results').prepend(cityEl);
//       }
//       // Add a "clear" button to page if there is a cities list
//       if (localStorage.length>0){
//           $('#clear-storage').html($('<a id="clear-storage" href="#">clear</a>'));
//       } else {
//           $('#clear-storage').html('');
//       }
//   }
  
// }

// // Old searched cities buttons event listener
// $('#city-results').on("click", (event) => {
//   event.preventDefault();
//   $('#search-city').val(event.target.textContent);
//   currentCity=$('#search-city').val();
//   currentWeather(event);
// });

//var latLong = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city , &state, &country + '&appid=049ec4543fbcbfe824a5ad0d764bbc6d',

