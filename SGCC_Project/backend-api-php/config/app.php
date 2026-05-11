<?php

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

$containerBuilder = new ContainerBuilder();

$containerBuilder->addDefinitions([
  'settings' => __DIR__ . '/settings.php'
]);

$containerBuilder->addDefinitions(__DIR__ . '/dependencies.php');

$container = $containerBuilder->build();

AppFactory::setContainer($container);
$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

(require __DIR__ . '/routes.php')($app);

return $app;