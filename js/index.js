document.addEventListener("DOMContentLoaded", function(event) {
   if(sessionStorage.getItem("userId") != null){
		displayFullContent();
	}
});
function loadCity(caller){
	var id = caller.id;
	document.location.href = "city.html?city=" + id;
};


