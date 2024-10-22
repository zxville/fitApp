import React, { useState, useRef } from 'react';
import homeVideo from '../../../public/images/video.mp4';
import gymVideo from '../../../public/images/video-2.mp4';
import Modal from '@/Components/Modal';

// Componente para representar cada video de entrenamiento con un diseño original
const TrainingVideo = ({ videoSrc, title, description, videoRef }) => (
    <div
        className="relative w-full lg:w-1/2 h-[20vh] md:h-[40vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-2xl group cursor-pointer transition-transform duration-500 ease-out hover:scale-105 hover:shadow-3xl"
        onMouseEnter={() => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        }}
        onMouseLeave={() => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }}
    >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-black to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide mb-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-lg text-center italic underline decoration-pink-500">
                {title}
            </h2>
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
            <p className="text-white text-sm md:text-lg lg:text-xl leading-relaxed transition-opacity duration-700 ease-in-out text-center font-light">
                {description}
            </p>
        </div>
        <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
        >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
        </video>
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-pink-500 transition-all duration-500 rounded-lg"></div>
    </div>
);

const VideoSection = () => {
    const [selectedTraining, setSelectedTraining] = useState(null);
    const homeVideoRef = useRef(null);
    const gymVideoRef = useRef(null);

    const handleVideoClick = (trainingType) => {
        setSelectedTraining(trainingType);
    };

    const closeModal = () => {
        setSelectedTraining(null);
    };

    return (
        <section className="w-full flex flex-col justify-center items-center bg-gradient-to-b pb-32">
            {/* Frase motivacional */}
            <div className="mt-10 text-center px-5">
                <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight bg-gradient-to-r from-pink-500 via-red-500 to-red-600 text-transparent bg-clip-text animate-fade-in-down">
                    Bienvenido a tu transformación física y mental
                </h1>
                <p className="mt-3 text-lg md:text-xl italic text-gray-700 relative">
                    <span className="before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:to-red-500 before:opacity-20 before:rounded-lg before:blur-md"></span>
                    <span className="relative z-10">
                        Somos el reflejo de nuestros hábitos diarios.
                        <br />
                        Empezá hoy mismo tu camino al cambio que querés.
                    </span>
                </p>
            </div>

            {/* Bloque unificado para elegir el plan y mostrar los videos */}
            <div className="w-full max-w-6xl mt-5 px-5 animate-fade-in-up flex flex-col items-center space-y-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center transition-transform duration-500 ease-in-out transform">
                    <span className='relative inline-block animate-bounce-once hover:animate-wiggle'>Elegí el plan que mejor se adapte a tu objetivo</span>
                </h2>
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-8 w-full">
                    {/* Video de entrenamiento en casa */}
                    <TrainingVideo
                        videoSrc={homeVideo}
                        title="Modalidad Hogar"
                        description="Vas a poder entrenar en casa con una rutina de ejercicios para 4 días a la semana. Incluye videos y descripciones detalladas de cómo realizar cada ejercicio, con o sin elementos."
                        videoRef={homeVideoRef}
                    />

                    {/* Video de entrenamiento en gimnasio */}
                    <TrainingVideo
                        videoSrc={gymVideo}
                        title="Modalidad Gym"
                        description="Ideal para arrancar tu entrenamiento en el gimnasio. Incluye una rutina para 4 días con videos y descripción de cada ejercicio para maximizar tu rendimiento."
                        videoRef={gymVideoRef}
                    />
                </div>
            </div>

            {/* Modal */}
            {selectedTraining && (
                <Modal show={!!selectedTraining} onClose={closeModal} maxWidth="md">
                    <div className="p-8 text-center animate-fade-in-down">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            {selectedTraining === 'casa' ? 'Entrenamiento en Casa' : 'Entrenamiento en Gimnasio'}
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            {selectedTraining === 'casa'
                                ? 'El entrenamiento en casa está diseñado para maximizar tu rendimiento utilizando el espacio disponible y recursos mínimos. Perfecto para aquellos con un estilo de vida ocupado.'
                                : 'El entrenamiento en gimnasio está optimizado para aprovechar el equipamiento avanzado. Ideal para aquellos que desean aumentar su fuerza y resistencia.'}
                        </p>
                        <p className="text-md text-gray-600 mb-8">
                            {selectedTraining === 'casa'
                                ? 'Con planes adaptados a tu nivel de experiencia, el entrenamiento en casa te permitirá mantenerte en forma y saludable desde la comodidad de tu hogar.'
                                : 'Los entrenamientos en gimnasio están diseñados para llevar tu fuerza y resistencia al siguiente nivel, utilizando técnicas avanzadas con el mejor equipamiento.'}
                        </p>
                        <button
                            onClick={closeModal}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:from-pink-600 hover:to-red-600 transition-all duration-300"
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