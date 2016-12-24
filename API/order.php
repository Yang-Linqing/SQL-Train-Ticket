<?php
    include_once('config.php');

    session_start();

    if (!isset($_SESSION['userName']) || empty($_SESSION['userName'])) {
		print('{"result": "Forbidden"}');
        die();
    }


	if (!isset($_POST['trainNum']) || empty($_GET['trainNum'])) {
        die();
    }

	if (!isset($_POST['date']) || empty($_GET['date'])) {

	if (!isset($_POST['trainNum']) || empty($_POST['trainNum'])) {
        die();
    }

	if (!isset($_POST['date']) || empty($_POST['date'])) {

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

		$trNu=$_POST['trainNum'];
		$da=$_POST['date'];

		$stmt = $dbh->prepare("SELECT total FROM train WHERE trainNum = :trainNum");					
		$stmt->bindParam(':trainNum', $trainNum);
		$trainNum = $trNu;
		$stmt->execute();
		$total = $stmt->fetch(PDO::FETCH_ASSOC);

		$stmt = $dbh->prepare("SELECT sum FROM dailytotal WHERE trainNum = :trainNum AND date = :date");					
		$stmt->bindParam(':trainNum', $trainNum);
		$stmt->bindParam(':date', $date);
		$trainNum = $trNu;
		$date = $da;
		$stmt->execute();
		$sum = $stmt->fetch(PDO::FETCH_ASSOC);

		$remain = $total['total'] - $sum['sum'];
		if($remain<=0){
			$dbh->rollBack(); 
			print('{"result": "fail"}');
            die();
		}
		else{
			$stmt = $dbh->prepare("INSERT INTO dailytotal(date, trainNum, sum) VALUES (:date, :trainNum, 1) ON DUPLICATE KEY UPDATE sum=sum+1");
			$stmt->bindParam(':trainNum', $trainNum);
			$stmt->bindParam(':date', $date);
			$trainNum = $trNu;
			$date = $da;
			$stmt->execute();
			$stmt = $dbh->prepare("INSERT INTO orders(userName, trainNum, date) VALUES (:userName, :trainNum, :date)");
			$stmt->bindParam(':userName', $userName);
			$stmt->bindParam(":trainNum", $trainNum);
			$stmt->bindParam(":date", $date);
			$userName = $_SESSION['userName'];
			$trainNum = $_POST['trainNum'];
			$date = $_POST['date'];
			$stmt->execute();

			$stmt = $dbh->prepare("SELECT total FROM train WHERE trainNum = :trainNum");					
			$stmt->bindParam(':trainNum', $trainNum);
			$trainNum = $trNu;
			$stmt->execute();
			$total = $stmt->fetch(PDO::FETCH_ASSOC);

			$stmt = $dbh->prepare("SELECT sum FROM dailytotal WHERE trainNum = :trainNum AND date = :date");					
			$stmt->bindParam(':trainNum', $trainNum);
			$stmt->bindParam(':date', $date);
			$trainNum = $trNu;
			$date = $da;
			$stmt->execute();
			$sum = $stmt->fetch(PDO::FETCH_ASSOC);

			$remain = $total['total'] - $sum['sum'];
			if($remain<=0){
				$dbh->rollBack(); 
				print('{"result": "fail"}');
				die();
			}
			$dbh->commit();
			print('{"result": "success"}');
		}
		
		
		//print(json_encode($trainData));
	
	}catch (Exception $e) { 
       $dbh->rollBack(); 
       print('{"result":"Failed"}'); 
       print($e->getMessage()); 
	}
	

?>