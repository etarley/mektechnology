import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
} from "framer-motion";
import {
  FaChevronUp,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import AnimatedLogo from "./animatedLogo";

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const footerControls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const cursorRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (inView) {
      footerControls.start("visible");
    } else {
      footerControls.start("hidden");
    }
  }, [footerControls, inView]);

  const socialLinks = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/mektechnology",
      color: "#E1306C",
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@mektechnology.com");
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerVariants = {
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

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.footer
      ref={ref}
      className="bg-gray-900 text-white py-16 relative overflow-hidden"
      initial="hidden"
      animate={footerControls}
      variants={footerVariants}
    >
      <motion.div
        ref={cursorRef}
        className="w-8 h-8 bg-[#c13236] rounded-full fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={childVariants} className="space-y-6">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", ...springConfig }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <AnimatedLogo className="w-12 h-12" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#c13236] to-[#ff6b6b]">
                Mek Technology
              </h3>
            </motion.div>
            <motion.p
              className="text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Impulsando la innovación en el desarrollo de aplicaciones móviles.
              Transformamos ideas en experiencias digitales excepcionales.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              variants={childVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5, color: social.color }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredIcon(index)}
                  onHoverEnd={() => setHoveredIcon(null)}
                >
                  <social.icon size={24} />
                  <AnimatePresence>
                    {hoveredIcon === index && (
                      <motion.span
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#c13236] text-white px-2 py-1 rounded text-xs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        {social.icon.name.replace("Fa", "")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={childVariants} className="space-y-6">
            <motion.h4
              className="text-xl font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", ...springConfig }}
            >
              Enlaces Rápidos
            </motion.h4>
            <ul className="space-y-3">
              {[
                "Inicio",
                "Nosotros",
                "Aplicaciones",
                "Proceso",
                "Contacto",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", ...springConfig }}
                >
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  >
                    <motion.span
                      className="w-2 h-2 bg-[#c13236] rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    <span>{item}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={childVariants} className="space-y-6">
            <motion.h4
              className="text-xl font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", ...springConfig }}
            >
              Contacto
            </motion.h4>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
                transition={{ type: "spring", ...springConfig }}
              >
                <FaEnvelope className="text-[#c13236]" />
                <button
                  onClick={handleCopyEmail}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contact@mektechnology.com
                </button>
                <AnimatePresence>
                  {isEmailCopied && (
                    <motion.span
                      className="text-green-500 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      ¡Copiado!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
                transition={{ type: "spring", ...springConfig }}
              >
                <FaPhoneAlt className="text-[#c13236]" />
                <span className="text-gray-400">
                  +1 (829) 770-1598 (Lunes a Viernes)
                </span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3"
                transition={{ type: "spring", ...springConfig }}
              >
                <FaMapMarkerAlt className="text-[#c13236]" />
                <span className="text-gray-400">
                  Santiago de los Caballeros, República Dominicana
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.hr
          className="my-12 border-gray-800"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.div
          variants={childVariants}
          className="flex flex-col md:flex-row justify-center items-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{" "}
            Mek Technology. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 -mb-48 -mr-48 rounded-full bg-gradient-to-br from-[#c13236] to-[#ff6b6b] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          filter: "blur(60px)",
        }}
      />

      <motion.svg
        className="absolute top-0 left-0 w-full h-20"
        preserveAspectRatio="none"
        viewBox="0 0 1440 120"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.path
          d="M0,0 C480,120 960,120 1440,0 L1440 120 L0 120 Z"
          fill="#111827"
          initial={{ d: "M0,0 C480,120 960,120 1440,0 L1440 120 L0 120 Z" }}
          animate={{
            d: [
              "M0,0 C480,120 960,120 1440,0 L1440 120 L0 120 Z",
              "M0,0 C480,80 960,160 1440,0 L1440 120 L0 120 Z",
              "M0,0 C480,120 960,120 1440,0 L1440 120 L0 120 Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      <motion.button
        className="fixed bottom-8 right-8 bg-[#c13236] text-white p-3 rounded-full shadow-lg"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <FaChevronUp />
      </motion.button>

      <motion.div
        className="custom-cursor"
        style={{
          left: cursorX,
          top: cursorY,
          pointerEvents: "none",
          position: "fixed",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
        animate={{
          scale: hoveredIcon !== null ? 1.5 : 1,
        }}
      >
        <div className="cursor-dot" />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
