import { motion } from "framer-motion";
import "../index.css";
import {
  FaLock,
  FaSave,
  FaRandom,
  FaHeading,
} from "react-icons/fa";
import StrengthMeter from "./StrengthMeter";

const PasswordGenerator = ({
  description,
  setDescription,
  password,
  generate,
  save,
  length,
  setLength,
  uppercase,
  setUppercase,
  lowercase,
  setLowercase,
  numbers,
  setNumbers,
  symbols,
  setSymbols,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
     className="
bg-slate-800/60
backdrop-blur-xl
border border-slate-700/50
shadow-[0_0_50px_rgba(59,130,246,0.15)]
rounded-3xl
p-6 md:p-8
mt-8
"
    >
      {/* Description */}

     <label className="block mb-3 text-sm font-semibold text-slate-300">
        Description
      </label>

      <div className="relative mb-5">
       <FaHeading className="absolute left-4 top-4 text-slate-400" />

        <input
          type="text"
          placeholder="Example: Gmail, GitHub..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
         className="
w-full
bg-slate-900/60
border border-slate-700
text-white
pl-12
pr-4
py-3
rounded-xl
outline-none
focus:border-blue-500
"
        />
      </div>

      {/* Password Display */}

      <label className="block mb-2 font-medium">
        Generated Password
      </label>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={password}
            readOnly
            placeholder="Click Generate Password"
            className="w-full bg-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generate}
        className="
flex items-center justify-center gap-2
bg-blue-600 hover:bg-blue-700
min-w-42.5
px-6 py-3
rounded-xl
font-semibold
transition-all
"
        >
          <FaRandom />
          Generate
        </motion.button>
      </div>

      {/* Strength */}

      <StrengthMeter password={password} />

      {/* Length Slider */}

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span>Password Length</span>
          <span>{length}</span>
        </div>

        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) =>
            setLength(Number(e.target.value))
          }
          className="w-full cursor-pointer"
        />
      </div>

      {/* Checkboxes */}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 mt-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={() =>
              setUppercase(!uppercase)
            }
          />
          Uppercase
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() =>
              setLowercase(!lowercase)
            }
          />
          Lowercase
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={numbers}
            onChange={() =>
              setNumbers(!numbers)
            }
          />
          Numbers
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={symbols}
            onChange={() =>
              setSymbols(!symbols)
            }
          />
          Symbols
        </label>
      </div>

      {/* Save */}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={save}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
      >
        <FaSave />
        Save Password
      </motion.button>
    </motion.div>
  );
};

export default PasswordGenerator;