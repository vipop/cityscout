function loadCity(caller){
	var id = caller.id;
	document.location.href = "city.html?city=" + id;
};
$(document).ready(function(){
	$('#toronto').hover(function(){
		$('#mainId').css('background-image', 'url(images/torontoImage.jpg)');
	});
	$('#vancouver').hover(function(){
		$('#mainId').css("background-image", "url(images/vancouverImage.jpg)");
	});
	$('#montreal').hover(function(){
		$('#mainId').css("background-image", "url(images/montrealImage.jpg)");
	});
	$('#newYork').hover(function(){
		$('#mainId').css("background-image", "url(images/newYorkImage.jpg)");
	});
	$('#losAngeles').hover(function(){
		$('#mainId').css("background-image", "url(images/losAngelesImage.jpg)");
	});
	$('#london').hover(function(){
		$('#mainId').css("background-image", "url(images/londonImage.jpg)");
	});
	$('#paris').hover(function(){
		$('#mainId').css("background-image", "url(images/parisImage.jpg)");
	});
	$('#shanghai').hover(function(){
		$('#mainId').css("background-image", "url(images/shanghaiImage.jpg)");
	});
	$('#tokyo').hover(function(){
		$('#mainId').css("background-image", "url(images/tokyoImage.jpg)");
	});
	$('#bucharest').hover(function(){
		$('#mainId').css("background-image", "url(images/bucharestImage.jpg)");
	});
});
