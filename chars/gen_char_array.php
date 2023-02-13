<?php
require_once __DIR__ . '/_libchars.php';
$ary = [];

if (isset($_GET['scope'])) {
    switch ($_GET['scope']) {
        case 'a':
            $ary = CHARS_SMALL_ALPHABET;
            break;
        case 'A':
            $ary = CHARS_LARGE_ALPHABET;
            break;
        case 'n':
            $ary = CHARS_NUMBER;
            break;
    }
} else {
    http_response_code(400);
    $ary = ['Set scope or range'];
}


header('Content-Type: application/json');
print(json_encode($ary, 0, 1));
