<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reaccion;

class ReaccionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'publicacion_id' => 'required|exists:publicacions,id',
            'tipo'           => 'required|string',
        ]);

        $ip = $request->ip();

        $existente = Reaccion::where('publicacion_id', $request->publicacion_id)
            ->where('tipo', $request->tipo)
            ->where('ip', $ip)
            ->first();

        if ($existente) {
            $existente->delete();
            return response()->json(['message' => 'Reacción eliminada'], 200);
        }

        Reaccion::create([
            'publicacion_id' => $request->publicacion_id,
            'tipo'           => $request->tipo,
            'ip'             => $ip,
        ]);

        return response()->json(['message' => 'Reacción agregada'], 201);
    }

    public function contar($publicacion_id)
    {
        $conteo = Reaccion::where('publicacion_id', $publicacion_id)
            ->selectRaw('tipo, COUNT(*) as total')
            ->groupBy('tipo')
            ->get();

        return response()->json($conteo);
    }
}
