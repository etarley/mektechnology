import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AnimatedLogo from "./animatedLogo";
import { Vortex } from "./ui/vortex";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundAnimation = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    backgroundAnimation.start({
      backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`,
    });
  }, [mousePosition, backgroundAnimation]);

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={backgroundAnimation}
        style={{
          background:
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(193, 50, 54, 0.3), transparent 25%),
                       linear-gradient(45deg, #1a1a1a, #2a2a2a)`,
          backgroundSize: "200% 200%",
        }}
        o
      />

      {/* Contenido principal */}
      <div className="relative z-1 text-white text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Vortex
            baseHue={358}
            rangeHue={0}
            rangeY={850}
            rangeSpeed={0.5}
            particleCount={100}
            className="flex flex-col items-center justify-center"
            backgroundColoor="rgba(0, 0, 0, 0.1)"
          >
            {/* Logo animado */}
            <AnimatedLogo className="size-48 sm:size-52 md:size-56 lg:size-60 xl:size-64" />

            <motion.h1
              className="text-6xl font-bold mb-2 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Mek Technologies
            </motion.h1>
            <motion.p
              className="text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Transformando ideas en experiencias digitales excepcionales
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <a href="#aplicaciones">
                <motion.button
                  className="px-8 py-4 mb-4 sm:mb-0 bg-[#c13236] text-white rounded-full text-xl font-semibold hover:bg-red-700 transition duration-300 mr-4"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 0px 8px rgb(193, 50, 54)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Descubre Nuestro Trabajo
                </motion.button>
              </a>
              <a href="#contacto">
                <motion.button
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-xl font-semibold hover:bg-white hover:text-[#c13236] transition duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contáctanos
                </motion.button>
              </a>
            </motion.div>
          </Vortex>
        </motion.div>
      </div>

      {/* Indicador de desplazamiento */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white rounded-full p-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-4 bg-white rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
