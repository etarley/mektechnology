import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AnimatedLogo from "./animatedLogo";

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

      {/* Partículas flotantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-50"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: {
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="relative z-10 text-white text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Logo animado */}
          <AnimatedLogo />

          <motion.h1
            className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
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
          </motion.div>
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
