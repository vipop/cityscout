window.onload = function() {
	// Toronto
	var lat = 43.6532;
	var lon = -79.3832;
	initMap(lat, lon, document.getElementById("map-div"));
	loadPage();
};

function loadPage(){
	console.log("hello");
	var search = new URLSearchParams(window.location.search);
	var cityName = search.get('city');
	//Queary database with cityName
	if(cityName != undefined){
		displayInformation(cityName);
	}
	//hide link untill user sign in
	//hidePageLinks();
};
// Display Information function
function displayInformation(aCity){
	if(aCity == "losAngeles") document.getElementById("header-text").innerHTML = "LOS ANGELES";
	else if(aCity == "newYork") document.getElementById("header-text").innerHTML = "NEW YORK";
	else document.getElementById("header-text").innerHTML = aCity.toUpperCase();
	displayImage(aCity);
};
// Display Image function
function displayImage(aCity){
	switch(aCity){
		case "vancouver":
			document.getElementById("header").style.backgroundImage = "url('images/vancouverImage.jpg')";
			break;
		case "montreal":
			document.getElementById("header").style.backgroundImage = "url('images/vancouverImage.jpg')";
			break;
		case "newYork":
			document.getElementById("header").style.backgroundImage = "url('images/newYorkImage.jpg')";
			break;
		case "losAngeles":
			document.getElementById("header").style.backgroundImage = "url('images/losAngelesImage.jpg')";
			break;
		case "london":
			document.getElementById("header").style.backgroundImage = "url('images/londonImage.jpg')";
			break;
		case "paris":
			document.getElementById("header").style.backgroundImage = "url('images/parisImage.jpg')";
			break;
		case "shanghai":
			document.getElementById("header").style.backgroundImage = "url('images/shanghaiImage.jpg')";
			break;
		case "tokyo":
			document.getElementById("header").style.backgroundImage = "url('images/tokyoImage.jpg')";
			break;
		case "bucharest":
			document.getElementById("header").style.backgroundImage = "url('images/bucharestImage.jpg')";
			break;
		default:
			document.getElementById("header").style.backgroundImage = "url('images/torontoImage.jpg')";
	}
};
//log in clicked
// need to check database
/*function logIn(){
	console.log("unhide");
	unhidePageLinks();
};
//Hides links from user
function hidePageLinks(){
	console.log("hide");
	document.getElementById("pageLinks").style.display = 'none';
};*/
//Call this function when user signs in
function unhidePageLinks(){
	document.getElementById("pageLinks").style.display = 'block';
};
$(document.body)
.on('show.bs.modal', function () {
	fixModalPadding();
})
.on('hidden.bs.modal', function () {
    fixModalPadding();
});

function fixModalPadding() {
	document.getElementsByTagName("body")[0].removeAttribute("style");
	document.getElementsByTagName("body")[0].removeAttribute("class");
}

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
