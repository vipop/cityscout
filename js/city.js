document.addEventListener("DOMContentLoaded", function(event) {
   if(sessionStorage.getItem("userId") != null){
		displayFullContent();
	}
});
window.onload = function() {
	city = getCity();
	getCityInformation(city); //queries from database
	
};

function loadCity(city, json){
	//top basic information
	var country = json.data.general.country;
	var language = json.data.languages[0].name;
	var pop = json.data.general.population;
	var area = json.data.general.area+"&sup2;";
	var lat = json.data.general.lat;
	var lng = json.data.general.lng;
	var gdp = json.data.general.gdp;
	//Background 
	var history = json.data.general.history;	
	//Overview 
	var ovHappiness = json.data.rating.happiness;
	var ovEntertainment = json.data.rating.entertainment;
	var ovEducation = json.data.rating.education;
	var ovHousing = json.data.rating.housing;
	var ovCrime = json.data.rating.crime;
	//Transportation
	
	//Education
	//Entertainment
	//Food
}
	// replace this with database queries
	initTopInfo(country,language, pop, area,gdp);
	initCityBanner(city);
	initMap(lat,lng, document.getElementById("map-div"));
	initBackground(history);
	initOverview(ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
	loadComments(json); //This function is defined in the comments.js
}
function getCityInformation(city){
	var url = "cgi-bin/queries.php";
	var params = "type=QUERY_CITY&city_id=" + city;
	sendRequest(url,params,
			function(result){
				var json = JSON.parse(result);
				if(json.code == 0){
					loadCity(city, json);
					//return json;
				}
			},function(){
			console.log("Fail to receive city information");
	});
}
function getCity(){
	var search = new URLSearchParams(window.location.search);
	var city = search.get('city');
	return city;
};

function initTopInfo(country, lang, pop, area, gdp) {
	document.getElementById("top-info-country").innerHTML = country;
	document.getElementById("top-info-lang").innerHTML = lang;
	document.getElementById("top-info-pop").innerHTML = pop;
	document.getElementById("top-info-area").innerHTML = area;
	document.getElementById("top-info-gdp").innerHTML = gdp;
}

function initCityBanner(city){
	if(city == "losAngeles") document.getElementById("header-text").innerHTML = "LOS ANGELES";
	else if(city == "newYork") document.getElementById("header-text").innerHTML = "NEW YORK";
	else document.getElementById("header-text").innerHTML = city.toUpperCase();
	document.getElementById("header").style.backgroundImage = "url('images/" + city + "Image.jpg')";
};
function initBackground(background) {
	document.getElementById("background").innerHTML = background;
}
function initOverview(ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime) {
	// set color, text and width of happiness bar
	document.getElementById("ov-happiness-bar").style["background-color"] = "#eec485";
	document.getElementById("ov-happiness").innerHTML = ovHappiness + " / 5";
	document.getElementById("ov-happiness-bar").style.width = ovHappiness * 20 + "%";
	// set color, text and width of entertainment bar
	document.getElementById("ov-entertainment-bar").style["background-color"] = "#80ba52";
	document.getElementById("ov-entertainment").innerHTML = ovEntertainment + " / 5";
	document.getElementById("ov-entertainment-bar").style.width = ovEntertainment * 20 + "%";
	// set color, text and width of healthcare bar
	document.getElementById("ov-healthcare-bar").style["background-color"] = "#b44545";
	document.getElementById("ov-healthcare").innerHTML = ovHealthcare + " / 5";
	document.getElementById("ov-healthcare-bar").style.width = ovHealthcare * 20 + "%";
	// set color, text and width of education bar
	document.getElementById("ov-education-bar").style["background-color"] = "#2c5a71";
	document.getElementById("ov-education").innerHTML = ovEducation + " / 5";
	document.getElementById("ov-education-bar").style.width = ovEducation * 20 + "%";
	// set color, text and width of housing bar
	document.getElementById("ov-housing-bar").style["background-color"] = "lightpink";
	document.getElementById("ov-housing").innerHTML = ovHousing + " / 5";
	document.getElementById("ov-housing-bar").style.width = ovHousing * 20 + "%";
	// set color, text and width of crime bar
	document.getElementById("ov-crime-bar").style["background-color"] = "#555555";
	document.getElementById("ov-crime").innerHTML = ovCrime + " / 5";
	document.getElementById("ov-crime-bar").style.width = ovCrime * 20 + "%";
}

function compare(){
	var id = getCity();
	document.location.href = "compare.html?city=" + id;
};

function initMap(latitude, longitude, container) {
    var location = {lat: latitude, lng: longitude};
    var map = new google.maps.Map(container, {
      zoom: 5,
      center: location,
	  styles: [{"featureType": "road","elementType": "labels","stylers": [{"visibility": "off"}]},
    			{"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]},
    			{"featureType": "transit","elementType": "labels.text","stylers": [{"visibility": "off"}]}]
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
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
  	});
}
