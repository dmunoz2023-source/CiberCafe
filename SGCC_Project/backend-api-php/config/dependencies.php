<?php

declare(strict_types=1);

use Psr\Container\ContainerInterface;

return [

    // Here I define the dependency injection for the PDO database connection
    PDO::class => function (ContainerInterface $c) {
        $settings = $c->get('settings')['db'];

        $dsn = sprintf(
            "pgsql:host=%s;port=%s;dbname=%s",
            $settings['host'],
            $settings['port'],
            $settings['database']
        );

        $pdo = new PDO($dsn, $settings['user'], $settings['password']);

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        return $pdo;
    },
];