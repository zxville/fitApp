<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;

class PaymentController extends Controller
{
    public function createPreference(Request $request)
    {
        // Paso 1: Configurar el token de acceso
        MercadoPagoConfig::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));

        // Paso 2: Crear la solicitud para la preferencia
        $items = [
            [
                "title" => $request->input('plan_title'),
                "quantity" => 1,
                "unit_price" => (float) $request->input('price'),
                "currency_id" => "ARS",
            ]
        ];

        $payer = [
            "email" => $request->input('payer_email'),
        ];

        $backUrls = [
            'success' => url('/success'),
            'failure' => url('/failure'),
            'pending' => url('/pending'),
        ];

        $requestArray = [
            "items" => $items,
            "payer" => $payer,
            "back_urls" => $backUrls,
            "auto_return" => 'approved',
        ];

        // Paso 3: Inicializar el cliente de preferencia y crear la preferencia
        $client = new PreferenceClient();

        try {
            $preference = $client->create($requestArray);
            // Retornar el ID de la preferencia al frontend
            return response()->json(['preferenceId' => $preference->id], 200);
        } catch (MPApiException $e) {
            // Manejo de la excepción de la API
            return response()->json([
                'error' => 'Error creando la preferencia',
                'status_code' => $e->getApiResponse()->getStatusCode(),
                'content' => $e->getApiResponse()->getContent(),
            ], 500);
        } catch (\Exception $e) {
            // Manejo de otras excepciones
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
