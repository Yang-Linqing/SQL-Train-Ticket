<?php
    include_once('config.php');

    session_start();

    //if (!isset($_SESSION['userName']) || empty($_SESSION['userName'])) {
	//	print('{"result": "Forbidden"}');
    //    die();
    //}

	if (!isset($_GET['departure']) || empty($_GET['departure'])) {
        die();
    }

	if (!isset($_GET['terminal']) || empty($_GET['terminal'])) {
        die();
    }

	if (!isset($_GET['date']) || empty($_GET['date'])) {
        die();
    }

    try {
        $dbh = new PDO("mysql:host={$db_config['host']};dbname={$db_config['dbName']}", $db_config['user'], $db_config['pwd'], [PDO::ATTR_PERSISTENT => true, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"]);
    } catch (PDOExveption $e) {
        print('{"result":"Database Fatal"');
        die();
    }

	try{
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$depar=$_GET['departure'];
		$term=$_GET['terminal'];
		$da=$_GET['date'];
--------------------
		$stmt = $dbh->prepare("SELECT trainNum,departure,departTime,arrival,arrivTime,price FROM train WHERE departure = :departure AND arrival = :terminal ");
		$stmt->bindParam(':departure', $departure);
		$stmt->bindParam(':terminal', $terminal);
		$stmt->bindParam(':date', $date);
		$departure = $depar;
		$terminal = $term;
		$date = $da;

		$stmt->execute();

		$trainDate = $stmt->fetchALL(PDO::FETCH_ASSOC);
		print(json_encode($trainData));
	
	}catch (Exception $e) { 
       $dbh->rollBack(); 
       print('{"result":"Failed"}'); 
       print($e->getMessage()); 
	}
	

?>