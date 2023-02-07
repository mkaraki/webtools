<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mb_convert_encoding (Mojibake resolver)</title>
</head>

<body>
    <h1>mb_convert_encoding (Mojibake resolver)</h1>
    <form action="" method="post">
        <div>
            <label for="inputstr">Input</label>
            <textarea name="string" id="inputstr"><?= isset($_POST['string']) ? htmlspecialchars($_POST['string']) : '' ?></textarea>
        </div>
        <div>
            <label for="frenc">From</label>
            <select name="frenc" id="frenc">
                <?php foreach (mb_list_encodings() as $i) : ?>
                    <option value="<?= $i ?>" <?php if (isset($_POST['frenc']) && $_POST['frenc'] === $i) : ?>selected<?php endif; ?>><?= $i ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div>
            <input type="submit" value="Process">
        </div>
    </form>
    <div>
        <?php if (isset($_POST['string']) && isset($_POST['frenc'])) : ?>
            <pre><code><?= htmlentities(mb_convert_encoding($_POST['string'], $_POST['frenc'], 'UTF-8')) ?></code></pre>
        <?php endif; ?>
    </div>
</body>

</html>