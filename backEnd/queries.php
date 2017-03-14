<?php
    /*=========================================================================\
	| API                                                                      |
	\==========================================================================/

	Must have ['type'] set to one of the following values:
	REGISTER_USER: Registers a new user with the specified credentials
			Required Fields:
				['username'] - the desired username of the new user
				['password'] - the desired password for the new user
				['email'] - the email for the new user
			Result:
				['result-code'] - 1 if registration was successful, -1 if not
				['message'] - the error/success message
				['data'] - true or false indicating success
	SIGN_IN_USER: Attempts to sign in the uswer with the specified credentials
			Required Fields:
				['username'] - the username of the user
				['password'] - the password of the user
			Result:
				['result-code'] - the mysql errno (see link below)
				['message'] - the error/success message
				['data'] - the session hash for the user

	https://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html
	*/

	define("SUCCESSFUL", 1);
	define("UNSUCCESSFUL", -1);

	ini_set('display_startup_errors', 1);
	ini_set('display_errors', 1);
	error_reporting(-1);
	session_start();
	$result = generateResult(-1, "ERROR: Unknown query: " + $_POST['type'], false);
	$conn = getConnection();

	if(!$conn){
		die("Connection failed: " + mysqli_error($conn));
	}

    switch($_POST['type']){
        case "REGISTER_USER":
            $result = insertUser($conn, "username", "password", "asd@email.com");
            break;
		case "SIGN_IN_USER":
			$result = signInUser($conn, "usename", "password");
        default:
            break;
    }
	echo json_encode($result);
	mysqli_close($conn);

    function insertUser($conn, $username, $password, $email){
		$query = "INSERT INTO users (username, pass, email) VALUES (\"$username\", \"$password\", \"$email\")";
		if(!is_null($username) && !is_null(!$password) && !is_null($email)){
	        $result = runQuery($conn, $query);

			if($result){
				return generateResult(mysqli_errno($conn), "Successfully regestered user", true);
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(-1, "Invalid values", false);
    }

	function signInUser($conn, $username, $password){
		$query = "SELECT username from users WHERE username=\"$username\" AND pass=\"$password\"";
		if(!is_null($username) && !is_null(!$password)){

			$result = runQuery($conn, $query);

			if($result){
				if(mysqli_num_rows($result) == 1){
					return generateResult(mysqli_errno($conn), "Successfully signed-in.", true);
				} else {
					return generateResult(mysqli_errno($conn), "Username and password do not match.", false);
				}
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(-1, "Invalid values", false);
	}

	/*
	* Utility functions
	*/
	function getConnection(){
		$dbhost = "localhost";
        $dbname = "cityscope";
        $dbuser = "root";
        $dbpass = "";

        return mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	}

	function runQuery($conn, $query){
		return mysqli_query($conn, $query);
	}

	function generateResult($resultCode, $message, $data){
		return array('result-code'=>$resultCode, 'message'=>$message, 'data'=>$data);
	}
?>
