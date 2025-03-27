import { EquipmentSlot } from "./player";

export interface Item {
    name: string;
    slot: EquipmentSlot;
    attack?: number;
    defense?: number;
  }
  
  export const sampleItems: Item[] = [
    { name: "Rusty Sword", slot: "weapon", attack: 5 },
    { name: "Leather Helmet", slot: "helmet", defense: 2 },
  ];

  export function getRandomDrop(drops: string[]): string | null {
    if (drops.length === 0 || Math.random() > 0.7) return null; // 30% drop chance
    return drops[Math.floor(Math.random() * drops.length)];
  }