function submitHousingUtilities(){
	var city = getCity();
	console.log(city);
	var houseCost = console
	var house_type = document.getElementById("property-type").value;
	var ownership = document.getElementById("property-ownershipType").value;
	var housePrice = document.getElementById("housing-price").value;
	var utitlitiesType = document.getElementById("utilities-type").value;
	var utilitiesPrice = document.getElementById("housing-utilities-prices").value;
		
	console.log(house_type + ownership + housePrice + utitlitiesType	+utilitiesPrice);
		
	
	var url = "cgi-bin/queries.php";
	var housing_params = "type=POST_CONTRIBUTION&city_id=" + city + "&field=housing" + "&ctype="+house_type + "&cdesc"+"$"+"$csost"+housePrice;
	var utilities_params = "type=POST_CONTRIBUTION&city_id=" + city + "&field=utilities" + "&ctype="+utitlitiesType  + "&cdesc"+"$"+"$csost"+utilitiesPrice;
	
	// for housing
	sendRequest(url, housing_params, function(result){
        console.log(result);
		var json = JSON.parse(result);
		if (json["code"] == 0 && json["data"] == true) {
			console.log("success");
		} else {
			alert("Failed some stuff for now");
			// do not log in user
			// show error
		}
    }, function(statusText){
        console.log(statusText);
    })
	
	//for utilities 
	sendRequest(url, housing_params, function(result){
        console.log(result);
		var json = JSON.parse(result);
		if (json["code"] == 0 && json["data"] == true) {
			console.log("success");
		} else {
			alert("Failed some stuff for now");
			// do not log in user
			// show error
		}
    }, function(statusText){
        console.log(statusText);
    })
	
};
