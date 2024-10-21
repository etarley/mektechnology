import React, { useEffect, useState } from "react";
import { Meteors } from "./ui/meteors";
import { motion, useAnimation, useViewportScroll } from "framer-motion";

const SobreNosotros = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const controls = useAnimation();
  const { scrollY } = useViewportScroll();

  const features = [
    {
      title: "Innovación Vanguardista",
      description:
        "Transformamos conceptos audaces en realidades digitales que marcan tendencia en la industria.",
      icon: "💡",
    },
    {
      title: "Diseño Excepcional",
      description:
        "Creamos interfaces que no solo impresionan visualmente, sino que definen nuevos estándares de usabilidad.",
      icon: "🎨",
    },
    {
      title: "Ingeniería de Precisión",
      description:
        "Desarrollamos soluciones robustas y escalables que superan los límites de lo posible.",
      icon: "⚙️",
    },
    {
      title: "Colaboración Estratégica",
      description:
        "Forjamos alianzas sinérgicas con nuestros clientes para alcanzar objetivos extraordinarios.",
      icon: "🤝",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.2;
      scrollY.get() > scrollThreshold
        ? controls.start("visible")
        : controls.start("hidden");
    };

    scrollY.onChange(handleScroll);
    return () => scrollY.clearListeners();
  }, [controls, scrollY]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="nosotros"
      className=" relative py-24 md:py-32 bg-gray-100 overflow-hidden "
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100 opacity-50">
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-dot-black"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 lg:mb-12 text-center text-[#c13236]"
        >
          Nuestra Esencia Innovadora
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-12 sm:mb-16 text-center max-w-4xl mx-auto leading-relaxed"
        >
          En Mek Technology, no solo seguimos tendencias, las creamos.
          Fusionamos creatividad visionaria con tecnología de punta para forjar
          experiencias digitales que trascienden lo ordinario y definen el
          futuro.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 sm:p-8 h-full shadow-lg transition-all duration-300 group-hover:shadow-xl relative z-10 overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 30px -10px rgba(193, 50, 54, 0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="text-5xl sm:text-6xl mb-6 transform transition-all duration-300 group-hover:scale-110"
                  animate={{
                    rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#c13236] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-[#c13236]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 sm:mt-20 text-center"
        >
          <a
            href="#contacto"
            className="inline-block bg-[#c13236] text-white py-4 px-10 sm:px-12 rounded-full text-lg sm:text-xl font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c13236]"
          >
            Descubre Nuestro Universo Digital
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SobreNosotros;
