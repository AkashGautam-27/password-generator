import { motion, AnimatePresence } from "framer-motion";
import "../index.css";
import {
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaTrash,
  FaEdit,
  FaCheck,
} from "react-icons/fa";

import { passwordStrength } from "../utils/passwordStrength";

const PasswordTable = ({
  passwords,
  toggleShow,
  deletePassword,
  copyPassword,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
}) => {
  if (passwords.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 text-center text-slate-400 mt-6">
        No passwords found 🔒
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}

     <div className="hidden md:block mt-8">
  <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
    <div className="overflow-x-auto">
        <table className="w-full bg-slate-800 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Password
              </th>

              <th className="p-4 text-left">
                Strength
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {passwords.map((item) => {
                const strength =
                  passwordStrength(item.password);

                return (
                <tr
  key={item.id}
  className="border-b border-slate-700 hover:bg-slate-800/50 transition"
>
                    {/* Description */}

                    <td className="p-4">
                      {editingId === item.id ? (
                        <div className="flex gap-2">
                          <input
                            value={editText}
                            onChange={(e) =>
                              setEditText(
                                e.target.value
                              )
                            }
                            className="
                              bg-slate-700
                              px-3
                              py-2
                              rounded-lg
                              outline-none
                            "
                          />

                          <button
                            onClick={() =>
                              saveEdit(item.id)
                            }
                            className="
                              bg-green-600
                              p-2
                              rounded-lg
                            "
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        item.description
                      )}
                    </td>

                    {/* Password */}

                    <td className="p-4 font-mono">
                      {item.show
                        ? item.password
                        : "••••••••••••"}
                    </td>

                    {/* Strength */}

                    <td className="p-4">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm
                          ${
                            strength.text === "Strong"
                              ? "bg-green-500/20 text-green-400"
                              : strength.text ===
                                "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                      >
                        {strength.text}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            toggleShow(item.id)
                          }
                          className="
                            bg-slate-700
                            hover:bg-slate-600
                            p-2
                            rounded-lg
                          "
                        >
                          {item.show ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>

                        <button
                          onClick={() =>
                            copyPassword(
                              item.password
                            )
                          }
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            p-2
                            rounded-lg
                          "
                        >
                          <FaCopy />
                        </button>

                        <button
                          onClick={() =>
                            startEditing(
                              item.id,
                              item.description
                            )
                          }
                          className="
                            bg-yellow-600
                            hover:bg-yellow-700
                            p-2
                            rounded-lg
                          "
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() =>
                            deletePassword(
                              item.id
                            )
                          }
                          className="
                            bg-red-600
                            hover:bg-red-700
                            p-2
                            rounded-lg
                          "
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
    </div>
      {/* Mobile Cards */}

      <div className="block md:hidden mt-6 space-y-4">
        <AnimatePresence>
          {passwords.map((item) => {
            const strength =
              passwordStrength(item.password);

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                  bg-slate-800
                  rounded-2xl
                  p-4
                  space-y-3
                "
              >
                <h3 className="font-semibold">
                  {item.description}
                </h3>

                <p className="font-mono break-all">
                  {item.show
                    ? item.password
                    : "••••••••••••"}
                </p>

                <span
                  className={`
                    inline-block px-3 py-1 rounded-full text-sm
                    ${
                      strength.text === "Strong"
                        ? "bg-green-500/20 text-green-400"
                        : strength.text ===
                          "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  `}
                >
                  {strength.text}
                </span>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() =>
                      toggleShow(item.id)
                    }
                    className="bg-slate-700 p-2 rounded-lg"
                  >
                    {item.show ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      copyPassword(item.password)
                    }
                    className="bg-blue-600 p-2 rounded-lg"
                  >
                    <FaCopy />
                  </button>

                  <button
                    onClick={() =>
                      startEditing(
                        item.id,
                        item.description
                      )
                    }
                    className="bg-yellow-600 p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      deletePassword(item.id)
                    }
                    className="bg-red-600 p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
    </>
  );
};

export default PasswordTable;