import React from 'react';

const SobreMi = () => {
    return (
        <div className="min-h-screen flex flex-col items-center w-full">
            {/* Sección principal ajustada para ocupar todo el ancho */}
            <div className="rounded-lg shadow-lg p-8 max-w-full w-full px-24 mx-auto"> {/* Ajustado a max-w-full y max-w-6xl */}
                {/* Sección de encabezado */}
                <div className="flex flex-col items-center mb-10">
                    <img
                        src="https://via.placeholder.com/150" // Reemplazar con la imagen del perfil
                        alt="Perfil"
                        className="rounded-full w-36 h-36 object-cover shadow-lg mb-4"
                    />
                    <h1 className="text-4xl font-bold text-pink-500 mb-2">Nombre de la Profesional</h1>
                    <h2 className="text-xl text-gray-700">Entrenadora Personal & Nutricionista</h2>
                </div>

                {/* Sección de descripción */}
                <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                    <p>
                        ¡Hola! Soy <strong>Nombre de la Profesional</strong>, una apasionada del bienestar físico y la nutrición.
                        Mi misión es ayudar a las personas a transformar sus vidas mediante el equilibrio entre
                        entrenamiento y alimentación saludable. Con más de <strong>[X] años de experiencia</strong>, he trabajado
                        con cientos de personas para ayudarlas a alcanzar sus objetivos de salud.
                    </p>

                    {/* <p>
                        He desarrollado planes de entrenamiento adaptados a diferentes niveles de experiencia y estilos de vida,
                        siempre asegurándome de que cada uno de mis clientes sienta apoyo en su camino hacia una mejor versión de
                        sí mismos. Además, como <strong>nutricionista certificada</strong>, diseño planes alimenticios personalizados
                        para cada cliente, asegurándome de que obtengan la nutrición adecuada para complementar su entrenamiento.
                    </p> */}

                    <p>
                        En este espacio, comparto mis conocimientos y mis programas para ayudarte a mejorar tu salud, fuerza
                        y energía. ¡Juntos podemos lograr tus metas!
                    </p>
                </div>

                {/* Sección de certificaciones */}
                 <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Certificaciones</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Licenciatura en Nutrición</li>
                        <li>Certificación en Entrenamiento Personal</li>
                        <li>Certificación en Nutrición Deportiva</li>
                        <li>Curso de Psicología del Deporte</li>
                    </ul>
                </div> 

                {/* Testimonios */}
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Testimonios</h3>
                    <div className="space-y-4">
                        <blockquote className="border-l-4 border-pink-500 pl-4 text-gray-700">
                            "Trabajar con [Nombre] ha sido un cambio de vida. Me ha enseñado cómo cuidar mi cuerpo y mantener
                            un balance saludable entre ejercicio y alimentación." — <strong>Cliente 1</strong>
                        </blockquote>
                        <blockquote className="border-l-4 border-pink-500 pl-4 text-gray-700">
                            "Los planes de nutrición y entrenamiento de [Nombre] son increíblemente efectivos y fáciles de seguir.
                            Me siento más fuerte y saludable que nunca." — <strong>Cliente 2</strong>
                        </blockquote>
                    </div>
                </div>
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
                <span className="ml-2 font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
                    Contáctanos
                </span>
            </a>
        </div>
    );
};

export default SobreMi;
