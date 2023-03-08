<?php
$v6s = $_GET['v6s'] ?? '0000:0000:0000:0000:0000:0000:0000:0000';
$v6sa = explode(':', $v6s);
if (count($v6sa) !== 8) die('Not valid format.');
for ($i = 0; $i < count($v6sa); $i++) {
    if (empty($v6sa[$i])) {
        $v6sa[$i] = 0;
        continue;
    }

    if (!preg_match('/^[a-fA-F0-9]{1,4}$/', $v6sa[$i])) {
        die('Not valid format.');
    }

    $v6sa[$i] = hexdec($v6sa[$i]);
}

$v4s = $_GET['v4s'] ?? '0.0.0.0';
$v4sa = explode('.', $v4s);
if (count($v4sa) !== 4) die('Not valid format');
for ($i = 0; $i < count($v4sa); $i++) {
    if (!is_numeric($v4sa[$i])) {
        die('Not valid format.');
    }

    $t = intval($v4sa[$i]);

    if ($t < 0 || $t > 255) {
        die('Not valid format.');
    }

    $v4sa[$i] = $t;
}

function v4Format(string $input) {
    if ($input === '0')
        return "<span class=\"ip-part all-zero\">$input</span>";
    else if ($input === '255')
        return "<span class=\"ip-part all-one\">$input</span>";
    else
        return "<span class=\"ip-part\">$input</span>";
}

function v6Format(string $input) {
    if ($input === '0000')
        return "<span class=\"ip-part all-zero\">$input</span>";
    else if ($input === 'ffff')
        return "<span class=\"ip-part all-one\">$input</span>";
    else
        return "<span class=\"ip-part\">$input</span>";
}

const V6_MASK = [[0, 0, 0, 0, 0, 0, 0, 0], [32768, 0, 0, 0, 0, 0, 0, 0], [49152, 0, 0, 0, 0, 0, 0, 0], [57344, 0, 0, 0, 0, 0, 0, 0], [61440, 0, 0, 0, 0, 0, 0, 0], [63488, 0, 0, 0, 0, 0, 0, 0], [64512, 0, 0, 0, 0, 0, 0, 0], [65024, 0, 0, 0, 0, 0, 0, 0], [65280, 0, 0, 0, 0, 0, 0, 0], [65408, 0, 0, 0, 0, 0, 0, 0], [65472, 0, 0, 0, 0, 0, 0, 0], [65504, 0, 0, 0, 0, 0, 0, 0], [65520, 0, 0, 0, 0, 0, 0, 0], [65528, 0, 0, 0, 0, 0, 0, 0], [65532, 0, 0, 0, 0, 0, 0, 0], [65534, 0, 0, 0, 0, 0, 0, 0], [65535, 0, 0, 0, 0, 0, 0, 0], [65535, 32768, 0, 0, 0, 0, 0, 0], [65535, 49152, 0, 0, 0, 0, 0, 0], [65535, 57344, 0, 0, 0, 0, 0, 0], [65535, 61440, 0, 0, 0, 0, 0, 0], [65535, 63488, 0, 0, 0, 0, 0, 0], [65535, 64512, 0, 0, 0, 0, 0, 0], [65535, 65024, 0, 0, 0, 0, 0, 0], [65535, 65280, 0, 0, 0, 0, 0, 0], [65535, 65408, 0, 0, 0, 0, 0, 0], [65535, 65472, 0, 0, 0, 0, 0, 0], [65535, 65504, 0, 0, 0, 0, 0, 0], [65535, 65520, 0, 0, 0, 0, 0, 0], [65535, 65528, 0, 0, 0, 0, 0, 0], [65535, 65532, 0, 0, 0, 0, 0, 0], [65535, 65534, 0, 0, 0, 0, 0, 0], [65535, 65535, 0, 0, 0, 0, 0, 0], [65535, 65535, 32768, 0, 0, 0, 0, 0], [65535, 65535, 49152, 0, 0, 0, 0, 0], [65535, 65535, 57344, 0, 0, 0, 0, 0], [65535, 65535, 61440, 0, 0, 0, 0, 0], [65535, 65535, 63488, 0, 0, 0, 0, 0], [65535, 65535, 64512, 0, 0, 0, 0, 0], [65535, 65535, 65024, 0, 0, 0, 0, 0], [65535, 65535, 65280, 0, 0, 0, 0, 0], [65535, 65535, 65408, 0, 0, 0, 0, 0], [65535, 65535, 65472, 0, 0, 0, 0, 0], [65535, 65535, 65504, 0, 0, 0, 0, 0], [65535, 65535, 65520, 0, 0, 0, 0, 0], [65535, 65535, 65528, 0, 0, 0, 0, 0], [65535, 65535, 65532, 0, 0, 0, 0, 0], [65535, 65535, 65534, 0, 0, 0, 0, 0], [65535, 65535, 65535, 0, 0, 0, 0, 0], [65535, 65535, 65535, 32768, 0, 0, 0, 0], [65535, 65535, 65535, 49152, 0, 0, 0, 0], [65535, 65535, 65535, 57344, 0, 0, 0, 0], [65535, 65535, 65535, 61440, 0, 0, 0, 0], [65535, 65535, 65535, 63488, 0, 0, 0, 0], [65535, 65535, 65535, 64512, 0, 0, 0, 0], [65535, 65535, 65535, 65024, 0, 0, 0, 0], [65535, 65535, 65535, 65280, 0, 0, 0, 0], [65535, 65535, 65535, 65408, 0, 0, 0, 0], [65535, 65535, 65535, 65472, 0, 0, 0, 0], [65535, 65535, 65535, 65504, 0, 0, 0, 0], [65535, 65535, 65535, 65520, 0, 0, 0, 0], [65535, 65535, 65535, 65528, 0, 0, 0, 0], [65535, 65535, 65535, 65532, 0, 0, 0, 0], [65535, 65535, 65535, 65534, 0, 0, 0, 0], [65535, 65535, 65535, 65535, 0, 0, 0, 0], [65535, 65535, 65535, 65535, 32768, 0, 0, 0], [65535, 65535, 65535, 65535, 49152, 0, 0, 0], [65535, 65535, 65535, 65535, 57344, 0, 0, 0], [65535, 65535, 65535, 65535, 61440, 0, 0, 0], [65535, 65535, 65535, 65535, 63488, 0, 0, 0], [65535, 65535, 65535, 65535, 64512, 0, 0, 0], [65535, 65535, 65535, 65535, 65024, 0, 0, 0], [65535, 65535, 65535, 65535, 65280, 0, 0, 0], [65535, 65535, 65535, 65535, 65408, 0, 0, 0], [65535, 65535, 65535, 65535, 65472, 0, 0, 0], [65535, 65535, 65535, 65535, 65504, 0, 0, 0], [65535, 65535, 65535, 65535, 65520, 0, 0, 0], [65535, 65535, 65535, 65535, 65528, 0, 0, 0], [65535, 65535, 65535, 65535, 65532, 0, 0, 0], [65535, 65535, 65535, 65535, 65534, 0, 0, 0], [65535, 65535, 65535, 65535, 65535, 0, 0, 0], [65535, 65535, 65535, 65535, 65535, 32768, 0, 0], [65535, 65535, 65535, 65535, 65535, 49152, 0, 0], [65535, 65535, 65535, 65535, 65535, 57344, 0, 0], [65535, 65535, 65535, 65535, 65535, 61440, 0, 0], [65535, 65535, 65535, 65535, 65535, 63488, 0, 0], [65535, 65535, 65535, 65535, 65535, 64512, 0, 0], [65535, 65535, 65535, 65535, 65535, 65024, 0, 0], [65535, 65535, 65535, 65535, 65535, 65280, 0, 0], [65535, 65535, 65535, 65535, 65535, 65408, 0, 0], [65535, 65535, 65535, 65535, 65535, 65472, 0, 0], [65535, 65535, 65535, 65535, 65535, 65504, 0, 0], [65535, 65535, 65535, 65535, 65535, 65520, 0, 0], [65535, 65535, 65535, 65535, 65535, 65528, 0, 0], [65535, 65535, 65535, 65535, 65535, 65532, 0, 0], [65535, 65535, 65535, 65535, 65535, 65534, 0, 0], [65535, 65535, 65535, 65535, 65535, 65535, 0, 0], [65535, 65535, 65535, 65535, 65535, 65535, 32768, 0], [65535, 65535, 65535, 65535, 65535, 65535, 49152, 0], [65535, 65535, 65535, 65535, 65535, 65535, 57344, 0], [65535, 65535, 65535, 65535, 65535, 65535, 61440, 0], [65535, 65535, 65535, 65535, 65535, 65535, 63488, 0], [65535, 65535, 65535, 65535, 65535, 65535, 64512, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65024, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65280, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65408, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65472, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65504, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65520, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65528, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65532, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65534, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 0], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 32768], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 49152], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 57344], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 61440], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 63488], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 64512], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65024], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65280], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65408], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65472], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65504], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65520], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65528], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65532], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65534], [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535]];
const V4_MASK = [[0, 0, 0, 0], [128, 0, 0, 0], [192, 0, 0, 0], [224, 0, 0, 0], [240, 0, 0, 0], [248, 0, 0, 0], [252, 0, 0, 0], [254, 0, 0, 0], [255, 0, 0, 0], [255, 128, 0, 0], [255, 192, 0, 0], [255, 224, 0, 0], [255, 240, 0, 0], [255, 248, 0, 0], [255, 252, 0, 0], [255, 254, 0, 0], [255, 255, 0, 0], [255, 255, 128, 0], [255, 255, 192, 0], [255, 255, 224, 0], [255, 255, 240, 0], [255, 255, 248, 0], [255, 255, 252, 0], [255, 255, 254, 0], [255, 255, 255, 0], [255, 255, 255, 128], [255, 255, 255, 192], [255, 255, 255, 224], [255, 255, 255, 240], [255, 255, 255, 248], [255, 255, 255, 252], [255, 255, 255, 254], [255, 255, 255, 255]];

$v6mode = isset($_GET['v6s']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subnet Table</title>
    <link rel="stylesheet" href="../styles/table.css">
    <style>
        section.hide>div,
        section.hide>nav {
            display: none;
        }
        .ip-part {
            padding: 0px 3px;
        }
        .all-zero {
            background-color: #383;
        }
        .all-one {
            background-color: #833;
        }
    </style>
    <script>
        const e = (e) => document.getElementById(e).classList.toggle('hide');
    </script>
</head>

<body>
<h1>Subnet table</h1>
<nav>
    <a href="#v4">IPv4</a> |
    <a href="#v6">IPv6</a>
</nav>



<hr />
<section id="v4" class="<?= $v6mode ? 'hide' : '' ?>">
    <nav>
        <a href="#v4">IPv4</a> |
        <a href="#v6">IPv6</a>
    </nav>
    <h2>IPv4 <small><a href="javascript:void(0);" onclick="e('v4')">Show/Hide</a></small></h2>

    <div>
        <form action="" method="get">
            <label for="v6s">Start</label>
            <input type="text" name="v4s" id="v4s" value="<?= htmlentities($v4s) ?>" size="15" maxlength="15" pattern="([0-2]?[0-9]{1,2}\.){3}[0-2]?[0-9]{1,2}">
            <input type="submit" value="Calc">
        </form>
        <br />
        <table>
            <thead>
            <tr>
                <th>CIDR</th>
                <th>Start / End</th>
                <th>Mask</th>
            </tr>
            </thead>
            <tbody>
            <?php for ($cidr = 0; $cidr <= 32; $cidr++) : ?>
                <tr>
                    <?php if ($cidr % 8 == 0) : ?>
                        <th class="all-zero">
                            <?= $cidr ?>
                        </th>
                    <?php else : ?>
                        <th>
                            <?= $cidr ?>
                        </th>
                    <?php endif; ?>
                    <td>
                        <code>
                            <?php
                            $netaddr = [];
                            for ($i = 0; $i < 4; $i++) {
                                if ($i !== 0) print('.');
                                $netaddr[$i] = V4_MASK[$cidr][$i] & $v4sa[$i];
                                print(v4Format($netaddr[$i]));
                            }
                            ?>
                        </code>
                        <br />
                        <code>
                            <?php
                            for ($i = 0; $i < 4; $i++) {
                                if ($i !== 0) print('.');
                                $broadaddr = $netaddr[$i] | abs(V4_MASK[$cidr][$i] - 255);
                                print(v4Format($broadaddr));
                            }
                            ?>
                        </code>
                    </td>
                    <td>
                        <code>
                            <?php
                            for ($i = 0; $i < 4; $i++) {
                                if ($i !== 0) print('.');
                                print(v4Format(V4_MASK[$cidr][$i]));
                            }
                            ?>
                        </code>
                    </td>
                </tr>
            <?php endfor; ?>
            </tbody>
        </table>
    </div>
</section>



<hr />
<section id="v6">
    <nav>
        <a href="#v4">IPv4</a> |
        <a href="#v6">IPv6</a>
    </nav>
    <h2>IPv6 <small><a href="javascript:void(0);" onclick="e('v6')">Show/Hide</a></small></h2>

    <div>
        <form action="" method="get">
            <label for="v6s">Start</label>
            <input type="text" name="v6s" id="v6s" value="<?= htmlentities($v6s) ?>" size="40" maxlength="39">
            <button type="submit" onclick="fmtv6()">Calc</button>
        </form>
        <br />
        <table>
            <thead>
            <tr>
                <th>CIDR</th>
                <th>Start / End</th>
                <th>Mask</th>
            </tr>
            </thead>
            <tbody>
            <?php for ($cidr = 0; $cidr <= 128; $cidr++) : ?>
                <tr>
                    <?php if ($cidr % 64 == 0) : ?>
                        <th class="all-one">
                            <?= $cidr ?>
                        </th>
                    <?php elseif ($cidr % 16 == 0) : ?>
                        <th class="all-zero">
                            <?= $cidr ?>
                        </th>
                    <?php else : ?>
                        <th>
                            <?= $cidr ?>
                        </th>
                    <?php endif; ?>
                    <td>
                        <code>
                            <?php
                            $netaddr = [];
                            for ($i = 0; $i < 8; $i++) {
                                if ($i !== 0) print(':');
                                $netaddr[$i] = V6_MASK[$cidr][$i] & $v6sa[$i];
                                print(v6Format(str_pad(dechex($netaddr[$i]), 4, '0')));
                            }
                            ?>
                        </code>
                        <br />
                        <code>
                            <?php
                            for ($i = 0; $i < 8; $i++) {
                                if ($i !== 0) print(':');
                                $broadaddr = $netaddr[$i] | abs(V6_MASK[$cidr][$i] - 65535);
                                print(v6Format(str_pad(dechex($broadaddr), 4, '0', STR_PAD_LEFT)));
                            }
                            ?>
                        </code>
                    </td>
                    <td>
                        <code>
                            <?php
                            for ($i = 0; $i < 8; $i++) {
                                if ($i !== 0) print(':');
                                print(v6Format(str_pad(dechex(V6_MASK[$cidr][$i]), 4, '0')));
                            }
                            ?>
                        </code>
                    </td>
                </tr>
            <?php endfor; ?>
            </tbody>
        </table>
    </div>
</section>

<script src="../scripts/iputil.js"></script>
<script>
    const fmtv6 = (e) => {
        const v6s = document.getElementById('v6s');
        const nosep = convertToIPv6AddressWithoutEmptyAndSeparator(v6s.value);
        if (nosep == undefined) {
            return;
        }
        let v6f = '';
        for (let i = 0; i < nosep.length; i++) {
            v6f += nosep[i];
            if (i != 0 && i != 31 && i % 4 == 3)
                v6f += ':';
        }
        v6s.value = v6f;
        return;
    };
</script>
</body>

</html>