<?php
	include_once('config.php');

    session_start();

	if (!isset($_SESSION['userName']) || empty($_SESSION['userName'])) {
		    print('{"result": "Forbidden"}');
        die();
    }

	if (!isset($_POST['trainNum']) || empty($_POST['trainNum'])) {
		print('{"result":"fail1"}'); 
        die();
    }
	
	if (!isset($_POST['departure']) || empty($_POST['departure'])) {
		print('{"result":"fail2"}'); 
        die();
    }

	if (!isset($_POST['departTime']) || empty($_POST['departTime'])) {
		print('{"result":"fail3"}'); 
        die();
    }

	if (!isset($_POST['arrival']) || empty($_POST['arrival'])) {
		print('{"result":"fail4"}'); 
        die();
    }

	if (!isset($_POST['arriveTime']) || empty($_POST['arriveTime'])) {
		print('{"result":"fail5"}'); 
        die();
    }

	if (!isset($_POST['price']) || empty($_POST['price'])) {
		print('{"result":"fail6"}'); 
        die();
    }

	if (!isset($_POST['total']) || empty($_POST['total'])) {
		print('{"result":"fail7"}'); 
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

//-----------------------------------------------------------------------------------
//判断是不是管理员
	$stmt = $dbh->prepare("SELECT admin FROM user WHERE userName = :userName");
	$stmt->bindParam(':userName', $userName);
	$userName = $_SESSION['userName'];
	$stmt->execute();
	$admin = $stmt->fetch(PDO::FETCH_ASSOC);

	if($admin['admin'] == 0 ){      //如果该用户不是管理员
     $dbh->rollBack(); 
		 print('{"result":"Forbidden"}');
        die();
	}	
//---------------------------------------------------------------------------------------
	//更新和修改相应的消息
	$stmt = $dbh->prepare("UPDATE train SET departure = :departure, departTime = :departTime, arrival = :arrival, arriveTime = :arriveTime, price = :price, total = :total WHERE trainNum = :trainNum");
	$stmt->bindParam(":trainNum", $trainNum);
	$trainNum = $_POST['trainNum'];
	$stmt->bindParam(":departure", $departure);
	$departure = $_POST['departure'];
	$stmt->bindParam(":departTime", $departTime);
	$departTime = $_POST['departTime'];
	$stmt->bindParam(":arrival", $arrival);
	$arrival = $_POST['arrival'];
	$stmt->bindParam(":arriveTime", $arriveTime);
	$arriveTime = $_POST['arriveTime'];
	$stmt->bindParam(":price", $price);
	$price = $_POST['price'];
	$stmt->bindParam(":total", $total);
	$total = $_POST['total'];
	$stmt->execute();

	$dbh->commit();
	print('{"result": "success"}');

	}catch (Exception $e) { 
       $dbh->rollBack(); 
       print('{"result":"fail"}'); 
       print($e->getMessage());
      }
?>