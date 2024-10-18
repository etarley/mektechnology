import React from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedLogo = ({ className = "" }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.2,
          type: "spring",
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay: i * 0.2, duration: 0.5 },
      },
    }),
  };

  const fillVariants = {
    hidden: { fillOpacity: 0 },
    visible: (i) => ({
      fillOpacity: 1,
      transition: { delay: i * 0.2 + 1.3, duration: 0.8, ease: "easeInOut" },
    }),
  };

  const svgVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const pathProps = (i) => ({
    variants: pathVariants,
    initial: "hidden",
    animate: controls,
    custom: i,
    stroke: "#c13236",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  });

  const fillProps = (i) => ({
    variants: fillVariants,
    initial: "hidden",
    animate: controls,
    custom: i,
    fill: "#c13236",
  });

  return (
    <motion.svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width="300"
      height="300"
      variants={svgVariants}
      initial="hidden"
      animate={controls}
      whileHover="pulse"
    >
      <motion.g variants={pulseVariants}>
        <motion.path
          d="M289.06 290.62H393.32V725.05H289.06Z"
          {...pathProps(0)}
        />
        <motion.path
          d="M289.06 290.62H393.32V725.05H289.06Z"
          {...fillProps(0)}
        />

        <motion.path
          d="M455.89 125.54H560.15V559.97H455.89Z"
          transform="translate(165.26 850.78) rotate(-90)"
          {...pathProps(1)}
        />
        <motion.path
          d="M455.89 125.54H560.15V559.97H455.89Z"
          transform="translate(165.26 850.78) rotate(-90)"
          {...fillProps(1)}
        />

        <motion.path
          d="M547.11 549.89H651.37V812.25H547.11Z"
          transform="translate(-81.82 1280.32) rotate(-90)"
          {...pathProps(2)}
        />
        <motion.path
          d="M547.11 549.89H651.37V812.25H547.11Z"
          transform="translate(-81.82 1280.32) rotate(-90)"
          {...fillProps(2)}
        />

        <motion.path
          d="M633.15 480.09H730.42V732.35H633.15Z"
          {...pathProps(3)}
        />
        <motion.path
          d="M633.15 480.09H730.42V732.35H633.15Z"
          {...fillProps(3)}
        />
      </motion.g>
    </motion.svg>
  );
};

export default AnimatedLogo;
