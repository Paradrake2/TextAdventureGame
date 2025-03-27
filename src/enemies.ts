import { Player } from "./player";

export interface Enemy {
    name: string;
    health: number;
    attack: number;
    experience: number;
    tier: number;
    drops: string[];
  }
  
  const enemyTemplates: Enemy[] = [
      { name: "Rat", health: 20, attack: 3, experience: 3, tier: 1, drops:["rat tooth"]},
    { name: "Goblin", health: 30, attack: 5, experience: 5, tier: 1, drops:["goblin bone"] },
    { name: "Wolf", health: 40, attack: 7, experience: 7, tier: 1, drops:["wolf fang", "wolf bone"]},
    { name: "Bandit", health: 50, attack: 10, experience: 10, tier: 2, drops: []},
    { name: "Orc", health: 70, attack: 13, experience: 12, tier: 2, drops: ["orc tooth", "orc bone"]},
    { name: "Kobold", health: 35, attack: 6, experience: 6, tier: 2, drops: ["kobold bone"]},
    { name: "Minotaur", health: 100, attack: 20, experience: 20, tier: 3, drops: []}
  ];

  const bossTemplates: Enemy[] = [
    { name: "Wyvern", health: 150, attack:25, experience: 100, tier: 4, drops: []},
    { name: "Dragon", health: 150, attack: 40, experience: 200, tier: 6, drops: []}
  ]
  
  export function generateEnemy(playerTier: number): Enemy {
    const minTier = Math.max(playerTier-1,0);
    const maxTier = playerTier+1;

    const candidates = enemyTemplates.filter(enemy => enemy.tier >= minTier && enemy.tier <= maxTier);

    if (candidates.length === 0) {
        throw new Error(`No enemies found for tier ${playerTier}`);
    }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    // Clone the enemy so it starts fresh
    return { ...candidates[randomIndex] };
  }
  export function handleEnemyAttack(enemy: Enemy, player: Player) {
    const damage = enemy.attack;
    const log: string[] = [];

    const updatedPlayer = {
        health: Math.max(player.health - damage, 0)
    }
    
    return ;
  }
