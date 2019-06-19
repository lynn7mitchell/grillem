// MATERIALIZE FEATURES
$(document).ready(function () {
  $('.sidenav').sidenav();
  $('#modal1').modal();
});

// GET LOCATION
navigator.geolocation.getCurrentPosition(function (position) {
  var pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log(pos)
});


var map;
var service;
var infowindow;
var pos;
var nearbyStore;
navigator.geolocation.getCurrentPosition(function (position) {
  pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log(pos)
  var pyrmont = new google.maps.LatLng(pos.lat, pos.lng);

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: '15000',
    type: ['supermarket']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


});



function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      // createMarker(results[i]);
    }
    nearbyStore = results[0].name;
    $("#nearby-store").text(nearbyStore);
    console.log(results)
    console.log(nearbyStore)
  }
}
