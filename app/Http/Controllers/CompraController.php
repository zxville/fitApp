<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\PlanPurchased;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Payment;

class CompraController extends Controller
{
    // Crear preferencia y registrar la compra con Mercado Pago
    public function createPreference(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'email' => 'required|email',
        ]);

        $plan = Plan::findOrFail($request->plan_id);

        // Registrar la compra con estado 'pendiente'
        $compra = Compra::create([
            'plan_id' => $plan->id,
            'email' => $request->email,
            'price' => $plan->price,
            'payment_method' => 'Mercado Pago',
            'status' => 'pendiente',
        ]);

        // Configurar y crear preferencia de MercadoPago
        MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));

        $preference = new \MercadoPago\Preference();
        $item = new \MercadoPago\Item();
        $item->title = $plan->title;
        $item->quantity = 1;
        $item->unit_price = (float)$plan->price;

        $preference->items = [$item];
        $preference->external_reference = $compra->id;
        $preference->notification_url = route('mercadopago.webhook');
        $preference->back_urls = [
            'success' => url('/success'),
            'failure' => url('/failure'),
            'pending' => url('/pending'),
        ];
        $preference->auto_return = 'approved';

        $preference->save();

        // Guardar el número de operación
        $compra->operation_number = $preference->id;
        $compra->save();

        return response()->json(['preferenceId' => $preference->id]);
    }

    // Guardar detalles de pago para transferencias y registrar la compra
    public function savePaymentDetails(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id', // Verifica que 'plan_id' exista en la tabla 'plans'
            'email' => 'required|email',
            'operation_number' => 'required|string',
            'receipt' => 'required|file|mimes:jpg,jpeg,png,pdf', // Asegura que sea un archivo válido
        ]);
    
        $plan = Plan::findOrFail($request->plan_id);
    
        // Manejar la carga del comprobante y guardar la ruta
        if ($request->hasFile('receipt')) {
            $receiptPath = $request->file('receipt')->store('receipts', 'public');
        }
    
        // Crear registro de compra con estado 'pendiente'
        $compra = Compra::create([
            'plan_id' => $plan->id,
            'email' => $request->email,
            'price' => $plan->price,
            'payment_method' => 'Transferencia',
            'operation_number' => $request->operation_number,
            'receipt' => $receiptPath ?? null, // Guarda la ruta del comprobante
            'status' => 'pendiente',
        ]);
    
        return response()->json(['message' => 'Detalles de pago guardados', 'compra' => $compra]);
    }
    


    // Webhook de Mercado Pago para actualizar el estado de la compra
    public function mercadoPagoWebhook(Request $request)
    {
        Log::info('Notificación de Mercado Pago recibida:', $request->all());

        $paymentId = $request->input('data.id');
        $accessToken = env('MERCADO_PAGO_ACCESS_TOKEN');

        $response = Http::withToken($accessToken)->get("https://api.mercadopago.com/v1/payments/{$paymentId}");

        if ($response->successful()) {
            $paymentData = $response->json();
            $paymentStatus = $paymentData['status'];
            $externalReference = $paymentData['external_reference'];

            // Buscar la compra y actualizar el estado
            $compra = Compra::find($externalReference);

            if ($compra) {
                $compra->status = $paymentStatus === 'approved' ? 'pagada' : 'rechazada';
                $compra->transaction_id = $paymentId;
                $compra->save();

                if ($compra->status === 'pagada') {
                    // Enviar el plan por correo
                    Mail::to($compra->email)->send(new PlanPurchased($compra));
                }
            } else {
                Log::warning('Compra no encontrada para la referencia:', ['external_reference' => $externalReference]);
            }
        } else {
            Log::error('Error al consultar el estado del pago en Mercado Pago:', $response->json());
        }

        return response()->json(['message' => 'Webhook procesado']);
    }
}

