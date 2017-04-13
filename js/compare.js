var tempLang = [];
var tempClimate = [];
var tempUtil = [];

window.onload = function() {
	var search = new URLSearchParams(window.location.search);
	var city1 = search.get('city');
	if (city1 == undefined) {
		loadPage(2);
	} else {
		loadPage(1);
	}
};

function loadPage(type) {
	// type 1 is with city 1 preloaded
	if (type == 1) {
		// get city 1
		var city1 = getCity();
		getCityInformation(1, city1); //queries from database
		// hide city 2
		hideCity(2);
		document.getElementById("dropdown1").firstChild.nextSibling.innerHTML = getCityName(city1);
	// type 2 is with no cities preloaded
	} else {
		hideCity(1);
		hideCity(2);
	}
}

function getCity(){
	var search = new URLSearchParams(window.location.search);
	var city = search.get('city');
	return city;
};

function populateCity(cityNum, json) {
	console.log("I am here");
	//top basic information
    var cityName = json.data.general.name;
	var country = json.data.general.country;
	var language = json.data.languages[0].name;
	var languages = json.data.languages;
	var pop = json.data.general.population + "M";
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
	var entertainment = json.data.entertainment;
	//Attractions
	var attractions = json.data.attractions;
	//Food
	var food = json.data.food;
	//Indices happiness quality of life
	var indices = json.data.indices;


	if (cityNum == 1) {
		console.log("I am here");
		// populate city 1
		initTopInfo(1, country, language, pop, area, gdp);
		initCityBanner(1, cityName);
		initBackground(1, history);
		initOverview(1, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
		initTransportation(1, transportation);
		initHousing(1, housing);
		initUtilities(1,utilities);
		initFood(1, food);
		initEntertainment(1, entertainment);
		initIndices(1, indices);
		initAttraction(1, attractions);
		titleCityDisplay("cityNameTitle1",cityName);
		var languageObject = {lang:languages, theId:document.getElementById("languages-chart-div1")};
		var climateObject = {climate:climate[0], theTemp: document.getElementById("climate-bar-temp1"),theFall:document.getElementById("climate-bar-fall1")};
		var utilObject = {uti:utilities,theId:document.getElementById("utilities-chart-div1")};
		tempLang[cityNum-1]=languageObject;
		tempClimate[cityNum-1]=climateObject;
		tempUtil[cityNum-1]=utilObject;
		prepareGraphs();
		loadGraphs(tempLang, tempClimate, tempUtil);
	} else {
		// populate city 2
		initTopInfo(2, country, language, pop, area, gdp);
		initCityBanner(2, cityName);
		initBackground(2, history);
		initOverview(2, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
		initTransportation(2, transportation);
		initHousing(2, housing);
		initUtilities(2,utilities);
		initFood(2, food);
		initEntertainment(2, entertainment);
		initIndices(2, indices);
		initAttraction(2, attractions);
		titleCityDisplay("cityNameTitle2",cityName);
		var languageObject = {lang:languages, theId:document.getElementById("languages-chart-div2")};
		var climateObject = {climate:climate[0], theTemp: document.getElementById("climate-bar-temp2"),theFall:document.getElementById("climate-bar-fall2")};
		var utilObject = {uti:utilities,theId:document.getElementById("utilities-chart-div2")};
		tempLang[cityNum-1]=languageObject;
		tempClimate[cityNum-1]=climateObject;
		tempUtil[cityNum-1]=utilObject;
		prepareGraphs();
		loadGraphs(tempLang, tempClimate, tempUtil);
	}
		
}
function roundNum(number){
	return  Math.round(number * 10)/10;
};

function getCityInformation(cityNum, city){
	var url = "cgi-bin/queries.php";
	var params = "type=QUERY_CITY&city_id=" + city;
	sendRequest(url,params,
			function(result){
                console.log(result);
                var json = JSON.parse(result);
                console.log(json);
				if(json.code == 0){
					populateCity(cityNum, json);
					//return json;
				}
			},function(){
			console.log("Fail to receive city information");
	});
}

function initTopInfo(cityNum, country, lang, pop, area, gdp) {
	if (cityNum == 1) {
		// city 1
		document.getElementById("city1-country").innerHTML = country;
		document.getElementById("city1-lang").innerHTML = lang;
		document.getElementById("city1-pop").innerHTML = pop;
		document.getElementById("city1-area").innerHTML = area;
		document.getElementById("city1-gdp").innerHTML = gdp;
	} else {
		// city 2
		document.getElementById("city2-country").innerHTML = country;
		document.getElementById("city2-lang").innerHTML = lang;
		document.getElementById("city2-pop").innerHTML = pop;
		document.getElementById("city2-area").innerHTML = area;
		document.getElementById("city2-gdp").innerHTML = gdp;
	}
}

function initCityBanner(cityNum, city){
	if (cityNum == 1) {
		// city 1
		document.getElementById("header-text1").innerHTML = city;
	} else {
		// city 2
		document.getElementById("header-text2").innerHTML = city;
	}	
};
function initBackground(cityNum, background) {
	if (cityNum == 1) {
		document.getElementById("background1").innerHTML = background;
	} else {
		document.getElementById("background2").innerHTML = background;
	}
}

function initOverview(cityNum, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime) {
	if (cityNum == 1) {
		// City 1
		// set color, text and width of happiness bar
		document.getElementById("ov-happiness-bar1").style["background-color"] = "#eec485";
		document.getElementById("ov-happiness1").innerHTML = ovHappiness + " / 5";
		document.getElementById("ov-happiness-bar1").style.width = ovHappiness * 20 + "%";
		// set color, text and width of entertainment bar
		document.getElementById("ov-entertainment-bar1").style["background-color"] = "#80ba52";
		document.getElementById("ov-entertainment1").innerHTML = ovEntertainment + " / 5";
		document.getElementById("ov-entertainment-bar1").style.width = ovEntertainment * 20 + "%";
		// set color, text and width of healthcare bar
		document.getElementById("ov-healthcare-bar1").style["background-color"] = "#b44545";
		document.getElementById("ov-healthcare1").innerHTML = ovHealthcare + " / 5";
		document.getElementById("ov-healthcare-bar1").style.width = ovHealthcare * 20 + "%";
		// set color, text and width of education bar
		document.getElementById("ov-education-bar1").style["background-color"] = "#2c5a71";
		document.getElementById("ov-education1").innerHTML = ovEducation + " / 5";
		document.getElementById("ov-education-bar1").style.width = ovEducation * 20 + "%";
		// set color, text and width of housing bar
		document.getElementById("ov-housing-bar1").style["background-color"] = "lightpink";
		document.getElementById("ov-housing1").innerHTML = ovHousing + " / 5";
		document.getElementById("ov-housing-bar1").style.width = ovHousing * 20 + "%";
		// set color, text and width of crime bar
		document.getElementById("ov-crime-bar1").style["background-color"] = "#555555";
		document.getElementById("ov-crime1").innerHTML = ovCrime + " / 5";
		document.getElementById("ov-crime-bar1").style.width = ovCrime * 20 + "%";
	} else {
		// City 2
		// set color, text and width of happiness bar
		document.getElementById("ov-happiness-bar2").style["background-color"] = "#eec485";
		document.getElementById("ov-happiness2").innerHTML = ovHappiness + " / 5";
		document.getElementById("ov-happiness-bar2").style.width = ovHappiness * 20 + "%";
		// set color, text and width of entertainment bar
		document.getElementById("ov-entertainment-bar2").style["background-color"] = "#80ba52";
		document.getElementById("ov-entertainment2").innerHTML = ovEntertainment + " / 5";
		document.getElementById("ov-entertainment-bar2").style.width = ovEntertainment * 20 + "%";
		// set color, text and width of healthcare bar
		document.getElementById("ov-healthcare-bar2").style["background-color"] = "#b44545";
		document.getElementById("ov-healthcare2").innerHTML = ovHealthcare + " / 5";
		document.getElementById("ov-healthcare-bar2").style.width = ovHealthcare * 20 + "%";
		// set color, text and width of education bar
		document.getElementById("ov-education-bar2").style["background-color"] = "#2c5a71";
		document.getElementById("ov-education2").innerHTML = ovEducation + " / 5";
		document.getElementById("ov-education-bar2").style.width = ovEducation * 20 + "%";
		// set color, text and width of housing bar
		document.getElementById("ov-housing-bar2").style["background-color"] = "lightpink";
		document.getElementById("ov-housing2").innerHTML = ovHousing + " / 5";
		document.getElementById("ov-housing-bar2").style.width = ovHousing * 20 + "%";
		// set color, text and width of crime bar
		document.getElementById("ov-crime-bar2").style["background-color"] = "#555555";
		document.getElementById("ov-crime2").innerHTML = ovCrime + " / 5";
		document.getElementById("ov-crime-bar2").style.width = ovCrime * 20 + "%";
	}
}

function initTransportation(cityNum, tran){
	var i;
	if (cityNum == 1) {
		// city 1
		resetFields("transportation1");
	} else {
		// city 2
		resetFields("transportation2");
	}
	for(i = 0; i < tran.length; i++){
		var temp = tran[i].cost_desc.split("/");
		if (cityNum == 1) {
			printHelper(tran[i].type,tran[i].cost,temp[0],temp[1],"/","transportation1");
		} else {
			printHelper(tran[i].type,tran[i].cost,temp[0],temp[1],"/","transportation2");
		}
	}
};

function initHousing(cityNum, house){
	var i;
	if (cityNum == 1) {
		resetFields("housingDisplay1");
	} else {
		resetFields("housingDisplay2");
	}
	for(i = 0; i < house.length; i++){
		console.log(house[i].type + " " + house[i].payment);
		if(house[i].type == "Apartment" ){
			if(house[i].payment =="Buy"){
				initHousingHelper(cityNum, "building",house[i].payment,house[i].cost,house[i].cost_desc,"");
			}else{
				var temp = house[i].cost_desc.split("/");
				initHousingHelper(cityNum, "building",house[i].payment,house[i].cost,temp[0],"/"+temp[1]);
			}
		}
		else {
			if(house[i].payment =="Buy"){
				var temp = house[i].cost_desc.split("/");
				initHousingHelper(cityNum, "home",house[i].payment,house[i].cost,temp[0],"/"+temp[1]);
			}else{
				var temp = house[i].cost_desc.split("/");
				initHousingHelper(cityNum, "home",house[i].payment,house[i].cost,temp[0],"/"+temp[1]);
			}
		}
	}
};
function initUtilities(cityNum, utilities){
	var i;
	for(i = 0; i < utilities.length;i++){
		if(utilities[i].type == "Utilities"){
			var temp = utilities[i].cost_desc.split("/");
			if(cityNum == 1){
				document.getElementById("utilities-total-header1").innerHTML = "Average Total Utilities: " + temp[0] + utilities[i].cost +"/"+ temp[1];
			}else{
				document.getElementById("utilities-total-header2").innerHTML = "Average Total: " + temp[0] + utilities[i].cost +"/"+ temp[1];
			}
		}
	}

}
function initHousingHelper(cityNum, glif,payment,cost,pre,post){
	console.log(payment + " " + cost + " " + pre + " " + post);
	var h4El = document.createElement("H4");
	var div = document.createElement("DIV");
	div.setAttribute("class","flex");
	var spanEl = document.createElement("SPAN");
	spanEl.setAttribute("class","fa fa-"+glif);
	var headerText = document.createTextNode("Average " + payment);
	div.appendChild(spanEl);
	div.appendChild(headerText);
	var h4 = document.createElement("H4");
	h4.setAttribute("style","padding-top:5px;text-align:center");
	h4.innerHTML = pre + cost + post;
	h4El.appendChild(div);
	h4El.appendChild(h4);
	if (cityNum == 1) {
		document.getElementById("housingDisplay1").appendChild(h4El);
	} else {
		document.getElementById("housingDisplay2").appendChild(h4El);
	}
};
function initFood(cityNum, food){
	var i;
	if (cityNum == 1) {
		resetFields("food1");
	} else {
		resetFields("food2");
	}
	for(i = 0; i < food.length; i++){
		var temp = food[i].cost_desc.split("/");
		if (cityNum == 1) {
			printHelper(food[i].type,food[i].cost,temp[0],temp[1],"/","food1");
		} else {
			printHelper(food[i].type,food[i].cost,temp[0],temp[1],"/","food2");
		}
	}	
};
function initEntertainment(cityNum, ent){
	var i;
	if (cityNum == 1) {
		resetFields("entertainment1");
	} else {
		resetFields("entertainment2");
	}
	for(i = 0; i < ent.length; i++){
		var temp = ent[i].cost_desc.split("/");
		if (cityNum == 1) {
			printHelper(ent[i].type,ent[i].cost,temp[0],temp[1],"/","entertainment1");
		} else {
			printHelper(ent[i].type,ent[i].cost,temp[0],temp[1],"/","entertainment2");
		}
	}
};

function initIndices(cityNum, ind){
	var i;
	if (cityNum == 1) {
		resetFields("qualityOfLife1");
	} else {
		resetFields("qualityOfLife2");
	}
	for(i = 0; i < ind.length; i++){
		if (cityNum == 1) {
			var temp = ind[i].value_desc.split("/");
			if(temp[1] != undefined){
				printHelperWithToopTip(ind[i].name,ind[i].value,temp[0],temp[1],"qualityOfLife1");
			}else{
				printHelperWithToopTip(ind[i].name,ind[i].value,"",temp[0],"qualityOfLife1");
			}
		} else {
			var temp = ind[i].value_desc.split("/");
			if(temp[1] != undefined){
				printHelperWithToopTip(ind[i].name,ind[i].value,temp[0],temp[1],"qualityOfLife2");
			}else{
				printHelperWithToopTip(ind[i].name,ind[i].value,"",temp[0],"qualityOfLife2");
			}
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
	iconDiv.setAttribute("style","padding-top:1px");
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
function printHelper(headerText,value,pre,post,divider,panelId){
	var row = document.createElement("DIV");
	row.setAttribute("class","row flex");
	var headDiv = document.createElement("DIV");
	var iconDiv = document.createElement("DIV");
	var pDiv = document.createElement("DIV");
	
	iconDiv.setAttribute("class","col-xs-2 col-sm-2 col-md-2 col-lg-2 textCenter removePadding");
	iconDiv.setAttribute("style","padding-top:1px");
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
};

function initAttraction(cityNum, att){
	var i;
	if (cityNum == 1) {
		resetFields("attractions1");
	} else {
		resetFields("attractions2");
	}
	for(i = 0; i < att.length; i++){
		var temp = att[i].cost_desc.split("/");
		if(temp[1] != undefined){
			initAttractionHelper(cityNum, att[i].name,att[i].about,att[i].cost,temp[0],temp[1],att[i].image,att[i].link,att[i].location);
		}else{
			initAttractionHelper(cityNum, att[i].name,att[i].about,att[i].cost,temp[0],"",att[i].image,att[i].link,att[i].location);
		}
	}
}

function initAttractionHelper(cityNum, name,about,cost,pre,post,imgUrl,webLink,location){
	var containerDiv = document.createElement("DIV");
	var table = document.createElement("TABLE");
	var tr = document.createElement("Tr");
	var tdImg = document.createElement("Td");
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
	if (cityNum == 1) {
		document.getElementById("attractions1").appendChild(containerDiv);
	} else {
		document.getElementById("attractions2").appendChild(containerDiv);
	}

}

function resetFields(parentID){
	while(document.getElementById(parentID).firstChild){
		document.getElementById(parentID).removeChild(document.getElementById(parentID).firstChild);
	}
}

function hideCity(cityNum) {
	var i;
	if (cityNum == 1) {
		var city1elements = document.getElementsByClassName("city1");
		for (i = 0; i < city1elements.length; i++) {
			city1elements[i].style.display = "none";
		}
	} else {
		var city2elements = document.getElementsByClassName("city2");
		for (i = 0; i < city2elements.length; i++) {
			city2elements[i].style.display = "none";
		}
	}
}

function showCity(cityNum) {
	var i;
	if (cityNum == 1) {
		var city1elements = document.getElementsByClassName("city1");
		for (i = 0; i < city1elements.length; i++) {
			city1elements[i].removeAttribute("style");
		}
	} else {
		var city2elements = document.getElementsByClassName("city2");
		for (i = 0; i < city2elements.length; i++) {
			city2elements[i].removeAttribute("style");
		}
	}
}

function dropdownSelect(ctl, cityNum) {
	var cityName = ctl.innerText;
	var city;
	switch (cityName) {
		case "Toronto (Canada)":
			city = "toronto";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Toronto (Canada)";
			break;
		case "Vancouver (Canada)":
			city = "vancouver";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Vancouver (Canada)";
			break;
		case "Montreal (Canada)":
			city = "montreal";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Montreal (Canada)";
			break;
		case "New York (USA)":
			city = "newYork";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "New York (USA)";
			break;
		case "Los Angeles (USA)":
			city = "losAngeles";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Los Angeles (USA)";
			break;
		case "London (UK)":
			city = "london";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "London (UK)";
			break;
		case "Paris (France)":
			city = "paris";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Paris (France)";
			break;
		case "Shanghai (China)":
			city = "shanghai";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Shanghai (China)";
			break;
		case "Tokyo (Japan)":
			city = "tokyo";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Tokyo (Japan)";
			break;
		case "Bucharest (Romania)":
			city = "bucharest";
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "Bucharest (Romania)";
			break;
	}

	if (cityNum == 1) {
		getCityInformation(1, city);
		//populateCity(1, city);
		showCity(1);
	} else {
		getCityInformation(2, city);
		//populateCity(2, city);
		showCity(2);
	}
}

function getCityName(city) {
	var name = "";
	switch (city) {
		case "toronto":
			name = "Toronto (Canada)";
			break;
		case "vancouver":
			name = "Vancouver (Canada)";
			break;
		case "montreal":
			name = "Montreal (Canada)";
			break;
		case "newYork":
			name = "New York (Canada)";
			break;
		case "losAngeles":
			name = "Los Angeles (USA)";
			break;
		case "london":
			name = "London (UK)";
			break;
		case "paris":
			name = "Paris (France)";
			break;
		case "shanghai":
			name = "Shanghai (China)";
			break;
		case "tokyo":
			name = "Tokyo (Japan)";
			break;
		case "bucharest":
			name = "Bucharest (Romania)";
			break;
	}
	return name;
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
function titleCityDisplay(titleId,cityName){
	console.log("The cityName in titleCityDisplay: " + cityName);
	var temp = document.getElementsByClassName(titleId);
	console.log("CityDisplay: " + temp);
	var i;
	for(i = 0; i < temp.length; i++){
		console.log(temp[i]);
	temp[i].innerHTML = "(" + cityName + ")"; 
	}
}
