import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useScroll,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tilt } from "react-tilt";

const NuestroProceso = () => {
  const [pasoActivo, setPasoActivo] = useState(0);
  const [pasoSeleccionado, setPasoSeleccionado] = useState(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [
    0.2,
    1,
    1,
    0.2,
  ]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const pasos = [
    {
      titulo: "Visión Innovadora",
      descripcion:
        "Transformamos ideas disruptivas en conceptos revolucionarios que redefinen la interacción digital.",
      icono: "💡",
      detalles: [
        "Análisis profundo del mercado y tendencias emergentes",
        "Identificación de oportunidades de innovación",
        "Desarrollo de conceptos disruptivos",
        "Validación de ideas con usuarios potenciales",
        "Definición de objetivos estratégicos",
        "Evaluación de viabilidad técnica",
      ],
    },
    {
      titulo: "Diseño Vanguardista",
      descripcion:
        "Creamos interfaces que no solo impresionan, sino que establecen nuevos estándares en experiencia de usuario.",
      icono: "🎨",
      detalles: [
        "Creación de wireframes y prototipos interactivos",
        "Diseño de interfaces intuitivas y atractivas",
        "Implementación de principios de UX/UI modernos",
        "Optimización para diferentes dispositivos",
        "Desarrollo de sistemas de diseño escalables",
        "Pruebas de usabilidad iterativas",
      ],
    },
    {
      titulo: "Desarrollo Pionero",
      descripcion:
        "Construimos aplicaciones robustas y escalables que desafían los límites de la tecnología móvil.",
      icono: "⚙️",
      detalles: [
        "Arquitectura de software modular y escalable",
        "Implementación de tecnologías de vanguardia",
        "Desarrollo de funcionalidades innovadoras",
        "Integración de APIs y servicios avanzados",
        "Optimización de rendimiento y seguridad",
        "Pruebas automatizadas exhaustivas",
      ],
    },
    {
      titulo: "Optimización Exhaustiva",
      descripcion:
        "Refinamos cada detalle para garantizar un rendimiento excepcional y una experiencia de usuario impecable.",
      icono: "🚀",
      detalles: [
        "Análisis de métricas de rendimiento",
        "Optimización de tiempos de carga y respuesta",
        "Depuración y refinamiento del código",
        "Pruebas de estrés y escalabilidad",
        "Optimización de recursos y almacenamiento",
        "Mejora continua basada en feedback",
      ],
    },
    {
      titulo: "Lanzamiento Estratégico",
      descripcion:
        "Desplegamos con precisión, monitoreando cada aspecto para asegurar un impacto revolucionario en el mercado.",
      icono: "🌟",
      detalles: [
        "Planificación detallada del lanzamiento",
        "Implementación de estrategias de marketing digital",
        "Monitoreo en tiempo real del desempeño",
        "Soporte técnico especializado 24/7",
        "Análisis de métricas post-lanzamiento",
        "Iteración basada en feedback de usuarios",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
      id="proceso"
      ref={ref}
      className="py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden relative"
    >
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay"
      >
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-br from-[#c13236] to-gray-900 opacity-20"
      >
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-center text-white leading-tight"
        >
          Nuestro Proceso<br />de{" "}
          <span className="text-[#c13236]">Innovación</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-center mb-16 text-gray-300 max-w-4xl mx-auto leading-relaxed"
        >
          En Mek Technology, fusionamos visión creativa y excelencia técnica
          para forjar el futuro de las aplicaciones móviles.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="relative flex flex-col items-center"
        >
          {pasos.map((paso, index) => (
            <Tilt
              key={index}
              className="Tilt w-full max-w-4xl mb-12"
              options={{
                max: 25,
                scale: 1.05,
                speed: 300,
              }}
            >
              <motion.div
                variants={itemVariants}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
                onViewportEnter={() => setPasoActivo(index)}
              >
                <motion.div
                  className={`flex items-center p-6 cursor-pointer ${pasoActivo === index ? "bg-[#c13236] bg-opacity-10" : ""
                    }`}
                  onClick={() =>
                    setPasoSeleccionado(
                      pasoSeleccionado === index ? null : index,
                    )}
                  whileHover={{ backgroundColor: "rgba(193, 50, 54, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#c13236] flex items-center justify-center text-3xl shadow-lg mr-6">
                    {paso.icono}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {paso.titulo}
                    </h3>
                    <p className="text-gray-300 text-lg">{paso.descripcion}</p>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {pasoSeleccionado === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <h4 className="text-xl font-semibold mb-4 text-[#c13236]">
                        Detalles del Proceso:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paso.detalles.map((detalle, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-300"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#c13236] mr-3">
                            </span>
                            {detalle}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.a
            href="#contacto"
            className="inline-block bg-[#c13236] text-white py-4 px-12 rounded-full text-xl font-bold hover:bg-[#a02a2e] transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#c13236] focus:ring-opacity-50"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(193, 50, 54, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Inicia Tu Revolución Digital
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NuestroProceso;
