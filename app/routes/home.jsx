// home.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("mnemonic");
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [segments, setSegments] = useState([{ label: "", value: "" }]);
  const [length, setLength] = useState(12);
  const [count, setCount] = useState(5);
  const [shuffleSegments, setShuffleSegments] = useState(false);
  const [insertRandom, setInsertRandom] = useState(false);
  const [salt, setSalt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue =
      category === "mnemonic" ? mnemonicInput : segments;

    navigate("/results", {
      state: {
        category,
        inputValue,
        length,
        count,
        shuffleSegments,
        insertRandom,
        salt,
      },
    });
  };

  const updateSegment = (index, field, value) => {
    const updated = [...segments];
    updated[index][field] = value;
    setSegments(updated);
  };

  const addSegment = () => {
    setSegments([...segments, { label: "", value: "" }]);
  };

  const removeSegment = (index) => {
    const updated = segments.filter((_, i) => i !== index);
    setSegments(updated);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-center">🔐 MemoriKey</h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Generate passwords using a mnemonic sentence or personalized segment-based patterns.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="ml-2 p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
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
          <div className="space-y-4">
            {segments.map((segment, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder={`Label ${index + 1}`}
                  value={segment.label}
                  onChange={(e) =>
                    updateSegment(index, "label", e.target.value)
                  }
                  className="w-1/2 border p-2"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={segment.value}
                  onChange={(e) =>
                    updateSegment(index, "value", e.target.value)
                  }
                  className="w-1/2 border p-2"
                />
                <button
                  type="button"
                  onClick={() => removeSegment(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSegment}
              className="text-blue-600 hover:underline"
            >
              ➕ Add Segment
            </button>
            <label className="block">
              Salt (optional):
              <input
                type="text"
                value={salt}
                onChange={(e) => setSalt(e.target.value)}
                className="block w-full border p-2 mt-1"
              />
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={shuffleSegments}
                onChange={(e) => setShuffleSegments(e.target.checked)}
              />{" "}
              Shuffle Segments
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={insertRandom}
                onChange={(e) => setInsertRandom(e.target.checked)}
              />{" "}
              Insert Random Characters
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

      <footer className="text-center text-sm text-gray-500 mt-8">
        Designed & Developed by Your Name
      </footer>
    </div>
  );
}
