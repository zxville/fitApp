<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id',
        'email',
        'price',
        'payment_method',
        'operation_number',
        'transaction_id',
        'receipt',
        'status',
    ];

    // Relación con el plan
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
