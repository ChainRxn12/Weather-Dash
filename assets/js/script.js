var timeDisplayEl = $('#time-display');

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

setInterval(displayTime, 1000);

 //var myApi = '38246d45daca6900eaed0981bae0766c';
// var currentCity ="";
// var lastCity = "";
// var city = $('#searchCity').val();
// var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + myApi;

// $(document).ready(function() {
//   //create event listener for search button
//     $('#search-button').click(function() {
//   //create city variables with button id    
//       var city = $('#searchCity').val();
//       if(city != '') {
//   //retrieve data from open weather api      
//         $.ajax({
//           url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&APPID=38246d45daca6900eaed0981bae0766c',
//           method: "GET",
//           dataType: "jsonp",
//           data: {
//             q: city,
//             appid: myApi,
//             units: "imperial",
//             cnt: "10",
//           },
//           success: function(data){
//             console.log('Received data:' , data);
//             var weatherForecast = "";
//             weatherForecast += "<h2>" + data.city.name + "</h2>"; 
//             $.each(data.list, function(index, val) {
//               weatherForecast += "<p>" 
//               weatherForecast += "<b>Day" + index + "</b>:"
//               weatherForecast += val.main.temp + "&degF"
//               weatherForecast += "<span> | " + val.weather[0].description + "</span>";
//               weatherForecast += "img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
//               weatherForecast += "</p>"
//             });
//             $("showWeatherForecast").html(weatherForecast);
//           }
//         });
//   //display error message when search field 
//       }else {
//         $('#error').html('Field cannot be empty');
//       }
//     });
// });
var city = $('#searchCity').val();
var searchButton = $('#search-button');

function getApi() {
  var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&APPID=38246d45daca6900eaed0981bae0766c';

  fetch(requestUrl) 
    if(city != '') {
      .then(function (response) {
        
      })
    }
 

  }
searchButton.addEventListener('click' , getApi);