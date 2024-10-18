import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiCpu,
  FiHome,
  FiMail,
  FiMenu,
  FiSmartphone,
  FiUsers,
  FiX,
} from "react-icons/fi";
import AnimatedLogo from "./animatedLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const { scrollY } = useScroll();
  const springConfig = { damping: 25, stiffness: 700 };

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(18, 18, 18, 0)", "rgba(18, 18, 18, 0.95)"],
  );

  const navItems = [
    { id: "inicio", label: "Inicio", icon: FiHome },
    { id: "nosotros", label: "Nosotros", icon: FiUsers },
    { id: "aplicaciones", label: "Aplicaciones", icon: FiSmartphone },
    { id: "proceso", label: "Proceso", icon: FiCpu },
    { id: "contacto", label: "Contacto", icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed w-full z-50 transition-all duration-300 backdrop-blur-sm"
    >
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  justify-between h-20">
          <motion.div
            className="flex items-end space-x-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", ...springConfig }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <AnimatedLogo className="size-10" />
            </motion.div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#c13236] to-[#ff6b6b] ml-0">
              Mek Technologies
            </h3>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                />
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#c13236] focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-20 left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavItem = ({ item, isActive }) => (
  <motion.a
    href={`#${item.id}`}
    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-300 ${isActive
        ? "text-white bg-[#c13236] shadow-lg shadow-[#c13236]/50"
        : "text-gray-300 hover:text-white hover:bg-[#c13236] hover:bg-opacity-75"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <item.icon className="w-4 h-4" />
    <span>{item.label}</span>
  </motion.a>
);

const MobileNavItem = ({ item, isActive, onClick }) => (
  <motion.a
    href={`#${item.id}`}
    className={`block px-4 py-3 rounded-lg text-lg font-medium flex items-center space-x-3 ${isActive
        ? "text-white bg-[#c13236] shadow-lg shadow-[#c13236]/50"
        : "text-gray-300 hover:text-white hover:bg-[#c13236] hover:bg-opacity-75"
      } transition-all duration-300`}
    onClick={onClick}
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    <item.icon className="w-6 h-6" />
    <span>{item.label}</span>
  </motion.a>
);

export default Navbar;
