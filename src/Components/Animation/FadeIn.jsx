import { motion } from "framer-motion";

const FadeIn = ({ children, duration = 0.8, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
