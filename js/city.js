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
	var languages = json.data.languages;
	var pop = json.data.general.population +"M";
	var area = json.data.general.area + " km&sup2;";
	var lat = json.data.general.lat;
	var lng = json.data.general.lng;
	var gdp = json.data.general.gdp + "B";
	//Background
	var history = json.data.general.history;
	//Overview
	var ovHappiness = roundNum(json.data.ratings[0].happiness);
	var ovEntertainment = roundNum(json.data.ratings[0].entertainment);
    	var ovHealthcare = roundNum(json.data.ratings[0].healthcare);
	var ovEducation = roundNum(json.data.ratings[0].education);
	var ovHousing = roundNum(json.data.ratings[0].housing);
	var ovCrime = roundNum(json.data.ratings[0].crime);
	//Housing and Utilities
	var housing = json.data.housing;
	var utilities = json.data.utilities;
   	//Transportation
	var transportation = json.data.transportation;
	//Climate
	var climate = json.data.climate;
	//Entertainment
	var entertainments = json.data.entertainment;
	//Attractions
	var attractions = json.data.attractions;
	//Food
	var food = json.data.food;
	//Indices happiness quality of life
	var indices = json.data.indices;

	initTopInfo(country,language, pop, area, gdp);
	initCityBanner(city, cityName);
	initMap(parseFloat(lat), parseFloat(lng), document.getElementById("map-div"));
	initBackground(history);
	initOverview(ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
	initHousing(housing);
	initUtilities(utilities);
	initTransportation(transportation);
	initEntertainment(entertainments);
	initAttraction(attractions)
	initIndices(indices);
	initFood(food);
						

	var tempLang = [{"lang":languages,"theId":document.getElementById("languages-chart-div")}];
	var tempClimate = [{"climate":climate[0],"theTemp":document.getElementById("climate-bar-temp"),"theFall":document.getElementById("climate-bar-fall")}];
	var tempUtility = [{"uti":utilities,"theId":document.getElementById("utilities-chart-div")}];
	
	prepareGraphs();
	loadGraphs(tempLang,tempClimate,tempUtility);
	loadComments(json); //This function is defined in the comments.js
}
function roundNum(number){
	return  Math.round(number * 10)/10;
};
function getCityInformation(city){
	var url = "cgi-bin/queries.php";
	var params = "type=QUERY_CITY&city_id=" + city;
	sendRequest(url,params,
			function(result){
                console.log(result);
                var json = JSON.parse(result);
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
	// set color,text and width of housing bar
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
	resetFields("housingDisplay")
	for(i = 0; i < house.length; i++){
		if(house[i].type == "Apartment" ){
			if(house[i].payment =="Buy"){
				var temp1 = house[i].cost_desc.split("/");
				initHousingHelper("building",house[i].payment,house[i].cost,temp1[0],"/" + temp1[1]);
			}else{
				var temp = house[i].cost_desc.split("/");
				initHousingHelper("building",house[i].payment,house[i].cost,temp[0],"/" + temp[1]);
			}
		}
		else {
			if(house[i].payment =="Buy"){
				var temp1 = house[i].cost_desc.split("/");
				initHousingHelper("home",house[i].payment,house[i].cost,temp1[0],"/" + temp1[1]);
			}else{
				var temp = house[i].cost_desc.split("/");
				initHousingHelper("home",house[i].payment,house[i].cost,temp[0],"/" + temp[1]);
			}
		}
	}
};
function initUtilities(utilities){
	var i;
	for(i = 0; i < utilities.length;i++){
		if(utilities[i].type == "Utilities"){
			var temp = utilities[i].cost_desc.split("/");
			document.getElementById("utilities-total").innerHTML = "Average Total Utilities: " + temp[0] + utilities[i].cost +"/"+ temp[1];
		}
	}

}
function initHousingHelper(glif,payment,cost,pre,post){
	var h4El = document.createElement("H4");
	var div = document.createElement("DIV");
	div.setAttribute("class","flex");
	var spanEl = document.createElement("SPAN");
	spanEl.setAttribute("class","fa fa-"+glif +" global-glyphs");
	var headerText = document.createTextNode("Average " + payment);
	div.appendChild(spanEl);
	div.appendChild(headerText);
	var h4 = document.createElement("H4");
	h4.setAttribute("style","padding-top:5px;text-align:center");
	h4.innerHTML = pre + cost + post;
	h4El.appendChild(div);
	h4El.appendChild(h4);
	document.getElementById("housingDisplay").appendChild(h4El);
}

function initTransportation(tran){
	var i;
	resetFields("transportation");
	for(i = 0; i < tran.length; i++){
		var temp = tran[i].cost_desc.split("/");
		if(temp[1] != null){
			printHelper(tran[i].type,tran[i].cost,temp[0],temp[1],"/","transportation");
		}else{
			printHelper(tran[i].type,tran[i].cost,temp[0],"","/","transportation");
		}
	}
};

function initIndices(ind){
	var i;
	resetFields("qualityOfLife");
	for(i = 0; i < ind.length; i++){
		var temp = ind[i].value_desc.split("/");
		if(temp[1] != undefined){
			console.log("here");
			printHelperWithToopTip(ind[i].name,ind[i].value,temp[0],temp[1],"qualityOfLife");
		}else{
			printHelperWithToopTip(ind[i].name,ind[i].value,"",temp[0],"qualityOfLife");
		}
	}	
};

function printHelperWithToopTip(headerText,value,post,toolText,panelId){
	
	var row = document.createElement("DIV");
	row.setAttribute("class","row flex");
	var headDiv = document.createElement("DIV");
	var iconDiv = document.createElement("DIV");
	var pDiv = document.createElement("DIV");
	
	iconDiv.setAttribute("class","col-xs-2 col-sm-2 col-md-2 col-lg-2 textCenter removePadding");
	iconDiv.setAttribute("style","padding-top:8px");
	headDiv.setAttribute("class","col-xs-5 col-sm-5 col-md-6 col-lg-5 removePadding");
	
	pDiv.setAttribute("class","col-xs-5 col-sm-5 col-md-4 col-lg-5 removePadding");
				
	var theIcon = getIcon(headerText);
	var iconSpan = document.createElement("SPAN");
	iconSpan.setAttribute("class",theIcon + " center-block 16pt global-glyphs");
	iconSpan.setAttribute("data-toggle","tooltip");
	iconSpan.setAttribute("title", toolText);
	iconDiv.appendChild(iconSpan);
	var h4 = document.createElement("H4");
	var hText = document.createTextNode(headerText);
	h4.setAttribute("data-toggle","tooltip");
	h4.setAttribute("title", toolText);
	h4.setAttribute("style","width:40px");
	h4.appendChild(hText);
	headDiv.appendChild(h4);

	var p = document.createElement("H4");
	var pText = document.createTextNode(value + post);
	p.appendChild(pText);
	pDiv.appendChild(p);
	
		
	row.appendChild(iconDiv);
	row.appendChild(headDiv);
	row.appendChild(pDiv);
	document.getElementById(panelId).appendChild(row);
	$('[data-toggle="tooltip"]').tooltip();
};

function initFood(food){
	var i;
	resetFields("food");
	for(i = 0; i < food.length; i++){
		var temp = food[i].cost_desc.split("/");
		if(temp[1] != undefined){
			printHelper(food[i].type,food[i].cost,temp[0],temp[1],"/","food");
		}else{
			printHelper(food[i].type,food[i].cost,temp[0],"","","food");
		}
	}
};

function initEntertainment(ent){
	var i;
	resetFields("entertainment");
	for(i = 0; i < ent.length; i++){
		var temp = ent[i].cost_desc.split("/");
		if(temp[1] != undefined){
			printHelper(ent[i].type,ent[i].cost,temp[0],temp[1],"/","entertainment");
		}else{
			printHelper(ent[i].type,ent[i].cost,temp[0],"","","entertainment");
		}
	}
};
function printHelper(headerText,value,pre,post,divider,panelId){
		var row = document.createElement("DIV");
		row.setAttribute("class","row flex");
		var headDiv = document.createElement("DIV");
		var iconDiv = document.createElement("DIV");
		var pDiv = document.createElement("DIV");
		
		iconDiv.setAttribute("class","col-xs-2 col-sm-2 col-md-2 col-lg-2 textCenter removePadding");
		iconDiv.setAttribute("style","padding-top:8px");
		headDiv.setAttribute("class","col-xs-5 col-sm-5 col-md-6 col-lg-5 removePadding");
		pDiv.setAttribute("class","col-xs-5 col-sm-5 col-md-4 col-lg-5 removePadding");
				
		var theIcon = getIcon(headerText);
		var iconSpan = document.createElement("SPAN");
		iconSpan.setAttribute("class",theIcon + " center-block 16pt global-glyphs");
		iconDiv.appendChild(iconSpan);
		
		var h4 = document.createElement("H4");
		var hText = document.createTextNode(headerText);
		h4.appendChild(hText);
		headDiv.appendChild(h4);
		
		var p = document.createElement("H4");
		var pText = document.createTextNode(pre + value + divider + post);
		p.appendChild(pText);
		pDiv.appendChild(p);
		
		row.appendChild(iconDiv);
		row.appendChild(headDiv);
		row.appendChild(pDiv);
		document.getElementById(panelId).appendChild(row);
}
function initAttraction(att){
	var i;
	resetFields("attractions");
	for(i = 0; i < att.length; i++){
		var temp = att[i].cost_desc.split("/");
		if(temp[1] != undefined){
			initAttractionHelper(att[i].name,att[i].about,att[i].cost,temp[0],temp[1],att[i].image,att[i].link,att[i].location,"attractions");
		}else{
			initAttractionHelper(att[i].name,att[i].about,att[i].cost,temp[0],"",att[i].image,att[i].link,att[i].location,"attractions");
		}
	}
}

function initAttractionHelper(name,about,cost,pre,post,imgUrl,webLink,location,panelId){
	var containerDiv = document.createElement("DIV");
	var table = document.createElement("TABLE");
	var tr = document.createElement("Tr");
	var tdImg = document.createElement("Td");
	tdImg.setAttribute("class","imgTd");
	var tdContent =document.createElement("Td");

	var img = document.createElement("IMG");
	img.setAttribute("class","attractImg");
	img.setAttribute("src",imgUrl);


	var h3 = document.createElement("H3");
	h3.setAttribute("class","paddingNeeded");
	var h3Text = document.createTextNode(name);
	h3.appendChild(h3Text);

	var aboutP = document.createElement("P");
	aboutP.setAttribute("class","paddingNeeded");
	var aboutPText = document.createTextNode("Description: " + about);
	aboutP.appendChild(aboutPText);

	var costP = document.createElement("P");
	costP.setAttribute("class","paddingNeeded");
	var costPText = document.createTextNode("Cost: " + pre + cost +"/"+ post);
	costP.appendChild(costPText);

	var locationP = document.createElement("P");
	locationP.setAttribute("class","paddingNeeded");
	var locationPText = document.createTextNode("Address: " + location);
	locationP.appendChild(locationPText);

	var linkA = document.createElement("A");
	linkA.setAttribute("class","paddingNeeded");
	linkA.setAttribute("href",webLink);
	var linkAText = document.createTextNode("Website: " + webLink);
	linkA.appendChild(linkAText);


	tdImg.appendChild(img);
	tdContent.appendChild(h3);
	tdContent.appendChild(aboutP);
	tdContent.appendChild(costP);
	tdContent.appendChild(locationP);
	tdContent.appendChild(linkA);

	tr.appendChild(tdImg);
	tr.appendChild(tdContent);
	table.appendChild(tr);
	containerDiv.appendChild(table);
	document.getElementById(panelId).appendChild(containerDiv);

}
function getIcon(type){
	switch (type){
		case "Subway":
			return "fa fa-subway";
		case "Train":
			return "fa fa-train";
		case "Gas":
			return "fa fa-fire";
		case "Bus":
			return "fa fa-bus";			
		case "Taxi":
			return "fa fa-taxi";			
		case "Rideshare":
			return "fa fa-car";
		//food
		case "Vegetables":
			return "fa fa-leaf";
		case "Fruits":
			return "fa fa-apple";
		case "Dairy":
			return "fa fa-tint";
		case "Grains":
			return "fa fa-pagelines";
		case "Protein":
			return "fa fa-github-alt";
		//Entertainment
		case "Sports":
			return "fa fa-futbol-o"; 
		case "Movies":
			return "fa fa-video-camera";
		case "Theatre":
			return "fa fa-ticket";
		case "Concert":
			return "fa fa-music";
		default:
			return "fa fa-caret-right";
			break;
	}	
};
function resetFields(parentID){
	while(document.getElementById(parentID).firstChild){
		document.getElementById(parentID).removeChild(document.getElementById(parentID).firstChild);
	}
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
	  draggable: false,
	  scrollwheel: false,
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
//Overview tooltips
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});