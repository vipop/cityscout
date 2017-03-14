function registerUser(){
    //REFER TO DOCUMENTATION FOR REQUIRED PARAMETERS AND RESULTS

    //TODO Change url depending on where the file will be located
    var url = "queries.php"
    var params = "type=REGISTER_USER&username=" + "user" + "&password=" + "pass" + "&email=" + "email";

    sendRequest(url, params, function(result){
        console.log(result);
    }, function(statusText){
        console.log(statusText);
    })
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
}
