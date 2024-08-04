import { motion } from "framer-motion";

const CheckmarkAnimation = () => (
  <>
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width="52"
      height="52"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="success-svg"
    >
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="#4caf50"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        fill="none"
        stroke="#4caf50"
        strokeWidth="4"
        d="M14 27 L22 34 L38 16"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
    </motion.svg>
    <div>
      <h2>Pomyślnie zalogowano</h2>
    </div>
  </>
);

export default CheckmarkAnimation;
