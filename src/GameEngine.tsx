"use client";
import { useState } from "react";
import { Enemy, generateEnemy } from "./enemies";
import { generateEquipment } from "./equipment";
import { Player, createDefaultPlayer, equipItem } from "./player";
import { getDamage, getMaxHealth } from "./stats";

export default function GameEngine() {
  const [player, setPlayer] = useState<Player>(createDefaultPlayer());
  const [enemy, setEnemy] = useState<Enemy>(generateEnemy());
  const [log, setLog] = useState<string[]>([]);

  function handleAttack() {
    const damage = getDamage(player); //can be updated later for equipment

    const updatedEnemy = {
      ...enemy,
      health: Math.max(enemy.health - damage, 0)
    }
    setEnemy(updatedEnemy);
    setLog(prev => [...prev, `You hit the ${enemy.name} for ${damage}!`]);

    if (updatedEnemy.health > 0) {
      handleEnemyAttack();
    } else {
      setLog(prev => [...prev, `You defeated the ${enemy.name}!`])
      handleKill();
      setEnemy(generateEnemy());
    }
  }

  function handleEnemyAttack() {
    const damage = enemy.attack;
    const updatedPlayer = {
      ...player,
      health: Math.max(player.health - damage, 0),
    };

    setPlayer(updatedPlayer);
    setLog(prev => [...prev, `The ${enemy.name} attacks for ${damage} damage!`]);
  }

  function handleKill() {
    const maxHealth = getMaxHealth(player);
    setPlayer(prev => ({
      ...prev,
      health: Math.min(prev.health + 50, maxHealth)
    }))
    if (Math.random() < 0.5) {
      acquireEquipment();
    }
  }

  function acquireEquipment() {
    const tier = player.tier;
    const loot = generateEquipment(tier);
    setPlayer(prev => equipItem(prev, loot));
    setLog(prev => [...prev, `You found (a) ${loot.name}!`]);
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Enemy: {enemy.name}</h2>
      <p>HP: {Math.max(enemy.health, 0)}</p>
      <p>Your HP: {Math.max(player.health,0)}</p>
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