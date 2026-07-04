<?php

function csrfGenerateToken(): string
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrfFormField(string $name = 'csrf_token'): void
{
    $token = csrfGenerateToken();
    ?>
    <input type="hidden" name="<?= htmlspecialchars($name); ?>" value="<?= htmlspecialchars($token); ?>">
    <?php
}

function csrfValidateToken(string|null $token): bool
{
    if ($token === null) {
        return false;
    }

    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    if (!isset($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}