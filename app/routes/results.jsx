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
      length = 12,
      count = 5,
      patternStructure = "food-symbol-year-petInitial",
      shuffleSegments = false,
      insertRandom = false,
      salt = "",
    } = state;

    let generated = [];

    for (let i = 0; i < count; i++) {
      if (category === "mnemonic") {
        generated.push(generateFromMnemonic(inputValue, length));
      } else {
        generated.push(
          generateFromPattern(
            inputValue,
            length,
            patternStructure,
            shuffleSegments,
            insertRandom,
            salt
          )
        );
      }
    }

    setPasswords(generated);

    // Save to localStorage history
    const history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    localStorage.setItem(
      "passwordHistory",
      JSON.stringify([...history, ...generated])
    );
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
    userData,
    length = 12,
    structure,
    shuffle,
    insertRandom,
    salt
  ) => {
    const { food, year, symbol, petInitial, randomWord, lucky } = userData;
    const tokens = {
      food,
      year,
      symbol,
      petInitial: petInitial?.toUpperCase(),
      randomWord,
      lucky,
    };

    let segments = structure.split("-").map((part) => tokens[part] || "");

    if (shuffle) {
      for (let i = segments.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [segments[i], segments[j]] = [segments[j], segments[i]];
      }
    }

    let password = segments.join("");

    if (insertRandom) {
      password = password.replace(/[aeiou]/gi, () => {
        const subs = ["@", "3", "1", "$", "*"];
        return subs[Math.floor(Math.random() * subs.length)];
      });
    }

    if (salt) {
      password += salt;
    }

    return password.slice(0, length);
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      passwords.map((p) => `"${p}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "passwords.csv");
    document.body.appendChild(link);
    link.click();
  };

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return [
      "Too Short",
      "Weak",
      "Moderate",
      "Strong",
      "Very Strong",
      "Excellent",
    ][score];
  };

  return (
    <div className="p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Generated Passwords</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here are your custom password results.
        </p>
      </header>

      <ul className="list-disc pl-5 space-y-2">
        {passwords.map((pwd, i) => (
          <li
            key={i}
            className="text-lg font-mono flex items-center justify-between"
          >
            {pwd}
            <span className="ml-4 text-sm text-gray-500">
              ({getStrength(pwd)})
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(pwd)}
              className="ml-2 text-sm text-blue-500 hover:underline"
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={exportToCSV}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Export to CSV
      </button>
    </div>
  );
}
