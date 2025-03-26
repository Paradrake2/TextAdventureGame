export type EquipmentSlot = "weapon" | "helmet" | "chestplate" | "leggings" | "boots";

export interface Player {
  name: string;
  level: number;
  experience: number;
  health: number;
  equipment: Partial<Record<EquipmentSlot, string>>;
}

export const createDefaultPlayer = (): Player => ({
  name: "Hero",
  level: 1,
  experience: 0,
  health: 100,
  equipment: {},
});