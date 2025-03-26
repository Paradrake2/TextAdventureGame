import { Equipment } from "./equipment";

export type EquipmentSlot = "weapon" | "helmet" | "chestplate" | "leggings" | "boots";

export interface Player {
  name: string;
  level: number;
  experience: number;
  health: number;
  equipment: Partial<Record<EquipmentSlot, string>>;
  tier: number;
}

export const createDefaultPlayer = (): Player => ({
  name: "Hero",
  level: 1,
  experience: 0,
  health: 100,
  equipment: {
    boots: "Leather Boots",
    leggings: "Leather Leggings",
    chestplate: "Leather Chestplate",
    helmet: "Leather Helmet",
    weapon: "Wooden Sword",
  },
  tier: 1,
});

export function equipItem(player: Player, item: Equipment): Player {
    return {
        ...player,
        equipment: {
            ...player.equipment,
            [item.slot]: item.name,
        },
    };
}
