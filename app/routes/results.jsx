// results.jsx

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }

    const {
      category,
      inputValue,
      length,
      count,
      shuffleSegments,
      insertRandom,
      salt,
    } = state;

    const generate = [];
    for (let i = 0; i < count; i++) {
      if (category === "mnemonic") {
        generate.push(generateFromMnemonic(inputValue, length));
      } else {
        generate.push(
          generateFromPattern(inputValue, {
            length,
            shuffleSegments,
            insertRandom,
            salt,
          })
        );
      }
    }
    setPasswords(generate);
  }, [state, navigate]);

  const generateFromMnemonic = (sentence, length = 12) => {
    const words = sentence.trim().split(" ");
    let base = words.map((w) => w[0].toUpperCase()).join("");
    base = base.replace(/[AEIOU]/g, () => Math.floor(Math.random() * 10));
    const symbols = ["!", "@", "#", "$"];
    const suffix = symbols[Math.floor(Math.random() * symbols.length)];
    return (base + suffix).slice(0, length);
  };

  const generateFromPattern = (
    segments,
    { length, shuffleSegments, insertRandom, salt }
  ) => {
    let baseSegments = [...segments];

    if (shuffleSegments) {
      baseSegments = baseSegments.sort(() => 0.5 - Math.random());
    }

    let base = baseSegments.map((s) => s.value).join("");

    if (insertRandom) {
      const insertAt = Math.floor(Math.random() * base.length);
      const randomChar = String.fromCharCode(
        33 + Math.floor(Math.random() * 94)
      );
      base = base.slice(0, insertAt) + randomChar + base.slice(insertAt);
    }

    if (salt) {
      base += salt;
    }

    return base.slice(0, length);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">Generated Passwords</h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Here are your secure password combinations
        </p>
      </header>

      <ul className="space-y-2">
        {passwords.map((pwd, idx) => (
          <li
            key={idx}
            className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-center font-mono"
          >
            {pwd}
          </li>
        ))}
      </ul>

      <footer className="text-center text-sm text-gray-500 mt-8">
        Designed & Developed by Your Name
      </footer>
    </div>
  );
}
