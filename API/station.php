<?php
    include_once('config.php');

    session_start();

    //if (!isset($_SESSION['userName']) || empty($_SESSION['userName'])) {
	//	print('{"result": "Forbidden"}');
    //    die();
    //}

	if (!isset($_GET['station']) || empty($_GET['station'])) {
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

		$stat=$_GET['station'];

		if($stat = "all"){
		    $stmt = $dbh->query("SELECT * FROM station");
		}
		else{
		    $stmt = $dbh->prepare("SELECT arrival FROM train WHERE departure = :station ");
			$stmt->bindParam(':station', $station);
			$station = $stat;

		}

		$stmt->execute();

		$stationData = $stmt->fetchALL(PDO::FETCH_ASSOC);
		print(json_encode($stationData));
	
	}catch (Exception $e) { 
       $dbh->rollBack(); 
       print('{"result":"Failed"}'); 
       print($e->getMessage()); 
	}
	

?>