<?php

$info = [
    'ip' => explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'])[0],
    'forwarded' => isset($_SERVER['HTTP_X_FORWARDED_FOR'])
];

header('Content-Type: application/json');
print(json_encode($info));
