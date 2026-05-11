<?php

declare(strict_types=1);

namespace App\Modules\User\Domain\Entity;

use App\Modules\User\Domain\Entity\User;

interface UserRepositoryInterface
{
    /**
     * Busca un usuario por su ID único.
     * Retorna null si el usuario no existe.
     */
    public function findById(string $id): ?User;

    /**
     * Busca un usuario por su nombre de usuario (ideal para el Login).
     */
    public function findByUsername(string $username): ?User;

    /**
     * Guarda un usuario en la base de datos. 
     * Sirve tanto para crear un usuario nuevo como para actualizar uno existente
     * (por ejemplo, después de descontarle saldo con deductBalance()).
     */
    public function save(User $user): void;

    /**
     * (Opcional) Obtiene todos los usuarios.
     * Muy útil para la vista UserManagement.jsx del administrador.
     * * @return User[]
     */
    public function findAll(): array;
}