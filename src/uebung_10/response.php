<?php
function response($msg) {
    $msg = json_encode($msg, JSON_UNESCAPED_UNICODE);

    $callback = filter_input(INPUT_GET, 'callback', FILTER_SANITIZE_STRING);

    if(isset($callback)) {
        $msg = $callback.'('.$msg.');';
    }

    die($msg);
}