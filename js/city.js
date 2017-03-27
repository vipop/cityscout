document.addEventListener("DOMContentLoaded", function(event) {
   if(sessionStorage.getItem("userId") != null){
		displayFullContent();
	}
});
window.onload = function() {
	// information variables
	var city,lat,lon, country, lang, pop, area, web, mayor, background, ovHappiness, ovEntertainment, ovHealthcare, ovEducation, ovHousing, ovCrime;
	// get city
	city = getCity();
	getCityInformation(city); //queries from database
	
};

function loadCity(city, json){
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
	initTopInfo(country, lang, pop, area, web);
	initCityBanner(city);
	initMap(lat, lon, document.getElementById("map-div"));
	initBackground(background);
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

function hideCityAttributes(){

};
function getCity(){
	var search = new URLSearchParams(window.location.search);
	var city = search.get('city');
	return city;
};

function initTopInfo(country, lang, pop, area, web) {
	document.getElementById("top-info-country").innerHTML = country;
	document.getElementById("top-info-lang").innerHTML = lang;
	document.getElementById("top-info-pop").innerHTML = pop;
	document.getElementById("top-info-area").innerHTML = area;
	document.getElementById("top-info-web").innerHTML = web;
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
