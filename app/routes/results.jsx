import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "Password Results - Passify" },
    { name: "description", content: "Generated passwords based on your input." },
  ];
}

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }

    const { category, inputValue, length, count } = state;
    let generated = [];

    for (let i = 0; i < count; i++) {
      if (category === "mnemonic") {
        generated.push(generateFromMnemonic(inputValue, length));
      } else if (category === "pattern") {
        generated.push(generateFromPattern(inputValue, length));
      }
    }

    setPasswords(generated);
  }, [state, navigate]);

  // 🔐 Generate from Mnemonic sentence
  function generateFromMnemonic(sentence, length = 12) {
    const words = sentence.trim().split(" ");
    let base = words.map((w) => w[0].toUpperCase()).join("");
    base = base.replace(/[AEIOU]/g, () => Math.floor(Math.random() * 10)); // optional random digit
    const symbols = ["!", "@", "#", "$"];
    const suffix = symbols[Math.floor(Math.random() * symbols.length)];
    return (base + suffix).slice(0, length);
  }

  // 🔐 Generate from Pattern input
  function generateFromPattern({ food = "", year = "", symbol = "", petInitial = "" }, length = 12) {
    let base = `${food}${year}${symbol}${(petInitial || "").toUpperCase()}`;
    return base.slice(0, length);
  }


  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">🔐 Generated Passwords</h1>
      {passwords.length > 0 ? (
        <ul className="space-y-3">
          {passwords.map((pwd, i) => (
            <li
              key={i}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-lg font-mono"
            >
              {pwd}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No passwords generated.</p>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 text-blue-600 hover:underline"
      >
        🔙 Back to Generator
      </button>
    </div>
  );
}
