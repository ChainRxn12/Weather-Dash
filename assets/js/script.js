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
            //add future forecast to displayed beneath the current weather 
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
         "<h3><strong>Wind Speed</strong>: "+ data.wind.speed +"mph</h3>" ;
         
}
//function and for loop for the five day data forecast
function weatherForecast(fiveDayData) {
  let fiveDayForecastHTML = `
  <h2>5-Day Forecast:</h2>
  <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
  // Loop over the forecast and build the template HTML using UTC offset and Open Weather Map icon
  for (let i = 0; i < fiveDayData.daily.length-3; i++) {
      let dayData = fiveDayData.daily[i];
      let dayTimeUTC = dayData.dt;
      let timeZoneOffset = fiveDayData.timezone;
      let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
      let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
      let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
      
      var uvClass
        if (dayData.uvi <= 2) {
          uvClass = "uv-favorable"
        }else if (dayData.uvi > 2 && dayData.uvi < 6) {
          uvClass = "uv-moderate" 
        }else if (dayData.uvi > 6 && dayData.uvi >= 10) {
          uvClass = "uv-high" 
        }
          // converting the data to the html as a list on cards
          fiveDayForecastHTML += `
          <div class="weather-card card m-2 p0">
              <ul class="list-unstyled p-3">
                  <li>${thisMoment.format("MM/DD/YY")}</li>
                  <li class="weather-icon"><img src="${iconURL}"></li>
                  <li>Temp: ${dayData.temp.day}&#8457;</li>
                  <li>Weather: ${dayData.weather[0].main}</li>
                  <li>Desc.: ${dayData.weather[0].description}<li>
                  <li>Humidity: ${dayData.humidity}%</li>
                  <li>Wind Speed: ${dayData.wind_speed} mph<li>
                  <li class=${uvClass}>UV Index: ${dayData.uvi}<li>
              </ul>
          </div>`;
      console.log(dayData.temp);
      
  }
  // Build the HTML template
  fiveDayForecastHTML += `</div>`;
  return fiveDayForecastHTML;
}




//var latLong = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city , &state, &country + '&appid=049ec4543fbcbfe824a5ad0d764bbc6d',

