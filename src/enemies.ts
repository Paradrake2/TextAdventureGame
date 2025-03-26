export interface Enemy {
    name: string;
    health: number;
    attack: number;
  }
  
  const enemyTemplates: Enemy[] = [
    { name: "Goblin", health: 30, attack: 5 },
    { name: "Wolf", health: 40, attack: 7 },
    { name: "Bandit", health: 50, attack: 10 },
    { name: "Orc", health: 70, attack: 13},
  ];
  
  export function generateEnemy(): Enemy {
    const randomIndex = Math.floor(Math.random() * enemyTemplates.length);
    const template = enemyTemplates[randomIndex];
    // Clone the enemy so it starts fresh
    return { ...enemyTemplates[randomIndex] };
  }
  