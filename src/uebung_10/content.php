<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div>
        <p>
        <?php
        session_start();
        if(isset($_SESSION['login']) && $_SESSION['login'] == true) {
            echo "This is the Members only area!";
        ?>
        <form method="post" action="logout.php">
            <input type="submit" value="Logout">
        </form>
        <?php
        } else {
            echo "<p class='link'>Please sign in before or register <a href='login.html'>here</a>.";
            die();
        }
        ?>
        </p>
    </div>
</body>
</html>