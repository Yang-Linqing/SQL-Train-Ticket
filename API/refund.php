<?php
    include_once('config.php');

    session_start();

    //if (!isset($_SESSION['userName']) || empty($_SESSION['userName'])) {
	//	print('{"result": "Forbidden"}');
    //    die();
    //}

	if (!isset($_GET['trainNum']) || empty($_GET['trainNum'])) {
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
		$dbh->beginTransaction();

		$trNu=$_GET['trainNum'];
		$da=$_GET['date'];

		$stm = $dbh->prepare("SELECT sum FROM dailytotal WHERE trainNum = :trainNum");					
		$stm->bindParam(':trainNum', $trainNum);
		$stm->bindParam(':date', $date);
		$trainNum = $trNu;
		$date = $da;
		$sum = $stmt->fetchALL(PDO::FETCH_ASSOC);
		
		$dbh->commit();
		
		if($sun<=0){
			print('{"result": "fail"}');
            die();
		}
		else{
			$stmt = $dbh->prepare("UPDATE dailytotal SET sum=sum-1 WHERE trainNum = :trainNum");
			$stmt->bindParam(':trainNum', $trainNum);
			$trainNum = $trNu;
			print('{"result": "success"}');
		}
		
		
		//print(json_encode($trainData));
	
	}catch (Exception $e) { 
       $dbh->rollBack(); 
       print('{"result":"Failed"}'); 
       print($e->getMessage()); 
	}
	

?>