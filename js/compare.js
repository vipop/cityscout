
window.onload = function() {
	// information variables
	var city1, lat1, lon1, country1, lang1, pop1, area1, web1, mayor1, background1, ovHappiness1, ovEntertainment1, ovHealthcare1, ovEducation1, ovHousing1, ovCrime1;
	var city2, lat2, lon2, country2, lang2, pop2, area2, web2, mayor2, background2, ovHappiness2, ovEntertainment2, ovHealthcare2, ovEducation2, ovHousing2, ovCrime2;

	// get cities
	city1 = getCity1();
	city2 = getCity2();

	// replace this with database queries
	switch(city1) {
		case "toronto":
			// map
			lat1 = 43.6532;
			lon1 = -79.3832;
			// top info
			country1 = "Canada";
			lang1 = "English";
			pop1 = "2,615,000";
			area1 = "<span>5,905.71 km<sup>2</sup></span>";
			web1 = "toronto.ca";
			mayor1 = "John Tory";
			// background
			background1 = "This is Toronto";
			background1 = "Welcome to Toronto, the most multiculturally diverse city on the planet: over 140 languages are spoken. It's estimated that over half of Toronto's residents were born outside Canada, and despite its complex makeup, Torontonians generally get along. When the weather is fine, Toronto is a blast: a vibrant, big-time city abuzz with activity. Some of the world's finest restaurants are found here, alongside happening bars and clubs and eclectic festivals. Yes, winter in Toronto can be a real drag. Things get messy on the congested highways and archaic public transit system. But come with patience, an open mind and during the delightfully temperate and colorful spring or fall, and you're bound to have a great time. There is a fresh international buzz about Toronto. Perhaps it's the influx of flush new residents from across the globe; or was it the Pan-Am Games that shone a spotlight on Toronto? Either way, this is a city that is waking up to its own greatness.";
			// overview
			ovHappiness1 = 4;
			ovEntertainment1 = 5;
			ovHealthcare1 = 3;
			ovEducation1 = 5;
			ovHousing1 = 2;
			ovCrime1 = 2;
			break;
		case "vancouver":
			// map
			lat1 = 49.2827;
			lon1 = -123.1207;
			// top info
			country1 = "Canada";
			lang1 = "English";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "vancouver.ca";
			mayor1 = "Robert Ash";
			// background
			background1 = "Don't tell Toronto or Montreal but Vancouver is the real culinary capital of Canada. Loosen your belt and dive right into North America's best Asian dining scene, from chatty Chinese restaurants to authentic izakayas (Japanese neighborhood pubs), or taste a rich smorgasbord of fresh-caught seafood, including seasonal spot prawns and juicy wild salmon. The farm-to-table movement has also revitalized the notion of West Coast cuisine – anyone for succulent Fraser Valley duck and a side dish of foraged morels? And we haven't even started on the nation-leading craft-beer scene, plus the city's emerging craft liquor producers.";
			// overview
			ovHappiness1 = 5;
			ovEntertainment1 = 5;
			ovHealthcare1 = 4;
			ovEducation1 = 3;
			ovHousing1 = 3;
			ovCrime1 = 4;
			break;
		case "montreal":
			// map
			lat1 = 45.5017;
			lon1 = -73.5673;
			// top info
			country1 = "Canada";
			lang1 = "French";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "montreal.ca";
			mayor1 = "Jean Pierre";
			// background
			background1 = "Montréal is a slice of old Europe in a pie of contemporary design. A day’s wander might take in the photogenic 18th-century facades of Old Montréal before a cycling tour of the lovely Canal de Lachine, or a wander through the glittering shops and restaurants of downtown before ending at the inviting terraced cafes of Plateau Mont-Royal. The architectural sweep of the city takes in a wealth of heritage churches such as the breathtaking Basilique Notre-Dame, as well as 20th-century icons like the Stade Olympique and Habitat 67. Montréal's hotels and museums additionally push the edges of contemporary interior design.";
			// overview
			ovHappiness1 = 3;
			ovEntertainment1 = 4;
			ovHealthcare1 = 4;
			ovEducation1 = 4;
			ovHousing1 = 1;
			ovCrime1 = 3;
			break;
		case "newYork":
			// map
			lat1 = 40.7128;
			lon1 = -74.0059;
			// top info
			country1 = "United States";
			lang1 = "English";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "newyork.com";
			mayor1 = "Tom Rathburn";
			// background
			background1 = "While there are many reasons to fall for New York, I’ve always loved the energy here. There’s so much creativity in the air, with wildly imaginative works filling the city’s galleries and concert halls – not to mention its restaurants, with ever more inventive mash-ups of global cuisines. Despite living for many years in New York, I never tire of exploring the metropolis. You can cross continents with the mere swipe of a MetroCard, visiting colorful neighborhoods that contain an astonishing variety of cultures and ethnicities (particularly in Queens). The people, the food, the art: NYC has many virtues, which is why so many of us can’t imagine living anywhere else.";
			// overview
			ovHappiness1 = 5;
			ovEntertainment1 = 5;
			ovHealthcare1 = 1;
			ovEducation1 = 4;
			ovHousing1 = 4;
			ovCrime1 = 1;
			break;
		case "losAngeles":
			// map
			lat1 = 34.0522;
			lon1 = -118.2437;
			// top info
			country1 = "United States";
			lang1 = "English";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "losangeles.com";
			mayor1 = "Catherine Jewel";
			// background
			background1 = "LA runs deeper than her blonde beaches, rolling hills and bumper-to-bumper traffic would have you believe. She’s a myth. A beacon for countless small-town dreamers, rockers and risk-takers, an open-minded angel who encourages her people to live and let live without judgement or shame. She has given us Quentin Tarantino, Jim Morrison and Serena and Venus Williams; spawned skateboarding and gangsta rap; popularized implants, electrolysis and Spandex; and has nurtured not just great writers, performers and directors, but also the ground-breaking yogis who first brought Eastern wisdom to the Western world. LA is best defined by simple life-affirming moments: a cracked-ice, jazz-age cocktail on Beverly Blvd, a hike high into the Hollywood Hills sagebrush, a swirling pod of dolphins off Point Dume, a pink-washed sunset over a thundering Venice Beach drum circle, the perfect taco. LA is even greater than the sum of her parts.";
			// overview
			ovHappiness1 = 5;
			ovEntertainment1 = 5;
			ovHealthcare1 = 3;
			ovEducation1 = 2;
			ovHousing1 = 1;
			ovCrime1 = 4;
			break;
		case "london":
			// map
			lat1 = 51.5074
			lon1 = -0.1278;
			// top info
			country1 = "Great Britain";
			lang1 = "English";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "london.uk";
			mayor1 = "James Barley";
			// background
			background1 = "Like most Londoners, I revel in all our familiar landmarks – Big Ben, Tower Bridge, the murky Thames, the London Eye. I still thank the former government that made some of the greatest museums and art galleries in the world free to one and all. The choice of restaurants, bars and clubs is legion, and what’s not to love about a city with more lush parkland than any other world capital? But the one thing that sets my adopted city apart from any other is its amazing tolerance. 'As long as you don’t scare the horses, mate, you’ll be all right here,’ I was told when I arrived here more than 20 years ago. Guess what…it still hasn’t happened.";
			// overview
			ovHappiness1 = 3;
			ovEntertainment1 = 4;
			ovHealthcare1 = 4;
			ovEducation1 = 5;
			ovHousing1 = 2;
			ovCrime1 = 3;
			break;
		case "paris":
			// map
			lat1 = 48.8566;
			lon1 = 2.3522;
			// top info
			country1 = "France";
			lang1 = "French";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "paris.fr";
			mayor1 = "Louis De Funes";
			// background
			background1 = "aris’ grandeur is inspiring but what I love most about the city is its intimacy. Its quartiers (quarters) are like a patchwork of villages, and while it’s one of the world’s major metropolises – with all of the culture and facilities that go with it – there’s a real sense of community at the local shops, markets and cafes that hasn’t changed since my childhood. Yet because every little ‘village’ has its own evolving character, I’m constantly discovering and rediscovering hidden corners of the city.";
			// overview
			ovHappiness1 = 5;
			ovEntertainment1 = 5;
			ovHealthcare1 = 4;
			ovEducation1 = 5;
			ovHousing1 = 3;
			ovCrime1 = 3;
			break;
		case "shanghai":
			// map
			lat1 = 31.2304;
			lon1 = 121.4737;
			// top info
			country1 = "China";
			lang1 = "Mandarin";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "shanghai.cn";
			mayor1 = "Ji Qi";
			// background
			background1 = "From the architectural landmarks lining the Bund and the rickety charm of the Old Town to the leafy backstreets of the former French Concession, Shànghǎi is a city that just begs for wandering. And eating. I love that you can slurp a bowl of hand-pulled noodles or bite into soupy xiǎolóngbāo dumplings for next to nothing, then splurge on cocktails and fusion fare while gazing out from a rooftop bar on the Bund, over the Huángpǔ River to Pǔdōng’s space-age night scene. Shànghǎi's roller-coaster backstory is as decadent as it is debauched, but these days there is a palpable energy and confidence that the city is on the rise…again.";
			// overview
			ovHappiness1 = 3;
			ovEntertainment1 = 5;
			ovHealthcare1 = 1;
			ovEducation1 = 3;
			ovHousing1 = 1;
			ovCrime1 = 3;
			break;
		case "tokyo":
			// map
			lat1 = 35.6895;
			lon1 = 139.6917;
			// top info
			country1 = "Japan";
			lang1 = "Japanese";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "tokyo.jp";
			mayor1 = "Cliff Nguyen";
			// background
			background1 = "I’ve lived in Tokyo for 15 years now and am continuously surprised – sometimes on a daily basis – by something new. Such is the joy of living in a city that prides itself on constant renewal and reinvention; it seriously never gets old. Tokyo has everything you can ask of a city, and has it in spades: a rich, cosmopolitan dining scene, more cafes and bars than you could visit in a lifetime, fantastic public transport and grassy parks – plus it's clean and safe. Really, what's not to love?";
			// overview
			ovHappiness1 = 3;
			ovEntertainment1 = 5;
			ovHealthcare1 = 2;
			ovEducation1 = 3;
			ovHousing1 = 1;
			ovCrime1 = 2;
			break;
		case "bucharest":
			// map
			lat1 = 44.4268;
			lon1 = 26.1025;
			// top info
			country1 = "Romania";
			lang1 = "Romanian";
			pop1 = "1,234,542";
			area1 = "<span>3,325.12 km<sup>2</sup></span>";
			web1 = "bucuresti.ro";
			mayor1 = "Bogdan Popescu";
			// background
			background1 = "Romania’s capital gets a bad rap, but in fact it's dynamic, energetic and fun. It’s where still-unreconstructed communism meets unbridled capitalism; where the soporific forces of the EU meet the passions of the Balkans. Many travellers give the city just a night or two before heading off to Transylvania, but that’s clearly not enough. Allow at least a few days to take in the good museums, stroll the parks and hang out at trendy cafes. While much of the centre is modern and garish, you'll find splendid 17th- and 18th-century Orthodox churches and graceful art nouveau villas tucked away in quiet corners. Communism changed the face of the city forever, and nowhere is this more evident than at the gargantuan Palace of Parliament, the craziest and crassest tribute to dictatorial megalomania you’ll probably ever see.";
			// overview
			ovHappiness1 = 3;
			ovEntertainment1 = 5;
			ovHealthcare1 = 4;
			ovEducation1 = 2;
			ovHousing1 = 4;
			ovCrime1 = 4;
			break;
	}
	// replace this with database queries

	// replace this with database queries
	switch(city2) {
		case "toronto":
			// map
			lat2 = 43.6532;
			lon2 = -79.3832;
			// top info
			country2 = "Canada";
			lang2 = "English";
			pop2 = "2,615,000";
			area2 = "<span>5,905.71 km<sup>2</sup></span>";
			web2 = "toronto.ca";
			mayor2 = "John Tory";
			// background
			background2 = "This is Toronto";
			background2 = "Welcome to Toronto, the most multiculturally diverse city on the planet: over 140 languages are spoken. It's estimated that over half of Toronto's residents were born outside Canada, and despite its complex makeup, Torontonians generally get along. When the weather is fine, Toronto is a blast: a vibrant, big-time city abuzz with activity. Some of the world's finest restaurants are found here, alongside happening bars and clubs and eclectic festivals. Yes, winter in Toronto can be a real drag. Things get messy on the congested highways and archaic public transit system. But come with patience, an open mind and during the delightfully temperate and colorful spring or fall, and you're bound to have a great time. There is a fresh international buzz about Toronto. Perhaps it's the influx of flush new residents from across the globe; or was it the Pan-Am Games that shone a spotlight on Toronto? Either way, this is a city that is waking up to its own greatness.";
			// overview
			ovHappiness2 = 4;
			ovEntertainment2 = 5;
			ovHealthcare2 = 3;
			ovEducation2 = 5;
			ovHousing2 = 2;
			ovCrime2 = 2;
			break;
		case "vancouver":
			// map
			lat2 = 49.2827;
			lon2 = -123.1207;
			// top info
			country2 = "Canada";
			lang2 = "English";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "vancouver.ca";
			mayor2 = "Robert Ash";
			// background
			background2 = "Don't tell Toronto or Montreal but Vancouver is the real culinary capital of Canada. Loosen your belt and dive right into North America's best Asian dining scene, from chatty Chinese restaurants to authentic izakayas (Japanese neighborhood pubs), or taste a rich smorgasbord of fresh-caught seafood, including seasonal spot prawns and juicy wild salmon. The farm-to-table movement has also revitalized the notion of West Coast cuisine – anyone for succulent Fraser Valley duck and a side dish of foraged morels? And we haven't even started on the nation-leading craft-beer scene, plus the city's emerging craft liquor producers.";
			// overview
			ovHappiness2 = 5;
			ovEntertainment2 = 5;
			ovHealthcare2 = 4;
			ovEducation2 = 3;
			ovHousing2 = 3;
			ovCrime2 = 4;
			break;
		case "montreal":
			// map
			lat2 = 45.5017;
			lon2 = -73.5673;
			// top info
			country2 = "Canada";
			lang2 = "French";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "montreal.ca";
			mayor2 = "Jean Pierre";
			// background
			background2 = "Montréal is a slice of old Europe in a pie of contemporary design. A day’s wander might take in the photogenic 18th-century facades of Old Montréal before a cycling tour of the lovely Canal de Lachine, or a wander through the glittering shops and restaurants of downtown before ending at the inviting terraced cafes of Plateau Mont-Royal. The architectural sweep of the city takes in a wealth of heritage churches such as the breathtaking Basilique Notre-Dame, as well as 20th-century icons like the Stade Olympique and Habitat 67. Montréal's hotels and museums additionally push the edges of contemporary interior design.";
			// overview
			ovHappiness2 = 3;
			ovEntertainment2 = 4;
			ovHealthcare2 = 4;
			ovEducation2 = 4;
			ovHousing2 = 1;
			ovCrime2 = 3;
			break;
		case "newYork":
			// map
			lat2 = 40.7128;
			lon2 = -74.0059;
			// top info
			country2 = "United States";
			lang2 = "English";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "newyork.com";
			mayor2 = "Tom Rathburn";
			// background
			background2 = "While there are many reasons to fall for New York, I’ve always loved the energy here. There’s so much creativity in the air, with wildly imaginative works filling the city’s galleries and concert halls – not to mention its restaurants, with ever more inventive mash-ups of global cuisines. Despite living for many years in New York, I never tire of exploring the metropolis. You can cross continents with the mere swipe of a MetroCard, visiting colorful neighborhoods that contain an astonishing variety of cultures and ethnicities (particularly in Queens). The people, the food, the art: NYC has many virtues, which is why so many of us can’t imagine living anywhere else.";
			// overview
			ovHappiness2 = 5;
			ovEntertainment2 = 5;
			ovHealthcare2 = 1;
			ovEducation2 = 4;
			ovHousing2 = 4;
			ovCrime2 = 1;
			break;
		case "losAngeles":
			// map
			lat2 = 34.0522;
			lon2 = -118.2437;
			// top info
			country2 = "United States";
			lang2 = "English";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "losangeles.com";
			mayor2 = "Catherine Jewel";
			// background
			background2 = "LA runs deeper than her blonde beaches, rolling hills and bumper-to-bumper traffic would have you believe. She’s a myth. A beacon for countless small-town dreamers, rockers and risk-takers, an open-minded angel who encourages her people to live and let live without judgement or shame. She has given us Quentin Tarantino, Jim Morrison and Serena and Venus Williams; spawned skateboarding and gangsta rap; popularized implants, electrolysis and Spandex; and has nurtured not just great writers, performers and directors, but also the ground-breaking yogis who first brought Eastern wisdom to the Western world. LA is best defined by simple life-affirming moments: a cracked-ice, jazz-age cocktail on Beverly Blvd, a hike high into the Hollywood Hills sagebrush, a swirling pod of dolphins off Point Dume, a pink-washed sunset over a thundering Venice Beach drum circle, the perfect taco. LA is even greater than the sum of her parts.";
			// overview
			ovHappiness2 = 5;
			ovEntertainment2 = 5;
			ovHealthcare2 = 3;
			ovEducation2 = 2;
			ovHousing2 = 1;
			ovCrime2 = 4;
			break;
		case "london":
			// map
			lat2 = 51.5074
			lon2 = -0.1278;
			// top info
			country2 = "Great Britain";
			lang2 = "English";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "london.uk";
			mayor2 = "James Barley";
			// background
			background2 = "Like most Londoners, I revel in all our familiar landmarks – Big Ben, Tower Bridge, the murky Thames, the London Eye. I still thank the former government that made some of the greatest museums and art galleries in the world free to one and all. The choice of restaurants, bars and clubs is legion, and what’s not to love about a city with more lush parkland than any other world capital? But the one thing that sets my adopted city apart from any other is its amazing tolerance. 'As long as you don’t scare the horses, mate, you’ll be all right here,’ I was told when I arrived here more than 20 years ago. Guess what…it still hasn’t happened.";
			// overview
			ovHappiness2 = 3;
			ovEntertainment2 = 4;
			ovHealthcare2 = 4;
			ovEducation2 = 5;
			ovHousing2 = 2;
			ovCrime2 = 3;
			break;
		case "paris":
			// map
			lat2 = 48.8566;
			lon2 = 2.3522;
			// top info
			country2 = "France";
			lang2 = "French";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "paris.fr";
			mayor2 = "Louis De Funes";
			// background
			background2 = "aris’ grandeur is inspiring but what I love most about the city is its intimacy. Its quartiers (quarters) are like a patchwork of villages, and while it’s one of the world’s major metropolises – with all of the culture and facilities that go with it – there’s a real sense of community at the local shops, markets and cafes that hasn’t changed since my childhood. Yet because every little ‘village’ has its own evolving character, I’m constantly discovering and rediscovering hidden corners of the city.";
			// overview
			ovHappiness2 = 5;
			ovEntertainment2 = 5;
			ovHealthcare2 = 4;
			ovEducation2 = 5;
			ovHousing2 = 3;
			ovCrime2 = 3;
			break;
		case "shanghai":
			// map
			lat2 = 31.2304;
			lon2 = 121.4737;
			// top info
			country2 = "China";
			lang2 = "Mandarin";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "shanghai.cn";
			mayor2 = "Ji Qi";
			// background
			background2 = "From the architectural landmarks lining the Bund and the rickety charm of the Old Town to the leafy backstreets of the former French Concession, Shànghǎi is a city that just begs for wandering. And eating. I love that you can slurp a bowl of hand-pulled noodles or bite into soupy xiǎolóngbāo dumplings for next to nothing, then splurge on cocktails and fusion fare while gazing out from a rooftop bar on the Bund, over the Huángpǔ River to Pǔdōng’s space-age night scene. Shànghǎi's roller-coaster backstory is as decadent as it is debauched, but these days there is a palpable energy and confidence that the city is on the rise…again.";
			// overview
			ovHappiness2 = 3;
			ovEntertainment2 = 5;
			ovHealthcare2 = 1;
			ovEducation2 = 3;
			ovHousing2 = 1;
			ovCrime2 = 3;
			break;
		case "tokyo":
			// map
			lat2 = 35.6895;
			lon2 = 139.6917;
			// top info
			country2 = "Japan";
			lang2 = "Japanese";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "tokyo.jp";
			mayor2 = "Cliff Nguyen";
			// background
			background2 = "I’ve lived in Tokyo for 15 years now and am continuously surprised – sometimes on a daily basis – by something new. Such is the joy of living in a city that prides itself on constant renewal and reinvention; it seriously never gets old. Tokyo has everything you can ask of a city, and has it in spades: a rich, cosmopolitan dining scene, more cafes and bars than you could visit in a lifetime, fantastic public transport and grassy parks – plus it's clean and safe. Really, what's not to love?";
			// overview
			ovHappiness2 = 3;
			ovEntertainment2 = 5;
			ovHealthcare2 = 2;
			ovEducation2 = 3;
			ovHousing2 = 1;
			ovCrime2 = 2;
			break;
		case "bucharest":
			// map
			lat2 = 44.4268;
			lon2 = 26.1025;
			// top info
			country2 = "Romania";
			lang2 = "Romanian";
			pop2 = "1,234,542";
			area2 = "<span>3,325.12 km<sup>2</sup></span>";
			web2 = "bucuresti.ro";
			mayor2 = "Bogdan Popescu";
			// background
			background2 = "Romania’s capital gets a bad rap, but in fact it's dynamic, energetic and fun. It’s where still-unreconstructed communism meets unbridled capitalism; where the soporific forces of the EU meet the passions of the Balkans. Many travellers give the city just a night or two before heading off to Transylvania, but that’s clearly not enough. Allow at least a few days to take in the good museums, stroll the parks and hang out at trendy cafes. While much of the centre is modern and garish, you'll find splendid 17th- and 18th-century Orthodox churches and graceful art nouveau villas tucked away in quiet corners. Communism changed the face of the city forever, and nowhere is this more evident than at the gargantuan Palace of Parliament, the craziest and crassest tribute to dictatorial megalomania you’ll probably ever see.";
			// overview
			ovHappiness2 = 3;
			ovEntertainment2 = 5;
			ovHealthcare2 = 4;
			ovEducation2 = 2;
			ovHousing2 = 4;
			ovCrime2 = 4;
			break;
	}
	// replace this with database queries

	initTopInfo(country1, lang1, pop1, area1, web1, mayor1, country2, lang2, pop2, area2, web2, mayor2);
	initCityBanner(city1, city2);
	initMap(lat1, lon1, document.getElementById("map-div1"));
	initMap(lat2, lon2, document.getElementById("map-div2"));
	initBackground(background1, background2);
	initOverview(ovHappiness1, ovEntertainment1, ovHealthcare1, ovEducation1, ovHousing1, ovCrime1, ovHappiness2, ovEntertainment2, ovHealthcare2, ovEducation2, ovHousing2, ovCrime2);

};

function getCity1(){
	var search = new URLSearchParams(window.location.search);
	var city = search.get('city');
	return "montreal";
};

function getCity2(){
	var search = new URLSearchParams(window.location.search);
	var city = search.get('city');
	return "toronto";
};

function initTopInfo(country1, lang1, pop1, area1, web1, mayor1, country2, lang2, pop2, area2, web2, mayor2) {
	// city 1
	document.getElementById("top-info-country1").innerHTML = country1;
	document.getElementById("top-info-lang1").innerHTML = lang1;
	document.getElementById("top-info-pop1").innerHTML = pop1;
	document.getElementById("top-info-area1").innerHTML = area1;
	document.getElementById("top-info-web1").innerHTML = web1;
	document.getElementById("top-info-mayor1").innerHTML = mayor1;

	// city 2
	document.getElementById("top-info-country2").innerHTML = country2;
	document.getElementById("top-info-lang2").innerHTML = lang2;
	document.getElementById("top-info-pop2").innerHTML = pop2;
	document.getElementById("top-info-area2").innerHTML = area2;
	document.getElementById("top-info-web2").innerHTML = web2;
	document.getElementById("top-info-mayor2").innerHTML = mayor2;
}

function initCityBanner(city1, city2){
	// city 1
	if(city1 == "losAngeles") document.getElementById("header-text1").innerHTML = "LOS ANGELES";
	else if(city1 == "newYork") document.getElementById("header-text1").innerHTML = "NEW YORK";
	else document.getElementById("header-text1").innerHTML = city1.toUpperCase();
	document.getElementById("header1").style.backgroundImage = "url('images/" + city1 + "Image.jpg')";

	// city 2
	if(city2 == "losAngeles") document.getElementById("header-text2").innerHTML = "LOS ANGELES";
	else if(city2 == "newYork") document.getElementById("header-text2").innerHTML = "NEW YORK";
	else document.getElementById("header-text2").innerHTML = city2.toUpperCase();
	document.getElementById("header2").style.backgroundImage = "url('images/" + city2 + "Image.jpg')";
};

function initBackground(background1, background2) {
	document.getElementById("background1").innerHTML = background1;
	document.getElementById("background2").innerHTML = background2;
}

function initOverview(ovHappiness1, ovEntertainment1, ovHealthcare1, ovEducation1, ovHousing1, ovCrime1, ovHappiness2, ovEntertainment2, ovHealthcare2, ovEducation2, ovHousing2, ovCrime2) {
	// City 1
	// set color, text and width of happiness bar
	document.getElementById("ov-happiness-bar1").style["background-color"] = "#eec485";
	document.getElementById("ov-happiness1").innerHTML = ovHappiness1 + " / 5";
	document.getElementById("ov-happiness-bar1").style.width = ovHappiness1 * 20 + "%";
	// set color, text and width of entertainment bar
	document.getElementById("ov-entertainment-bar1").style["background-color"] = "#80ba52";
	document.getElementById("ov-entertainment1").innerHTML = ovEntertainment1 + " / 5";
	document.getElementById("ov-entertainment-bar1").style.width = ovEntertainment1 * 20 + "%";
	// set color, text and width of healthcare bar
	document.getElementById("ov-healthcare-bar1").style["background-color"] = "#b44545";
	document.getElementById("ov-healthcare1").innerHTML = ovHealthcare1 + " / 5";
	document.getElementById("ov-healthcare-bar1").style.width = ovHealthcare1 * 20 + "%";
	// set color, text and width of education bar
	document.getElementById("ov-education-bar1").style["background-color"] = "#2c5a71";
	document.getElementById("ov-education1").innerHTML = ovEducation1 + " / 5";
	document.getElementById("ov-education-bar1").style.width = ovEducation1 * 20 + "%";
	// set color, text and width of housing bar
	document.getElementById("ov-housing-bar1").style["background-color"] = "lightpink";
	document.getElementById("ov-housing1").innerHTML = ovHousing1 + " / 5";
	document.getElementById("ov-housing-bar1").style.width = ovHousing1 * 20 + "%";
	// set color, text and width of crime bar
	document.getElementById("ov-crime-bar1").style["background-color"] = "#555555";
	document.getElementById("ov-crime1").innerHTML = ovCrime1 + " / 5";
	document.getElementById("ov-crime-bar1").style.width = ovCrime1 * 20 + "%";

	// City 2
	// set color, text and width of happiness bar
	document.getElementById("ov-happiness-bar2").style["background-color"] = "#eec485";
	document.getElementById("ov-happiness2").innerHTML = ovHappiness2 + " / 5";
	document.getElementById("ov-happiness-bar2").style.width = ovHappiness2 * 20 + "%";
	// set color, text and width of entertainment bar
	document.getElementById("ov-entertainment-bar2").style["background-color"] = "#80ba52";
	document.getElementById("ov-entertainment2").innerHTML = ovEntertainment2 + " / 5";
	document.getElementById("ov-entertainment-bar2").style.width = ovEntertainment2 * 20 + "%";
	// set color, text and width of healthcare bar
	document.getElementById("ov-healthcare-bar2").style["background-color"] = "#b44545";
	document.getElementById("ov-healthcare2").innerHTML = ovHealthcare2 + " / 5";
	document.getElementById("ov-healthcare-bar2").style.width = ovHealthcare2 * 20 + "%";
	// set color, text and width of education bar
	document.getElementById("ov-education-bar2").style["background-color"] = "#2c5a71";
	document.getElementById("ov-education2").innerHTML = ovEducation2 + " / 5";
	document.getElementById("ov-education-bar2").style.width = ovEducation2 * 20 + "%";
	// set color, text and width of housing bar
	document.getElementById("ov-housing-bar2").style["background-color"] = "lightpink";
	document.getElementById("ov-housing2").innerHTML = ovHousing2 + " / 5";
	document.getElementById("ov-housing-bar2").style.width = ovHousing2 * 20 + "%";
	// set color, text and width of crime bar
	document.getElementById("ov-crime-bar2").style["background-color"] = "#555555";
	document.getElementById("ov-crime2").innerHTML = ovCrime2 + " / 5";
	document.getElementById("ov-crime-bar2").style.width = ovCrime2 * 20 + "%";
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
