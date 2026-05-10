<?php

// routes config
use Slim\App;

return function (App $app) {
  $app->get('/hello/{name}', function ($request, $response, $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
  });
};