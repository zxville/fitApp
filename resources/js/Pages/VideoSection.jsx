import React, { useState, useRef } from 'react';
import homeVideo from '../../../public/images/video-casa-2.mp4';
import gymVideo from '../../../public/images/video-gimnasio-1.mp4';
import loadingImage from '../../../public/images/entrenamiento-casa-1.jpg'; // Imagen de carga

const TrainingVideo = ({ videoSrc, title, description, videoRef, onClick }) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
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
            onClick={onClick}
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
            {!isVideoLoaded && (
                <img
                    src={loadingImage}
                    alt="Cargando..."
                    className="w-full h-full object-cover"
                />
            )}
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                onLoadedData={() => setIsVideoLoaded(true)}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <source src={videoSrc} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
            </video>
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-pink-500 transition-all duration-500 rounded-lg"></div>
        </div>
    );
};

const VideoSection = ({ setActiveSection }) => {
    const [selectedTraining, setSelectedTraining] = useState(null);
    const homeVideoRef = useRef(null);
    const gymVideoRef = useRef(null);

    const handleVideoClick = (trainingType) => {
        setSelectedTraining(trainingType);
        setActiveSection(1);
    };

    const closeModal = () => {
        setSelectedTraining(null);
    };

    return (
        <section className="w-full flex flex-col justify-center items-center bg-gradient-to-b absolute top-0 pt-0">
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

            <div className="w-full max-w-6xl mt-5 px-5 animate-fade-in-up flex flex-col items-center space-y-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center transition-transform duration-500 ease-in-out transform">
                    <span className='relative inline-block animate-bounce-once hover:animate-wiggle'>Elegí el plan que mejor se adapte a tu objetivo</span>
                </h2>
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-8 w-full">
                    <TrainingVideo
                        videoSrc={homeVideo}
                        title="Modalidad Hogar"
                        description="Vas a poder entrenar en casa con una rutina de ejercicios para 4 días a la semana. Incluye videos y descripciones detalladas de cómo realizar cada ejercicio, con o sin elementos."
                        videoRef={homeVideoRef}
                        onClick={() => handleVideoClick('casa')}
                    />
                    <TrainingVideo
                        videoSrc={gymVideo}
                        title="Modalidad Gym"
                        description="Ideal para arrancar tu entrenamiento en el gimnasio. Incluye una rutina para 4 días con videos y descripción de cada ejercicio para maximizar tu rendimiento."
                        videoRef={gymVideoRef}
                        onClick={() => handleVideoClick('gym')}
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
