<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reaccions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('publicacion_id')->constrained('publicacions')->onDelete('cascade');
            $table->string('tipo')->default('like'); // like, corazon, abrazo
            $table->string('ip')->nullable(); // para evitar spam
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reaccions');
    }
};
