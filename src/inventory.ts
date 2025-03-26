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