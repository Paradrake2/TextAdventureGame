"use client";
import { useState } from "react";

interface CommandConsoleProps {
  onCommand: (input: string) => void;
}

export default function CommandConsole({ onCommand }: CommandConsoleProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "") return;
    onCommand(input.trim());
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        placeholder="Enter a command..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Run
      </button>
    </form>
  );
}
