function login() {
	var username = document.getElementById("login-username").value;
	var password = document.getElementById("login-password").value;

	console.log("Logging in: " + username + " " + password);

	// VERIFY USER AGAINST THE DATABASE
	// Change url depending on where the file will be located
    var url = "cgi-bin/queries.php"
    var params = "type=SIGN_IN_USER&username=" + username + "&password=" + password;

    sendRequest(url, params, function(result){
        console.log(result);
    }, function(statusText){
        console.log(statusText);
    })
}

function register() {
	var username = document.getElementById("register-username").value;
	var password = document.getElementById("register-password").value;
	var passwordConfirm = document.getElementById("register-password-confirm").value;
	var email = document.getElementById("register-email").value;

	// INSERT USER IN THE DATABASE

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
	console.log("Send request");
}
