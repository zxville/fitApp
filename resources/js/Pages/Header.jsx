import React, { useState } from 'react';
import logo from '../../../public/images/logo.png';
import theme from '../theme';

const Header = ({ activeSection, setActiveSection }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClick = (index) => {
        setActiveSection(index); // Actualiza la sección activa en Home
        setMenuOpen(false);
    };

    return (
        <>
            <header
                className="sticky top-0 w-full p-1 shadow-md z-[1000] backdrop-blur-lg transition-colors duration-300 ease-in-out"
                style={{ background: `linear-gradient(40deg, ${theme.colors.background} 50%, ${theme.colors.secondary} 100%)` }}
            >
                <div className="flex justify-between items-center max-w-[1200px] mx-auto px-5">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-20 h-auto my-1 transition-transform duration-300 ease-in-out hover:scale-110 sm:w-24 md:w-28 xl:h-20" />
                    </div>


                    {/* Botón de menú para móviles */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden flex flex-col justify-center items-center gap-1 focus:outline-none transition-transform duration-300"
                    >
                        <span
                            className={`block w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                            style={{ backgroundColor: theme.colors.textPrimary }}
                        ></span>
                        <span
                            className={`block w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                            style={{ backgroundColor: theme.colors.textPrimary }}
                        ></span>
                        <span
                            className={`block w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                            style={{ backgroundColor: theme.colors.textPrimary }}
                        ></span>
                    </button>

                    {/* Opciones de navegación para pantallas grandes */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {['Entrenamiento', 'Planes', 'Sobre Mi', 'Metodos de Pago'].map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleMenuClick(index)}
                                className="relative px-4 py-2 text-lg font-semibold transition-all duration-300 ease-in-out group"
                            >
                                <span className="bg-gradient-to-r from-pink-400 to-pink-500 text-transparent bg-clip-text">
                                    {item}
                                </span>
                                <span
                                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-pink-500 to-pink-600 transform transition-transform origin-left duration-300 ease-out ${activeSection === index ? 'scale-x-100' : 'scale-x-0'}`}
                                ></span>
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Menú de navegación desplegable para móviles */}
            <nav
                className={`fixed inset-0 lg:hidden flex flex-col items-center justify-center space-y-8 bg-opacity-90 backdrop-blur-2xl transform transition-all duration-500 ease-in-out z-50 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                style={{
                    backgroundColor: `${theme.colors.background}80`, // Color de fondo con transparencia
                }}
            >
                {['Entrenamiento', 'Planes', 'Sobre Mi', 'Metodos de Pago'].map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleMenuClick(index)}
                        className={`text-2xl font-bold tracking-wide transition-all duration-500 ease-in-out hover:text-opacity-80 hover:scale-105 ${activeSection === index ? 'underline' : ''}`}
                        style={{
                            color: theme.colors.primary,
                        }}
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </>
    );
};

export default Header;
