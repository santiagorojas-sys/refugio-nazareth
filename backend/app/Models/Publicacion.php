<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    protected $fillable = [
        'titulo',
        'contenido',
        'imagen_principal',
        'imagenes_extra',
        'autor',
        'activo'
    ];

    protected $casts = [
        'imagenes_extra' => 'array',
        'activo' => 'boolean'
    ];

    public function comentarios()
    {
        return $this->hasMany(Comentario::class)->where('activo', true)->orderBy('created_at', 'desc');
    }

    public function reacciones()
    {
        return $this->hasMany(Reaccion::class);
    }
}
