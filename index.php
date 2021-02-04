<?php
    session_start();
    $_SESSION['user'] = "Peter Platzhalter";
?>

<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WE - Landingpage</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./src/spa-style.css">
</head>
<body>
    <div id="container">
        <nav class="menu" id="main-menu">
            <a class="navigateMain active" id="home">Home</a>
            <a class="navigateMain">Woche 1</a>
            <a class="navigateMain">Woche 2</a>
            <a class="navigateMain">Woche 3</a>
            <a class="navigateMain">Woche 4</a>
            <a class="navigateMain">Woche 5</a>
            <a class="navigateMain">Woche 6</a>
            <a class="navigateMain">Woche 7</a>
            <a class="navigateMain">Woche 8</a>
            <a class="navigateMain">Woche 9</a>
            <a class="navigateMain">Woche 10</a>
            <a class="navigateMain">Notenverbesserungen</a>
            <a class="navigateMain">Bonus</a>
            <?php if(isset($_SESSION['login']) && $_SESSION['login'] == true) { ?>
                <a class="navigateMain adjust-float">Abmelden</a>
                <a class="adjust-float" href="./src/uebung_10/content.php" target="_blank">Profil</a>
            <?php } else { ?>
                <a class="navigateMain adjust-float">Anmelden</a>
                <a class="navigateMain adjust-float">Registrieren</a>
            <?php } ?>
            <a href="javascript:void(0);" class="icon" onclick="toggleMenu()">
                <i class="fa fa-bars"></i>
            </a>
        </nav>
        <nav id="sub-menu" class="menu">
            <h3 id="week"></h3>
            <hr class="toggle">
            <ul id="files">
            </ul>
        </nav>
        <div id="content-area">
            <div id="info"><p>Beschreibung der Aufgabe</p></div>
            <div id="task">Aufgabenstellung: </div>
            <div id="code-container"><pre><code id="code"></code></pre></div>
        </div>
        <footer id="footer">
            <ul class="menu copyright" style="float:right;">
                <li><a href="https://www.h-brs.de/de/impressum" target="_blank">Impressum</a></li>
            </ul>
        </footer>
    </div>
    <script src="./src/functions.js"></script>
</body>
</html>
