<?php
    error_reporting(0);
    require './response.php';
    require './cors.php';
    define("LOG_DIR", "../logs/");
    define("SECRETSALT", "ThisShouldNotBeHereButActuallyIs-1337");
    session_start();


    function getAccounts() {
        $files = array_diff(scandir(LOG_DIR), array('.','..') );
        $all = array();
        foreach($files as $file) {
            $all[] = json_decode(file_get_contents(LOG_DIR.$file), false, 512, JSON_UNESCAPED_UNICODE);
        }
        return $all;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $_SESSION['attempts'] = 3;
        $raw_data = file_get_contents('php://input');
        $json_data = json_decode($raw_data, true);

        $hashedName = hash("sha384", $json_data['user'] . SECRETSALT);
        $hashedPassword = hash("sha384", $json_data['password'] . SECRETSALT);
        $json_data_hash['user'] = $hashedName;
        $json_data_hash['password'] = $hashedPassword;

        $hashedData = json_encode($json_data_hash);

        if(isset($json_data['submit']) && $json_data['submit'] == 'login') { // user tries to login
            $all = getAccounts();

            foreach($all as $obj) {
                if($obj->user == $json_data_hash['user'] && $obj->password == $json_data_hash['password']) {
                    $_SESSION['login'] = true;
                    $_SESSION['user'] = $json_data['user'];
                    response(true);
                }
            }
            response(false);
        } else { // user wants to register
            $all = getAccounts();

            foreach($all as $obj) {
                if($obj->user == $json_data_hash['user']) {
                    response("Username already taken!");
                }
            }
            $filename = LOG_DIR . time() . '_' . uniqid() . ".json";
            file_put_contents($filename, $hashedData);
        }
    }