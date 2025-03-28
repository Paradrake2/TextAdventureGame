import { EquipmentSlot, Player } from "./player";

export function getMaxHealth(player: Player): number {
    let baseHealth = 100;
    let bonus = 0;
    for (const slot in player.equipment) {
        const itemName = player.equipment[slot as keyof typeof player.equipment];
        const item = player.equipment[slot as EquipmentSlot]
        if (item?.health) {
            bonus += item.health;
        }
    }

    return baseHealth + bonus;
}
export function getDamage(player: Player): number {
    let baseDamage = 10;
    let bonus = 0;
    for (const slot in player.equipment) {
        const item = player.equipment[slot as EquipmentSlot]
        if (item?.damage) {
            bonus += item.damage;
        }
    }

    return baseDamage + bonus;
}

