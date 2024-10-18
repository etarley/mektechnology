import { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import {
  FaChevronDown,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Contacto = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulamos el envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("¡Mensaje enviado con éxito!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0 0 0 3px rgba(193, 50, 54, 0.3)" },
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const faqItems = [
    {
      question: "¿Cuál es el tiempo de respuesta típico?",
      answer:
        "Normalmente respondemos a todas las consultas dentro de 24-48 horas hábiles.",
    },
    {
      question: "¿Ofrecen servicios de mantenimiento para las aplicaciones?",
      answer:
        "Sí, ofrecemos servicios de mantenimiento y soporte continuo para todas nuestras aplicaciones.",
    },
    {
      question: "¿Pueden desarrollar aplicaciones personalizadas?",
      answer:
        "Absolutamente. Nos especializamos en el desarrollo de aplicaciones móviles personalizadas adaptadas a las necesidades específicas de cada cliente.",
    },
  ];

  return (
    <section
      id="contacto"
      ref={ref}
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
    >
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        <motion.h2
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
            }`}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, staggerChildren: 0.1 }}
          >
            {Array.from("Contáctanos").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </motion.h2>

        <motion.p
          className={`text-lg sm:text-xl lg:text-2xl mb-12 text-center max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          ¿Tienes preguntas sobre nuestras aplicaciones o servicios? ¡Estamos
          aquí para ayudarte!
        </motion.p>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className={`rounded-lg shadow-xl p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
            >
              <motion.div className="mb-6" variants={inputVariants}>
                <label htmlFor="nombre" className="block font-bold mb-2">
                  Nombre
                </label>
                <motion.input
                  type="text"
                  id="nombre"
                  {...register("nombre", { required: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.nombre ? "border-red-500" : "border-gray-300"
                    } ${isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-800"
                    }`}
                  whileFocus="focus"
                  aria-invalid={errors.nombre ? "true" : "false"}
                />
                {errors.nombre && (
                  <span className="text-red-500 text-sm">
                    Este campo es requerido
                  </span>
                )}
              </motion.div>

              <motion.div className="mb-6" variants={inputVariants}>
                <label htmlFor="email" className="block font-bold mb-2">
                  Correo electrónico
                </label>
                <motion.input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                    } ${isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-800"
                    }`}
                  whileFocus="focus"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Por favor, ingresa un correo electrónico válido
                  </span>
                )}
              </motion.div>

              <motion.div className="mb-6" variants={inputVariants}>
                <label htmlFor="mensaje" className="block font-bold mb-2">
                  Mensaje
                </label>
                <motion.textarea
                  id="mensaje"
                  {...register("mensaje", { required: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.mensaje ? "border-red-500" : "border-gray-300"
                    } ${isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-800"
                    }`}
                  rows="4"
                  whileFocus="focus"
                  aria-invalid={errors.mensaje ? "true" : "false"}
                >
                </motion.textarea>
                {errors.mensaje && (
                  <span className="text-red-500 text-sm">
                    Este campo es requerido
                  </span>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${isDarkMode
                    ? "bg-[#ff4d4d] hover:bg-red-600"
                    : "bg-[#c13236] hover:bg-red-700"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Enviando...
                    </motion.span>
                  )
                  : (
                    "Enviar mensaje"
                  )}
              </motion.button>
            </motion.form>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <motion.div
              className={`rounded-lg shadow-xl p-8 h-full ${isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 50 },
              }}
            >
              <h3
                className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                  }`}
              >
                Información de contacto
              </h3>
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ x: 10 }}
              >
                <FaEnvelope
                  className={`mr-4 text-2xl ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                    }`}
                />
                <span>contacto@mektechnologies.com</span>
                <motion.button
                  onClick={() =>
                    copyToClipboard("contacto@mektechnologies.com")}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCopy />
                </motion.button>
              </motion.div>
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ x: 10 }}
              >
                <FaPhone
                  className={`mr-4 text-2xl ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                    }`}
                />
                <span>
                  +1 (829) 770-1598
                </span>
                <motion.button
                  onClick={() => copyToClipboard("+1 (829) 770-1598")}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCopy />
                </motion.button>
              </motion.div>
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ x: 10 }}
              >
                <FaGithub
                  className={`mr-4 text-2xl ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                    }`}
                />
                <a
                  href="https://github.com/MekTechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                    } transition-colors`}
                >
                  github.com/MekTechnologies
                </a>
              </motion.div>
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ x: 10 }}
              >
                <FaLinkedin
                  className={`mr-4 text-2xl ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                    }`}
                />
                <a
                  href="https://www.linkedin.com/company/mektechnologies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
                    } transition-colors`}
                >
                  linkedin.com/company/mektechnologies
                </a>
              </motion.div>
              <motion.p
                className={`mt-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                En Mek Technologies, estamos comprometidos con la innovación y
                la excelencia en el desarrollo de aplicaciones móviles. No dudes
                en contactarnos para cualquier consulta o colaboración.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3
            className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? "text-[#ff4d4d]" : "text-[#c13236]"
              }`}
          >
            Preguntas frecuentes
          </h3>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className={`mb-4 rounded-lg overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <motion.button
                className={`w-full text-left p-4 font-bold flex justify-between items-center ${isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)}
              >
                {item.question}
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${expandedFaq === index ? "rotate-180" : ""
                    }`}
                />
              </motion.button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedFaq === index ? "auto" : 0,
                  opacity: expandedFaq === index ? 1 : 0,
                }}
                className="overflow-hidden transition-all duration-300"
              >
                <div
                  className={`p-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                  {item.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contacto;
