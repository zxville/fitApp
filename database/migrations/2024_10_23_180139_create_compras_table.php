<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprasTable extends Migration
{
    public function up()
    {
        Schema::create('compras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');  // ID del usuario que compra
            $table->string('plan_title');  // Título del plan comprado
            $table->decimal('price', 8, 2);  // Precio del plan
            $table->string('payment_method');  // 'Mercado Pago' o 'Transferencia'
            $table->string('operation_number')->nullable();  // Número de operación para transferencias o Mercado Pago
            $table->string('email');  // Email para enviar el plan
            $table->string('receipt')->nullable();  // Comprobante de transferencia
            $table->enum('status', ['pendiente', 'aprobado', 'rechazado'])->default('pendiente');  // Estado de la compra
            $table->timestamps();

            // Relación con la tabla de usuarios
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('compras');
    }
}
