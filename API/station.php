<?php
    include_once('config.php');

    session_start();
    unset($_SESSION['userName']);


    if (!isset($_POST['userName']) || empty($_POST['userName'])) {
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
		$dbh->beginTransaction();

		//$stmt = $dbh->prepare("SELECT admin FROM user WHERE userName = :userName AND pwd = :pwd");
		$stat=$_GET['station']

		if($stat = "all")
		$station = $dbh->query("SELECT * FROM station);
		else
		$station = $dbh->query("SELECT arrival FROM train WHERE departure = :station ");
		
		$dbh->commit();

		$stationDate = = $station->fetchALL(PDO::FETCH_ASSOC);
		$stationTotal = count($stationData);

		$result = array();
		$result['result']='Succeeded';
		$result['stationTotal'] = $todayTotal;
		$result['stationTotal'] = $todayTotal;
		print_r(json_encode($result));
	
	}catch (Exception $e) { 
       $dbh->rollBack(); 
       print('{"result":"Failed"}'); 
       print($e->getMessage()); 
	}
	

?>