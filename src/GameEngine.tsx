"use client";
import { useState } from "react";
import { attack } from "./combat";
import { Enemy, generateEnemy } from "./enemies";
import { Player, createDefaultPlayer } from "./player";

export default function GameEngine() {
  const [player, setPlayer] = useState<Player>(createDefaultPlayer());
  const [enemy, setEnemy] = useState<Enemy>(generateEnemy());
  const [log, setLog] = useState<string[]>([]);

  function handleAttack() {
    const newEnemy = attack(player, enemy);
    if (newEnemy.health <= 0) {
      const message = `You defeated the ${enemy.name}!`;
      setEnemy(generateEnemy()); // create a new enemy
      setLog((prev) => [...prev, message, "A new enemy approaches..."]);
    } else {
      setEnemy(newEnemy);
      setLog((prev) => [...prev, `You hit the ${enemy.name} for 10 damage.`]);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Enemy: {enemy.name}</h2>
      <p>HP: {Math.max(enemy.health, 0)}</p>
      <button onClick={handleAttack} className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
        Attack
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Battle Log:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {log.slice(-5).map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}