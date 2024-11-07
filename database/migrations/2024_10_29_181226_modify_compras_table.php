<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyComprasTable extends Migration
{
    public function up()
    {
        Schema::table('compras', function (Blueprint $table) {
            // Primero eliminamos la clave foránea de 'user_id' y luego la columna
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id'); 
            
            // Eliminamos 'plan_title' y agregamos 'plan_id' como referencia
            $table->dropColumn('plan_title');
            $table->unsignedBigInteger('plan_id')->after('id'); // Relación con la tabla 'plans'
            $table->string('transaction_id')->nullable()->after('operation_number'); // ID de transacción para pagos de Mercado Pago
            $table->enum('status', ['pendiente', 'pagada', 'rechazada'])->default('pendiente')->change();

            // Agregar la relación con 'plan_id' en 'plans'
            $table->foreign('plan_id')->references('id')->on('plans')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('compras', function (Blueprint $table) {
            // Restaurar 'plan_title'
            $table->string('plan_title')->after('id');
            
            // Solo agregar 'user_id' si no existe para evitar duplicados
            if (!Schema::hasColumn('compras', 'user_id')) {
                $table->unsignedBigInteger('user_id')->after('id');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            }
            
            // Quitar 'plan_id' y 'transaction_id'
            $table->dropForeign(['plan_id']);
            $table->dropColumn('plan_id');
            $table->dropColumn('transaction_id');
            
            // Cambiar enum de 'status' para su estado original
            $table->enum('status', ['pendiente', 'aprobado', 'rechazado'])->default('pendiente')->change();
        });
    }
}
