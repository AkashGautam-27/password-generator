import { motion } from "framer-motion";
import { passwordStrength } from "../utils/passwordStrength";
import "../index.css";
const StrengthMeter = ({ password }) => {
  if (!password) return null;

  const strength = passwordStrength(password);

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span className="font-medium">
          Password Strength
        </span>

        <span>
          {strength.text}
        </span>
      </div>

      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: strength.width }}
          transition={{ duration: 0.4 }}
          className={`h-full ${strength.color}`}
        />
      </div>
    </div>
  );
};

export default StrengthMeter;