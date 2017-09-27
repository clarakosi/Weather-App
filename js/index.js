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
        $("#city").html(
          json.results[0].address_components[3].short_name +
            ", " +
            json.results[0].address_components[5].short_name +
            ", " +
            json.results[0].address_components[6].short_name
        );
      });

      $.getJSON(url, function(json) {
        $("#temp").html(Math.round(json.main.temp) + " °C");
        $("#weather").text(json.weather[0].main);
        $("#icon").attr("src", json.weather[0].icon);
      });

      $(".converter").show();

      $("#toggle-one").on("change", function() {
        if ($("#toggle-one").prop("checked") === false) {
          $.getJSON(url, function(json) {
            $("#temp").html(Math.round(json.main.temp * (9 / 5) + 32) + " °F");
          });
        } else if ($("#toggle-one").prop("checked") === true) {
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