<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    protected $fillable = ['imagen', 'titulo', 'descripcion', 'activo'];
}