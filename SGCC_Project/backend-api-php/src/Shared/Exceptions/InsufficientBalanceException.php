<?php

declare(strict_types=1);

namespace App\Shared\Exceptions;

use RuntimeException;
use Throwable;

class InsufficientBalanceException extends RuntimeException
{
    /**
     * @param string $message Custom Message Error (optional)
     * @param int $code Internal Code Error (optional)
     * @param Throwable|null $previous Previous Exception for Chaining (optional)
     */
    public function __construct(
        string $message = "El usuario no tiene saldo suficiente para esta operación.",
        int $code = 402,
        ?Throwable $previous = null
    ) {
        parent::__construct($message, $code, $previous);
    }
}