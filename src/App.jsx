import { useEffect, useState } from "react";
import "./index.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaShieldAlt } from "react-icons/fa";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordTable from "./components/PasswordTable";
import SearchBar from "./components/SearchBar";
import { generatePassword } from "./utils/generatePassword";
function App() {
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const [length, setLength] = useState(12);

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [passwords, setPasswords] = useState(() => {
  const savedPasswords =
    localStorage.getItem("passwords");

  return savedPasswords
    ? JSON.parse(savedPasswords)
    : [];
});

useEffect(() => {
  localStorage.setItem(
    "passwords",
    JSON.stringify(passwords)
  );
}, [passwords]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);

  // ==========================
  // Load LocalStorage
  // ==========================

  useEffect(() => {
    const savedData =
      localStorage.getItem("passwords");

    if (savedData) {
      try {
        setPasswords(JSON.parse(savedData));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  // ==========================
  // Save LocalStorage
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwords)
    );
  }, [passwords]);

  // ==========================
  // Generate Password
  // ==========================

  const handleGenerate = () => {
    if (
      !uppercase &&
      !lowercase &&
      !numbers &&
      !symbols
    ) {
      toast.error(
        "Select at least one option"
      );
      return;
    }

    const generated = generatePassword(
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    );

    setPassword(generated);

    toast.success(
      "Password Generated Successfully"
    );
  };

  // ==========================
  // Save Password
  // ==========================

  const handleSave = () => {
    if (!description.trim()) {
      toast.error(
        "Please enter description"
      );
      return;
    }

    if (!password) {
      toast.error(
        "Generate a password first"
      );
      return;
    }

    const newPassword = {
      id: Date.now(),
      description,
      password,
      show: false,
    };

    setPasswords((prev) => [
      newPassword,
      ...prev,
    ]);

    setDescription("");
    setPassword("");

    toast.success(
      "Password Saved Successfully"
    );
  };

  // ==========================
  // Show / Hide Password
  // ==========================

  const toggleShow = (id) => {
    setPasswords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              show: !item.show,
            }
          : item
      )
    );
  };

  // ==========================
  // Copy Password
  // ==========================

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password);

    toast.success("Password Copied");
  };


  // Delete Password
const deletePassword = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const confirmDelete = () => {
  const updatedPasswords = passwords.filter(
    (item) => item.id !== deleteId
  );

  setPasswords(updatedPasswords);

  localStorage.setItem(
    "passwords",
    JSON.stringify(updatedPasswords)
  );

  toast.success("Password Deleted");

  setDeleteId(null);
  setShowDeleteModal(false);
};

  // ==========================
  // Edit Password Description
  // ==========================

  const startEditing = (
    id,
    currentDescription
  ) => {
    setEditingId(id);
    setEditText(currentDescription);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      toast.error(
        "Description cannot be empty"
      );
      return;
    }

    setPasswords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              description:
                editText,
            }
          : item
      )
    );

    setEditingId(null);
    setEditText("");

    toast.success(
      "Description Updated"
    );
  };

  // ==========================
  // Search Filter
  // ==========================

  const filteredPasswords =
    passwords.filter((item) =>
      item.description
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
 <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-center mb-12"
        >
        <h1 className="flex justify-center items-center gap-3 text-4xl md:text-6xl font-bold">
            <FaShieldAlt className="text-blue-500" />
            Password Manager
          </h1>

         <p className="text-slate-400 mt-2 text-sm md:text-base">
            Generate, save and manage
            strong passwords securely.
          </p>
        </motion.div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
    <h3 className="text-slate-400 text-sm">
      Total Passwords
    </h3>

    <p className="text-3xl font-bold mt-2">
      {passwords.length}
    </p>
  </div>

  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
    <h3 className="text-slate-400 text-sm">
      Generated
    </h3>

    <p className="text-3xl font-bold text-green-400 mt-2">
      {passwords.length}
    </p>
  </div>

  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
    <h3 className="text-slate-400 text-sm">
      Security
    </h3>

    <p className="text-3xl font-bold text-blue-400 mt-2">
      Strong
    </p>
  </div>
</div>
        {/* Generator */}

        <PasswordGenerator
          description={description}
          setDescription={
            setDescription
          }
          password={password}
          generate={handleGenerate}
          save={handleSave}
          length={length}
          setLength={setLength}
          uppercase={uppercase}
          setUppercase={
            setUppercase
          }
          lowercase={lowercase}
          setLowercase={
            setLowercase
          }
          numbers={numbers}
          setNumbers={setNumbers}
          symbols={symbols}
          setSymbols={setSymbols}
        />

        {/* Search */}

        <div className="mt-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Password Table */}

        <PasswordTable
          passwords={
            filteredPasswords
          }
          toggleShow={toggleShow}
          deletePassword={
            deletePassword
          }
          copyPassword={
            copyPassword
          }
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEditing={
            startEditing
          }
          saveEdit={saveEdit}
        />
      </div>
      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-[90%] max-w-md"
    >
      <h2 className="text-xl font-bold mb-3">
        Delete Password
      </h2>

      <p className="text-slate-400 mb-6">
        Are you sure you want to delete this password?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
}

export default App;