function login() {
	var username = document.getElementById("login-username").value;
	var password = document.getElementById("login-password").value;
			
	// VERIFY USER AGAINST THE DATABASE
    var url = "cgi-bin/queries.php"
    var params = "type=SIGN_IN_USER&username=" + username + "&password=" + password;

	sendRequest(url, params, function(result){
        console.log(result);
		var json = JSON.parse(result);
		if (json["code"] == 0 && json["data"] == true) {
			sessionStorage.setItem("userId", username);
			document.getElementById("login-username").value = "";
			document.getElementById("login-password").value = "";
			displayFullContent();
		} else {
			alert("Username and Password do not match");
			// do not log in user
			// show error
		}
    }, function(statusText){
        console.log(statusText);
    })
}
function displayFullContent(){
	if(document.getElementById("commentEnterArea") != null)document.getElementById("commentEnterArea").style.display="block";
	if(document.getElementById("compareBox") != null)document.getElementById("compareBox").style.display="block";
	document.getElementById("signOutButton").style.display="block";
	document.getElementById("compareLink").style.display="block";
	document.getElementById("signUpButton").style.display="none";
	document.getElementById("logInForm").style.display="none";
}

function signOut(){
	sessionStorage.removeItem("userId");
	hideContent();
};
function signOutCompare(){
	sessionStorage.removeItem("userId");
	document.location.href = "index.html";
};
function hideContent(){
	if(document.getElementById("commentEnterArea") != null)document.getElementById("commentEnterArea").style.display="none";
	if(document.getElementById("compareBox") != null)document.getElementById("compareBox").style.display="none";
	document.getElementById("signOutButton").style.display="none";
	document.getElementById("compareLink").style.display="none";
	document.getElementById("signUpButton").style.display="block";
	document.getElementById("logInForm").style.display="block";
};
function register() {
	var username = document.getElementById("register-username").value;
	var password = document.getElementById("register-password").value;
	var passwordConfirm = document.getElementById("register-password-confirm").value;
	var email = document.getElementById("register-email").value;

	if (password == passwordConfirm) {
		// INSERT USER IN THE DATABASE
	    var url = "cgi-bin/queries.php"
	    var params = "type=REGISTER_USER&username=" + username + "&password=" + password + "&email=" + email;

	    sendRequest(url, params, function(result){

			var json = JSON.parse(result);
			if (json['code'] == 0) {
				// registration successful
				document.getElementById("registration-form").style.display = "none";
				document.getElementById("registration-success").removeAttribute("style");
				document.getElementById("registration-register").style.display = "none";
				document.getElementById("registration-done").removeAttribute("style");
			} else {
				// registration failed
				// show error
			}
	    }, function(statusText){
	        console.log(statusText);
	    })
	} else {
		// show passwords not matching error
	}
}

function sendRequest(url, params, successCallback, failureCallback){
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.timeout = 2000;
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.status == 200){
                successCallback(this.responseText);
            } else {
                successCallback(this.statusText);
            }
        }
    };
    http.ontimeout = function(e){
        console.log("ERROR: Request timed out");
    }
    http.send(params);
	console.log("Send request from users.js");
}
