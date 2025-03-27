import { EquipmentSlot, Player } from "./player";

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

    {slot:"boots", name: "Cheap Boots", damage:0, health:20, tier: 2},
    {slot:"leggings", name: "Cheap Leggings", damage:0, health:35, tier: 2},
    {slot:"chestplate", name: "Cheap Chestplate", damage:0, health:45, tier: 2},
    {slot:"helmet", name: "Cheap Helmet", damage:0, health:20, tier: 2},
    {slot:"weapon", name: "Cheap Sword", damage:20, health:0, tier: 2},

    {slot:"boots", name: "Decent Boots", damage:0, health:35, tier: 3},
    {slot:"leggings", name: "Decent Leggings", damage:0, health:50, tier: 3},
    {slot:"chestplate", name: "Decent Chestplate", damage:0, health:60, tier: 3},
    {slot:"helmet", name: "Decent Helmet", damage:0, health:35, tier: 3},
    {slot:"weapon", name: "Decent Sword", damage:30, health:0, tier: 3},

    {slot:"boots", name: "Good Boots", damage:0, health:50, tier: 4},
    {slot:"leggings", name: "Good Leggings", damage:0, health:70, tier: 4},
    {slot:"chestplate", name: "Good Chestplate", damage:0, health:85, tier: 4},
    {slot:"helmet", name: "Good Helmet", damage:0, health:50, tier: 4},
    {slot:"weapon", name: "Good Sword", damage:40, health:0, tier: 4},

    {slot:"boots", name: "Amazing Boots", damage:0, health:70, tier: 5},
    {slot:"leggings", name: "Amazing Leggings", damage:0, health:95, tier: 5},
    {slot:"chestplate", name: "Amazing Chestplate", damage:0, health:110, tier: 5},
    {slot:"helmet", name: "Amazing Helmet", damage:0, health:70, tier: 5},
    {slot:"weapon", name: "Amazing Sword", damage:70, health:0, tier: 5},
]

export function generateEquipment(tier: number): Equipment {
    const filtered = equipmentTemplates.filter(item => item.tier === tier);
    if (filtered.length === 0) {
        throw new Error(`No equipment found for tier ${tier}`);
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}

export function acquireEquipment(player: Player) {
    const loot = generateEquipment(player.tier);
    const logMessage = `You found (a) ${loot.name}! Type "equip" to equip it or "discard" to ignore it.`;

    return {loot, logMessage}
}
