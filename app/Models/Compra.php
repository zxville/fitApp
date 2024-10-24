<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_title',
        'price',
        'payment_method',
        'operation_number',
        'email',
        'receipt',
        'status'
    ];

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
