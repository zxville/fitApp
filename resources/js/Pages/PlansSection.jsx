import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Stepper Component
const Stepper = ({ currentStep }) => {
    const steps = ["Plan", "Resumen", "Pago", "Confirmación"];

    return (
        <div className="flex justify-between items-center w-full mb-8 px-32">
            {steps.map((step, index) => (
                <div key={index} className={`relative flex items-center ${index < steps.length - 1 ? 'w-full' : ''}`}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 
                            ${currentStep === index + 1 ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' :
                                    currentStep > index + 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}
                        >
                            {index + 1}
                        </div>
                        <p className={`text-xs mt-2 transition-colors duration-300 text-center ${currentStep === index + 1 ? 'text-pink-600 font-semibold' :
                            currentStep > index + 1 ? 'text-green-500 font-semibold' : 'text-gray-400'}`}>
                            {step}
                        </p>
                    </div>

                    {index < steps.length - 1 && (
                        <div className="flex-grow h-0.5 bg-gray-300 mx-4 transition-all duration-300" style={{
                            backgroundColor: currentStep > index + 1 ? '#22c55e' : '#d1d5db'
                        }}></div>
                    )}
                </div>
            ))}
        </div>
    );
};


const sendPlanEmail = async (email, planTitle) => {
    try {
        const response = await axios.post('/send-plan', { email, planTitle });
        console.log('Plan sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending the plan:', error);
    }
};


const PlansSection = ({ setIsModalOpen }) => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setLocalModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [transactionDetails, setTransactionDetails] = useState({
        operationNumber: '',
        email: '',
        receipt: null,
    });

    useEffect(() => {
        initMercadoPago('APP_USR-25e32e7d-c0c0-41cd-83f1-822385199575', { locale: 'es-AR' });
    }, []);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('plans');
                const data = await response.json();
                setPlans(data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };
        fetchPlans();
    }, []);

    const handleMoreInfo = (plan) => {
        setSelectedPlan(plan);
        setLocalModalOpen(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setLocalModalOpen(false);
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedPlan(null);
            setCurrentStep(1);
            setSelectedPaymentMethod('');
            setTransactionDetails({ operationNumber: '', email: '', receipt: null });
        }, 300);
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handlePaymentMethodChange = async (method) => {
        setSelectedPaymentMethod(method);
        if (method === 'Mercado Pago') {
            try {
                const response = await axios.post('/create-preference', {
                    plan_title: selectedPlan.title,
                    price: selectedPlan.price,
                });
                setTransactionDetails((prevDetails) => ({
                    ...prevDetails,
                    operationNumber: response.data.preferenceId,
                }));
            } catch (error) {
                console.error('Error creating preference:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransactionDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setTransactionDetails((prevDetails) => ({
            ...prevDetails,
            receipt: e.target.files[0],
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('plan_title', selectedPlan.title);
        formData.append('price', selectedPlan.price);
        formData.append('payment_method', selectedPaymentMethod);
        formData.append('operation_number', transactionDetails.operationNumber);
        formData.append('email', transactionDetails.email);
        if (transactionDetails.receipt) {
            formData.append('receipt', transactionDetails.receipt);
        }
    
        try {
            const response = await fetch('/save-payment-details', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Payment details saved:', data);
        } catch (error) {
            console.error('Error saving payment details:', error);
        }
    };
    
    

    return (
        <section className="from-white to-gray-100 py-16">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <h2 className="text-6xl font-extrabold text-center text-pink-600 mb-20 lg:block hidden">Descubre Nuestros Planes Exclusivos</h2>
                <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {plans.length > 0 ? (
                        plans.map((plan, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden flex flex-col transform hover:scale-105"
                            >
                                <img
                                    src={plan.image}
                                    alt={plan.title}
                                    className="w-full h-48 object-cover rounded-t-3xl lg:block hidden"
                                />
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                                    <p className="text-2xl text-pink-500 mb-4 text-right">
                                        ${' '}
                                        {plan.price.toLocaleString('es-ES', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                    <p
                                        className="text-lg text-gray-600 mb-6 leading-relaxed"
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '3',
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {plan.description}
                                    </p>
                                    <button
                                        className="mt-auto px-6 py-4 bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-pink-700 transition duration-300"
                                        onClick={() => handleMoreInfo(plan)}
                                    >
                                        Más Información
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">
                            No hay planes disponibles en este momento.
                        </p>
                    )}
                </div>

            </div>

            {/* Modal de detalles */}
            {selectedPlan && (
                <PlanModal
                    plan={selectedPlan}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    currentStep={currentStep}
                    onNextStep={handleNextStep}
                    onPrevStep={handlePreviousStep}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onPaymentChange={handlePaymentMethodChange}
                    transactionDetails={transactionDetails}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                    onSubmit={handleSubmit}
                />
            )}
        </section>
    );
};

const PlanModal = ({ plan, isOpen, onClose, currentStep, onNextStep, onPrevStep, selectedPaymentMethod, onPaymentChange, transactionDetails, onInputChange, onFileChange, onSubmit }) => {
    const [paymentError, setPaymentError] = useState(false);
    const [emailError, setEmailError] = useState(false); // Estado para el error de email

    if (!isOpen || !plan) return null;

    const handleNextStep = () => {
        if (currentStep === 3) {
            if (!selectedPaymentMethod) {
                setPaymentError(true);
            } else if (selectedPaymentMethod === 'Mercado Pago' && !transactionDetails.email) {
                setEmailError(true); // Mostrar error si no se ingresó un correo
            } else {
                setPaymentError(false);
                setEmailError(false);
                onNextStep(); // Avanzar al siguiente paso si todo está correcto
            }
        } else {
            onNextStep();
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-10 w-full mx-auto overflow-y-auto bg-white rounded-2xl shadow-2xl max-h-[78vh] min-h-[78vh] flex flex-col">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    <FaTimes className="h-6 w-6" />
                </button>

                <Stepper currentStep={currentStep} />

                <div className="text-center mb-8 flex-grow">
                    <h2 className="text-5xl font-bold text-pink-600 mb-4">{plan.title}</h2>
                    <p className="text-3xl font-semibold text-gray-800 mb-4">$ {plan.price}</p>
                </div>

                {/* Contenido de los pasos */}
                {currentStep === 1 && (
                    <div className="flex flex-col lg:flex-row gap-8 mb-8 flex-grow">
                        <img src={plan.image} alt={plan.title} className="w-full lg:w-1/3 h-auto object-cover rounded-lg shadow-lg hidden lg:block" />
                        <div className="lg:w-2/3">
                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">{plan.description}</p>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="mb-8 flex-grow">
                        <h3 className="text-4xl font-semibold text-gray-800 mb-6">Detalle de la Compra</h3>
                        <div className="bg-gray-100 p-8 rounded-xl shadow-inner">
                            <p className="text-lg text-gray-700">Estás a punto de adquirir el plan <strong>{plan.title}</strong>.</p>
                            <p className="text-lg text-gray-700 mt-4">Precio: <strong>${plan.price}</strong></p>
                            {/* Nueva leyenda para explicar la entrega del plan */}
                            <p className="text-lg text-gray-700 mt-6">
                                <strong>Entrega del Plan:</strong> Una vez confirmado el pago, recibirás tu plan de entrenamiento en el correo electrónico proporcionado dentro de las próximas 24 horas. Si seleccionaste <strong>Mercado Pago</strong>, el plan se enviará automáticamente tras la confirmación del pago. Si realizaste una <strong>Transferencia</strong>, por favor asegúrate de cargar el comprobante de pago para validar la transacción.
                            </p>
                        </div>
                    </div>
                )}

                {/* Contenido de los pasos */}
                {currentStep === 3 && (
                    <div className="mb-8 flex-grow">
                        <h3 className="text-4xl font-semibold text-gray-800 mb-6">Selecciona el Método de Pago</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['Transferencia', 'Mercado Pago'].map((method) => (
                                <button
                                    key={method}
                                    className={`p-6 border rounded-lg transition-all duration-300 hover:border-pink-500 ${selectedPaymentMethod === method ? 'border-pink-500 shadow-lg' : 'border-gray-300'}`}
                                    onClick={() => onPaymentChange(method)}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>

                        {/* Mostrar input para correo electrónico si se selecciona Mercado Pago */}
                        {selectedPaymentMethod === 'Mercado Pago' && (
                            <div className="mt-6">
                                <label className="block text-lg text-gray-700 mb-2" htmlFor="email">
                                    Correo Electrónico para recibir el plan
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={transactionDetails.email}
                                    onChange={onInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-pink-500"
                                    placeholder="Ingresa tu correo electrónico"
                                />
                                {/* Mostrar error si no se ha ingresado el correo electrónico */}
                                {emailError && (
                                    <p className="text-red-500 mt-2">Por favor ingresa tu correo electrónico para continuar.</p>
                                )}
                            </div>
                        )}

                        {/* Mostrar mensaje de error si no se selecciona un método de pago */}
                        {paymentError && (
                            <p className="text-red-500 mt-4">Por favor selecciona un método de pago para continuar.</p>
                        )}
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="mb-8 flex-grow">
                        <h3 className="text-4xl font-semibold text-gray-800 mb-6">Confirmación del Pedido</h3>
                        <div className="bg-gray-100 p-8 rounded-xl shadow-inner mb-8">
                            <p className="text-lg text-gray-700">Plan seleccionado: <strong>{plan.title}</strong></p>
                            <p className="text-lg text-gray-700 mt-4">Precio: <strong>${plan.price}</strong></p>
                            <p className="text-lg text-gray-700 mt-4">Método de Pago: <strong>{selectedPaymentMethod}</strong></p>
                            {selectedPaymentMethod === 'Transferencia' && (
                                <div className="mt-6">
                                    <p className="mb-4">Por favor, realiza la transferencia al siguiente CBU:</p>
                                    <p className="font-semibold mb-4">CBU: 1234567890123456789012</p>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="operationNumber">Número de Operación</label>
                                        <input
                                            type="text"
                                            id="operationNumber"
                                            name="operationNumber"
                                            value={transactionDetails.operationNumber}
                                            onChange={onInputChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={transactionDetails.email}
                                            onChange={onInputChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2" htmlFor="receipt">Comprobante de Transferencia</label>
                                        <input
                                            type="file"
                                            id="receipt"
                                            name="receipt"
                                            onChange={onFileChange}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-pink-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Controles del Stepper */}
                <div className="flex justify-between mt-auto">
                    <button
                        className={`px-8 py-4 bg-gray-300 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 focus:outline-none ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                        onClick={onPrevStep}
                        disabled={currentStep === 1}
                    >
                        Anterior
                    </button>
                    {currentStep < 4 ? (
                        <button
                            className={`px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700 transition duration-300 focus:outline-none`}
                            onClick={handleNextStep}
                            disabled={currentStep === 3 && (!selectedPaymentMethod || (selectedPaymentMethod === 'Mercado Pago' && !transactionDetails.email))} // Deshabilitar si no hay método de pago o correo para Mercado Pago
                        >
                            {currentStep === 3 ? 'Confirmar Pago' : 'Siguiente'}
                        </button>
                    ) : (
                        <div className="flex justify-end w-full">
                            {selectedPaymentMethod === 'Mercado Pago' ? (
                                <Wallet initialization={{ preferenceId: transactionDetails.operationNumber }} />
                            ) : (
                                <button
                                    className="px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-green-600 transition duration-300 focus:outline-none"
                                    onClick={onSubmit}
                                >
                                    Finalizar
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};





export default PlansSection;
