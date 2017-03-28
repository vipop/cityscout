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
    var cityName = json.data.general.name;
	var country = json.data.general.country;
	var language = json.data.languages[0].name;
	var pop = json.data.general.population;
	var area = json.data.general.area + " km&sup2;";
	var lat = json.data.general.lat;
	var lng = json.data.general.lng;
	var gdp = json.data.general.gdp;
	//Background
	var history = json.data.general.history;
	//Overview
	var ovHappiness = json.data.ratings[0].happiness;
	var ovEntertainment = json.data.ratings[0].entertainment;
    var ovHealthcare = json.data.ratings[0].healthcare;
	var ovEducation = json.data.ratings[0].education;
	var ovHousing = json.data.ratings[0].housing;
	var ovCrime = json.data.ratings[0].crime;
	//Housing and Utilities(large)
	var housing = json.data.housing;
	var utilities = json.data.utilities;
	//Transportation
	var transportation = json.data.transportation;
	//Climate
	
	
	//Entertainment
		
	//Attractions
	
	//Food
	var food = json.data.food;
	//Indices happiness quality of life
	var indices = json.data.indices;
	
	initTopInfo(country, language, pop, area, gdp);
	initCityBanner(city, cityName);
	initMap(parseFloat(lat), parseFloat(lng), document.getElementById("map-div"));
	initBackground(history);
	initOverview(ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
	initHousing(housing);
	initUtilities(utilities);
	initTransportation(transportation);
	initIndices(indices);
	initFood(food);
	loadComments(json); //This function is defined in the comments.js
}
function getCityInformation(city){
	var url = "cgi-bin/queries.php";
	var params = "type=QUERY_CITY&city_id=" + city;
	sendRequest(url,params,
			function(result){
                var json = JSON.parse(result);
                console.log(result);
                console.log(json);
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

function initCityBanner(city, cityName){
	document.getElementById("header-text").innerHTML = cityName.toUpperCase();
	document.getElementById("header").style.backgroundImage = "url('images/" + city + "Image.jpg')";
}

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

function initHousing(house){
	var i;
	for(i = 0; i < house.length; i++){
		var p = document.createElement("P");
		var t = document.createTextNode(house[i].type + " " + house[i].cost_desc + house[i].cost);
		p.appendChild(t);
		document.getElementById("housing").appendChild(p);
	}
};
function initUtilites(uti){
	var i;
	for(i = 0; i < uti.length; i++){
		var p = document.createElement("P");
		var t = document.createTextNode(uti[i].type + " " + uti[i].cost_desc + uti[i].cost);
		p.appendChild(t);
		document.getElementById("housing").appendChild(p);
	}
};
function initTransportation(tran){
	var i;
	for(i = 0; i < tran.length; i++){
		var p = document.createElement("P");
		var t = document.createTextNode(tran[i].type + " " + tran[i].cost_desc + tran[i].cost);
		p.appendChild(t);
		document.getElementById("transportation").appendChild(p);
	}
};
function initIndices(ind){
	var i;
	for(i = 0; i < ind.length; i++){
		var p = document.createElement("P");
		var t = document.createTextNode(ind[i].name + " " + ind[i].value_desc + tran[i].value);
		p.appendChild(t);
		document.getElementById("politics").appendChild(p);
	}
};
function initFood(food){
	var i;
	for(i = 0; i < food.length; i++){
		var p = document.createElement("P");
		var t = document.createTextNode(food[i].name + " " + ind[i].cost_desc + tran[i].cost);
		p.appendChild(t);
		document.getElementById("food").appendChild(p);
	}
};
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
