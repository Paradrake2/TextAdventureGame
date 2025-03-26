import { EquipmentSlot } from "./player";

export interface Equipment {
    slot: EquipmentSlot;
    name: string;
    damage: number;
    health: number;
    tier: number;
}

export const equipmentTemplates: Equipment[] = [
    {slot:"boots", name: "Leather Boots", damage:0, health:0, tier: 0},
    {slot:"leggings", name: "Leather Leggings", damage:0, health:0, tier: 0},
    {slot:"chestplate", name: "Leather Chestplate", damage:0, health:0, tier: 0},
    {slot:"helmet", name: "Leather Helmet", damage:0, health:0, tier: 0},
    {slot:"weapon", name: "Wooden Sword", damage:5, health:0, tier: 0},
    {slot:"boots", name: "Rusty Boots", damage:0, health:10, tier: 1},
    {slot:"leggings", name: "Rusty Leggings", damage:0, health:20, tier: 1},
    {slot:"chestplate", name: "Rusty Chestplate", damage:0, health:25, tier: 1},
    {slot:"helmet", name: "Rusty Helmet", damage:0, health:10, tier: 1},
    {slot:"weapon", name: "Rusty Sword", damage:10, health:0, tier: 1},
    
]

export function generateEquipment(tier: number): Equipment {
    const filtered = equipmentTemplates.filter(item => item.tier === tier);
    if (filtered.length === 0) {
        throw new Error(`No equipment found for tier ${tier}`);
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}
