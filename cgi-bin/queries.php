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
				['code'] - 1 if registration was successful, -1 if not
				['message'] - the error/success message
				['data'] - true or false indicating success
	SIGN_IN_USER: Attempts to sign in the user with the specified credentials
			Required Fields:
				['username'] - the username of the user
				['password'] - the password of the user
			Result:
				['code'] - the mysql errno (see link below)
				['message'] - the error/success message
				['data'] - the session hash for the user
	QUERY_CITY: Query all relevant information about the specified city
			Required Fields:
				['city_id'] - the id of the city;
			Result:
				['code'] - -1 if the parameters are unacceptable, or the
					mysql errno
				['message'] - the error/success message
				['data'] - the JSON encoding of the city
	POST_COMMENT_ON_CITY: Posts a comment on a city with a specific ratings
			Required Fields:
				['city_id'] - the ID for the city to comment on
				['username'] - the ID for the user that is making the comment
				['comment'] - the text for the comment
                ['happiness'] - the hapiness rating from 0-5 (0 is NULL)
                ['entertainment'] - the entertainment rating from 0-5 (0 is NULL)
                ['healthcare'] - the healthcare rating from 0-5 (0 is NULL)
                ['education'] - the education rating from 0-5 (0 is NULL)
                ['housing'] - the housing rating from 0-5 (0 is NULL)
                ['crime'] - the crime rating from 0-5 (0 is NULL)
			Result:
				['code'] - -1 if the parameters are unacceptable, or the
					mysql errno
				['message'] - the error/success message
				['data'] - true or false indicating success

	https://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html
	*/

	define("SUCCESSFUL", 0);
	define("UNSUCCESSFUL", -1);

	ini_set('display_startup_errors', 1);
	ini_set('display_errors', 1);
	error_reporting(-1);
	session_start();
	$result = generateResult(UNSUCCESSFUL, "ERROR: Unknown query: " + $_POST['type'], false);
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
			$result = queryCityById($conn, $_POST['city_id']);
			break;
		case "POST_COMMENT_ON_CITY":
			$result = postUserComment($conn, $_POST['city_id'], $_POST['username'], $_POST['comment'], $_POST['happiness'], $_POST['entertainment'], $_POST['healthcare'], $_POST['education'], $_POST['housing'], $_POST['crime']);
			break;
        default:
			$result = generateResult(UNSUCCESSFUL, "Unknown request: " + $_POST['type'], false);
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
				return generateResult(SUCCESSFUL, "Successfully regestered user", true);
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(UNSUCCESSFUL, "Invalid values", false);
    }

	function signInUser($conn, $username, $password){
		$query = "SELECT `username` from `users` WHERE `username`=\"$username\" AND pass=\"$password\"";
		if(!is_null($username) && !is_null(!$password)){

			$result = runQuery($conn, $query);

			if($result){
				if(mysqli_num_rows($result) == 1){
					return generateResult(SUCCESSFUL, "Successfully signed-in.", true);
				} else {
					return generateResult(mysqli_errno($conn), "Username and password do not match.", false);
				}
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(UNSUCCESSFUL, "Invalid values", false);
	}

	function queryCityById($conn, $cityId){
		$query = "SELECT * from `cities` WHERE `_id`=\"$cityId\"";
		if(!is_null($cityId)){
			$result = runQuery($conn, $query);

			if($result){
				if(mysqli_num_rows($result) == 1){
					$generalInfo = mysqli_fetch_assoc($result);

					$city = array();
                    //GENERAL INFO (Cities)
					$city['general'] = $generalInfo;

                    //LANGUAGE INFO (citylanguages)
                    $query  = "SELECT * FROM `citylanguages` WHERE city_id=\"$cityId\" ORDER BY population DESC";
                    $result = runQuery($conn, $query);
                    $city['languages'] = fetchAssocArray($result);

                    //ATTRACTION INFO (cityentertainment)
                    $query = "SELECT * FROM `cityentertainment` WHERE `city_id`=\"$cityId\" ORDER BY type ASC, rank ASC";
                    $result = runQuery($conn, $query);
                    $city['attractions'] = fetchAssocArray($result);

					 //FOOD (cityfood) ***** CHECK IF ASC OR DESC NEEDED
                    $query = "SELECT * FROM `cityfood` WHERE `city_id`=\"$cityId\" ORDER BY name ASC";
                    $result = runQuery($conn, $query);
                    $city['food'] = fetchAssocArray($result);

					 //HOUSING (cityhousing)
                    $query = "SELECT * FROM `cityhousing` WHERE `city_id`=\"$cityId\" ORDER BY type ASC";
                    $result = runQuery($conn, $query);
                    $city['housing'] = fetchAssocArray($result);

					//GDP/GEI.... (cityindices)
                    $query = "SELECT * FROM `cityindices` WHERE `city_id`=\"$cityId\" ORDER BY name ASC";
                    $result = runQuery($conn, $query);
                    $city['indices'] = fetchAssocArray($result);

					//TRANSPORTATION (citytransportation)
                    $query = "SELECT * FROM `citytransportation` WHERE `city_id`=\"$cityId\" ORDER BY type ASC";
                    $result = runQuery($conn, $query);
                    $city['transportation'] = fetchAssocArray($result);

					//UTILITIES(cityutilities)
                    $query = "SELECT * FROM `cityutilities` WHERE `city_id`=\"$cityId\" ORDER BY type ASC";
                    $result = runQuery($conn, $query);
                    $city['utilities'] = fetchAssocArray($result);

					//COMMENT (comment)
                    $query = "SELECT * FROM `comments` WHERE `city_id`=\"$cityId\" ORDER BY _id ASC";
                    $result = runQuery($conn, $query);
					$commentArr = fetchAssocArray($result);

                    //COMMENT RATINGS (commentratings)
                    $query = "SELECT * FROM `commentratings` WHERE `city_id`=\"$cityId\" ORDER BY _id ASC";
                    $result = runQuery($conn, $query);
					$ratingArr = fetchAssocArray($result);

					for($i = 0; $i < count($commentArr); $i++){
						//append rating to comment
						$commentArr[$i]['rating'] = $ratingArr[$i];
					}

					$city['comments'] = $commentArr;

					return generateResult(SUCCESSFUL, "Successfully queried city: $cityId", $city);
				}
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(UNSUCCESSFUL, "Invalid city ID: $cityId", false);
	}

	/*
	* Post a Comment
	*/
	function postUserComment($conn, $cityId, $userId, $comment, $happiness, $entertainment , $healthcare, $education, $housing, $crime){
		$today = getdate();
		$todaysdate = $today['year'] . "-" . $today['mon'] . "-" . $today['mday'] . " " . $today['hours'] . ":" . $today['minutes'] . ":" . $today['seconds'] ;

		$query = "INSERT INTO `comments` (_id, city_id, user_id, comment, time_entered) VALUES (NULL, \"$cityId\", \"$userId\", \"$comment\", \"$todaysdate\")";

		if(!is_null($cityId) && !is_null($userId) && !is_null($comment)){
			$result = runQuery($conn, $query);
			$comment_id = mysqli_insert_id($conn);

            echo mysqli_error($conn);
            echo $comment_id;

			$rating = rateUserComment($conn, $comment_id, $city_id, $happiness, $entertainment , $healthcare, $education, $housing, $crime);

			if($result && $rating){
				return generateResult(SUCCESSFUL, "Adding comment successful" , true);
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(UNSUCCESSFUL, "Invalid comment", false);
	}

	/*
	* Rate a Comment
	*/
	function rateUserComment ($conn,  $comment_id, $city_id, $happiness, $entertainment , $healthcare, $education, $housing, $crime) {

		$query  = "INSERT INTO `commentratings` (_id, comment_id, city_id, happiness, entertainment, healthcare, education, housing, crime) VALUES (NULL, \"$comment_id\", \"$city_id\",";
        $valArr = [$happiness, $entertainment , $healthcare, $education, $housing, $crime];
        foreach($valArr as $value){
            if($value == 0){
                $query .= "NULL, ";
            } else {
                $query .= $value . ", ";
            }
        }

		$result = runQuery($conn,$query);
		return $result;
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
		return array('code'=>$resultCode, 'message'=>$message, 'data'=>$data);
	}
?>
