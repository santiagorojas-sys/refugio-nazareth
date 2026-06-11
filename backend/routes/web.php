<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/info-refugio', function () {
    return response()->json([
        'nombre' => 'Refugio Nazareth - Hogar Psiquiátrico',
        'descripcion' => 'Centro especializado en atención integral a personas con enfermedad mental crónica en Pereira.',
        'servicios' => [
            'Alojamiento y alimentación',
            'Acompañamiento terapéutico y ocupacional',
            'Atención espiritual y actividades recreativas'
        ],
        'contacto' => [
            'telefono' => 'Por definir con el cliente',
            'correo' => 'info@refugionazareth.com',
            'direccion' => 'Zona rural de Pereira, sector Tribunas / Morelia'
        ]
    ]);
});
use App\Http\Controllers\ContactoController;

Route::get('/admin/contactos', [ContactoController::class, 'index']);