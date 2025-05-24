// home.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("mnemonic");
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [patternInput, setPatternInput] = useState({
    food: "",
    year: "",
    symbol: "",
    petInitial: "",
    randomWord: "",
    lucky: "",
  });
  const [length, setLength] = useState(12);
  const [count, setCount] = useState(5);
  const [patternStructure, setPatternStructure] = useState("food-symbol-year-petInitial");
  const [shuffleSegments, setShuffleSegments] = useState(false);
  const [insertRandom, setInsertRandom] = useState(false);
  const [salt, setSalt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue =
      category === "mnemonic" ? mnemonicInput : patternInput;
    navigate("/results", {
      state: {
        category,
        inputValue,
        length,
        count,
        patternStructure,
        shuffleSegments,
        insertRandom,
        salt
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="ml-2">
            <option value="mnemonic">Mnemonic</option>
            <option value="pattern">Pattern</option>
          </select>
        </label>

        {category === "mnemonic" ? (
          <label className="block">
            Sentence:
            <input
              type="text"
              value={mnemonicInput}
              onChange={(e) => setMnemonicInput(e.target.value)}
              required
              className="block w-full border p-2 mt-1"
            />
          </label>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(patternInput).map((key) => (
              <label key={key} className="block">
                {key}:
                <input
                  type="text"
                  value={patternInput[key]}
                  onChange={(e) =>
                    setPatternInput({ ...patternInput, [key]: e.target.value })
                  }
                  className="block w-full border p-2 mt-1"
                />
              </label>
            ))}
            <label className="col-span-2 block">
              Pattern Structure:
              <input
                type="text"
                value={patternStructure}
                onChange={(e) => setPatternStructure(e.target.value)}
                className="block w-full border p-2 mt-1"
              />
            </label>
            <label className="col-span-2 block">
              Salt:
              <input
                type="text"
                value={salt}
                onChange={(e) => setSalt(e.target.value)}
                className="block w-full border p-2 mt-1"
              />
            </label>
            <label className="col-span-2 block">
              <input
                type="checkbox"
                checked={shuffleSegments}
                onChange={(e) => setShuffleSegments(e.target.checked)}
              /> Shuffle Segments
            </label>
            <label className="col-span-2 block">
              <input
                type="checkbox"
                checked={insertRandom}
                onChange={(e) => setInsertRandom(e.target.checked)}
              /> Insert Random Characters
            </label>
          </div>
        )}

        <label className="block">
          Password Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={4}
            max={32}
            className="block w-full border p-2 mt-1"
          />
        </label>

        <label className="block">
          Number of Passwords:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={1}
            max={20}
            className="block w-full border p-2 mt-1"
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate
        </button>
      </form>
    </div>
  );
}
