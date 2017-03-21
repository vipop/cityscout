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
	SIGN_IN_USER: Attempts to sign in the user with the specified credentials
			Required Fields:
				['username'] - the username of the user
				['password'] - the password of the user
			Result:
				['result-code'] - the mysql errno (see link below)
				['message'] - the error/success message
				['data'] - the session hash for the user
	QUERY_CITY: Query all relevant information about the specified city
			Required Fields:
				['city-id'] - the id of the city;
			Result:
				['result-code'] - -1 if the parameters are unacceptable, or the
					mysql errno
				['message'] - the error/success message
				['data'] - the JSON encoding of the city
	COMPARE_CITIES:
			Required Fields:
				['city-id-1']: the ID for the first city to be compared
				['city-id-2']: the ID for the second city to be compared
			Result:
				['result-code'] - -1 if the parameters are unacceptable, or the
					mysql errno
				['message'] - the error/success message
				['data'] - the JSON encoding of the pair of cities
	POST_COMMENT_ON_CITY:
			Required Fields:
				['city-id'] - the ID for the city to comment on
				['user-id'] - the ID for the user that is making the comment
				['comment'] - the text for the comment
			Result:
				['result-code'] - -1 if the parameters are unacceptable, or the
					mysql errno
				['message'] - the error/success message
				['data'] - true or false indicating success

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
            $result = insertUser($conn, $_POST['username'], $_POST['password'], $_POST['email']);
            break;
		case "SIGN_IN_USER":
			$result = signInUser($conn, $_POST['username'], $_POST['password']);
			break;
		case "QUERY_CITY":
			$result = queryCityById($conn, $_POST['city-id']);
			break;
		case "COMPARE_CITIES":
			$result = compareCities($conn, $_POST['city-id-1'], $_POST['city-id-2']);
			break;
		case "POST_COMMENT_ON_CITY":
			$result = postUserComment($conn, $_POST['city-id'], $_POST['user-id'], $_POST['comment']);
			break;
        default:
			$result = generateResult(-1, "Unknown request: " + $_POST['type'], false);
            break;
    }
	echo json_encode($result);
	mysqli_close($conn);

	/**
	* Query functions
	*/
    function insertUser($conn, $username, $password, $email){
		$query = "INSERT INTO `users` (username, pass, email) VALUES (\"$username\", \"$password\", \"$email\")";
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
		$query = "SELECT `username` from `users` WHERE `username`=\"$username\" AND pass=\"$password\"";
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

	function queryCityById($conn, $cityId){
		$query = "SELECT * from `cities` WHERE `_id`=\"$cityId\"";
		if(!is_null($cityId)){
			$result = runQuery($conn, $query);

			if($result){
				if(mysqli_num_rows($result) == 1){
					$generalInfo = mysqli_fetch_assoc($result);

					$city = array();
                    //GENERAL INFO
					$city['general'] = $generalInfo;

                    //LANGUAGE INFO
                    $query  = "SELECT * FROM `citylanguages` WHERE city_id=\"$cityId\" ORDER BY population DESC";
                    $result = runQuery($conn, $query);
                    $city['languages'] = fetchAssocArray($result);

                    //ATTRACTION INFO
                    $query = "SELECT * FROM `cityentertainment` WHERE `city_id`=\"$cityId\" ORDER BY type ASC, rank ASC";
                    $result = runQuery($conn, $query);
                    $city['attractions'] = fetchAssocArray($result);

					return generateResult(mysqli_errno($conn), "Successfully queried city: $cityId", $city);
				}
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(-1, "Invalid city ID: $cityId", false);
	}

	function compareCities($conn, $cityId1, $cityId2){
		//TODO
	}

	function postUserComment($conn, $cityId, $userId, $comment){
		//TODO
	}

	/*
	* Utility functions
	*/
	function getConnection(){
		$dbhost = "localhost";
        $dbname = "cityscout";
        $dbuser = "root";
        $dbpass = "";

        return mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	}

	function runQuery($conn, $query){
		return mysqli_query($conn, $query);
	}

    function fetchAssocArray($result){
        $arr = array();
        while($row = mysqli_fetch_assoc($result)){
            array_push($arr, $row);
        }
        return $arr;
    }

	function generateResult($resultCode, $message, $data){
		return array('result-code'=>$resultCode, 'message'=>$message, 'data'=>$data);
	}
?>
