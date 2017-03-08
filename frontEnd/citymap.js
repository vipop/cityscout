window.onload = function() {
	// Toronto
	var lat = 43.6532;
	var lon = -79.3832;
	initMap(lat, lon, document.getElementById("map-div"));
};

function initMap(latitude, longitude, container) {
    var location = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(container, {
      zoom: 5,
      center: location,
	  styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},
	  {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},
	  {"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},
	  {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},
	  {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},
	  {"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},
	  {"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
	  {"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}]
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
	var geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;
	var latlng = {lat: latitude, lng: longitude};
	geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === 'OK') {
	      if (results[0]) {
	        map.setZoom(9);
	        /*var marker = new google.maps.Marker({
	          position: latlng,
	          map: map
	        });
	        infowindow.setContent(results[0].formatted_address);
	        infowindow.open(map, marker);
			*/
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
  	});
}
