$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var url =
        "https://fcc-weather-api.glitch.me/api/current?lon=" +
        Math.round(position.coords.longitude) +
        "&lat=" +
        Math.round(position.coords.latitude);

      var GoogleUrl =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        position.coords.latitude +
        "," +
        position.coords.longitude +
        "&key=AIzaSyABbAh6ctLsbX9nJT2S3Y6atbraYBECjk4";

      $.getJSON(GoogleUrl, function(json) {
        $("#city").html(json.results[1].formatted_address);
      });

      $.getJSON(url, function(json) {
        $("#temp").html(Math.round(json.main.temp) + " °C");
        $("#weather").text(json.weather[0].main);
        $("#icon").attr("src", json.weather[0].icon);
      });

      $("[name='my-checkbox']").bootstrapSwitch("onText", " °C");
      $("[name='my-checkbox']").bootstrapSwitch("offText", " °F");

      $("[name='my-checkbox']").bootstrapSwitch("offColor", "success").show();

      $("[name='my-checkbox']").on("switchChange.bootstrapSwitch", function() {
        if ($("[name='my-checkbox']").bootstrapSwitch("state") === false) {
          $.getJSON(url, function(json) {
            $("#temp").html(Math.round(json.main.temp * (9 / 5) + 32) + " °F");
          });
        } else if (
          $("[name='my-checkbox']").bootstrapSwitch("state") === true
        ) {
          $.getJSON(url, function(json) {
            $("#temp").html(Math.round(json.main.temp) + " °C");
          });
        }
      });
    });
  } else {
    $("#weather").html("Geolocation is not supported by this browser.");
  }
});