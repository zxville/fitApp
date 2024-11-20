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
use MercadoPago\Preference;
use MercadoPago\Item;
use Inertia\Inertia;

class CompraController extends Controller
{

    // CompraController.php

    public function index()
    {
        $compras = Compra::all();
        return Inertia::render('Compras', [
            'compras' => $compras,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }


    // Crear preferencia y registrar la compra con Mercado Pago
    public function createPreference(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'email' => 'required|email',
        ]);

        $plan = Plan::findOrFail($request->plan_id);

        // Crear registro de compra en estado "pendiente"
        $compra = Compra::create([
            'plan_id' => $plan->id,
            'email' => $request->email,
            'price' => $plan->price,
            'payment_method' => 'Mercado Pago',
            'status' => 'pendiente',
        ]);

        // Configurar Mercado Pago y crear la preferencia
        MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));

        $preference = new Preference();
        $item = new Item();
        $item->id = $plan->id;
        $item->title = $plan->title;
        $item->description = $plan->description;
        $item->category_id = 'services'; // Ajustar la categoría si es diferente
        $item->quantity = 1;
        $item->unit_price = (float) $plan->price;

        $preference->items = [$item];
        $preference->payer = [
            'email' => $request->email,
            'first_name' => $request->first_name ?? 'Nombre',
            'last_name' => $request->last_name ?? 'Apellido'
        ];
        $preference->external_reference = (string) $compra->id;
        $preference->notification_url = route('mercadopago.webhook');
        $preference->back_urls = [
            'success' => url('/success'),
            'failure' => url('/failure'),
            'pending' => url('/pending'),
        ];
        $preference->auto_return = 'approved';
        $preference->statement_descriptor = "FITAPP";
        $preference->binary_mode = true; // Aprobación instantánea si se requiere
        $preference->installments = 1; // Ajusta el número de cuotas

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
            'plan_id' => 'required|exists:plans,id',
            'email' => 'required|email',
            'operation_number' => 'required|string',
            'receipt' => 'required|file|mimes:jpg,jpeg,png,pdf',
        ]);

        $plan = Plan::findOrFail($request->plan_id);

        // Guardar el comprobante de transferencia
        if ($request->hasFile('receipt')) {
            $receiptPath = $request->file('receipt')->store('receipts', 'public');
        }

        // Crear registro de compra con estado "pendiente"
        $compra = Compra::create([
            'plan_id' => $plan->id,
            'email' => $request->email,
            'price' => $plan->price,
            'payment_method' => 'Transferencia',
            'operation_number' => $request->operation_number,
            'receipt' => $receiptPath ?? null,
            'status' => 'pendiente',
        ]);

        return response()->json(['message' => 'Detalles de pago guardados', 'compra' => $compra]);
    }

    // Webhook de Mercado Pago para actualizar el estado de la compra
    public function mercadoPagoWebhook(Request $request)
    {
        Log::info('Notificación de Mercado Pago recibida:', $request->all());

        $paymentId = $request->input('data.id');
        if (!$paymentId) {
            Log::warning('ID de pago no encontrado en la notificación recibida.');
            return response()->json(['error' => 'ID de pago no encontrado en la notificación'], 400);
        }

        $accessToken = env('MERCADO_PAGO_ACCESS_TOKEN');

        $response = Http::withToken($accessToken)->get("https://api.mercadopago.com/v1/payments/{$paymentId}");

        if ($response->successful()) {
            $paymentData = $response->json();
            $paymentStatus = $paymentData['status'];
            $externalReference = $paymentData['external_reference'];

            $compra = Compra::find($externalReference);

            if ($compra) {
                $compra->status = $paymentStatus === 'approved' ? 'pagada' : 'rechazada';
                $compra->transaction_id = $paymentId;
                $compra->save();

                if ($compra->status === 'pagada') {
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


    // CompraController.php

public function confirmPayment(Request $request)
{
    $ids = $request->input('ids');
    Compra::whereIn('id', $ids)->update(['status' => 'pagada']);
    return response()->json(['message' => 'Pagos confirmados exitosamente']);
}

}
