function submitHousing(event){
	event.preventDefault();
	var city = getCity();
	console.log(city);
	var houseCost = console
	var house_type = document.getElementById("property-type").value;
	var ownership = document.getElementById("property-ownershipType").value;
	var housePrice = document.getElementById("housing-price").value;


	console.log(house_type + ownership + housePrice);
	var url = "cgi-bin/queries.php";
	var housing_params = "type=POST_CONTRIBUTION&city_id=" + city + "&field=housing" + "&ctype="+house_type + "&ccost="+housePrice;


	console.log(ownership);
	switch(ownership){
		case "Buying":
			housing_params += "&cdesc=$&cpay=Buy";
			break;
		case "Renting":
			housing_params += "&cdesc=$/month&cpay=Rent";
			break;
		default:
			break;
	}
	console.log(housing_params);


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

	reset("housing-form");
	hide ("housingUtilModal");

}

function submitUtilities(event){
	event.preventDefault();
	var utitlitiesType = document.getElementById("utilities-type").value;
	var utilitiesPrice = document.getElementById("housing-utilities-prices").value;

	console.log( utitlitiesType	+utilitiesPrice);
	var url = "cgi-bin/queries.php";

	var utilities_params = "type=POST_CONTRIBUTION&city_id=" + city + "&field=utilities" + "&ctype="+utitlitiesType + "&cdesc=$/month" + "&ccost="+utilitiesPrice;


	console.log(utilities_params);

	// for housing
	sendRequest(url, utilities_params, function(result){
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
	reset("utilities-form");
	hide ("housingUtilModal");

}
function submitTransportation(event){
	event.preventDefault();
	var city = getCity();
	console.log("Transporation city" + city);
	var type = document.getElementById("transportation-type").value;
	var costDesc = document.getElementById("transportation-description").value;
	var cost = document.getElementById("transportation-prices").value;

	console.log(type);
	console.log(costDesc);
	console.log(cost);

	var url = "cgi-bin/queries.php";
	var transportation_param = "type=POST_CONTRIBUTION&city_id=" + city + "&field=transportation" + "&ctype="+type + "&cdesc=$/" + costDesc + "&ccost="+cost;

	sendRequest(url, transportation_param, function(result){
        console.log("Food Q: " + result);
		var json = JSON.parse(result);
		if (json["code"] == 0 && json["data"] == true) {
			console.log("Transporation successfully submited");
		} else {
			console.log("Transporation unsuccessfully");
		}
    }, function(statusText){
        console.log(statusText);
    });
	reset("transportation-form");
	hide ("transportationModal");
}

function submitFood(event){
	event.preventDefault();
	var city = getCity();
	console.log("Submit food city" + city);
	var type = document.getElementById("food-group").value;
	var costDesc = document.getElementById("food-description").value;
	var cost = document.getElementById("food-prices").value;

	console.log("Food");
	console.log(type);
	console.log(costDesc);
	console.log(cost);

	var url = "cgi-bin/queries.php";
	var food_param = "type=POST_CONTRIBUTION&city_id=" + city + "&field=food" + "&ctype="+type + "&cdesc=$/" + costDesc + "&ccost="+cost;

	sendRequest(url, food_param, function(result){
        console.log("Food Q: " + result);
		var json = JSON.parse(result);
		if (json["code"] == 0 && json["data"] == true) {
			console.log("Food successfully submited");
		} else {
			console.log("Food unsuccessfully");
		}
    }, function(statusText){
        console.log(statusText);
    });
	reset("food-form");
	hide ("foodModal");
};
function submitEntertainment(event){
	event.preventDefault();
	var city = getCity();
	console.log("Submit Entertainment city: " + city);
	var type = document.getElementById("entertainment-type").value;
	var costDesc = document.getElementById("entertainment-description").value;
	var cost = document.getElementById("entertainment-prices").value;

	console.log(type);
	console.log(costDesc);
	console.log(cost);

	var url = "cgi-bin/queries.php";
	var entertainment_param = "type=POST_CONTRIBUTION&city_id=" + city + "&field=entertainment" + "&ctype="+type + "&cdesc=$/" + costDesc + "&ccost="+cost;

	sendRequest(url, entertainment_param, function(result){
        console.log("Food Q: " + result);
		var json = JSON.parse(result);
		if (json["code"] == 0 && json["data"] == true) {
			console.log("Entertainment successfully submited");
		} else {
			console.log("Entertainment unsuccessfully");
		}
    }, function(statusText){
        console.log(statusText);
    });
	reset("entertainment-form");
	hide("entertainmentModal");
};

function reset(id){
	document.getElementById(id).reset();
};
function hide(id){
	$('#'+id).modal('hide');
};
