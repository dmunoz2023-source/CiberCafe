<?php

declare(strict_types=1);

// Cargar autoload de Composer
$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoloadPath)) {
  die('Error: vendor/autoload.php no encontrado. Ejecute: composer install');
}

require $autoloadPath;

use Slim\Factory\AppFactory;

try {
  $app = AppFactory::create();

  // Middleware para JSON
  $app->addRoutingMiddleware();
  $app->addErrorMiddleware(true, true, true);

  // Ruta de health check
  $app->get('/api/health', function ($request, $response) {
    $response->getBody()->write(json_encode(['status' => 'ok', 'message' => 'API is running']));
    return $response->withHeader('Content-Type', 'application/json');
  });

  $app->run();
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'Error interno del servidor',
    'message' => $e->getMessage()
  ]);
}