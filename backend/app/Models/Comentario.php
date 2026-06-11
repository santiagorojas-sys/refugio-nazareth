<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $fillable = [
        'publicacion_id',
        'nombre',
        'contenido',
        'activo'
    ];

    public function publicacion()
    {
        return $this->belongsTo(Publicacion::class);
    }
}
