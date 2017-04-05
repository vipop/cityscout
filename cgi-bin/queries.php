<?php
    /*=========================================================================\
	| API                                                                      |
	\==========================================================================/
    The response code can have different values depending on the result:
            -1 - One or more of the parameters were invalid (usually NULL)
            0 - The request was successful
    Otherwise, it will be the mysqli error code

	Must have ['type'] set to one of the following values:
	REGISTER_USER: Registers a new user with the specified credentials
			Required Fields:
				['username'] - the desired username of the new user
				['password'] - the desired password for the new user
				['email'] - the email for the new user
			Result:
				['code'] - See above
				['message'] - the error/success message
				['data'] - true or false indicating success
	SIGN_IN_USER: Attempts to sign in the user with the specified credentials
			Required Fields:
				['username'] - the username of the user
				['password'] - the password of the user
			Result:
				['code'] - See above
				['message'] - the error/success message
				['data'] - the session hash for the user
	QUERY_CITY: Query all relevant information about the specified city
			Required Fields:
				['city_id'] - the id of the city;
			Result:
				['code'] - See above
				['message'] - the error/success message
				['data'] - the JSON encoding of the city
    QUERY_COMMENTS: Query the comments for the specified city
            Required Fields:
                ['city_id'] - the id of the city;
            Result:
                ['code'] - See above
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
				['code'] - See above
				['message'] - the error/success message
				['data'] - true or false indicating success
    POST_CONTRIBUTION: Posts a contribution to a specific section on a specific
    city
            Required Fields:
                ['city_id'] - the id of the city
                ['field'] - the specific field to contribute to
                Field Specific Data - see below

    ----------------------------------------------------------------------------
    In order to post a contribution to a city, the field must be one of the
    following:
            entertainment
            food
            housing
            transportation
            utilities
    and must have the following attributes:
            ['ctype'] - the normalized type of the contribution. This should be
                provided via selector
            ['cdesc'] - the string descriptor for the contribution cost (ex. $
                or $/month)
            ['ccost'] - the cost of the contribution

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
        case "QUERY_COMMENTS":
            $result = queryCommentsForCity($conn, $_POST['city_id']);
            break;
		case "POST_COMMENT_ON_CITY":
			$result = postUserComment($conn, $_POST['city_id'], $_POST['username'], $_POST['comment'], $_POST['happiness'], $_POST['entertainment'], $_POST['healthcare'], $_POST['education'], $_POST['housing'], $_POST['crime']);
			break;
        case "POST_CONTRIBUTION":
            $result = postContribution($conn, $_POST['city_id'], $_POST['field'], $_POST);
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
                    $query  = "SELECT `name`, `population` FROM `citylanguages` WHERE city_id=\"$cityId\" ORDER BY population DESC";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['languages'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying citylanguages: " . mysqli_error($conn), false);
                    }

                    //ATTRACTION INFO (cityattractions)
                    $query = "SELECT `name`, `about`, `cost`, `cost_desc`, `image`, `link`, `location` FROM `cityattractions` WHERE `city_id`=\"$cityId\"";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['attractions'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityattractions: " . mysqli_error($conn), false);
                    }

                    //ENTERTAINMENT INFO (cityentertainment)
                    $query = "SELECT `type`, `cost_desc`, AVG(`cost`) as `cost` FROM `cityentertainment` WHERE city_id=\"$cityId\" GROUP BY type ORDER BY type";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['entertainment'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityentertainment: " . mysqli_error($conn), false);
                    }

					//FOOD (cityfood)
                    $query = "SELECT `type`, `cost_desc`, AVG(`cost`) AS `cost` FROM `cityfood` WHERE city_id=\"$cityId\" GROUP BY type ORDER BY type ASC";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['food'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityfood: " . mysqli_error($conn), false);
                    }

					 //HOUSING (cityhousing)
                    $query = "SELECT type, payment, cost_desc, AVG(cost) AS `cost` FROM `cityhousing` WHERE city_id=\"$cityId\" GROUP BY type ORDER BY type ASC";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['housing'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityhousing: " . mysqli_error($conn), false);
                    }

					//GDP/GEI.... (cityindices)
                    $query = "SELECT `name`, `value_desc`, `value` FROM `cityindices` WHERE `city_id`=\"$cityId\" ORDER BY name ASC";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['indices'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityindices: " . mysqli_error($conn), false);
                    }

					//TRANSPORTATION (citytransportation)
                    $query = "SELECT `type`, `cost_desc`, AVG(`cost`) AS `cost` FROM `citytransportation` WHERE `city_id`=\"$cityId\" GROUP BY `type` ORDER BY `type` ASC";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['transportation'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying citytransportation: " . mysqli_error($conn), false);
                    }

					//UTILITIES(cityutilities)
                    $query = "SELECT `type`, `cost_desc`, AVG(`cost`) AS `cost` FROM `cityutilities` WHERE `city_id`=\"$cityId\" GROUP BY `type` ORDER BY `type`";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['utilities'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityutilities: " . mysqli_error($conn), false);
                    }

                    //CLIMATE (cityclimate)
                    $query = "SELECT `high_avg`, `low_avg`, `rainfall`, `snowfall` FROM `cityclimate` WHERE `city_id`=\"$cityId\"";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['climate'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying cityclimate: " . mysqli_error($conn), false);
                    }

                    //USERRATINGS
                    $query = "SELECT AVG(`happiness`) AS `happiness`, AVG(`entertainment`) AS `entertainment`, AVG(`healthcare`) AS `healthcare`, AVG(`education`) AS `education`, AVG(`housing`) AS `housing`, AVG(crime) AS crime FROM `commentratings` WHERE `city_id`=\"$cityId\" ORDER BY comment_id";
                    $result = runQuery($conn, $query);
                    if($result){
                        $city['ratings'] = fetchAssocArray($result);
                    } else {
                        return generateResult(mysqli_errno($conn), "Error querying commentratings: " . mysqli_error($conn), false);
                    }

					//COMMENT (comment)
                    $response = queryCommentsForCity($conn, $cityId);
                    if($response['code'] == 0){
                        $city['comments'] = $response['data'];

    					return generateResult(SUCCESSFUL, "Successfully queried city: $cityId", $city);
                    } else {
    					return $response;
                    }
				}
			} else {
				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
			}
		}
		return generateResult(UNSUCCESSFUL, "Invalid city ID: $cityId", false);
	}

    function queryCommentsForCity($conn, $cityId){
        $query1 = "SELECT `user_id`, `comment`, `time_entered` FROM `comments` WHERE `city_id`=\"$cityId\" ORDER BY _id DESC";
        $query2 = "SELECT `happiness`, `entertainment`, `healthcare`, `education`, `housing`, `crime` FROM `commentratings` WHERE `city_id`=\"$cityId\" ORDER BY _id DESC";
		if(!is_null($cityId)){
			$result1 = runQuery($conn, $query1);
            $result2 = runQuery($conn, $query2);

			if($result1 && $result2){

				$commentArr = fetchAssocArray($result1);
				$ratingArr = fetchAssocArray($result2);

				for($i = 0; $i < count($commentArr); $i++){
					//append rating to comment
					$commentArr[$i]['rating'] = $ratingArr[$i];
				}

				return generateResult(SUCCESSFUL, "Successfully queried city: $cityId", $commentArr);
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

            if($result){
    			$comment_id = mysqli_insert_id($conn);

    			$rating = rateUserComment($conn, $comment_id, $cityId, $happiness, $entertainment , $healthcare, $education, $housing, $crime);

    			if($rating){
    				return generateResult(SUCCESSFUL, "Adding comment successful" , true);
    			} else {
    				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
    			}
            } else {
                return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
            }
		}
		return generateResult(UNSUCCESSFUL, "Invalid comment", false);
	}

	/*
	* Rate a Comment
	*/
	function rateUserComment ($conn,  $comment_id, $cityId, $happiness, $entertainment , $healthcare, $education, $housing, $crime) {

		$query = "INSERT INTO `commentratings` (_id, comment_id, city_id, happiness, entertainment, healthcare, education, housing, crime) VALUES (NULL, \"$comment_id\", \"$cityId\",";
        $valArr = [$happiness, $entertainment , $healthcare, $education, $housing, $crime];

        foreach($valArr as $value){
            if($value == 0){
                $query .= "NULL, ";
            } else {
                $query .= $value . ", ";
            }
        }
        $query = substr($query, 0, -2) . ")";

		$result = runQuery($conn,$query);
		return $result;
    }

    /**
    * Submit a contribution
    */
    function postContribution($conn, $cityId, $field, $post){

        $ctype = $post['ctype'];
        $cdesc = $post['cdesc'];
        $ccost = $post['ccost'];

        if($cityId){
            $query = NULL;
            switch ($field) {
                case 'entertainment':
                    $query = "INSERT INTO `cityentertainment` (`_id`, `city_id`, `type`, `cost_desc`, `cost`) VALUES (NULL, \"$cityId\", \"$ctype\", \"$cdesc\", \"$ccost\")";
                    break;
                case 'food':
                    $query = "INSERT INTO `cityfood` (`_id`, `city_id`, `type`, `cost_desc`, `cost`) VALUES (NULL, \"$cityId\", \"$ctype\", \"$cdesc\", \"$ccost\")";
                    break;
                case 'housing':
                    $cpay = $post['cpay'];
                    $query = "INSERT INTO `cityhousing` (`_id`, `city_id`, `type`, `payment`, `cost_desc`, `cost`) VALUES (NULL, \"$cityId\", \"$ctype\", \"$cpay\", \"$cdesc\", \"$ccost\")";
                    break;
                case 'transportation':
                    $query = "INSERT INTO `citytransportation` (`_id`, `city_id`, `type`, `cost_desc`, `cost`) VALUES (NULL, \"$cityId\", \"$ctype\", \"$cdesc\", \"$ccost\")";
                    break;
                case 'utilities':
                    $query = "INSERT INTO `cityutilities` (`_id`, `city_id`, `type`, `cost_desc`, `cost`) VALUES (NULL, \"$cityId\", \"$ctype\", \"$cdesc\", \"$ccost\")";
                    break;
                default:
                    break;
            }

            if($query){
                $result = runQuery($conn, $query);
                if($result){
    				return generateResult(SUCCESSFUL, "Adding contribution successful", true);
    			} else {
    				return generateResult(mysqli_errno($conn), mysqli_error($conn), false);
    			}
            } else {
                return generateResult(UNSUCCESSFUL, "Unknown field: " + $field, false);;
            }
        } else {
            return generateResult(UNSUCCESSFUL, "Invalid city", false);
        }
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
