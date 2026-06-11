<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GaleriaController extends Controller
{
    public function index()
    {
        return Galeria::where('activo', true)->get();
    }

    public function admin()
    {
        return Galeria::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'imagenes' => 'required|array|min:1',
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'titulo' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validación fallida',
                'errors' => $validator->errors()
            ], 422);
        }

        $imagenesGuardadas = [];

        foreach ($request->file('imagenes') as $archivo) {
            $path = $archivo->store('galeria', 'public');

            $galeria = Galeria::create([
                'imagen' => $path,
                'titulo' => $request->input('titulo', 'Sin título'),
                'descripcion' => $request->input('descripcion', ''),
                'activo' => true,
            ]);

            $imagenesGuardadas[] = $galeria;
        }

        return response()->json([
            'message' => 'Imágenes subidas correctamente',
            'total' => count($imagenesGuardadas),
            'data' => $imagenesGuardadas
        ], 201);
    }

    public function update(Request $request, $id)
    {
        return response()->json([
            'message' => 'Método update no implementado aún'
        ]);
    }

    public function destroy($id)
{
    $imagen = Galeria::find($id);

    if (!$imagen) {
        return response()->json([
            'message' => 'Imagen no encontrada'
        ], 404);
    }

    if ($imagen->imagen && Storage::disk('public')->exists($imagen->imagen)) {
        Storage::disk('public')->delete($imagen->imagen);
    }

    $imagen->delete();

    return response()->json([
        'message' => 'Imagen eliminada correctamente'
    ], 200);
}
}