"use client";

import { useEffect, useState } from "react";
//test
interface Player {
  name: string;
  health: number;
  maxHealth: number;
  defense: number;
}

interface Enemy {
  name: string;
  health: number;
  attackPower: number;
}

export default function TextGame() {
  const [player, setPlayer] = useState<Player>({
    name: "Hero",
    health: 100,
    maxHealth: 100,
    defense: 0,
  });
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    generateEnemy();
  }, []);

  const generateEnemy = () => {
    const enemies = [
      { name: "Goblin", health: 30, attackPower: 10 },
      { name: "Orc", health: 40, attackPower: 12 },
      { name: "Dragon", health: 60, attackPower: 20 },
    ];
    const enemy = enemies[Math.floor(Math.random() * enemies.length)];
    setEnemy(enemy);
    appendLog(`A wild ${enemy.name} appears!`);
  };

  const appendLog = (text: string) => {
    setLog((prev) => [...prev, text]);
  };

  const performAction = (action: string) => {
    if (!enemy) return;
    let updatedEnemy = { ...enemy };
    let updatedPlayer = { ...player };

    switch (action) {
      case "attack":
        updatedEnemy.health -= 15;
        appendLog(`You attack the ${enemy.name} for 15 damage!`);
        break;
      case "defend":
        updatedPlayer.defense = 10;
        appendLog("You brace for the next attack.");
        break;
      case "heal":
        updatedPlayer.health = Math.min(updatedPlayer.maxHealth, updatedPlayer.health + 20);
        appendLog("You heal yourself for 20 HP.");
        break;
      default:
        return;
    }

    if (updatedEnemy.health > 0) {
      const damage = Math.max(0, updatedEnemy.attackPower - updatedPlayer.defense);
      updatedPlayer.health -= damage;
      appendLog(`The ${enemy.name} attacks you for ${damage} damage.`);
    } else {
      appendLog(`You defeated the ${enemy.name}!`);
      setTimeout(generateEnemy, 1000);
      updatedPlayer.defense = 0;
    }

    updatedPlayer.defense = 0;
    setPlayer(updatedPlayer);
    setEnemy(updatedEnemy);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Text Adventure Game</h1>
      <div className="bg-gray-800 p-4 rounded h-64 overflow-y-auto">
        {log.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {player.health > 0 ? (
        <div className="mt-4 space-x-2">
          <button
            onClick={() => performAction("attack")}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Attack
          </button>
          <button
            onClick={() => performAction("defend")}
            className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500"
          >
            Defend
          </button>
          <button
            onClick={() => performAction("heal")}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          >
            Heal
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-red-400 font-bold">You have been defeated. Refresh to play again.</p>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-400">
        <p><strong>Player HP:</strong> {player.health}</p>
        <p><strong>Enemy:</strong> {enemy?.name} (HP: {enemy?.health})</p>
      </div>
    </div>
  );
}
