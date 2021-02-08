<?php
    session_start();
    if(isset($_SESSION['user'])) {
        echo "<h1>Eingeloggt als: ".$_SESSION["user"]."</h1>";
    } else {
        echo "No user currently logged in.";
    }

