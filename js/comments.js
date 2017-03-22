var comments=[];

function submitComment(){
	var commentText = document.getElementById("commentText").value;
	if(commentText!=""){
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
	console.log(rating1);
	console.log(rating2);
	console.log(rating3);
	console.log(rating4);
	console.log(rating5);
	console.log(rating6);
	console.log(commentText);
	var comment={text:commentText,happiness:rating1,entertainment:rating2,healthcare:rating3,education:rating4,housing:rating5,crime:rating6};
	comments.push(comment);
	console.log(comment);
	document.getElementById("commentText").value="";
	displayComments();
}



}

function displayComments(){
	while(document.getElementById("displayComments").firstChild){
		document.getElementById("displayComments").removeChild(document.getElementById("displayComments").firstChild);
	}

	for(var i=0;i<comments.length;i++){
		var parent_div = document.getElementById("displayComments");
		var aComment=comments[i];
		var text=aComment.text;
		var crime_rating=aComment.crime;
		var entertainment_rating=aComment.entertainment;
		var housing_rating=aComment.housing;
		var happiness_rating=aComment.happiness;
		var healthcare_rating=aComment.healthcare;
		var education_rating=aComment.education;

		var internalDiv  = document.createElement("DIV");
		internalDiv.setAttribute("class","panel")
		var paragraph= document.createElement("P");
		var temp = document.createTextNode(text);
		paragraph.appendChild(temp);
		internalDiv.appendChild(paragraph);

		displayCommentHelper(internalDiv,"Happiness",happiness_rating);
		displayCommentHelper(internalDiv,"Entertainment",entertainment_rating);
		displayCommentHelper(internalDiv,"Healthcare",healthcare_rating);
		displayCommentHelper(internalDiv,"Education",education_rating);
		displayCommentHelper(internalDiv,"Housing",housing_rating);
		displayCommentHelper(internalDiv,"Crime",crime_rating);

		parent_div.appendChild(internalDiv);
	}

}

function displayCommentHelper(div,attribute,numberOfStars){
	var p = document.createElement("SPAN");
	var t = document.createTextNode(attribute);
	p.appendChild(t);
	div.appendChild(p);
	switch(numberOfStars){
		case 1:
			var temp = document.createElement("SPAN");
			var divTemp = document.createElement("DIV")
			divTemp.setAttribute("Class","starContainer  ");
			temp.setAttribute("Class","glyphicon glyphicon-star lessStars");
			divTemp.appendChild(temp);
			div.appendChild(divTemp);
			break;
		case 2:
			var temp1 = document.createElement("SPAN");
			var temp2 = document.createElement("SPAN");
			var divTemp = document.createElement("DIV")
			divTemp.setAttribute("Class","starContainer");
			temp1.setAttribute("Class","glyphicon glyphicon-star lessStars");
			temp2.setAttribute("Class","glyphicon glyphicon-star lessStars");
			divTemp.appendChild(temp1);
			divTemp.appendChild(temp2);
			div.appendChild(divTemp);
			break;
		case 3:
		var temp3 = document.createElement("SPAN");
		var temp4 = document.createElement("SPAN");
		var temp5 = document.createElement("SPAN");
		var divTemp = document.createElement("DIV");
		divTemp.setAttribute("Class","starContainer");
			temp3.setAttribute("Class","glyphicon glyphicon-star threeStars");
			temp4.setAttribute("Class","glyphicon glyphicon-star threeStars");
			temp5.setAttribute("Class","glyphicon glyphicon-star threeStars");
			divTemp.appendChild(temp3);
			divTemp.appendChild(temp4);
			divTemp.appendChild(temp5);

			div.appendChild(divTemp);
			break;
		case 4:
		var temp6 = document.createElement("SPAN");
		var temp7 = document.createElement("SPAN");
		var temp8 = document.createElement("SPAN");
		var temp9 = document.createElement("SPAN");
		var divTemp = document.createElement("DIV");
		divTemp.setAttribute("Class","starContainer");
			temp6.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp7.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp8.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp9.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			divTemp.appendChild(temp6);
			divTemp.appendChild(temp7);
			divTemp.appendChild(temp8);
			divTemp.appendChild(temp9);
			div.appendChild(divTemp);
			break;
		case 5:
		var temp11 = document.createElement("SPAN");
		var temp12 = document.createElement("SPAN");
		var temp13 = document.createElement("SPAN");
		var temp14 = document.createElement("SPAN");
		var temp15 = document.createElement("SPAN");
		var divTemp = document.createElement("DIV")
		divTemp.setAttribute("Class","starContainer");
			temp11.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp12.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp13.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp14.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			temp15.setAttribute("Class","glyphicon glyphicon-star greaterStars");
			divTemp.appendChild(temp11);
			divTemp.appendChild(temp12);
			divTemp.appendChild(temp13);
			divTemp.appendChild(temp14);
			divTemp.appendChild(temp15);
			div.appendChild(divTemp);
			break;
		default:
		break;
	}
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
