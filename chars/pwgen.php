<?php
require_once __DIR__ . '/_libchars.php';

$scope = $_GET['s'] ?? $_POST['s'] ?? 'aAn12';
$userSpecials = $_GET['c'] ?? $_POST['c'] ?? null;
$specials = implode('', CHARS_ASCII_SPECIAL);
if ($userSpecials !== null && !empty($userSpecials))
    $specials = $userSpecials;

$usingChars = '';
$len = 12;
for ($i = 0; $i < strlen($scope); $i++) {
    $passbreak = false;
    switch ($scope[$i]) {
        case 'a':
            $usingChars .= implode('', CHARS_SMALL_ALPHABET);
            break;

        case 'A':
            $usingChars .= implode('', CHARS_LARGE_ALPHABET);
            break;

        case 'n':
            $usingChars .= implode('', CHARS_NUMBER);
            break;

        case 's':
            $usingChars .= $specials;
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            $passbreak = true;
            break;

        default:
            break;
    }

    if ($passbreak) {
        $lenstr = substr($scope, $i);
        if (is_numeric($lenstr))
            $len = intval($lenstr);
        break;
    }
}

if ($usingChars == '') {
    $usingChars .= implode('', CHARS_SMALL_ALPHABET);
    $usingChars .= implode('', CHARS_LARGE_ALPHABET);
    $usingChars .= implode('', CHARS_NUMBER);
}

$uclen = strlen($usingChars) - 1;

$ret = '';

for ($i = 0; $i < $len; $i++) {
    $ret .= $usingChars[random_int(0, $uclen)];
}

header('Content-type: text/plain');
print($ret);
