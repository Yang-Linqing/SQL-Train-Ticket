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
        $stmt = $dbh->prepare("INSERT INTO user(userName, pwd, name, id, admin) VALUES (:userName, :pwd, :name, :id, 0)");
        $stmt->bindParam(':userName', $userName);
        $stmt->bindParam(':pwd', $pwd);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':id', $id);

        $userName = $_POST['userName'];
        if(!isset($_POST['pwd']) || empty($_POST['pwd'])) {
            //check error
            print('{"result": "fail"}');
            die();
        }
        $pwd = $_POST['pwd'];
        if(!isset($_POST['name']) || empty($_POST['name'])) {
            print('{"result": "fail"}');
            die();
        }
        $name = $_POST['name'];
        if(!isset($_POST['id']) || empty($_POST['id'])) {
            print('{"result": "fail"}');
            die();
        }
        $id = $_POST['id'];

        $stmt->execute();
        print('{"result": "success"}');
    } catch (Exception $e) {
        print('{"result":"fail"}');
        //print($e->getMessage());
    }
?>