<?php
    require './response.php';
    require './cors.php';
    define("LOG_DIR", "../logs/");

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $raw_data = file_get_contents('php://input');

        $filename = LOG_DIR . time() . '_' . uniqid() . ".json";

        file_put_contents($filename, $raw_data);
    } else if($_SERVER['REQUEST_METHOD'] == 'GET') {
        $files = array_diff(scandir(LOG_DIR), array('.','..') );

        $all = array();

        foreach($files as $file) {
            $all[] = json_decode(file_get_contents(LOG_DIR.$file), false, 512, JSON_UNESCAPED_UNICODE);
        }

        response($all);
    }
