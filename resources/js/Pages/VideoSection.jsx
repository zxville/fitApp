import React, { useState } from 'react';
import homeVideo from '../../../public/images/video.mp4';  // Video para entrenamiento en casa
import gymVideo from '../../../public/images/video-2.mp4';   // Video para entrenamiento en gimnasio
import Modal from '@/Components/Modal';  // Usar el componente Modal que ya tienes

const VideoSection = () => {
    const [selectedTraining, setSelectedTraining] = useState(null);

    const handleVideoClick = (trainingType) => {
        setSelectedTraining(trainingType);
    };

    const closeModal = () => {
        setSelectedTraining(null);
    };

    return (
        <section className="w-full flex flex-col justify-center items-center bg-gray-100 pb-32">
            {/* Frase motivacional */}
            <div className="mt-2 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-pink-500 uppercase tracking-tight">
                    Bienvenido a tu transformación fitness
                </h1>
                <p className="mt-4 text-lg md:text-xl italic text-gray-700">
                    "La fuerza no viene de la capacidad corporal, sino de la voluntad inquebrantable."
                </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl mt-10 px-5 space-y-5 lg:space-y-0 lg:space-x-5">
                {/* Video de entrenamiento en casa */}
                <div 
                    className="relative w-full lg:w-1/2 h-60 md:h-80 lg:h-[60vh] rounded-lg overflow-hidden shadow-xl group cursor-pointer" 
                    onClick={() => handleVideoClick('casa')}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                    >
                        <source src={homeVideo} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 group-hover:bg-opacity-30 transition-all duration-500 ease-in-out">
                        <h2 className="text-white text-2xl md:text-3xl font-semibold transition-transform duration-500 group-hover:scale-110">
                            Entrenamiento en Casa
                        </h2>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500 transition-all duration-500 rounded-lg"></div>
                </div>

                {/* Video de entrenamiento en gimnasio */}
                <div 
                    className="relative w-full lg:w-1/2 h-60 md:h-80 lg:h-[60vh] rounded-lg overflow-hidden shadow-xl group cursor-pointer" 
                    onClick={() => handleVideoClick('gimnasio')}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                    >
                        <source src={gymVideo} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 group-hover:bg-opacity-30 transition-all duration-500 ease-in-out">
                        <h2 className="text-white text-2xl md:text-3xl font-semibold transition-transform duration-500 group-hover:scale-110">
                            Entrenamiento en Gimnasio
                        </h2>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500 transition-all duration-500 rounded-lg"></div>
                </div>
            </div>

            {/* Modal */}
            {selectedTraining && (
                <Modal show={!!selectedTraining} onClose={closeModal} maxWidth="md">
                    <div className="p-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            {selectedTraining === 'casa' ? 'Entrenamiento en Casa' : 'Entrenamiento en Gimnasio'}
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            {selectedTraining === 'casa'
                                ? 'El entrenamiento en casa está diseñado para maximizar tu rendimiento utilizando el espacio disponible y recursos mínimos. Perfecto para aquellos con un estilo de vida ocupado.'
                                : 'El entrenamiento en gimnasio está optimizado para aprovechar el equipamiento avanzado. Ideal para aquellos que desean aumentar su fuerza y resistencia.'}
                        </p>
                        <p className="text-md text-gray-600">
                            {selectedTraining === 'casa'
                                ? 'Con planes adaptados a tu nivel de experiencia, el entrenamiento en casa te permitirá mantenerte en forma y saludable desde la comodidad de tu hogar.'
                                : 'Los entrenamientos en gimnasio están diseñados para llevar tu fuerza y resistencia al siguiente nivel, utilizando técnicas avanzadas con el mejor equipamiento.'}
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-6 px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
                        >
                            Cerrar
                        </button>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default VideoSection;
