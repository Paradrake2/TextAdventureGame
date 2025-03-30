"use client";
import { useState } from "react";
import { runCommand } from "./command";
import { Enemy } from "./enemies";
import { Equipment } from "./equipment";
import { Player } from "./player";

interface CommandConsoleProps {
  player: Player;
  pendingLoot: Equipment | null;
  setPlayer: (player: Player) => void;
  setLog: (log: (prev: string[]) => string[]) => void;
  setPendingLoot: React.Dispatch<React.SetStateAction<Equipment | null>>;
  encounter: "none" | "ore_mine" | "forge";
  setEncounter: React.Dispatch<React.SetStateAction<"none" | "ore_mine" | "forge">>;
  setEnemy: React.Dispatch<React.SetStateAction<Enemy>>;
}

export default function CommandConsole({ player, setPlayer, setLog, pendingLoot, setPendingLoot, encounter, setEncounter, setEnemy }: CommandConsoleProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "") return;

    const { log: result, updatedPlayer } = runCommand(input, player, pendingLoot, setPendingLoot, encounter, setEncounter, setEnemy);
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
