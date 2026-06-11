<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\ContactoController;

Route::get('/info-refugio', function () {
    $data = [
        'nombre' => 'Refugio Nazareth - Hogar Psiquiátrico',
        'descripcion' => 'Centro especializado en atención integral a personas con enfermedad mental crónica en Pereira.',
        'servicios' => [
            'Alojamiento y alimentación',
            'Acompañamiento terapéutico y ocupacional',
            'Atención espiritual y actividades recreativas'
        ],
        'contacto' => [
            'telefono' => 'Por definir con el cliente',
            'correo' => 'refugionazareth@hotmail.com',
            'direccion' => 'Zona rural de Pereira, sector Tribunas / Morelia'
        ]
    ];

    return response()->json($data)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

Route::get('/galeria', [GaleriaController::class, 'index']);

Route::prefix('admin/galeria')->group(function () {
    Route::get('/', [GaleriaController::class, 'admin']);
    Route::post('/', [GaleriaController::class, 'store']);
    Route::put('/{id}', [GaleriaController::class, 'update']);
    Route::delete('/{id}', [GaleriaController::class, 'destroy']);
});

Route::get('/comunidad', [PublicacionController::class, 'index']);
Route::get('/comunidad/{id}', [PublicacionController::class, 'show']);
Route::post('/comunidad/{id}/comentar', [PublicacionController::class, 'comentar']);
Route::post('/comunidad/{id}/reaccionar', [PublicacionController::class, 'reaccionar']);

Route::prefix('admin/comunidad')->group(function () {
    Route::post('/', [PublicacionController::class, 'store']);
    Route::put('/{id}', [PublicacionController::class, 'update']);
    Route::delete('/{id}', [PublicacionController::class, 'destroy']);
});

Route::get('/admin/comunidad/{id}/comentarios', [PublicacionController::class, 'comentarios']);
Route::delete('/admin/comentarios/{id}', [PublicacionController::class, 'deleteComentario']);

Route::post('/contacto', [ContactoController::class, 'enviar']);
Route::get('/admin/contactos', [ContactoController::class, 'indexAdmin']);