/*

The example API for yahoo weather.

var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";*/

/*
The three sections of the API.
*/

// The yahoo api to the weather app.
var preurl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
var midurl = "%2C%20";
var posturl = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

var getForecast = function (buildURL) {
    $.getJSON (buildURL, postConditions);

//               function(jd) {
//                   $("#result").html(jd);
//                   console.log(jd.query.results.channel.item.forecast[0]);
//               });
}

//var postConditions = function(jd) {
//    $("#result").html(jd);
//    console.log(jd.query.results.channel.item.forecast[0]);
//};

var postConditions = function(jd) {
    console.log(jd.query.results.channel.item);

    // first post the location
    var city = jd.query.results.channel.location.city;
    var region = jd.query.results.channel.location.region;
    $("#location").text(city + region);
    
    $("#date").text(jd.query.results.channel.item.condition.date);
    $("#temp").text(jd.query.results.channel.item.condition.temp);
    $("#conditions").text(jd.query.results.channel.item.condition.text);
    postDayForecast(jd, 0);
}

var postDayForecast = function(jd, dayNum) {
    var forecastObj = jd.query.results.channel.item.forecast[dayNum];
    console.log(forecastObj);
    $("#forecast-0 .forecast-day").text("Today");
    $("#forecast-0 img").attr('src', "/home/norm/Dropbox/manitowoc/coding-temple/jquery/WeatherApp/resources/images/bkn.png");
    $("#forecast-0 .day-conditions").text(forecastObj.text);
    $("#forecast-0 .day-high").text(forecastObj.high);
    $("#forecast-0 .day-low").text(forecastObj.low);
}

var assembleURL = function() {
    var city = $("#city-field")[0].value;
    var state = $("#select-state")[0].value;
    var builtURL = preurl + city + midurl + state + posturl;
    getForecast(builtURL);
    /*console.log(builtURL);*/
    return false;
}

//$("#submit-btn").click(assembleURL);

var populateCountries = function (data){
    //data = eval(data);
    var countriesList = $("#select-country");
    //var iterator = data.entries();
    //var keys = Object.entries(data);
    for(var i = 0; i < data.length; i++){
        countriesList.append("<option value=" + data[i].code + " >" + data[i].name +
                          "</option>");
    }
    console.log(data);
}

// load up the state select dropdown list.

function populateStates(data){
    var statesList = $("#select-state");
    //var keys = Object.entries(data);
    for(var i = 0; i < data.length; i++){
        statesList.append("<option value=" + data[i].abbreviation + " >" + data[i].name +
                          "</option>");
    }
    console.log(data);
}
$.getJSON("https://gist.githubusercontent.com/normcler/05858502b98c56ac9a52913e47262c64/raw/75ab7f5ceb3c1cef5a06ff035aa637fde3bc0852/countries.json", populateCountries);

$.getJSON("https://gist.githubusercontent.com/wholypantalones/9916267/raw/e3181b75204863ddd149b7863e9205ed5f09146a/stateprov.json", populateStates);

/*$.getJSON("https://gist.githubusercontent.com/hello-consumer/747724a59300e3961a993b739ccce9b0/raw/d8677962bf9e2dd157f171391fe2bff7c5192bbf/states.json", populateStates);*/

$("#city-field").focus();

/*function(jd) {var wind = jd.query.results.channel.wind; alert(wind.chill);}*/

    /*<script src="https://query.yahooapis.com/v1/public/yql?q=select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text='chicago, il')&format=json&callback=callbackFunction"></script>*/

/*var callbackFunction = function(data) {
    var wind = data.query.results.channel.wind;
    alert(wind.chill);
};*/

/*$.getJSON('"http://www.example.org/"', 
function(jd) { $('#result').html(jd); });*/
