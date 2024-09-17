import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import PaymentOptions from './PaymentOptions';

const plans = [
    { 
        id: 1, 
        title: 'Plan de Entrenamiento', 
        description: 'Entrenamiento completo para mejorar tu condición física.', 
        details: 'Este plan incluye rutinas personalizadas, seguimiento semanal, y acceso a nuestra plataforma de entrenamiento virtual para que puedas ejercitarte desde cualquier lugar. Perfecto para quienes desean mejorar su condición física y tener un control detallado de su progreso.', 
        price: '$30/mes', 
        image: 'https://eurofitness.com/wp-content/uploads/2023/01/mejores-consejos-aprovechar-maximo-tu-entrenamiento-728.jpeg' 
    },
    { 
        id: 2, 
        title: 'Plan Nutricional', 
        description: 'Un plan nutricional ajustado a tus necesidades.', 
        details: 'Este plan está diseñado por nuestros nutricionistas para adaptarse a tus necesidades específicas. Incluye una evaluación nutricional, plan de comidas, recetas personalizadas y seguimiento semanal.', 
        price: '$25/mes', 
        image: 'https://eurofitness.com/wp-content/uploads/2023/01/mejores-consejos-aprovechar-maximo-tu-entrenamiento-728.jpeg' 
    },
    { 
        id: 3, 
        title: 'Entrenamiento en Casa', 
        description: 'Entrena desde la comodidad de tu hogar.', 
        details: 'Accede a una amplia gama de entrenamientos en video, adaptados a tus preferencias y necesidades. Este plan incluye guías de seguimiento y la posibilidad de ajustar el nivel de dificultad según tus progresos.', 
        price: '$20/mes', 
        image: 'https://eurofitness.com/wp-content/uploads/2023/01/mejores-consejos-aprovechar-maximo-tu-entrenamiento-728.jpeg' 
    },
    { 
        id: 4, 
        title: 'Entrenamiento en Gimnasio', 
        description: 'Rutinas diseñadas para el gimnasio.', 
        details: 'Si prefieres entrenar en un gimnasio, este plan te ofrece rutinas avanzadas diseñadas específicamente para el uso de equipos de gimnasio. Ideal para quienes buscan maximizar su fuerza y resistencia.', 
        price: '$35/mes', 
        image: 'https://eurofitness.com/wp-content/uploads/2023/01/mejores-consejos-aprovechar-maximo-tu-entrenamiento-728.jpeg' 
    },
    { 
        id: 5, 
        title: 'Nutrición + Entrenamiento', 
        description: 'El paquete completo para mejorar tu salud y condición física.', 
        details: 'Este plan combina lo mejor de nuestros planes de nutrición y entrenamiento. Obtendrás acceso a un plan nutricional personalizado y entrenamientos detallados para casa o gimnasio.', 
        price: '$50/mes', 
        image: 'https://eurofitness.com/wp-content/uploads/2023/01/mejores-consejos-aprovechar-maximo-tu-entrenamiento-728.jpeg' 
    }
];

const PlansSection = ({ setIsModalOpen }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setLocalModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1); // Estado para manejar el step actual
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // Estado para manejar el método de pago seleccionado

    const handleMoreInfo = (plan) => {
        setSelectedPlan(plan);
        setLocalModalOpen(true);
        setIsModalOpen(true);  // Informar al componente Home que el modal está abierto
    };

    const handleCloseModal = () => {
        setLocalModalOpen(false);
        setIsModalOpen(false);  // Informar al componente Home que el modal está cerrado
        setTimeout(() => {
            setSelectedPlan(null);
            setCurrentStep(1); // Reiniciar el step al cerrar el modal
            setSelectedPaymentMethod(''); // Reiniciar el método de pago
        }, 300);
    };

    // Efecto para manejar el scroll cuando el modal esté abierto.
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Restaurar el scroll al desmontar
        };
    }, [isModalOpen]);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <section className="w-full flex flex-col justify-center items-center bg-gray-100 pb-32">
            <div className="lg:grid lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-5 overflow-x-auto sm:flex sm:space-x-5">
                {plans.map(plan => (
                    <div
                        key={plan.id}
                        className="bg-white min-w-[250px] sm:min-w-[300px] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col items-center"
                    >
                        <img
                            src={plan.image}
                            alt={plan.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{plan.title}</h3>
                            <p className="text-gray-600">{plan.description}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                                onClick={() => handleMoreInfo(plan)}
                            >
                                Más Información
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Usando el modal con stepper para los detalles del plan */}
            {selectedPlan && (
                <Modal show={isModalOpen} onClose={handleCloseModal} maxWidth="2xl">
                    <div className="p-6">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={handleCloseModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Stepper */}
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <div className={`flex-1 border-b-2 ${currentStep >= 1 ? 'border-pink-500' : 'border-gray-200'}`}></div>
                                <div className={`flex-1 border-b-2 ${currentStep >= 2 ? 'border-pink-500' : 'border-gray-200'}`}></div>
                                <div className={`flex-1 border-b-2 ${currentStep >= 3 ? 'border-pink-500' : 'border-gray-200'}`}></div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="text-sm text-pink-500">Detalles</div>
                                <div className="text-sm text-pink-500">Datos de Pago</div>
                                <div className="text-sm text-pink-500">Confirmación</div>
                            </div>
                        </div>

                        {/* Paso 1: Detalles del Plan */}
                        {currentStep === 1 && (
                            <>
                                <img
                                    src={selectedPlan.image}
                                    alt={selectedPlan.title}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedPlan.title}</h2>
                                <p className="text-gray-700 mb-4 text-center">{selectedPlan.details}</p>
                                <p className="text-lg font-semibold text-pink-500 mb-4">Precio: {selectedPlan.price}</p>
                                <div className="flex justify-between">
                                    <button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300" onClick={handleNextStep}>
                                        Siguiente
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Paso 2: Selección de Método de Pago */}
                        {currentStep === 2 && (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Selecciona tu método de pago</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        className={`border-2 rounded-lg p-4 transition-all ${selectedPaymentMethod === 'Mercado Pago' ? 'border-pink-500' : 'border-gray-200'}`}
                                        onClick={() => handlePaymentMethodChange('Mercado Pago')}
                                    >
                                        Mercado Pago
                                    </button>
                                    <button
                                        className={`border-2 rounded-lg p-4 transition-all ${selectedPaymentMethod === 'Tarjeta de Crédito' ? 'border-pink-500' : 'border-gray-200'}`}
                                        onClick={() => handlePaymentMethodChange('Tarjeta de Crédito')}
                                    >
                                        Tarjeta de Crédito
                                    </button>
                                    <button
                                        className={`border-2 rounded-lg p-4 transition-all ${selectedPaymentMethod === 'Tarjeta de Débito' ? 'border-pink-500' : 'border-gray-200'}`}
                                        onClick={() => handlePaymentMethodChange('Tarjeta de Débito')}
                                    >
                                        Tarjeta de Débito
                                    </button>
                                    <button
                                        className={`border-2 rounded-lg p-4 transition-all ${selectedPaymentMethod === 'Paypal' ? 'border-pink-500' : 'border-gray-200'}`}
                                        onClick={() => handlePaymentMethodChange('Paypal')}
                                    >
                                        PayPal
                                    </button>
                                    <button
                                        className={`border-2 rounded-lg p-4 transition-all ${selectedPaymentMethod === 'Transferencia Bancaria' ? 'border-pink-500' : 'border-gray-200'}`}
                                        onClick={() => handlePaymentMethodChange('Transferencia Bancaria')}
                                    >
                                        Transferencia Bancaria
                                    </button>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300" onClick={handlePreviousStep}>
                                        Anterior
                                    </button>
                                    <button
                                        className={`px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300 ${!selectedPaymentMethod && 'opacity-50 cursor-not-allowed'}`}
                                        onClick={handleNextStep}
                                        disabled={!selectedPaymentMethod}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Paso 3: Confirmación */}
                        {currentStep === 3 && (
                            <>
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirmación</h2>
                                <p className="mb-2"><strong>Plan:</strong> {selectedPlan.title}</p>
                                <p className="mb-2"><strong>Método de pago:</strong> {selectedPaymentMethod}</p>
                                <p className="mb-2"><strong>Precio:</strong> {selectedPlan.price}</p>
                                <div className="flex justify-between mt-6">
                                    <button className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300" onClick={handlePreviousStep}>
                                        Anterior
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300"
                                        onClick={() => alert('Compra Confirmada!')}
                                    >
                                        Confirmar Compra
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default PlansSection;
