function loadComments(jsonResult){
	displayComments(jsonResult.data.comments);
}
function submitComment(){
	var commentText = document.getElementById("commentText").value;
	if(commentText!=""){
		var cityName = getCity();
		var $happiness = $("#happiness-rating").rateYo();
		var rating1 = $happiness.rateYo("rating");
		var $entertainment = $("#entertainment-rating").rateYo();
		var rating2 = $entertainment.rateYo("rating");
		var $healthcare = $("#healthcare-rating").rateYo();
		var rating3 = $healthcare.rateYo("rating");
		var $education = $("#education-rating").rateYo();
		var rating4 = $education.rateYo("rating");
		var $housing = $("#housing-rating").rateYo();
		var rating5 = $housing.rateYo("rating");
		var $crime = $("#crime-rating").rateYo();
		var rating6 = $crime.rateYo("rating");
		var comment={city:cityName,text:commentText,happiness:rating1,entertainment:rating2,healthcare:rating3,education:rating4,housing:rating5,crime:rating6};
		sendComment(comment);
		document.getElementById("commentText").value="";
	}
}

function displayComments(comments){
	while(document.getElementById("displayComments").firstChild){
		document.getElementById("displayComments").removeChild(document.getElementById("displayComments").firstChild);
	}
	for(var i=0;i<comments.length;i++){
		var parent_div = document.getElementById("displayComments");
		parent_div.setAttribute("class","panel panel-default");
		parent_div.setAttribute("style","padding:5px");
		var aComment=comments[i];
		
		var text=aComment.comment;
		var userName = aComment.user_id;	
		var crime_rating=aComment.rating.crime;
		var entertainment_rating=aComment.rating.entertainment;
		var housing_rating=aComment.rating.housing;
		var happiness_rating=aComment.rating.happiness;
		var healthcare_rating=aComment.rating.healthcare;
		var education_rating=aComment.rating.education;
		
		var userNameHeader = document.createElement("H4");
		userNameHeader.setAttribute("Class","commentUserName");
		var tempUserName = document.createTextNode(userName);
		userNameHeader.appendChild(tempUserName); 
		
		var internalDiv  = document.createElement("DIV");
		var textContainer = document.createElement("DIV");
		var ratingContainer = document.createElement("DIV");
		internalDiv.setAttribute("class","commentPanel");
		textContainer.setAttribute("class","commentContainer");
		ratingContainer.setAttribute("class","commentContainer");
		var paragraphText = document.createElement("P");
		var tempText = document.createTextNode(text);
		paragraphText.appendChild(tempText);
		textContainer.appendChild(paragraphText);
		internalDiv.appendChild(textContainer);

		displayCommentHelper(ratingContainer,"Happiness",happiness_rating);
		displayCommentHelper(ratingContainer,"Entertainment",entertainment_rating);
		displayCommentHelper(ratingContainer,"Healthcare",healthcare_rating);
		displayCommentHelper(ratingContainer,"Education",education_rating);
		displayCommentHelper(ratingContainer,"Housing",housing_rating);
		displayCommentHelper(ratingContainer,"Crime",crime_rating);

		internalDiv.appendChild(ratingContainer);
		parent_div.appendChild(userNameHeader);
		parent_div.appendChild(internalDiv);
	}

}
function displayCommentHelper(div,attribute,numberOfStars){
	var p = document.createElement("P");
	p.setAttribute("Class","attHeader");
	var t = document.createTextNode(attribute);
	p.appendChild(t);
	var divTemp = document.createElement("DIV");
	divTemp.setAttribute("Class","starContainer");
	divTemp.appendChild(p);
	//Remeber case must be string for database
	switch(numberOfStars){
		case "1":
			loop(divTemp,1,"lessStars");
			div.appendChild(divTemp);
			break;
		case "2":
			loop(divTemp,2,"lessStars");
			div.appendChild(divTemp);
			break;
		case "3":
			loop(divTemp,3,"threeStars");
			div.appendChild(divTemp);
			break;
		case "4":
			loop(divTemp,4,"greaterStars");
			div.appendChild(divTemp);
			break;
		case "5":
			loop(divTemp,5,"greaterStars");
			div.appendChild(divTemp);
			break;
		default:
			break;
	}
}
function loop(div,number,theClass){
	var i;
	var starDiv = document.createElement("DIV");
	for(i=0;i<number;i++){
		var temp = document.createElement("SPAN");
		temp.setAttribute("Class","glyphicon glyphicon-star" + " "+theClass);
		starDiv.appendChild(temp);
	}
	div.appendChild(starDiv);
}
function sendComment(comment){
	var cityName = comment.city;
	var userId = sessionStorage.getItem("userId");
	var text= comment.text;
	var crime= comment.crime;
	var entertainment= comment.entertainment;
	var housing= comment.housing;
	var happiness= comment.happiness;
	var healthcare= comment.healthcare;
	var education= comment.education;

	var url = "cgi-bin/queries.php";
    var params = "type=POST_COMMENT_ON_CITY&city_id="+cityName+ "&username="+userId +"&comment="+text+"&happiness="+happiness+"&entertainment="+entertainment+"&healthcare="+healthcare+"&education="+education+"&housing="+housing+"&crime="+crime;
	sendRequest(url, params,function(result){
			var json = JSON.parse(result);
			if(json.code == 0){
				requestComment(cityName);
			}
		},
		function(){
			console.log("Fail to submit comment");
	});

}
function requestComment(cityName){
	var url = "cgi-bin/queries.php";
	var params = "type=QUERY_COMMENTS&city_id=" + cityName;
	sendRequest(url,params,
			function(result){
				var json = JSON.parse(result);
				if(json.code == 0){
					displayComments(json.data);
				}
			},function(){
			console.log("Fail to recieve comments");
	});
}

$(function () {
  $("#education-rating").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#crime-rating").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor":  "#80ba52", //GREEN
      "endColor"  :   "#b44545"//RED
    },
    fullStar: true
  });
  $("#entertainment-rating").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#housing-rating").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#happiness-rating").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#healthcare-rating").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });

});
$(function () {

  $("#education-rating-comment").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#crime-rating-comment").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor":  "#80ba52", //GREEN
      "endColor"  :   "#b44545"//RED
    },
    fullStar: true
  });
  $("#entertainment-rating-comment").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#housing-rating-comment").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#happiness-rating-comment").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });
  $("#healthcare-rating-comment").rateYo({
    normalFill:"#FAEBD7",
    starWidth : "20px",
    multiColor: {
      "startColor": "#b44545", //RED
      "endColor"  : "#80ba52"//GREEN
    },
    fullStar: true
  });

});
