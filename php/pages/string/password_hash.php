<?php
require_once __DIR__ . '/../../internals/shared.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Hasher</title>
    <style>
        .text-red { color: red; }
    </style>
</head>

<body>
    <header>
        <h1>Password Hasher</h1>
        <hr />
    </header>

    <form action="" method="post">
        <?php csrfFormField(); ?>
        <div>
            <label for="login-password">Password</label>
            <input type="password" id="login-password" name="login-password" required>
        </div>
        <div>
            <label for="argo">Argo</label>
            <select name="argo" id="argo">
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
        <?php if (
            !empty($_POST['login-password']) &&
            !empty($_POST['argo'])
        ) : ?>
            <?php if (
                $_POST['argo'] !== 'PASSWORD_ARGON2I' &&
                $_POST['argo'] !== 'PASSWORD_ARGON2ID' &&
                $_POST['argo'] !== 'PASSWORD_BCRYPT' &&
                $_POST['argo'] !== 'PASSWORD_DEFAULT'
            ) : ?>
                <p class="text-red">Invalid Argo value. Please select a valid option.</p>
            <?php elseif (!csrfValidateToken($_POST['csrf_token'] ?? null)) : ?>
                <p class="text-red">Invalid CSRF token.</p>
            <?php else : ?>
                <?php $hash = password_hash($_POST['login-password'], constant($_POST['argo'])); ?>
                <dl>
                    <dt>Hash</dt>
                    <dd><code><?= htmlspecialchars($hash) ?></code></dd>
                    <dt>Verify</dt>
                    <dd><code><?= password_verify($_POST['login-password'], $hash) ? 'Valid' : 'Invalid' ?></code></dd>
                </dl>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</body>

</html>