"use client";
import { useState } from "react";
import CommandConsole from "./CommandConsole";
import { refineOresToIngots } from "./crafting";
import { oreEncounter } from "./encounters";
import { Enemy, generateEnemy, handleEnemyAttack } from "./enemies";
import { Equipment } from "./equipment";
import { Player, createDefaultPlayer, handleKillLogic } from "./player";
import { getDamage, getMaxHealth, isForgeAvailable } from "./stats";


export default function GameEngine() {
  const [player, setPlayer] = useState<Player>(createDefaultPlayer());
  const [enemy, setEnemy] = useState<Enemy>(generateEnemy(player.tier));
  const [log, setLog] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [pendingLoot, setPendingLoot] = useState<Equipment | null>(null);
  const [encounter, setEncounter] = useState<"none" | "ore_mine" | "forge">("none");

  function handleAttack() {
    if(player.health > 0) {
      setEnemy(generateEnemy(player.tier));
      player.forgeAvailable = false;
      const damage = getDamage(player);
      const updatedEnemy = {
        ...enemy,
        health: Math.max(enemy.health - damage, 0)
      }
      setEnemy(updatedEnemy);
      setLog(prev => [...prev, `You hit the ${enemy.name} for ${damage}!`]);
      
      if (updatedEnemy.health > 0) {
        const {updatedPlayer, log:attackLog } = handleEnemyAttack(updatedEnemy, player);
        setPlayer(updatedPlayer);
        setLog(prev => [...prev, attackLog]);
      }
      else {
        setLog(prev => [...prev, `You defeated the ${enemy.name}!`]);
        
        const { player: updatedPlayer, log: battleLog, loot } = handleKillLogic(player, enemy);
        setPlayer(updatedPlayer);
        
        // Encounter system will go here
        const shouldSpawnEnemy = encounterHandler(player);
        if (shouldSpawnEnemy) {
          setEnemy(generateEnemy(player.tier));
        }
        
        setLog(prev => [...prev, ...battleLog]);
        if(loot) {
          setPendingLoot(loot);
        }
      }
    } else {
      setLog(prev => [...prev, "You are dead. Reload the page to start over."]);
    }
      
  }
  
  function encounterHandler(updatedPlayer: Player): boolean {
    const roll = Math.random();
    log.push(roll.toString());
    if (roll < 0.5) {
      const encounter = "none";
      return true;
    }
    else if (roll < 0.75) {
      const result = oreEncounter(player);
      setPlayer(result.updatedPlayer);
      setLog(prev => [...prev, ...result.log]);
      setEncounter("ore_mine");
      log.push("ore mine encountered");
      return false;
    }
    updatedPlayer.forgeAvailable = true;
    refineOresToIngots(updatedPlayer);
    setPlayer({ ...updatedPlayer });
    setLog(prev => [...prev, "You stumble upon a forge. You can now craft materials here."]);
    setEncounter("forge");
  return false;
  }
  function leaveEncounter() {
    player.forgeAvailable = false;
    const encounter = "none";
    setLog(prev => [...prev, "test"]);
    return encounter;
  }
  return (
    <div>
      <h2 className="text-xl font-bold">Enemy: {enemy.name}</h2>
      <p>HP: {Math.max(enemy.health, 0)}</p>
      <p>Your HP: {Math.max(player.health,0)}</p>
      <button onClick={handleAttack} className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
        Attack
      </button>
      <button onClick={() => setShowStats(!showStats)} className="mat-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
        Show Player Stats
      </button>
      <button onClick={() => leaveEncounter()} className="mat-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
        Leave Encounter
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Battle Log:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {log.slice(-9).map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
      {showStats && (
  <div className="mt-4 p-4 bg-gray-800 rounded shadow-md text-sm space-y-1">
    <h3 className="text-lg font-bold mb-2">Player Stats</h3>
    <p><strong>Name:</strong> {player.name}</p>
    <p><strong>Level:</strong> {player.level}</p>
    <p><strong>Experience:</strong> {player.experience}</p>
    <p><strong>Tier:</strong> {player.tier}</p>
    <p><strong>HP:</strong> {player.health} / {getMaxHealth(player)}</p>
    <p><strong>DMG:</strong> {getDamage(player)}</p>
    <p><strong>ForgeAvailable: </strong>{isForgeAvailable(player)}</p>
    <p><strong>Encounter: </strong>{encounter}</p>
    <div>
      <strong>Equipment:</strong>
      <ul className="list-disc ml-6">
        {Object.entries(player.equipment).map(([slot, item]) => (
          <li key={slot}>{slot}: {item.name as string}</li>
        ))}
      </ul>
    </div>
  </div>
  
)}
<CommandConsole player={player} setPlayer={setPlayer} setLog={setLog} pendingLoot={pendingLoot} setPendingLoot={setPendingLoot} encounter={encounter} setEncounter={setEncounter} setEnemy={setEnemy}/>

    </div>
  );
}