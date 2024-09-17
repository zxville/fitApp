import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'El nombre es requerido';
        }
        if (!formData.email.trim()) {
            errors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'El correo electrónico no es válido';
        }
        if (!formData.subject.trim()) {
            errors.subject = 'El asunto es requerido';
        }
        if (!formData.message.trim()) {
            errors.message = 'El mensaje es requerido';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitted(true);
            // Aquí puedes manejar el envío de los datos, como una solicitud a una API
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white p-10 shadow-lg rounded-lg">
                <h2 className="text-center text-3xl font-bold text-gray-900">Contáctanos</h2>
                <p className="text-center text-gray-600">
                    ¿Tienes alguna duda o pregunta? Envíanos un mensaje.
                </p>
                {isSubmitted ? (
                    <div className="text-center text-green-600">
                        ¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                placeholder="Tu nombre"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                placeholder="correo@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                Asunto
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    formErrors.subject ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                placeholder="Asunto del mensaje"
                                value={formData.subject}
                                onChange={handleInputChange}
                            />
                            {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Mensaje
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                placeholder="Escribe tu mensaje"
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                            {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Enviar Mensaje
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactPage;
