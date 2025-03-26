import { Enemy } from "./enemies";
import { Player } from "./player";

export function attack(player: Player, enemy: Enemy): Enemy {
  const damage = 10; // Simplified logic
  return { ...enemy, health: enemy.health - damage };
}