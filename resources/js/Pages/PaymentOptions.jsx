import React from 'react';

const PaymentOptions = () => {
    return (
        <section className="flex flex-col justify-center items-center">
            <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-8">
                Métodos de Pago Aceptados
            </h2>
            <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                A continuación te mostramos los métodos de pago disponibles para que puedas adquirir tu plan con facilidad.
            </p>
            
            {/* Logos de medios de pago */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-center">
                {/* Tarjeta de Crédito */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://e7.pngegg.com/pngimages/867/144/png-clipart-credit-card-bank-computer-icons-money-credit-card-angle-text.png" 
                        alt="Tarjeta de Crédito" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Tarjeta de Crédito</span>
                </div>

                {/* PayPal */}
                {/* <div className="flex flex-col items-center">
                    <img 
                        src="https://w7.pngwing.com/pngs/136/293/png-transparent-paypal-logo.png" 
                        alt="PayPal" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">PayPal</span>
                </div> */}

                {/* Mercado Pago */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://logowik.com/content/uploads/images/mercado-pago3162.logowik.com.webp" 
                        alt="Mercado Pago" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Mercado Pago</span>
                </div>

                {/* Pago Fácil */}
                {/* <div className="flex flex-col items-center">
                    <img 
                        src="https://w7.pngwing.com/pngs/878/1000/png-transparent-payment-argentina-western-union-invoice-debit-card-summary-text-service-logo.png" 
                        alt="Pago Fácil" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Pago Fácil</span>
                </div> */}

                {/* Rapipago */}
                {/* <div className="flex flex-col items-center">
                    <img 
                        src="https://e7.pngegg.com/pngimages/368/581/png-clipart-logo-rapipago-brand-cordoba-logo-s-blue-text.png" 
                        alt="Rapipago" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Rapipago</span>
                </div> */}

                {/* Transferencia Bancaria */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://w7.pngwing.com/pngs/715/123/png-transparent-logo-wire-transfer-brand-payment-monitoring-text-trademark-logo.png" 
                        alt="Transferencia Bancaria" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Transferencia Bancaria</span>
                </div>

                {/* Débito Automático */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://e7.pngegg.com/pngimages/425/715/png-clipart-credit-card-debit-card-computer-icons-payment-auto-collision-repair-estimating-guide-blue-angle.png" 
                        alt="Débito Automático" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Débito Automático</span>
                </div>
            </div>
        </section>
    );
};

export default PaymentOptions;
