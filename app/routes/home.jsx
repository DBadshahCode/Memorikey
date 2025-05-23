import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function meta() {
  return [
    { title: "Mnemonic & Pattern Password Generator" },
    { name: "description", content: "Generate secure and memorable passwords using mnemonics or custom patterns." },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("mnemonic");
  const [inputValue, setInputValue] = useState("");
  const [length, setLength] = useState(12);
  const [count, setCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results", {
      state: {
        category,
        inputValue,
        length,
        count,
      },
    });
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-12 min-h-0">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Passify</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Create secure and memorable passwords using mnemonic or pattern-based methods.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-6">
          <div>
            <label className="block mb-1 font-medium">Choose Category:</label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="mnemonic">Mnemonic Based</option>
              <option value="pattern">Pattern Based</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              {category === "mnemonic" ? "Enter a sentence:" : "Enter pattern (comma-separated):"}
            </label>
            <input
              type="text"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                category === "mnemonic"
                  ? "e.g., My dog eats pizza every Sunday"
                  : "e.g., Pizza,1992,@,M"
              }
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Password Length:</label>
              <input
                type="number"
                value={length}
                min={6}
                max={32}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium"># of Passwords:</label>
              <input
                type="number"
                value={count}
                min={1}
                max={20}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Generate Passwords
          </button>
        </form>
      </div>
    </main>
  );
}
