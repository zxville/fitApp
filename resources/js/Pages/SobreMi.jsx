import React from 'react';
import imagen from '../../../public/images/entrenamiento-casa-4.jpg'
const SobreMi = () => {
    return (
        <div className="flex flex-col items-center px-6 md:px-12 lg:px-24">
            {/* Sección principal ajustada para ocupar casi todo el ancho */}
            <div className="rounded-lg p-8 max-w-full w-full lg:max-w-6xl lg:px-0 px-4 mx-auto sm:flex sm:flex-row sm:items-start sm:space-x-10  bg-white transition-shadow duration-500 mb-10">
                {/* Sección de encabezado */}
                <div className="flex flex-col items-center sm:items-start sm:w-1/3">
                <img
                        src={imagen} // Usar la variable de la imagen importada
                        alt="Perfil"
                        className="rounded-full w-40 h-40 object-cover shadow-lg mb-6 transition-shadow duration-300 transform lg:block hidden"
                    />
                    <h1 className="text-4xl font-extrabold text-pink-600 mb-2">Lilian Vallejos</h1>
                    <h2 className="text-lg text-gray-500 italic">Instructora en Musculación & Personal Trainer</h2>
                </div>

                {/* Sección de descripción */}
                <div className="text-gray-700 text-base sm:w-2/3 mt-6 sm:mt-0">
                    <p className="mb-6 leading-relaxed">
                        ¡Hola! Soy <span className="font-semibold text-pink-500">Lilian Vallejos</span>, instructora en musculación y personal trainer. Soy de la provincia de Buenos Aires. Empecé mi camino de entrenamiento a los 18 años y me enamoré del proceso.
                    </p>
                    <p className="mb-6 leading-relaxed">
                        Mi pasión por el mundo fitness me llevó a convertirme en instructora y personal trainer. Trabajé en gimnasios de forma general y personalizada. Mis ganas de compartir mis conocimientos y motivación me llevaron a crear mi propio programa "<span className="font-semibold text-pink-500">plan Lily Vallejos</span>".
                    </p>
                    <p className="mb-6 leading-relaxed">
                        Muy pronto comencé a llegar a muchas mujeres que cambiaron sus hábitos y empezaron a transformar sus vidas completamente. Sus logros también son los míos. Mi compromiso con mi programa es el secreto de su eficacia.
                    </p>
                    <p className="leading-relaxed">
                        Creo firmemente que todas podemos conseguir ser la mejor versión de nosotras mismas, esa "<span className="font-semibold text-pink-500">mejor versión</span>" que es única en cada una.
                    </p>
                </div>
            </div>

            {/* Sección de certificaciones */}
            <div className="mt-12 w-full max-w-6xl px-4 lg:px-0 hidden lg:block">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-pink-500 pb-2 inline-block xl:hidden">Certificaciones</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-4">
                    <li>Instructora en musculación y personal trainer</li>
                    <li>Asesora nutricional</li>
                </ul>
            </div>
        </div>
    );
};

export default SobreMi;