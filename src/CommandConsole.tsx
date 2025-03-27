"use client";
import { useState } from "react";
import { runCommand } from "./command";
import { Player } from "./player";

interface CommandConsoleProps {
  player: Player;
  setPlayer: (player: Player) => void;
  setLog: (log: (prev: string[]) => string[]) => void;
}

export default function CommandConsole({ player, setPlayer, setLog }: CommandConsoleProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "") return;

    const { log: result, updatedPlayer } = runCommand(input, player);
    setLog(prev => [...prev, `> ${input}`, ...result]);
    setPlayer(updatedPlayer);
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
