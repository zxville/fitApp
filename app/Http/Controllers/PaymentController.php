<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\SDK;
use MercadoPago\Preference;
use MercadoPago\Item;

class PaymentController extends Controller
{
    public function createPreference(Request $request)
    {
        // Configurar el SDK con el access token
        SDK::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));

        // Crear un ítem de la preferencia con los detalles recibidos del frontend
        $item = new Item();
        $item->title = $request->input('plan_title'); // Título del plan
        $item->quantity = 1; // Cantidad (siempre será 1 porque es un plan)
        $item->unit_price = (float) $request->input('price'); // Precio del plan

        // Crear la preferencia
        $preference = new Preference();
        $preference->items = [$item];

        // Configurar las URLs de retorno
        $preference->back_urls = [
            'success' => url('/payment-success'),
            'failure' => url('/payment-failure'),
            'pending' => url('/payment-pending'),
        ];
        $preference->auto_return = 'approved';

        // Guardar la preferencia y obtener el preference ID
        $preference->save();

        // Retornar el preference ID al frontend
        return response()->json(['preferenceId' => $preference->id]);
    }
}
