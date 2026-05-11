<?php

declare(strict_types=1);

namespace App\Modules\User\Domain\Entity;

use DateTimeImmutable;
use App\Shared\Exceptions\InsufficientBalanceException;

class User
{
    private string $id;
    private string $username;
    private DateTimeImmutable $birthDate;
    private float $balance;
    private ?DateTimeImmutable $vipExpirationDate;
    private bool $autoRenewSubscription;

    public function __construct(
        string $id,
        string $username,
        DateTimeImmutable $birthDate,
        float $balance = 0.0,
        ?DateTimeImmutable $vipExpirationDate = null,
        bool $autoRenewSubscription = false
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->birthDate = $birthDate;
        $this->balance = $balance;
        $this->vipExpirationDate = $vipExpirationDate;
        $this->autoRenewSubscription = $autoRenewSubscription;
    }

    public function getId(): string { return $this->id; }
    public function getUsername(): string { return $this->username; }
    public function getBalance(): float { return $this->balance; }

    public function canAccessEstablishment(DateTimeImmutable $currentTime): bool
    {
        $age = $currentTime->diff($this->birthDate)->y;
        $hour = (int) $currentTime->format('H');

        if ($age < 15 && $hour >= 20) {
            return false;
        }

        return true;
    }

    public function canUseServices(): bool
    {
        return $this->balance > 0;
    }

    public function deductBalance(float $amount): void
    {
        if ($this->balance < $amount) {
            throw new InsufficientBalanceException();
        }
        $this->balance -= $amount;
    }

    public function addBalance(float $amount): void
    {
        $this->balance += $amount;
    }

    public function hasActiveSubscription(DateTimeImmutable $currentTime): bool
    {
        return $this->vipExpirationDate !== null && $this->vipExpirationDate > $currentTime;
    }

    public function activateVip(DateTimeImmutable $currentTime): void
    {
        $this->vipExpirationDate = $currentTime->modify('+30 days');
        $this->autoRenewSubscription = true;
    }

    public function cancelVipSubscription(): void
    {
        $this->autoRenewSubscription = false;
    }
}