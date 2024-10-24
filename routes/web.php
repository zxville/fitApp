<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CompraController;

// Ruta principal para el Home
Route::get('/', function () {
    return Inertia::render('Home'); // Renderiza la página Home en React
})->name('home');

// Ruta para el Dashboard (requiere autenticación)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rutas para el perfil (requieren autenticación)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Ruta para obtener los planes
Route::get('/plans', [PlanController::class, 'index']);

// Ruta para crear la preferencia de pago en Mercado Pago
Route::post('/create-preference', [PaymentController::class, 'createPreference']);

// Rutas para compras
Route::post('/save-payment-details', [CompraController::class, 'store']);  // Permitir registrar compras sin autenticación
Route::get('/compras', [CompraController::class, 'index']); // Para que el administrador vea las compras pendientes
Route::patch('/compras/{id}/status', [CompraController::class, 'updateStatus']); // Para que el administrador cambie el estado de la compra

// Ruta para recibir notificaciones de Mercado Pago
Route::post('/mercado-pago-webhook', [CompraController::class, 'mercadoPagoWebhook']);

require __DIR__ . '/auth.php';
