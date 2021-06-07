var timeDisplayEl = $('#time-display');

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

setInterval(displayTime, 1000);

//var myApi = '38246d45daca6900eaed0981bae0766c';
// var currentCity ="";
// var lastCity = "";
// var searchButton = $('#search-button');

// ready DOM
$(document).ready(function() {
// create event listener for form submit button
  $('#search-button').submit(function(event) {
    event.preventDefault();
// create city variable and value from city search input
  var city = $("#search-city").val();
  // if city value is not left blank...
    if (city != '') { 
      //create ajax call to openweather API
      $.ajax({
        //get url with city parameter with city, imperial units, and api key
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + 
        "&APPID=049ec4543fbcbfe824a5ad0d764bbc6d",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
          //console log the data to see api response
          console.log(data);
        }
      });
      //error message with an empty search
    }else{
      $("#error").html('Please Enter a City Name');
    }
  }); 
});
