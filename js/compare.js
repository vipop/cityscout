
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

function populateCity(cityNum, city, json) {

	//top basic information
    var cityName = json.data.general.name;
	var country = json.data.general.country;
	var language = json.data.languages[0].name;
	var languages = json.data.languages;
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
	//Housing and Utilities
	var housing = json.data.housing;
	var utilities = json.data.utilities;
    console.log("Utilities: ");
    console.log(utilities);
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

	/*
	// DUMMY DATA

	var country = "Canada";
	var language = "English";
	var pop = "2,991,312";
	var area = "1,400,200" + " km&sup2;";
	var gdp = 1231;

	var languages =[{"name":"english","population":"15"},{"name":"glish","population":"40"},{"name":"ish","population":"45"}];

	var climate ={"high_avg":"20","low_avg":"-10","rainfall":"133","snowfall":"100"};

	var utilities=[{"type": "Electricity","cost_desc": "$/month","cost": "143.07"},{"type": "Water","cost_desc": "$/month","cost": "143.07"},{"type": "Internet","cost_desc":"$/month","cost": "143.07"}];

	var housing = [	{"type":"Appartment","cost_desc":"$/month","cost":"1350","payment":"Rent"},
					{"type":"House","cost_desc":"$","cost":"1280000","payment":"Buy"},
					{"type":"Appartment","cost_desc":"$/month","cost":"1350","payment":"Rent"},
					{"type":"House","cost_desc":"$","cost":"1280000","payment":"Buy"}];

	var transportation =[	{"type": "Subway", "cost_desc": "$/(Adult)", "cost": "3.25"},
							{"type": "Train", "cost_desc": "$", "cost": "5.43"},
							{"type": "Car", "cost_desc": "$/(Adult)", "cost": "3.25"},
							{"type": "Bus", "cost_desc": "$", "cost": "5.43"},
							{"type": "Taxi", "cost_desc": "$", "cost": "3.25"},
							{"type": "RideShare", "cost_desc": "$", "cost": "5.43"}];

	var background = "People have lived in Toronto since shortly after the last ice age. The urban community dates to 1793 when British colonial officials founded the Town of York on what was then the Upper Canadian frontier. That village grew to become the City of Toronto in 1834, and through its subsequent evolution and expansion, Toronto has emerged as one of the most liveable and multicultural urban places in the world."

	var indices = [	{"name": "GDI","value_desc": "", "value": "0.982" },
					{"name": "HDI","value_desc": "", "value": "0.913"},
					{"name": "Unemployment Rate","value_desc":"%","value": "6.5"}];

	var entertainment = [	{"type": "Average cost of dinner (for 2)","cost_desc": "$","cost": "36"},
							{"type": "Average cost of drink","cost_desc": "$","cost": "5.88"},
							{"type": "Movie","cost_desc": "$/ticket","cost": "11"},
							{"type": "Sports","cost_desc": "$/ticket","cost": "250"},
							{"type": "Theatre","cost_desc": "$/ticket","cost": "55"}];

	var food = [	{"type": "Dairy","cost_desc": "$/L","cost": "2.9"},
					{"type": "Fruits","cost_desc": "$/kg","cost": "2.83"},
					{"type": "Grains","cost_desc": "$/Loaf","cost": "1.89"},
					{"type": "Protein","cost_desc": "$/kg","cost": "6.6"},
					{"type": "Vegetables","cost_desc": "$/kg","cost": "1.11"}];

	var attractions = [{"name": "CN Tower",
						"about": "Landmark, over 553-metre tower featuring a glass floor & a revolving eatery with panoramic views.",
						"cost": "47",
						"cost_desc": "$/Adult (13-64)",
						"image": "images/attractions/CNTower.png",
						"link": "http://www.cntower.ca/en-ca/home.html",
						"location": "301 Front St W, Toronto, ON M5V 2T6"
						},
						{"name": "CN Tower",
						"about": "Landmark, over 553-metre tower featuring a glass floor & a revolving eatery with panoramic views.",
						"cost": "47",
						"cost_desc": "$/Adult (13-64)",
						"image": "images/attractions/CNTower.png",
						"link": "http://www.cntower.ca/en-ca/home.html",
						"location": "301 Front St W, Toronto, ON M5V 2T6"
						},
						{"name": "CN Tower",
						"about": "Landmark, over 553-metre tower featuring a glass floor & a revolving eatery with panoramic views.",
						"cost": "47",
						"cost_desc": "$/Adult (13-64)",
						"image": "images/attractions/CNTower.png",
						"link": "http://www.cntower.ca/en-ca/home.html",
						"location": "301 Front St W, Toronto, ON M5V 2T6"
						}];

	//Overview
	var ovHappiness = 3;
	var ovEntertainment = 1;
	var ovHealthcare = 5;
	var ovEducation = 2;
	var ovHousing = 4;
	var ovCrime = 1;

	// DUMMY DATA
	*/

	if (cityNum == 1) {
		// populate city 1
		initTopInfo(1, country, language, pop, area, gdp);
		initCityBanner(1, city);
		initBackground(1, background);
		initOverview(1, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
		initTransportation(1, transportation);
		initHousing(1, housing);
		initFood(1, food);
		initEntertainment(1, entertainment);
		initIndices(1, indices);
		initAttraction(1, attractions);
	} else {
		// populate city 2
		initTopInfo(2, country, language, pop, area, gdp);
		initCityBanner(2, city);
		initBackground(2, background);
		initOverview(2, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
		initTransportation(2, transportation);
		initHousing(2, housing);
		initFood(2, food);
		initEntertainment(2, entertainment);
		initIndices(2, indices);
		initAttraction(2, attractions);
	}
}

function getCityInformation(cityNum, city){
	var url = "cgi-bin/queries.php";
	var params = "type=QUERY_CITY&city_id=" + city;
	sendRequest(url,params,
			function(result){
                console.log(result);
                var json = JSON.parse(result);
                console.log(json);
				if(json.code == 0){
					populateCity(cityNum, city, json);
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
		if(city == "losAngeles") document.getElementById("header-text1").innerHTML = "LOS ANGELES";
		else if(city == "newYork") document.getElementById("header-text1").innerHTML = "NEW YORK";
		else document.getElementById("header-text1").innerHTML = city.toUpperCase();
		//document.getElementById("header1").style.backgroundImage = "url('images/" + city1 + "Image.jpg')";
	} else {
		// city 2
		if(city == "losAngeles") document.getElementById("header-text2").innerHTML = "LOS ANGELES";
		else if(city == "newYork") document.getElementById("header-text2").innerHTML = "NEW YORK";
		else document.getElementById("header-text2").innerHTML = city.toUpperCase();
		//document.getElementById("header2").style.backgroundImage = "url('images/" + city2 + "Image.jpg')";
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
		if(temp[1] != null){
			var row = document.createElement("div");
			row.style.display = "flex";
			var g = document.createElement("p");
			g.style.width = "20%";
			g.style.display = "flex";
			switch (tran[i].type) {
				case "Subway":
					g.innerHTML = '<i class="fa fa-subway center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Train":
					g.innerHTML = '<i class="fa fa-train center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Car":
					g.innerHTML = '<i class="fa fa-car center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Bus":
					g.innerHTML = '<i class="fa fa-bus center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Taxi":
					g.innerHTML = '<i class="fa fa-taxi center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "RideShare":
					g.innerHTML = '<i class="fa fa-car center-block global-glyphs" aria-hidden="true"></i>';
					break;
			}
			var p = document.createElement("p");
			p.style.width = "30%";
			p.innerHTML =  "<h4>" + tran[i].type + "</h4>";
			var p2 = document.createElement("p");
			p2.style.width = "50%";
			p2.innerHTML = "<h4 style='margin-left: 35px;'>Ticket: " + temp[0] + tran[i].cost + " " + temp[1];"<h4>";
			row.appendChild(g);
			row.appendChild(p);
			row.appendChild(p2);

			if (cityNum == 1) {
				// city 1
				document.getElementById("transportation1").appendChild(row);
			} else {
				// city 2
				document.getElementById("transportation2").appendChild(row);
			}
			//printHelper(tran[i].type,tran[i].cost,temp[0],temp[1],"","transportation");
		}else{
			var row = document.createElement("div");
			row.style.display = "flex";
			var g = document.createElement("p");
			g.style.width = "20%";
			g.style.display = "flex";
			switch (tran[i].type) {
				case "Subway":
					g.innerHTML = '<i class="fa fa-subway center-block 16pt global-glyphs" aria-hidden="true"></i>';
					break;
				case "Train":
					g.innerHTML = '<i class="fa fa-train center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Car":
					g.innerHTML = '<i class="fa fa-car center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Bus":
					g.innerHTML = '<i class="fa fa-bus center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "Taxi":
					g.innerHTML = '<i class="fa fa-taxi center-block global-glyphs" aria-hidden="true"></i>';
					break;
				case "RideShare":
					g.innerHTML = '<i class="fa fa-car center-block global-glyphs" aria-hidden="true"></i>';
					break;
			}
			var p = document.createElement("p");
			p.style.width = "30%";
			p.innerHTML =  "<h4>" + tran[i].type + "</h4>";
			var p2 = document.createElement("p");
			p2.style.width = "50%";
			p2.innerHTML = "<h4 style='margin-left: 35px;'>Ticket: " + temp[0] + tran[i].cost + "<h4>";
			row.appendChild(g);
			row.appendChild(p);
			row.appendChild(p2);

			if (cityNum == 1) {
				// city 1
				document.getElementById("transportation1").appendChild(row);
			} else {
				// city 2
				document.getElementById("transportation2").appendChild(row);
			}
			//printHelper(tran[i].type,tran[i].cost,temp[0],"","","transportation");
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
		if(house[i].type == "Appartment" ){
			if(house[i].payment =="Buy"){
				initHousingHelper("building",house[i].payment,house[i].cost,house[i].cost_desc,"");
			}else{
				var temp = house[i].cost_desc.split("/");
				initHousingHelper("building",house[i].payment,house[i].cost,temp[0],"/"+temp[1]);
			}
		}
		else {
			if(house[i].payment =="Buy"){
				initHousingHelper(cityNum, "home",house[i].payment,house[i].cost,house[i].cost_desc,"");
			}else{
				var temp = house[i].cost_desc.split("/");
				initHousingHelper(cityNum, "home",house[i].payment,house[i].cost,temp[0],"/"+temp[1]);
			}
		}
	}
};

function initHousingHelper(cityNum, glif,payment,cost,pre,post){
	var h4El = document.createElement("H4");
	var div = document.createElement("DIV");
	div.setAttribute("class","flex");
	var spanEl = document.createElement("SPAN");
	spanEl.setAttribute("class","fa fa-"+glif);
	var headerText = document.createTextNode("Average " + payment);
	div.appendChild(spanEl);
	div.appendChild(headerText);
	var h2 = document.createElement("H4");
	h2.setAttribute("style","padding-top:5px;text-align:center");
	var h2Text = document.createTextNode(pre+cost+post);
	h2.appendChild(h2Text);
	h4El.appendChild(div);
	h4El.appendChild(h2);
	if (cityNum == 1) {
		document.getElementById("housingDisplay1").appendChild(h4El);
	} else {
		document.getElementById("housingDisplay2").appendChild(h4El);
	}
}

function initFood(cityNum, food){
	var i;
	if (cityNum == 1) {
		resetFields("food1");
	} else {
		resetFields("food2");
	}
	for(i = 0; i < food.length; i++){
		var temp = food[i].cost_desc.split("/");
		if(temp[1] != undefined){
			var h4 = document.createElement("H4");
			var div = document.createElement("DIV");
			div.setAttribute("class","flex");
			var hText = document.createTextNode(food[i].type + ":");
			h4.appendChild(hText);
			var p = document.createElement("P");
			var pText = document.createTextNode(temp[0] + food[i].cost + "/" + temp[1]);
			p.setAttribute("class","inlineP");
			p.appendChild(pText);
			div.appendChild(h4);
			div.appendChild(p);
			if (cityNum == 1) {
				document.getElementById("food1").appendChild(div);
			} else {
				document.getElementById("food2").appendChild(div);
			}
		}else{
			var h4 = document.createElement("H4");
			var div = document.createElement("DIV");
			div.setAttribute("class","flex");
			var hText = document.createTextNode(food[i].type + ":");
			h4.appendChild(hText);
			var p = document.createElement("P");
			var pText = document.createTextNode(temp[0] + food[i].cost);
			p.setAttribute("class","inlineP");
			p.appendChild(pText);
			div.appendChild(h4);
			div.appendChild(p);
			if (cityNum == 1) {
				document.getElementById("food1").appendChild(div);
			} else {
				document.getElementById("food2").appendChild(div);
			}
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
		if(temp[1] != undefined){
			var h4 = document.createElement("H4");
			var div = document.createElement("DIV");
			div.setAttribute("class","flex");
			var hText = document.createTextNode(ent[i].type + ":");
			h4.appendChild(hText);
			var p = document.createElement("P");
			var pText = document.createTextNode(temp[0] + ent[i].cost + "/" + temp[1]);
			p.setAttribute("class","inlineP");
			p.appendChild(pText);
			div.appendChild(h4);
			div.appendChild(p);
			if (cityNum == 1) {
				document.getElementById("entertainment1").appendChild(div);
			} else {
				document.getElementById("entertainment2").appendChild(div);
			}
		}else{
			var h4 = document.createElement("H4");
			var div = document.createElement("DIV");
			div.setAttribute("class","flex");
			var hText = document.createTextNode(ent[i].type + ":");
			h4.appendChild(hText);
			var p = document.createElement("P");
			var pText = document.createTextNode(temp[0] + ent[i].cost + "/" + temp[1]);
			p.setAttribute("class","inlineP");
			p.appendChild(pText);
			div.appendChild(h4);
			div.appendChild(p);
			if (cityNum == 1) {
				document.getElementById("entertainment1").appendChild(div);
			} else {
				document.getElementById("entertainment2").appendChild(div);
			}
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
		var h4 = document.createElement("H4");
		var div = document.createElement("DIV");
		div.setAttribute("class","flex");
		var hText = document.createTextNode(ind[i].name + ":");
		h4.appendChild(hText);
		var p = document.createElement("P");
		var pText = document.createTextNode(ind[i].value + ind[i].value_desc);
		p.setAttribute("class","inlineP");
		p.appendChild(pText);
		div.appendChild(h4);
		div.appendChild(p);
		if (cityNum == 1) {
			document.getElementById("qualityOfLife1").appendChild(div);
		} else {
			document.getElementById("qualityOfLife2").appendChild(div);
		}
	}
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
	var costPText = document.createTextNode("Cost: " + pre + cost + post);
	costP.appendChild(costPText);

	var locationP = document.createElement("P");
	locationP.setAttribute("class","paddingNeeded");
	var locationPText = document.createTextNode("Address: " + location);
	locationP.appendChild(locationPText);

	var linkA = document.createElement("A");
	linkA.setAttribute("class","paddingNeeded");
	linkA.setAttribute("src",webLink);
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
			ctl.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText = "New York (Canada)";
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
		populateCity(1, city);
		showCity(1);
	} else {
		populateCity(2, city);
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
