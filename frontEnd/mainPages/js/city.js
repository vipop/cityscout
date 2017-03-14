$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
	loadPage();	
});
function loadPage(){
	
	var url = new URLSearchParams(window.location.search);
	var cityName = sessionStorage.getItem('city'); // url.get('city');
	//Queary database with cityName
	if(cityName != undefined){
		displayInformation(cityName);
	}	
	//hide link untill user sign in
	//hidePageLinks();
};
// Display Information function
function displayInformation(aCity){
	if(aCity == "losAngeles") document.getElementById("cityTitle").innerHTML = "LOS ANGELES";
	else if(aCity == "newYork") document.getElementById("cityTitle").innerHTML = "NEW YORK";
	else document.getElementById("cityTitle").innerHTML = aCity.toUpperCase();
	displayImage(aCity);
};
// Display Image function
function displayImage(aCity){
	switch(aCity){
		case "vancouver":
			document.getElementById("header").style.backgroundImage = "url('images/vancouverImage.jpg')";
			break;
		case "montreal":
			document.getElementById("header").style.backgroundImage = "url('images/vancouverImage.jpg')";
			break;
		case "newYork":
			document.getElementById("header").style.backgroundImage = "url('images/newYorkImage.jpg')";
			break;
		case "losAngeles":
			document.getElementById("header").style.backgroundImage = "url('images/losAngelesImage.jpg')";
			break;
		case "london":
			document.getElementById("header").style.backgroundImage = "url('images/londonImage.jpg')";
			break;
		case "paris":
			document.getElementById("header").style.backgroundImage = "url('images/parisImage.jpg')";
			break;
		case "shanghai":
			document.getElementById("header").style.backgroundImage = "url('images/shanghaiImage.jpg')";
			break;
		case "tokyo":
			document.getElementById("header").style.backgroundImage = "url('images/tokyoImage.jpg')";
			break;
		case "bucharest":
			document.getElementById("header").style.backgroundImage = "url('images/bucharestImage.jpg')";
			break;
		default:
			document.getElementById("header").style.backgroundImage = "url('images/torontoImage.jpg')";
	}
};
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
$(document.body)
.on('show.bs.modal', function () {
	fixModalPadding();
})
.on('hidden.bs.modal', function () {
    fixModalPadding();
});

function fixModalPadding() {
	document.getElementsByTagName("body")[0].removeAttribute("style");
	document.getElementsByTagName("body")[0].removeAttribute("class");
}