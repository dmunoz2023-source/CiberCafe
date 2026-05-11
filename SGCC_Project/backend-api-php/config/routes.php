<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

use App\Modules\User\Web\RegisterUserAction;
use App\Modules\User\Web\LoginUserAction;
use App\Modules\User\Web\GetBalanceAction;

use App\Modules\Station\Web\StartSessionAction;
use App\Modules\Station\Web\EndSessionAction;
use App\Modules\Station\Web\GetStationsStatusAction;

use App\Modules\Reservation\Web\CreateReservationAction;

use App\Modules\Order\Web\CreateOrderAction;
use App\Modules\Order\Web\UpdateOrderStatusAction;

use App\Shared\Middleware\AuthMiddleware;
use App\Shared\Middleware\AdminMiddleware;

return function (App $app) {

    $app->group('/api/users', function (RouteCollectorProxy $group) {
        // Rutas públicas
        $group->post('/register', RegisterUserAction::class);
        $group->post('/login', LoginUserAction::class); // Debe manejar el bloqueo tras 3 fallos

        // Rutas protegidas (Requieren estar logueado)
        $group->get('/{id}/balance', GetBalanceAction::class)->add(AuthMiddleware::class);
    });

    $app->group('/api/stations', function (RouteCollectorProxy $group) {
        // Ver disponibilidad en tiempo real
        $group->get('', GetStationsStatusAction::class);

        // Control de sesiones (Protegido)
        $group->post('/{id}/start', StartSessionAction::class)->add(AuthMiddleware::class);
        
        // Finalizar sesión (Calcula costo por minuto y aplica descuento > 5 hrs)
        $group->post('/{id}/end', EndSessionAction::class)->add(AuthMiddleware::class);
        
        // Bloqueo/Desbloqueo remoto (Solo Administrador)
        // Nota: La ejecución en tiempo real de esto se apoya en NodeJS, 
        // pero PHP guarda el estado en PostgreSQL.
        $group->post('/{id}/toggle-lock', \App\Modules\Station\Web\ToggleLockAction::class)
              ->add(AdminMiddleware::class)
              ->add(AuthMiddleware::class);
    });

    $app->group('/api/reservations', function (RouteCollectorProxy $group) {
        // Crear reserva (Valida edad < 15 años después de las 20:00 y exige abono 30%)
        $group->post('', CreateReservationAction::class)->add(AuthMiddleware::class);
    });

    $app->group('/api/orders', function (RouteCollectorProxy $group) {
        // Cliente solicita pedido (Verifica saldo en tiempo real)
        $group->post('', CreateOrderAction::class)->add(AuthMiddleware::class);

        // Cocina/Garzón actualiza el estado del pedido (Preparado, Entregado)
        $group->put('/{id}/status', UpdateOrderStatusAction::class)->add(AuthMiddleware::class);
    });

    $app->group('/api/admin', function (RouteCollectorProxy $group) {
        // Generar reporte de caja al final del turno
        $group->get('/reports/shift-summary', \App\Modules\Admin\Web\GenerateShiftReportAction::class)
              ->add(AdminMiddleware::class)
              ->add(AuthMiddleware::class);
    });

};