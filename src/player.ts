import { Enemy } from "./enemies";
import { acquireEquipment, Equipment } from "./equipment";
import { getRandomDrop } from "./inventory";
import { getMaxHealth } from "./stats";

export type EquipmentSlot = "weapon" | "helmet" | "chestplate" | "leggings" | "boots";

export interface Player {
  name: string;
  level: number;
  experience: number;
  health: number;
  equipment: Partial<Record<EquipmentSlot, Equipment>>;
  tier: number;
  inventory: string[];
  forgeAvailable: boolean;
}

export const createDefaultPlayer = (): Player => ({
  name: "Hero",
  level: 1,
  experience: 0,
  health: 100,
  equipment: {
    boots: {slot:"boots", name: "Leather Boots", damage:0, health:0, tier: 0},
    leggings: {slot:"leggings", name: "Leather Leggings", damage:0, health:0, tier: 0},
    chestplate: {slot:"chestplate", name: "Leather Chestplate", damage:0, health:0, tier: 0},
    helmet: {slot:"helmet", name: "Leather Helmet", damage:0, health:0, tier: 0},
    weapon: {slot:"weapon", name: "Wooden Sword", damage:5, health:0, tier: 0},
  },
  tier: 1,
  inventory: [],
  forgeAvailable: false,
});

export function equipItem(player: Player, item: Equipment): Player {
    return {
        ...player,
        equipment: {
            ...player.equipment,
            [item.slot]: item
        },
    };
}

export function checkLevelUp(player: Player): Player {
    const requiredXP = 50 * player.level;
    if (player.experience >= requiredXP) {
        return {
            ...player,
            level: player.level + 1,
            tier: player.tier + 1,
            experience: player.experience - requiredXP,
        }
    }
    return player;
}

export function handleKillLogic(player: Player, enemy: Enemy) {
    const maxHP = getMaxHealth(player);
    const log: string[] = [];
    let loot: Equipment | null = null;
    let updated = {
        ...player,
        experience: player.experience + enemy.experience,
        health: Math.min(player.health + 50, maxHP)
    };
    log.push(`You gained ${enemy.experience} experience.`);
    const leveled = checkLevelUp(updated);
    if (leveled.level > updated.level) {
        log.push(`You leveled up to level ${leveled.level}. Tier is now ${leveled.tier}.`)
    }
    updated = leveled;

    const materialDrop = getRandomDrop(enemy.drops);
    if (materialDrop) {
        updated.inventory.push(materialDrop);
        log.push(`You found a ${materialDrop}!`);
    }
    if (Math.random() < 0.5) {
        const result = acquireEquipment(updated);
        loot = result.loot;
        log.push(result.logMessage);
    }
    return { player: updated, log, loot};
}
