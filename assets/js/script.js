var timeDisplayEl = $('#time-display');

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

setInterval(displayTime, 1000);

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
        
        
            localStorage.setItem('City Name', city);
            var weatherList = currentWeather(data);
            //adds current weather to be displayed on right side of html
            $("#current-weather").html(weatherList);
            //clears out search bar
            $("#search-city").val('')
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=049ec4543fbcbfe824a5ad0d764bbc6d`)
            .then(res => res.json())
            
            .then(fiveDayData => {
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
  return "<h2><strong>Five Day Weather For</strong>:  "+ fiveDayData.name +" </h2>" ;
        //  "<h3><strong>Temperature</strong>: "+ fiveDayData.daily.temp +"&deg;F</h3>" +
        //  "<h3><strong>Weather</strong>: "+ fiveDayData.daily.weather.main +"</h3>" +
        //  "<h3><strong>Description</strong>: "+ fiveDayData.daily.weather.description +"</h3>" +
        //  "<h3><strong>Humidity</strong>: "+ fiveDayData.daily.humidity +"%</h3>" +
        //  "<h3><strong>Wind Speed</strong>: "+ fiveDayData.daily.wind_speed +"mph</h3>" +
        //  "<h3><strong>UV Index</strong>: "+ fiveDayData.daily.uvi +"</h3>";
}

//var latLong = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city , &state, &country + '&appid=049ec4543fbcbfe824a5ad0d764bbc6d',

