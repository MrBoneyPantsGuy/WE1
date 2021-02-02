<?php
    require './response.php';
    require './cors.php';
    define("LOG_DIR", "../logs/");
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $raw_data = file_get_contents('php://input');
        $json_data = json_decode($raw_data, true);

        if(isset($json_data['submit']) && $json_data['submit'] == 'login') { // user tries to login
            $_SESSION['login'] = true;
            exit();
        } else { // user wants to register
            $filename = LOG_DIR . time() . '_' . uniqid() . ".json";
            file_put_contents($filename, $raw_data);
        }
    } else if($_SERVER['REQUEST_METHOD'] == 'GET') {
        $files = array_diff(scandir(LOG_DIR), array('.','..') );

        $all = array();

        foreach($files as $file) {
            $all[] = json_decode(file_get_contents(LOG_DIR.$file), false, 512, JSON_UNESCAPED_UNICODE);
        }

        response($all);
    }
