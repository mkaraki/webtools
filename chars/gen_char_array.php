<?php
$ary = [];

if (isset($_GET['scope'])) {
    switch ($_GET['scope']) {
        case 'a':
            $ary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            break;
        case 'A':
            $ary = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            break;
        case 'n':
            $ary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            break;
    }
} else {
    http_response_code(400);
    $ary = ['Set scope or range'];
}


header('Content-Type: application/json');
print(json_encode($ary, 0, 1));
