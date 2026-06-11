<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use App\Models\Comentario;
use App\Models\Reaccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PublicacionController extends Controller
{
    // GET /api/comunidad
    public function index()
    {
        $publicaciones = Publicacion::where('activo', true)
            ->withCount(['comentarios', 'reacciones'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($publicaciones);
    }

    // GET /api/comunidad/{id}
    public function show($id)
    {
        $publicacion = Publicacion::where('activo', true)
            ->with(['comentarios', 'reacciones'])
            ->withCount(['comentarios', 'reacciones'])
            ->findOrFail($id);

        return response()->json($publicacion);
    }

    // POST /api/admin/comunidad
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo'           => 'required|string|max:255',
            'contenido'        => 'required|string',
            'imagen_principal' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'imagenes_extra.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'autor'            => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagenPrincipal = null;
        if ($request->hasFile('imagen_principal')) {
            $imagenPrincipal = $request->file('imagen_principal')->store('comunidad', 'public');
        }

        $imagenesExtra = [];
        if ($request->hasFile('imagenes_extra')) {
            $archivos = array_slice($request->file('imagenes_extra'), 0, 4);
            foreach ($archivos as $archivo) {
                $imagenesExtra[] = $archivo->store('comunidad', 'public');
            }
        }

        $publicacion = Publicacion::create([
            'titulo'           => $request->titulo,
            'contenido'        => $request->contenido,
            'imagen_principal' => $imagenPrincipal,
            'imagenes_extra'   => $imagenesExtra,
            'autor'            => $request->autor ?? 'Refugio Nazareth',
            'activo'           => true,
        ]);

        return response()->json($publicacion, 201);
    }

    // PUT /api/admin/comunidad/{id}
    public function update(Request $request, $id)
    {
        $publicacion = Publicacion::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'titulo'    => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $publicacion->update([
            'titulo'    => $request->titulo,
            'contenido' => $request->contenido,
        ]);

        return response()->json($publicacion);
    }

    // DELETE /api/admin/comunidad/{id}
    public function destroy($id)
    {
        $publicacion = Publicacion::findOrFail($id);

        if ($publicacion->imagen_principal) {
            Storage::disk('public')->delete($publicacion->imagen_principal);
        }
        if ($publicacion->imagenes_extra) {
            foreach ($publicacion->imagenes_extra as $img) {
                Storage::disk('public')->delete($img);
            }
        }

        $publicacion->delete();
        return response()->json(['message' => 'Publicación eliminada']);
    }

    // POST /api/comunidad/{id}/comentar
    public function comentar(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'contenido' => 'required|string|max:1000',
            'nombre'    => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comentario = Comentario::create([
            'publicacion_id' => $id,
            'nombre'         => $request->nombre ?? 'Anónimo',
            'contenido'      => $request->contenido,
            'activo'         => true,
        ]);

        return response()->json($comentario, 201);
    }

    // POST /api/comunidad/{id}/reaccionar
    public function reaccionar(Request $request, $id)
    {
        $ip   = $request->ip();
        $tipo = $request->input('tipo', 'like');

        $yaReacciono = Reaccion::where('publicacion_id', $id)
            ->where('ip', $ip)
            ->where('tipo', $tipo)
            ->exists();

        if ($yaReacciono) {
            Reaccion::where('publicacion_id', $id)
                ->where('ip', $ip)
                ->where('tipo', $tipo)
                ->delete();
            return response()->json(['message' => 'Reacción eliminada', 'accion' => 'quitada']);
        }

        $reaccion = Reaccion::create([
            'publicacion_id' => $id,
            'tipo'           => $tipo,
            'ip'             => $ip,
        ]);

        return response()->json(['message' => 'Reacción agregada', 'accion' => 'agregada', 'reaccion' => $reaccion], 201);
    }

    // GET /api/admin/comunidad/{id}/comentarios
    public function comentarios($id)
    {
        Publicacion::findOrFail($id);

        $comentarios = Comentario::where('publicacion_id', $id)
            ->where('activo', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comentarios);
    }

    // DELETE /api/admin/comentarios/{id}
    public function deleteComentario($id)
    {
        $comentario = Comentario::findOrFail($id);
        $comentario->update(['activo' => false]);
        return response()->json(['message' => 'Comentario eliminado']);
    }
}
