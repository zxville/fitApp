// Compras.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Compras({ compras: initialCompras, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompras, setSelectedCompras] = useState([]);
    const [compras, setCompras] = useState(initialCompras);
    const [filteredCompras, setFilteredCompras] = useState(initialCompras);

    // Filtra las compras en tiempo real por todos los campos
    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        setFilteredCompras(
            compras.filter((compra) =>
                Object.values(compra).some((value) =>
                    String(value).toLowerCase().includes(term)
                )
            )
        );
    };

    // Maneja la selección de cada checkbox
    const handleCheckboxChange = (compraId) => {
        setSelectedCompras((prevSelected) =>
            prevSelected.includes(compraId)
                ? prevSelected.filter((id) => id !== compraId)
                : [...prevSelected, compraId]
        );
    };

    // Selecciona o deselecciona todos los registros
    const handleSelectAll = () => {
        if (selectedCompras.length === filteredCompras.length) {
            setSelectedCompras([]);
        } else {
            setSelectedCompras(filteredCompras.map((compra) => compra.id));
        }
    };

    // Maneja el botón de confirmar pago
    const handleConfirmPayment = async () => {
        try {
            await axios.patch('/compras/confirm-payment', { ids: selectedCompras });
            alert('Pagos confirmados exitosamente');
            setSelectedCompras([]);
            fetchCompras(); // Actualiza la lista de compras después de confirmar el pago
        } catch (error) {
            console.error('Error al confirmar los pagos', error);
        }
    };

    // Actualiza los datos de compras al confirmar el pago
    const fetchCompras = async () => {
        try {
            const response = await axios.get('/compras'); // Asegúrate de que esta ruta devuelva los datos de compras actualizados
            setCompras(response.data.compras);
            setFilteredCompras(response.data.compras);
        } catch (error) {
            console.error('Error al actualizar las compras', error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="relative min-h-screen bg-white">


                {/* Buscador en tiempo real */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar en todos los campos"
                    className="mb-4 p-2 border rounded w-full"
                />

                {/* Contador de pagos seleccionados */}
                <p className="mb-4">Pagos seleccionados: {selectedCompras.length}</p>

                <div className="overflow-auto max-h-[calc(100vh-150px)]">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 border px-4">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={
                                            selectedCompras.length === filteredCompras.length &&
                                            filteredCompras.length > 0
                                        }
                                    />
                                </th>
                                <th className="py-2 border px-4">ID</th>
                                <th className="py-2 border px-4">Email de Comprador</th>
                                <th className="py-2 border px-4">Precio</th>
                                <th className="py-2 border px-4">Fecha</th>
                                <th className="py-2 border px-4">Método de Pago</th>
                                <th className="py-2 border px-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompras.map((compra) => (
                                <tr key={compra.id}>
                                    <td className="py-2 border px-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCompras.includes(compra.id)}
                                            onChange={() => handleCheckboxChange(compra.id)}
                                        />
                                    </td>
                                    <td className="py-2 border px-4">{compra.id}</td>
                                    <td className="py-2 border px-4">{compra.email}</td>
                                    <td className="py-2 border px-4">${compra.price}</td>
                                    <td className="py-2 border px-4">
                                        {new Date(compra.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 border px-4">{compra.payment_method}</td>
                                    <td className="py-2 border px-4">{compra.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Botón para confirmar el pago - fijo en la parte inferior */}
                <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t">
                    <button
                        onClick={handleConfirmPayment}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                        disabled={selectedCompras.length === 0}
                    >
                        Confirmar Pago
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
