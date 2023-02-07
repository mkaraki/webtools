<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mb_strlen</title>
</head>

<body>
    <h1>mb_strlen</h1>
    <form action="" method="post">
        <div>
            <label for="inputstr">Input</label>
            <textarea name="string" id="inputstr"><?= isset($_POST['string']) ? htmlspecialchars($_POST['string']) : '' ?></textarea>
        </div>
        <div>
            <input type="submit" value="Process">
        </div>
    </form>
    <div>
        <?php if (isset($_POST['string'])) : ?>
            <pre><code><?= htmlentities(mb_strlen($_POST['string'])) ?></code></pre>
        <?php endif; ?>
    </div>
</body>

</html>