
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
		// populate it
		populateCity(1, city1);
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

function populateCity(cityNum, city) {
	var lat, lon, country, lang, pop, area, web, mayor, background, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime;

	// replace this with database queries
	switch(city) {
		case "toronto":
			// map
			lat = 43.6532;
			lon = -79.3832;
			// top info
			country = "Canada";
			lang = "English";
			pop = "2,615,000";
			area = "<span>5,905.71 km<sup>2</sup></span>";
			web = "toronto.ca";
			mayor = "John Tory";
			// background
			background = "This is Toronto";
			background = "Welcome to Toronto, the most multiculturally diverse city on the planet: over 140 languages are spoken. It's estimated that over half of Toronto's residents were born outside Canada, and despite its complex makeup, Torontonians generally get along. When the weather is fine, Toronto is a blast: a vibrant, big-time city abuzz with activity. Some of the world's finest restaurants are found here, alongside happening bars and clubs and eclectic festivals. Yes, winter in Toronto can be a real drag. Things get messy on the congested highways and archaic public transit system. But come with patience, an open mind and during the delightfully temperate and colorful spring or fall, and you're bound to have a great time. There is a fresh international buzz about Toronto. Perhaps it's the influx of flush new residents from across the globe; or was it the Pan-Am Games that shone a spotlight on Toronto? Either way, this is a city that is waking up to its own greatness.";
			// overview
			ovHappiness = 4;
			ovEntertainment = 5;
			ovHealthcare = 3;
			ovEducation = 5;
			ovHousing = 2;
			ovCrime = 2;
			break;
		case "vancouver":
			// map
			lat = 49.2827;
			lon = -123.1207;
			// top info
			country = "Canada";
			lang = "English";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "vancouver.ca";
			mayor = "Robert Ash";
			// background
			background = "Don't tell Toronto or Montreal but Vancouver is the real culinary capital of Canada. Loosen your belt and dive right into North America's best Asian dining scene, from chatty Chinese restaurants to authentic izakayas (Japanese neighborhood pubs), or taste a rich smorgasbord of fresh-caught seafood, including seasonal spot prawns and juicy wild salmon. The farm-to-table movement has also revitalized the notion of West Coast cuisine – anyone for succulent Fraser Valley duck and a side dish of foraged morels? And we haven't even started on the nation-leading craft-beer scene, plus the city's emerging craft liquor producers.";
			// overview
			ovHappiness = 5;
			ovEntertainment = 5;
			ovHealthcare = 4;
			ovEducation = 3;
			ovHousing = 3;
			ovCrime = 4;
			break;
		case "montreal":
			// map
			lat = 45.5017;
			lon = -73.5673;
			// top info
			country = "Canada";
			lang = "French";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "montreal.ca";
			mayor = "Jean Pierre";
			// background
			background = "Montréal is a slice of old Europe in a pie of contemporary design. A day’s wander might take in the photogenic 18th-century facades of Old Montréal before a cycling tour of the lovely Canal de Lachine, or a wander through the glittering shops and restaurants of downtown before ending at the inviting terraced cafes of Plateau Mont-Royal. The architectural sweep of the city takes in a wealth of heritage churches such as the breathtaking Basilique Notre-Dame, as well as 20th-century icons like the Stade Olympique and Habitat 67. Montréal's hotels and museums additionally push the edges of contemporary interior design.";
			// overview
			ovHappiness = 3;
			ovEntertainment = 4;
			ovHealthcare = 4;
			ovEducation = 4;
			ovHousing = 1;
			ovCrime = 3;
			break;
		case "newYork":
			// map
			lat = 40.7128;
			lon = -74.0059;
			// top info
			country = "United States";
			lang = "English";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "newyork.com";
			mayor = "Tom Rathburn";
			// background
			background = "While there are many reasons to fall for New York, I’ve always loved the energy here. There’s so much creativity in the air, with wildly imaginative works filling the city’s galleries and concert halls – not to mention its restaurants, with ever more inventive mash-ups of global cuisines. Despite living for many years in New York, I never tire of exploring the metropolis. You can cross continents with the mere swipe of a MetroCard, visiting colorful neighborhoods that contain an astonishing variety of cultures and ethnicities (particularly in Queens). The people, the food, the art: NYC has many virtues, which is why so many of us can’t imagine living anywhere else.";
			// overview
			ovHappiness = 5;
			ovEntertainment = 5;
			ovHealthcare = 1;
			ovEducation = 4;
			ovHousing = 4;
			ovCrime = 1;
			break;
		case "losAngeles":
			// map
			lat = 34.0522;
			lon = -118.2437;
			// top info
			country = "United States";
			lang = "English";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "losangeles.com";
			mayor = "Catherine Jewel";
			// background
			background = "LA runs deeper than her blonde beaches, rolling hills and bumper-to-bumper traffic would have you believe. She’s a myth. A beacon for countless small-town dreamers, rockers and risk-takers, an open-minded angel who encourages her people to live and let live without judgement or shame. She has given us Quentin Tarantino, Jim Morrison and Serena and Venus Williams; spawned skateboarding and gangsta rap; popularized implants, electrolysis and Spandex; and has nurtured not just great writers, performers and directors, but also the ground-breaking yogis who first brought Eastern wisdom to the Western world. LA is best defined by simple life-affirming moments: a cracked-ice, jazz-age cocktail on Beverly Blvd, a hike high into the Hollywood Hills sagebrush, a swirling pod of dolphins off Point Dume, a pink-washed sunset over a thundering Venice Beach drum circle, the perfect taco. LA is even greater than the sum of her parts.";
			// overview
			ovHappiness = 5;
			ovEntertainment = 5;
			ovHealthcare = 3;
			ovEducation = 2;
			ovHousing = 1;
			ovCrime = 4;
			break;
		case "london":
			// map
			lat = 51.5074
			lon = -0.1278;
			// top info
			country = "Great Britain";
			lang = "English";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "london.uk";
			mayor = "James Barley";
			// background
			background = "Like most Londoners, I revel in all our familiar landmarks – Big Ben, Tower Bridge, the murky Thames, the London Eye. I still thank the former government that made some of the greatest museums and art galleries in the world free to one and all. The choice of restaurants, bars and clubs is legion, and what’s not to love about a city with more lush parkland than any other world capital? But the one thing that sets my adopted city apart from any other is its amazing tolerance. 'As long as you don’t scare the horses, mate, you’ll be all right here,’ I was told when I arrived here more than 20 years ago. Guess what…it still hasn’t happened.";
			// overview
			ovHappiness = 3;
			ovEntertainment = 4;
			ovHealthcare = 4;
			ovEducation = 5;
			ovHousing = 2;
			ovCrime = 3;
			break;
		case "paris":
			// map
			lat = 48.8566;
			lon = 2.3522;
			// top info
			country = "France";
			lang = "French";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "paris.fr";
			mayor = "Louis De Funes";
			// background
			background = "aris’ grandeur is inspiring but what I love most about the city is its intimacy. Its quartiers (quarters) are like a patchwork of villages, and while it’s one of the world’s major metropolises – with all of the culture and facilities that go with it – there’s a real sense of community at the local shops, markets and cafes that hasn’t changed since my childhood. Yet because every little ‘village’ has its own evolving character, I’m constantly discovering and rediscovering hidden corners of the city.";
			// overview
			ovHappiness = 5;
			ovEntertainment = 5;
			ovHealthcare = 4;
			ovEducation = 5;
			ovHousing = 3;
			ovCrime = 3;
			break;
		case "shanghai":
			// map
			lat = 31.2304;
			lon = 121.4737;
			// top info
			country = "China";
			lang = "Mandarin";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "shanghai.cn";
			mayor = "Ji Qi";
			// background
			background = "From the architectural landmarks lining the Bund and the rickety charm of the Old Town to the leafy backstreets of the former French Concession, Shànghǎi is a city that just begs for wandering. And eating. I love that you can slurp a bowl of hand-pulled noodles or bite into soupy xiǎolóngbāo dumplings for next to nothing, then splurge on cocktails and fusion fare while gazing out from a rooftop bar on the Bund, over the Huángpǔ River to Pǔdōng’s space-age night scene. Shànghǎi's roller-coaster backstory is as decadent as it is debauched, but these days there is a palpable energy and confidence that the city is on the rise…again.";
			// overview
			ovHappiness = 3;
			ovEntertainment = 5;
			ovHealthcare = 1;
			ovEducation = 3;
			ovHousing = 1;
			ovCrime = 3;
			break;
		case "tokyo":
			// map
			lat = 35.6895;
			lon = 139.6917;
			// top info
			country = "Japan";
			lang = "Japanese";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "tokyo.jp";
			mayor = "Cliff Nguyen";
			// background
			background = "I’ve lived in Tokyo for 15 years now and am continuously surprised – sometimes on a daily basis – by something new. Such is the joy of living in a city that prides itself on constant renewal and reinvention; it seriously never gets old. Tokyo has everything you can ask of a city, and has it in spades: a rich, cosmopolitan dining scene, more cafes and bars than you could visit in a lifetime, fantastic public transport and grassy parks – plus it's clean and safe. Really, what's not to love?";
			// overview
			ovHappiness = 3;
			ovEntertainment = 5;
			ovHealthcare = 2;
			ovEducation = 3;
			ovHousing = 1;
			ovCrime = 2;
			break;
		case "bucharest":
			// map
			lat = 44.4268;
			lon = 26.1025;
			// top info
			country = "Romania";
			lang = "Romanian";
			pop = "1,234,542";
			area = "<span>3,325.12 km<sup>2</sup></span>";
			web = "bucuresti.ro";
			mayor = "Bogdan Popescu";
			// background
			background = "Romania’s capital gets a bad rap, but in fact it's dynamic, energetic and fun. It’s where still-unreconstructed communism meets unbridled capitalism; where the soporific forces of the EU meet the passions of the Balkans. Many travellers give the city just a night or two before heading off to Transylvania, but that’s clearly not enough. Allow at least a few days to take in the good museums, stroll the parks and hang out at trendy cafes. While much of the centre is modern and garish, you'll find splendid 17th- and 18th-century Orthodox churches and graceful art nouveau villas tucked away in quiet corners. Communism changed the face of the city forever, and nowhere is this more evident than at the gargantuan Palace of Parliament, the craziest and crassest tribute to dictatorial megalomania you’ll probably ever see.";
			// overview
			ovHappiness = 3;
			ovEntertainment = 5;
			ovHealthcare = 4;
			ovEducation = 2;
			ovHousing = 4;
			ovCrime = 4;
			break;
	}
	// replace this with database queries

	if (cityNum == 1) {
		// populate city 1
		initTopInfo(1, country, lang, pop, area, web, mayor);
		initCityBanner(1, city);
		initBackground(1, background);
		initOverview(1, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
	} else {
		// populate city 2
		initTopInfo(2, country, lang, pop, area, web, mayor);
		initCityBanner(2, city);
		initBackground(2, background);
		initOverview(2, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime);
	}
}

function initTopInfo(cityNum, country, lang, pop, area, web, mayor) {
	if (cityNum == 1) {
		// city 1
		document.getElementById("top-info-country1").innerHTML = country;
		document.getElementById("top-info-lang1").innerHTML = lang;
		document.getElementById("top-info-pop1").innerHTML = pop;
		document.getElementById("top-info-area1").innerHTML = area;
		document.getElementById("top-info-web1").innerHTML = web;
		document.getElementById("top-info-mayor1").innerHTML = mayor;
	} else {
		// city 2
		document.getElementById("top-info-country2").innerHTML = country;
		document.getElementById("top-info-lang2").innerHTML = lang;
		document.getElementById("top-info-pop2").innerHTML = pop;
		document.getElementById("top-info-area2").innerHTML = area;
		document.getElementById("top-info-web2").innerHTML = web;
		document.getElementById("top-info-mayor2").innerHTML = mayor;
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
		console.log(city);
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

function login() {
	var username = document.getElementById("login-username").value;
	var password = document.getElementById("login-password").value;

	// VERIFY USER AGAINST THE DATABASE

}

function register() {
	var username = document.getElementById("register-username").value;
	var password = document.getElementById("register-password").value;
	var passwordConfirm = document.getElementById("register-password-confirm").value;
	var email = document.getElementById("register-email").value;

	// INSERT USER IN THE DATABASE

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
