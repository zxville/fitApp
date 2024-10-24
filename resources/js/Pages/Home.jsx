import React, { useEffect, useState } from 'react';
import Header from './Header';
import VideoSection from './VideoSection';
import PlansSection from './PlansSection';
import PaymentOptions from './PaymentOptions';
import SobreMi from './SobreMi';

const Home = () => {
    const [activeSection, setActiveSection] = useState(0); // Controla qué sección está activa
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar si el modal está abierto

    const sections = [
        { id: "video-section", component: <VideoSection /> },
        { id: "plans-section", component: <PlansSection setIsModalOpen={setIsModalOpen} /> }, // Pasar la prop para manejar el estado del modal
        { id: "about-me", component: <SobreMi /> },
        { id: "payment-section", component: <PaymentOptions /> },
    ];

    const handleScroll = (event) => {
        if (!isModalOpen) {  // Solo permitir el scroll si el modal no está abierto
            const delta = Math.sign(event.deltaY); // Detecta el desplazamiento (hacia arriba o abajo)
            if (delta > 0 && activeSection < sections.length - 1) {
                setActiveSection((prev) => prev + 1);
            } else if (delta < 0 && activeSection > 0) {
                setActiveSection((prev) => prev - 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [activeSection, isModalOpen]);  // Agregar `isModalOpen` como dependencia para deshabilitar el scroll cuando el modal esté abierto

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Pasar activeSection y setActiveSection a Header */}
            <Header activeSection={activeSection} setActiveSection={setActiveSection} />
            <div
                className={`transition-transform duration-700 ease-in-out`}
                style={{ transform: `translateY(-${activeSection * 100}vh)` }}
            >
                {sections.map((section, index) => (
                    <div key={index} className="h-screen flex justify-center items-center box-border max-h-screen">
                        {section.component}
                    </div>
                ))}
            </div>

            {/* Indicador de scroll vertical */}
            <div className="fixed max-h-screentop-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                {sections.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${activeSection === index ? 'bg-pink-500' : 'bg-gray-300'}`}
                        onClick={() => setActiveSection(index)}
                    />
                ))}
            </div>

            {/* Botón flotante de WhatsApp */}
            <a
                href="https://wa.me/5491123456789?text=Hola,%20quiero%20obtener%20más%20información"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center group"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8"
                />
                
            </a>
        </div>
    );
};

export default Home;