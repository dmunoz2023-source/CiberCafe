<?php
require __DIR__ . '/vendor/autoload.php';

if (class_exists('Slim\Factory\AppFactory')) {
  echo "✓ AppFactory está disponible y funcionando\n";
  exit(0);
} else {
  echo "✗ AppFactory NO está disponible\n";
  exit(1);
}
