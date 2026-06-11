<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ContactoController extends Controller
{
    public function enviar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'correo' => 'required|email',
            'mensaje' => 'required|string|max:2000',
        ]);

        $contacto = Contacto::create([
            'nombre' => $request->nombre,
            'correo' => $request->correo,
            'mensaje' => $request->mensaje,
            'leido' => false,
        ]);

        try {
            $ntfyUrl = rtrim(env('NTFY_URL', 'https://ntfy.sh'), '/');
            $ntfyTopic = env('NTFY_TOPIC', 'refugio-nazareth-alertas-92731');

            Http::withHeaders([
                'Title' => 'Nuevo mensaje en Refugio Nazareth',
                'Priority' => 'high',
                'Tags' => 'mailbox,warning',
            ])->withBody(
                "Tienes un nuevo mensaje de {$contacto->nombre}. Entra al sistema para revisarlo.",
                'text/plain'
            )->post("{$ntfyUrl}/{$ntfyTopic}");
        } catch (\Throwable $e) {
        }

        return response()->json([
            'message' => 'Mensaje enviado correctamente',
        ], 200);
    }

    public function indexAdmin()
    {
        return Contacto::orderBy('created_at', 'desc')->get();
    }
}