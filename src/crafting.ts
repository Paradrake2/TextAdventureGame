import { CraftingSlot, Material } from "./craftingmaterials";
import { Equipment } from "./equipment";

export function craftItem(slots: Record<CraftingSlot, Material>): Equipment {
    let totalHealth = 0;
  let totalDamage = 0;

  const allTags: string[] = [];

  for (const slot of ["blade", "guard", "handle"] as CraftingSlot[]) {
    const mat = slots[slot];
    totalHealth += mat.health;
    totalDamage += mat.damage;
    if (mat.synergyTags) {
      allTags.push(...mat.synergyTags);
    }
  }

  // Detect synergy
  const tagCounts: Record<string, number> = {};
  for (const tag of allTags) {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  }

  const synergized = Object.values(tagCounts).some(count => count >= 2);
  if (synergized) {
    totalHealth = Math.floor(totalHealth * 1.5);
    totalDamage = Math.floor(totalDamage * 1.5);
  }

  const name = `${slots.blade.name}-${slots.guard.name}-${slots.handle.name} Sword`;

  return {
    name,
    slot: "weapon",
    health: totalHealth,
    damage: totalDamage,
    tier: 0,
  };
}