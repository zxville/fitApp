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
            $table->unsignedBigInteger('plan_id');  // ID del plan comprado
            $table->string('email');  // Email para enviar el plan
            $table->decimal('price', 8, 2);  // Precio del plan
            $table->string('payment_method');  // 'Mercado Pago' o 'Transferencia'
            $table->string('operation_number')->nullable();  // Número de operación para transferencias o Mercado Pago
            $table->string('receipt')->nullable();  // Comprobante de transferencia
            $table->string('transaction_id')->nullable(); // ID de transacción de MercadoPago
            $table->enum('status', ['pendiente', 'pagada', 'rechazada'])->default('pendiente');  // Estado de la compra
            $table->timestamps();

            // Relación con la tabla de planes
            $table->foreign('plan_id')->references('id')->on('plans')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('compras');
    }
}
