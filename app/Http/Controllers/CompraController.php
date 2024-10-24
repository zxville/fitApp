<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 
use Illuminate\Support\Facades\Log;

class CompraController extends Controller
{
    // Crear nueva compra
    public function store(Request $request)
    {
        $compra = Compra::create([
            'user_id' => auth()->id(),  // Asumimos que el usuario está autenticado
            'plan_title' => $request->plan_title,
            'price' => $request->price,
            'payment_method' => $request->payment_method,
            'operation_number' => $request->operation_number,
            'email' => $request->email,
            'receipt' => $request->file('receipt') ? $request->file('receipt')->store('receipts') : null,
            'status' => 'pendiente',
        ]);

        return response()->json(['message' => 'Compra creada', 'compra' => $compra], 201);
    }

    // Actualizar estado de la compra (para administrador)
    public function updateStatus(Request $request, $id)
    {
        $compra = Compra::findOrFail($id);
        $compra->status = $request->status;  // Estado: 'aprobado', 'pendiente', 'rechazado'
        $compra->save();

        return response()->json(['message' => 'Estado de la compra actualizado', 'compra' => $compra]);
    }

    // Obtener todas las compras (para administrador)
    public function index()
    {
        $compras = Compra::where('status', 'pendiente')->get();
        return response()->json($compras);
    }

    // Webhook de Mercado Pago
    public function mercadoPagoWebhook(Request $request)
{
    // Registrar el contenido de la notificación
    Log::info('Notificación de Mercado Pago recibida:', $request->all());

    $paymentId = $request->input('data.id');
    Log::info('ID del pago recibido:', ['payment_id' => $paymentId]);

    // Verificar el estado del pago a través de la API de Mercado Pago
    $accessToken = env('MERCADO_PAGO_WEBHOOK_TOKEN');
    $response = Http::get("https://api.mercadopago.com/v1/payments/{$paymentId}?access_token={$accessToken}");
    
    if ($response->successful()) {
        Log::info('Respuesta exitosa de Mercado Pago:', $response->json());
        $paymentStatus = $response->json()['status'];
        $operationNumber = $response->json()['order']['id'];
        
        // Buscar la compra y actualizar el estado
        $compra = Compra::where('operation_number', $operationNumber)->first();
        
        if ($compra) {
            if ($paymentStatus === 'approved') {
                $compra->status = 'aprobado';
            } else {
                $compra->status = 'rechazado';
            }
            $compra->save();
            Log::info('Estado de la compra actualizado:', ['compra' => $compra]);
        }
    } else {
        Log::error('Error al consultar el estado del pago en Mercado Pago:', $response->json());
    }

    return response()->json(['message' => 'Webhook procesado']);
}
}
