function submitHousing(event){
	event.preventDefault();
	var city = getCity();
	console.log(city);
	var house_type = document.getElementById("property-type").value;
	var ownership = document.getElementById("property-ownershipType").value;
	var housePrice = document.getElementById("housing-price").value;
	var houseUnit = document.getElementById("unit-Selector").value;


	console.log(house_type + ownership + housePrice);
	var url = "cgi-bin/queries.php";
	var housing_params = "type=POST_CONTRIBUTION&city_id=" + city + "&field=housing" + "&ctype="+house_type + "&ccost="+housePrice + "&cdesc=" + houseUnit + "&cpay=" + ownership;
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
	hide ("housingUtilModal","housing-form");

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
	hide("housingUtilModal","utilities-form");
}
function selectionChange(helpBlockId,selectorId){
	var type = document.getElementById(selectorId).value;
	console.log("Selector is: " + type); 
	document.getElementById(helpBlockId).innerHTML = getUnit(type);
};
function submitTransportation(event){
	event.preventDefault();
	var city = getCity();
	console.log("Transporation city" + city);
	var type = document.getElementById("transportation-type").value;
	var costDesc = getUnit(type);
	var cost = document.getElementById("transportation-prices").value;

	console.log(type);
	console.log(costDesc);
	console.log(cost);

	var url = "cgi-bin/queries.php";
	var transportation_param = "type=POST_CONTRIBUTION&city_id=" + city + "&field=transportation" + "&ctype="+type + "&cdesc=" + costDesc + "&ccost="+cost;

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
	
	hide("transportationModal","transportation-form");
};

function getUnit(type){
	console.log("Get unit: " + type);
	switch(type) {
		case "Subway":
			return "$/Ticket";
		case "Gas":
			return "$/Litre";
		case "Bus":
			return "$/Ticket";
		case "Train":
			return "$/Ticket";
		case "Taxi":
			return "$/km";
		case "Rideshare":
			return "$/km";
		case "Concert":
			return "$/Ticket";
		case "Movies":
			return "$/Ticket";
		case "Theatre":
			return "$/Ticket";
		case "Sports":
			return "$/Ticket";
		case "Grains":
			return "$/Grams";
		case "Protein":
			return "$/Pounds";
		case "Fruits":
			return "$/Pounds";
		case "Vegetables":
			return "$/Pounds";
		case "Dairy":
			return "$/Pounds";
		case "Buying":
			return "$";
		case "Renting":
			return "$/month";
		default:
			break;
	}
};
function submitFood(event){
	event.preventDefault();
	var city = getCity();
	console.log("Submit food city" + city);
	var type = document.getElementById("food-group").value;
	var costDesc = getUnit(type);
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
	hide ("foodModal","food-form");
};
function submitEntertainment(event){
	event.preventDefault();
	var city = getCity();
	console.log("Submit Entertainment city: " + city);
	var type = document.getElementById("entertainment-type").value;
	var costDesc = getUnit(type);
	var cost = document.getElementById("entertainment-prices").value;

	console.log(type);
	console.log(costDesc);
	console.log(cost);

	var url = "cgi-bin/queries.php";
	var entertainment_param = "type=POST_CONTRIBUTION&city_id=" + city + "&field=entertainment" + "&ctype="+type + "&cdesc=" + costDesc + "&ccost="+cost;

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
	
	hide("entertainmentModal","entertainment-form");
};
function hide(idModel,idForm){
	reset(idForm);
	$('#'+idModel).modal('hide');
};
function reset(id){
	document.getElementById(id).reset();
};
function closeForm(id){
	console.log(id);
	reset(id);
};
function closeHU(id1,id2){
	console.log(id1 + "" + id2);
	reset(id1);
	reset(id2);
};
