import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PlanesABM({ planes: initialPlanes, auth }) {
    const [planes, setPlanes] = useState(initialPlanes || []);
    const [newPlan, setNewPlan] = useState({ title: '', price: '', description: '', image: null });
    const [editingPlan, setEditingPlan] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewPlan({ ...newPlan, image: files[0] });
        } else {
            setNewPlan({ ...newPlan, [name]: value });
        }
    };

    const handleCreatePlan = async () => {
        const formData = new FormData();
        Object.keys(newPlan).forEach((key) => {
            formData.append(key, newPlan[key]);
        });

        await axios.post('/plans', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        setNewPlan({ title: '', price: '', description: '', image: null });
        fetchPlanes();
    };

    const handleEditPlan = (plan) => {
        setEditingPlan(plan);
        setNewPlan(plan);
    };

    const handleUpdatePlan = async () => {
        const formData = new FormData();
        Object.keys(newPlan).forEach((key) => {
            formData.append(key, newPlan[key]);
        });

        await axios.post(`/plans/${editingPlan.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        setEditingPlan(null);
        setNewPlan({ title: '', price: '', description: '', image: null });
        fetchPlanes();
    };

    const handleDeletePlan = async (id) => {
        await axios.delete(`/plans/${id}`);
        fetchPlanes();
    };

    const fetchPlanes = async () => {
        const response = await axios.get('/plans');
        setPlanes(response.data);
    };

    useEffect(() => {
        if (!planes.length) fetchPlanes();
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h2 className="text-xl font-semibold mb-4">Gestión de Planes</h2>

                {/* Formulario para crear o editar planes */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={newPlan.title}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={newPlan.price}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={newPlan.description}
                        onChange={handleInputChange}
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <button
                        onClick={editingPlan ? handleUpdatePlan : handleCreatePlan}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        {editingPlan ? 'Actualizar Plan' : 'Agregar Plan'}
                    </button>
                    {editingPlan && (
                        <button
                            onClick={() => {
                                setEditingPlan(null);
                                setNewPlan({ title: '', price: '', description: '', image: null });
                            }}
                            className="ml-2 text-gray-500 underline"
                        >
                            Cancelar
                        </button>
                    )}
                </div>

                {/* Tabla de planes */}
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 border px-4">ID</th>
                            <th className="py-2 border px-4">Título</th>
                            <th className="py-2 border px-4">Precio</th>
                            <th className="py-2 border px-4">Descripción</th>
                            <th className="py-2 border px-4">Imagen</th>
                            <th className="py-2 border px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(planes) &&
                            planes.map((plan) => (
                                <tr key={plan.id}>
                                    <td className="py-2 border px-4">{plan.id}</td>
                                    <td className="py-2 border px-4">{plan.title}</td>
                                    <td className="py-2 border px-4">${plan.price}</td>
                                    <td className="py-2 border px-4">{plan.description}</td>
                                    <td className="py-2 border px-4">
                                    <img
    src={`/storage/${plan.image}`}
    alt={plan.title}
    className="w-16 h-16 object-cover"
/>

                                    </td>
                                    <td className="py-2 border px-4">
                                        <button
                                            onClick={() => handleEditPlan(plan)}
                                            className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeletePlan(plan.id)}
                                            className="bg-red-500 text-white py-1 px-2 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
