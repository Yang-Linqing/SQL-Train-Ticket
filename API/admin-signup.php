<?php
    include_once('config.php');

    session_start();

    if (!isset($_POST['userName']) || empty($_POST['userName'])) {
        die();
    }

    try {
        $dbh = new PDO("mysql:host={$db_config['host']};dbname={$db_config['dbName']}", $db_config['user'], $db_config['pwd'], [PDO::ATTR_PERSISTENT => true, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"]);
    } catch (PDOExveption $e) {
        print('{"result":"Database Fatal"');
        die();
    }

    try {
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        //band names in SQL before run SQL.
        $stmt = $dbh->prepare("INSERT INTO user(userName, pwd, admin) VALUES (:userName, :pwd, 1)");
        $stmt->bindParam(':userName', $userName);
        $stmt->bindParam(':pwd', $pwd);

        $userName = $_POST['userName'];
        if(!isset($_POST['pwd']) || empty($_POST['pwd'])) {
            //check error
            print('{"result": "fail"}');
            die();
        }
        $pwd = $_POST['pwd'];

        $stmt->execute();
        print('{"result": "success"}');
    } catch (Exception $e) {
        print('{"result":"fail"}');
        //print($e->getMessage());
    }
?>