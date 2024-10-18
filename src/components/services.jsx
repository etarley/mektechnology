import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";

const AplicacionesMek = () => {
  const [appActiva, setAppActiva] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [
    0.8,
    1,
    1,
    0.8,
  ]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const aplicaciones = [
    {
      nombre: "Ineedem",
      estado: "Disponible",
      descripcion:
        "La plataforma que te conecta con proveedores de servicios capaces de ayudarte con tus necesidades.",
      icono: "🤝",
      caracteristicas: [
        "Conexión rápida entre clientes y proveedores",
        "Plataforma colaborativa y segura",
        "Oportunidades de ingresos adicionales para proveedores",
        "Sin costos iniciales para proveedores",
        "Flexibilidad de horarios para proveedores",
      ],
      downloadUrl: "https://linktr.ee/ineedemrd",
    },

    {
      nombre: "Telocargamos",
      estado: "En desarrollo",
      descripcion:
        "Conecta camioneros con personas interesadas en trasladar distintos tipos de cargas.",
      icono: "🚚",
      caracteristicas: [
        "Conexión eficiente entre transportistas y clientes",
        "Gestión de diversos tipos de carga",
        "Sistema de seguimiento en tiempo real",
        "Calificaciones y reseñas de usuarios",
      ],
      downloadUrl: "https://linktr.ee/telocargamos",
    },
    {
      nombre: "Dr. Fácil",
      estado: "En desarrollo",
      descripcion:
        "Conecta a las personas con doctores para consultas médicas rápidas y accesibles.",
      icono: "👨‍⚕️",
      caracteristicas: [
        "Consultas médicas virtuales",
        "Reserva de citas fácil y rápida",
        "Acceso a diversos especialistas",
        "Historial médico digital",
      ],
      downloadUrl: "https://linktr.ee/drfacil",
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
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={scrollRef}
      className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative"
      id="aplicaciones"
    >
      <motion.div
        style={{ opacity, scale, y: smoothY }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#c13236] to-red-400"
        >
          Nuestras Aplicaciones Innovadoras
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl lg:text-2xl mb-12 sm:mb-16 text-center max-w-4xl mx-auto leading-relaxed text-gray-300"
        >
          En Mek Technologies, desarrollamos soluciones móviles que transforman
          la forma en que las personas acceden a servicios y se conectan con
          profesionales.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
        >
          {aplicaciones.map((app, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-br ${app.estado === "Disponible"
                  ? "from-[#c13236] to-red-700"
                  : "from-gray-800 to-gray-700"
                } rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer`}
              onClick={() => setAppActiva(index)}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-5xl mr-4">{app.icono}</span>
                <h3 className="text-2xl font-bold text-white">{app.nombre}</h3>
              </motion.div>
              <motion.p
                className="text-gray-200 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {app.descripcion}
              </motion.p>
              <motion.div
                className="mt-6 flex justify-between items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${app.estado === "Disponible"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-gray-800"
                    }`}
                >
                  {app.estado}
                </span>
                <a href={app.estado === "Disponible" ? app.downloadUrl : ""}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white text-[#c13236] rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300"
                  >
                    {app.estado === "Disponible" ? "Descargar" : "Más Info"}
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16 sm:mt-20 text-center"
        >
          <motion.a
            href="https://linktr.ee/ineedemrd"
            className="inline-block bg-gradient-to-r from-[#c13236] to-red-500 text-white py-4 px-10 sm:px-12 rounded-full text-lg sm:text-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c13236]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgb(193, 50, 54)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Descarga Ineedem Ahora
          </motion.a>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {appActiva !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setAppActiva(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-bold mb-4 text-[#c13236]">
                {aplicaciones[appActiva].nombre}
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                {aplicaciones[appActiva].descripcion}
              </p>
              <div className="text-6xl mb-6">
                {aplicaciones[appActiva].icono}
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">
                Características principales:
              </h4>
              <ul className="list-disc list-inside text-gray-300 mb-6">
                {aplicaciones[appActiva].caracteristicas.map((
                  caracteristica,
                  index,
                ) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {caracteristica}
                  </motion.li>
                ))}
              </ul>
              <div className="flex justify-between">
                <motion.button
                  className="bg-[#c13236] text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => setAppActiva(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cerrar
                </motion.button>
                {aplicaciones[appActiva].estado === "Disponible" && (
                  <motion.a
                    href="https://linktr.ee/ineedemrd"
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAppActiva(null);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Descargar Ahora
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AplicacionesMek;
