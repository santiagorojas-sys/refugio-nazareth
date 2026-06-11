<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaccion extends Model
{
    protected $fillable = [
        'publicacion_id',
        'tipo',
        'ip'
    ];

    public function publicacion()
    {
        return $this->belongsTo(Publicacion::class);
    }
}
