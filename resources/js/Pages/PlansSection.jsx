import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@/Components/Modal';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Stepper = ({ currentStep }) => {
    const steps = ["Plan", "Resumen", "Pago", "Confirmación"];

    return (
        <div className="flex justify-between items-center w-full px-4 md:px-16 lg:px-32">
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
    const [submitError, setSubmitError] = useState('');
    const [isLoadingPreference, setIsLoadingPreference] = useState(false);

    const fetchPlans = useCallback(async () => {
        try {
            const response = await axios.get('plans');
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    }, []);

    useEffect(() => {
        initMercadoPago('APP_USR-7d70e5d0-a45e-4abb-8d20-78b802d440b0', { locale: 'es-AR' });
        fetchPlans();
    }, [fetchPlans]);

    const handleMoreInfo = (plan) => {
        setSelectedPlan(plan);
        setLocalModalOpen(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setLocalModalOpen(false);
        setIsModalOpen(false);
        setSelectedPlan(null);
        setCurrentStep(1);
        setSelectedPaymentMethod('');
        setTransactionDetails({ operationNumber: '', email: '', receipt: null });
        setSubmitError('');
    };


    const handlePaymentMethodChange = async (method) => {
        setSelectedPaymentMethod(method);
        if (method === 'Mercado Pago') {
            setIsLoadingPreference(true);
            try {
                const response = await axios.post('/create-preference', {
                    plan_title: selectedPlan.title,
                    plan_id: selectedPlan.id,
                    price: selectedPlan.price,
                });
                setTransactionDetails((prev) => ({
                    ...prev,
                    operationNumber: response.data.preferenceId,
                }));
            } catch (error) {
                console.error('Error creating preference:', error);
            } finally {
                setIsLoadingPreference(false);
            }
        }
    };

    return (
        <section className="min-w-full min-h-full">
            <div>
                <h2 className="text-4xl mt-10 sm:text-6xl font-extrabold text-center text-pink-600 mb-28 ">
                    Descubre Nuestros Planes Exclusivos
                </h2>

                <Carousel
                    responsive={responsive}
                    autoPlay
                    infinite
                    autoPlaySpeed={4000}
                    keyBoardControl
                    centerMode={true}
                >
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="max-h-96 max-w-full min-h-max min-w-52 p-4 shadow-slate-800"
                        >
                            <div className="relative">
                                <img
                                    src={`/storage/${plan.image}`}
                                    alt={plan.title}
                                    className="w-full h-40 md:h-56 lg:h-64 object-cover rounded-t-xl"
                                />
                                <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-lg shadow-md">
                                    ${plan.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                            <div className="p-3 md:p-5 flex flex-col justify-between flex-grow">
                                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                                    {plan.title}
                                </h3>
                                <p className="text-gray-600 text-xs h-28 md:text-sm leading-relaxed line-clamp-3 mb-4">
                                    {plan.description}
                                </p>
                                <button
                                    className="mt-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition shadow-md"
                                    onClick={() => handleMoreInfo(plan)}
                                >
                                    Más Información
                                </button>
                            </div>
                        </div>
                    ))}
                </Carousel>

            </div>


            {selectedPlan && (
                <PlanModal
                    plan={selectedPlan}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    currentStep={currentStep}
                    onNextStep={() => setCurrentStep((prev) => prev + 1)}
                    onPrevStep={() => setCurrentStep((prev) => prev - 1)}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onPaymentChange={handlePaymentMethodChange}
                    transactionDetails={transactionDetails}
                    setTransactionDetails={setTransactionDetails}
                    submitError={submitError}
                    isLoadingPreference={isLoadingPreference}
                />
            )}
        </section>
    );
};

const PlanModal = ({
    plan,
    isOpen,
    onClose,
    currentStep,
    onNextStep,
    onPrevStep,
    selectedPaymentMethod,
    onPaymentChange,
    transactionDetails,
    onInputChange,
    onFileChange,
    onSubmit,
    submitError,
    isLoadingPreference
}) => {
    const [paymentError, setPaymentError] = useState(false);

    if (!isOpen || !plan) return null;

    const handleNextStep = () => {
        if (currentStep === 3) {
            if (!selectedPaymentMethod) {
                setPaymentError(true);
            } else {
                setPaymentError(false);
                onNextStep();
            }
        } else {
            onNextStep();
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-10 mx-auto overflow-y-auto bg-white rounded-2xl shadow-2xl max-h-[78vh] min-h-[78vh] flex flex-col">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    <FaTimes className="h-6 w-6" />
                </button>

                <Stepper currentStep={currentStep} />

                <div className="text-center mb-4 flex-grow">
                    <h2 className="text-2xl sm:text-5xl font-bold text-pink-600 mb-4 pt-8">{plan.title}</h2>
                </div>

                {currentStep === 1 && (
                    <div className="flex flex-col lg:flex-row gap-8 mb-4 flex-grow">
                        <img src={`/storage/${plan.image}`} alt={plan.title} className="object-cover h-svh max-h-72 lg:w-1/3 rounded-lg shadow-lg hidden lg:block" />
                        <div className="lg:w-2/3">
                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">{plan.description}</p>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="mb-4 flex-grow">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Detalle de la Compra</h3>
                        <div className="bg-gray-100 p-8 rounded-xl shadow-inner">
                            <p className="text-lg text-gray-700">Estás a punto de adquirir el plan <strong>{plan.title}</strong>.</p>
                            <p className="text-lg text-gray-700 mt-4">Precio: <strong>${plan.price}</strong></p>
                            <p className="text-lg text-gray-700 mt-6">
                                <strong>Entrega del Plan:</strong> Una vez confirmado el pago, recibirás un correo electrónico proporcionado dentro de las próximas 24 horas.
                            </p>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="mb-4 flex-grow">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Selecciona el Método de Pago</h3>
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
                        {paymentError && (
                            <p className="text-red-500">Por favor selecciona un método de pago para continuar.</p>
                        )}
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="flex-grow">
                        <div className="bg-gray-100 px-8 py-2 rounded-xl shadow-inner mb-2">
                            {selectedPaymentMethod === 'Mercado Pago' && (
                                <div className="mb-8">
                                    <p className="text-lg text-gray-700">Plan seleccionado: <strong>{plan.title}</strong></p>
                                    <p className="text-lg text-gray-700 mt-4">Precio: <strong>${plan.price}</strong></p>
                                    <p className="text-lg text-gray-700 mt-4">Método de Pago: <strong>{selectedPaymentMethod}</strong></p>
                                    <p className="text-lg text-red-500 mt-10">Toda la Información sera enviada al email de la cuenta de mercado pago</p>
                                </div>
                            )}

                            {selectedPaymentMethod === 'Transferencia' && (
                                <div className="mt-2">
                                    <p className="mb-1">Por favor, realiza la transferencia al siguiente CBU:</p>
                                    <p className="font-semibold mb-4">CBU: 1234567890123456789012</p>
                                    <div className="mb-1">
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
                                    <div className="mb-1">
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
                                    <div className="mb-1">
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

                            {submitError && selectedPaymentMethod === 'Transferencia' && (
                                <p className="text-red-500 text-center mt-4">{submitError}</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-auto">
                    <button
                        className={`px-8 py-4 bg-gray-600 text-white max-h-16 text-lg font-semibold rounded-lg shadow-md transition duration-300 focus:outline-none ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                        onClick={onPrevStep}
                        disabled={currentStep === 1}
                    >
                        Anterior
                    </button>

                    {currentStep < 4 ? (
                        <button
                            className={`px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700 transition duration-300 focus:outline-none`}
                            onClick={handleNextStep}
                            disabled={isLoadingPreference && currentStep === 3}
                        >
                            {currentStep === 3 ? 'Confirmar Pago' : 'Siguiente'}
                        </button>
                    ) : (
                        <div className="flex justify-end w-full">
                            {selectedPaymentMethod === 'Mercado Pago' ? (
                                <Wallet
                                initialization={{ preferenceId: transactionDetails.operationNumber }}
                                customization={{
                                  visual: { 
                                    buttonBackground: 'blue', // Fondo del botón, usa "pink" o un color específico
                                    buttonHeight: '0px', // Altura del botón
                                    borderRadius: '12px', // Bordes redondeados
                                    valuePropColor: 'white', // Color del texto
                                    verticalPadding: '0px', // Relleno vertical
                                    horizontalPadding: '0px', // Relleno horizontal
                                  },
                                }}
                              />
                              
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