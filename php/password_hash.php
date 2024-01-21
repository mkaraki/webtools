<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>password_hash</title>
</head>

<body>
    <form action="" method="post">
        <div>
            <label for="inputstr">Input</label>
            <input type="password" name="password" id="inputstr">
        </div>
        <div>
            <label for="algo">Algorithm</label>
            <select name="algo" id="algo">
                <option value="PASSWORD_DEFAULT">PASSWORD_DEFAULT</option>
                <option value="PASSWORD_BCRYPT">PASSWORD_BCRYPT</option>
                <option value="PASSWORD_ARGON2I">PASSWORD_ARGON2I</option>
                <option value="PASSWORD_ARGON2ID">PASSWORD_ARGON2ID</option>
            </select>
        </div>
        <div>
            <input type="submit" value="Process">
        </div>
    </form>

    <div>
        <code>
            <?php if (isset($_POST['password'])) : ?>
                <?= htmlentities(password_hash($_POST['password'], constant($_POST['algo'] ?? 'PASSWORD_DEFAULT'))) ?>
            <?php endif; ?>
        </code>
    </div>
</body>

</html>