<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\MercadoPagoConfig;

class PaymentController extends Controller
{
    protected function authenticate()
    {
        // Configurar el token de acceso usando el valor del archivo .env
        $mpAccessToken = env('MERCADO_PAGO_ACCESS_TOKEN');
        MercadoPagoConfig::setAccessToken($mpAccessToken);
        // (Opcional) Configurar el entorno a LOCAL si se desea probar en localhost
        MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
    }

    public function createPreference(Request $request)
    {
        // Paso 1: Autenticarse
        $this->authenticate();

        // Paso 2: Crear los datos del producto
        $item = [
            "id" => "1234567890",
            "title" => $request->input('plan_title'),
            "description" => "Pago de suscripción al plan " . $request->input('plan_title'),
            "currency_id" => "ARS",
            "quantity" => 1,
            "unit_price" => (float)$request->input('price'),
        ];

        $items = [$item];

        // Paso 3: Crear los datos del pagador
        $payer = [
            "email" => $request->input('payer_email'),
        ];

        // Paso 4: Configurar las URLs de retorno
        $backUrls = [
            'success' => url('/'),
            'failure' => url('/'),
            'pending' => url('/'),
        ];

        // Paso 5: Crear la preferencia para Checkout Pro
        $requestArray = [
            "items" => $items,
            "payer" => $payer,
            "back_urls" => $backUrls,
            "auto_return" => 'approved',
        ];

        // Paso 6: Inicializar el cliente de preferencia y crear la preferencia
        $client = new PreferenceClient();

        try {
            $preference = $client->create($requestArray);
            // Retornar el id de la preferencia al frontend
            return response()->json(['preferenceId' => $preference->id], 200);
        } catch (MPApiException $e) {
            // Manejar la excepción de la API
            return response()->json([
                'error' => 'Error creando la preferencia',
                'status_code' => $e->getApiResponse()->getStatusCode(),
                'content' => $e->getApiResponse()->getContent(),
            ], 500);
        } catch (\Exception $e) {
            // Manejar otras excepciones
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
