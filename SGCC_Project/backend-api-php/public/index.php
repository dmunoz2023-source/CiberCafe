<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

try {
  
  $app = require __DIR__ . '/../config/app.php';
  
  $app->run();
  
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'error' => 'Error interno del servidor',
    'message' => $e->getMessage()
  ]);
}