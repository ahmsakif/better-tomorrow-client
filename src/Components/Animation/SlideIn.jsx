import { motion } from "framer-motion";

/**
 * SlideIn Component
 * @param {ReactNode} children - Content to animate
 * @param {string} direction - "up", "down", "left", "right"
 * @param {number} duration - Animation duration in seconds
 * @param {number} delay - Animation delay in seconds
 */
const SlideIn = ({ children, direction = "up", duration = 0.8, delay = 0 }) => {
  const variants = {
    up: { opacity: 0, y: 40 },
    down: { opacity: 0, y: -40 },
    left: { opacity: 0, x: 40 },
    right: { opacity: 0, x: -40 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
