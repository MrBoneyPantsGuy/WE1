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
    <style>
        body {
            margin: 0;
            font-family: 'Raleway';
        }

        #main-menu ul li {
            display: inline;
        }

        #container {
            display: grid;
            width: 100%;
            height: 100vh;
            grid-template-columns: auto 1fr 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas:
            "header header header"
            "left content content"
            "footer footer footer";
        }

        #main-menu {
            grid-area: header;
            background: #333;
        }

        #sub-menu {
            grid-area: left;
            background: darkgrey;
            display: none;
            padding-left: 1em;
            padding-right: 1em;
        }

        #content-area {
            display: grid;
            grid-area: content;
            background: dimgrey;
            width: 100%;
            grid-template-columns: 100%;
            grid-template-rows: auto 1fr;
            grid-template-areas:
            "info"
            "file";
            overflow-y: scroll;
        }

        #info {
            grid-area: info;
            background: #4a77d4;
            padding-left: 1em;
            display: none;
        }

        #code-container {
            grid-area: file;
            background: dimgrey;
            padding: 1em;
        }

        .renderbutton {
            margin-left: 1em;
            padding: 0.5em;
        }

        .renderbutton a {
            text-decoration: none;
        }

        .renderbutton a:visited {

        }

        renderbutton a:hover {

        }

        pre {
            white-space: pre-wrap;
            tab-size: 3;
            margin-top: 0;
            margin-bottom: 0;
            color: gold;
        }

        #footer {
            grid-area: footer;
            background: #333;
        }

        ul.menu {
            list-style-type: none;
            margin: 0;
            padding: 0;
            background-color: #333;
        }

        ul.menu li {
            float: left;
        }

        ul.menu li a {
            display: inline-block;
            color: white;
            text-align: center;
            padding: 1em 1em;
            text-decoration: none;
        }

        ul.menu li a:hover:not(.active) {
            background-color: #000;
        }

        ul.menu li a.active {
            background-color: #1E90FF;
        }

        .right {
            float: right;
        }

        ul li:hover {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="container">
        <nav id="main-menu" >
            <ul class="menu">
                <li><a class="navigateMain active">Home</a></li>
                <li><a class="navigateMain">Woche 1</a></li>
                <li><a class="navigateMain">Woche 2</a></li>
                <li><a class="navigateMain">Woche 3</a></li>
                <li><a class="navigateMain">Woche 4</a></li>
                <li><a class="navigateMain">Woche 5</a></li>
                <li><a class="navigateMain">Woche 6</a></li>
                <li><a class="navigateMain">Woche 7</a></li>
                <li><a class="navigateMain">Woche 8</a></li>
                <li><a class="navigateMain">Woche 9</a></li>
                <li><a class="navigateMain">Woche 10</a></li>
                <li><a class="navigateMain">Bonus</a></li>
                <?php if(isset($_SESSION['login']) && $_SESSION['login'] == true) { ?>
                    <li style="float: right;"><a class="navigateMain">Abmelden</a></li>
                <?php } else { ?>
                    <li style="float: right;"><a class="navigateMain">Anmelden</a></li>
                    <li style="float: right;"><a class="navigateMain">Registrieren</a></li>
                <?php } ?>
            </ul>
        </nav>
        <nav id="sub-menu">
            <h3 id="week"></h3>
            <hr>
            <ul id="files">
            </ul>
        </nav>
        <div id="content-area">
            <div id="info"><p>Beschreibung der Aufgabe</p></div>
            <div id="code-container"><pre><code class="lang-html" id="code"></code></pre></div>
        </div>
        <footer id="footer">
            <ul class="menu copyright right">
                <li><a href="https://www.h-brs.de/de/impressum" target="_blank">Impressum</a></li>
            </ul>
        </footer>
    </div>
    <script src="./src/functions.js"></script>
</body>
</html>
