<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PlanController extends Controller
{
    public function index2()
    {
        $planes = Plan::all();
        return Inertia::render('PlanesABM', [
            'planes' => $planes,
            'auth' => [
                'user' => auth()->user(),
            ]
        ]);
    }

    public function index()
    {
        return response()->json(Plan::all());
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048', // Validación para imágenes
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images', 'public'); // Guarda la imagen en storage
        }

        $plan = Plan::create($validatedData);
        return response()->json($plan, 201);
    }


    // Actualizar un plan existente
    public function update(Request $request, $id)
    {
        $plan = Plan::findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images', 'public');
        }

        $plan->update($validatedData);
        return response()->json($plan);
    }


    // Eliminar un plan
    public function destroy($id)
    {
        $plan = Plan::findOrFail($id);
        $plan->delete();
        return response()->json(['message' => 'Plan eliminado correctamente']);
    }
}
