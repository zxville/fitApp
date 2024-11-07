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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-8 justify-center items-center">

                {/* Mercado Pago */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://logowik.com/content/uploads/images/mercado-pago3162.logowik.com.webp" 
                        alt="Mercado Pago" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Mercado Pago</span>
                </div>

                {/* Transferencia Bancaria */}
                <div className="flex flex-col items-center">
                    <img 
                        src="https://w7.pngwing.com/pngs/715/123/png-transparent-logo-wire-transfer-brand-payment-monitoring-text-trademark-logo.png" 
                        alt="Transferencia Bancaria" 
                        className="w-20 h-auto transition-transform duration-300 hover:scale-110"
                    />
                    <span className="mt-4 text-gray-700 text-lg font-medium">Transferencia Bancaria</span>
                </div>

            </div>
        </section>
    );
};

export default PaymentOptions;
