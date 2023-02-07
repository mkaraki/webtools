<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mb_convert_kana</title>
</head>

<body>
    <h1>mb_convert_kana</h1>
    <a href="https://www.php.net/manual/en/function.mb-convert-kana.php">
        PHP Document
    </a>
    <form action="" method="post">
        <div>
            <label for="inputstr">Input</label>
            <textarea name="string" id="inputstr"><?= isset($_POST['string']) ? htmlspecialchars($_POST['string']) : '' ?></textarea>
        </div>
        <div>
            <label for="mode">Mode</label>
            <select name="mode" id="mode" value="<?= isset($_POST['mode']) ? htmlspecialchars($_POST['mode']) : '' ?>">
                <option value="r">r: Alphabet Z to H</option>
                <option value="R">R: Alphabet H to Z</option>
                <option value="n">n: Number Z to H</option>
                <option value="N">N: Number H to Z</option>
                <option value="a">a: Alphabet & Number Z to H</option>
                <option value="A">A: Alphabet & Number H to Z</option>
                <option value="s">s: Space Z to H</option>
                <option value="S">S: Space H to Z</option>
                <option value="k">k: Katakana Z to H</option>
                <option value="K">K: Katakana H to Z</option>
                <option value="h">h: Hiragana Z to Katakana H</option>
                <option value="H">H: Katakana H to Hiragana Z</option>
                <option value="c">c: Katakana Z to Hiragana Z</option>
                <option value="C">C: Hiragana Z to Katakana Z</option>
                <option value="KV">KV: Katakana H to Z (Collapse voiced sound)</option>
                <option value="HV">HV: Katakana H to Hiragana Z (Collapse voiced sound)</option>
            </select>
        </div>
        <div>
            <input type="submit" value="Process">
        </div>
    </form>
    <div>
        <?php if (isset($_POST['string']) && isset($_POST['mode'])) : ?>
            <pre><code><?= htmlentities(mb_convert_kana($_POST['string'], $_POST['mode'])) ?></code></pre>
        <?php endif; ?>
    </div>
</body>

</html>