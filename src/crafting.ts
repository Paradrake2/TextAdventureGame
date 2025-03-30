import { CraftingSlot, getMaterialByName, Material } from "./craftingmaterials";
import { Equipment } from "./equipment";
import { Player } from "./player";

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

export function craftWeaponLogic(input: string, player: Player, setPendingLoot: (item: Equipment) => void): {log:string[]; updatedPlayer: Player} {
  const log: string[] = [];

  const args = input.substring(13).trim().split(/\s+/); // everything after "craft"
  const slots: Partial<Record<CraftingSlot, Material>> = {};

  const missing: string[] = [];
  const invalidSlots: string[] = [];

  for (const arg of args) {
    const [slot, materialName] = arg.split(":");
    if (!slot || !materialName) {
      log.push(`Invalid syntax: ${arg}`);
      return { log, updatedPlayer: player };
    }

    const slotKey = slot as CraftingSlot;
    if (!["blade", "guard", "handle"].includes(slotKey)) {
      invalidSlots.push(slot);
      continue;
    }

    const material = getMaterialByName(materialName);
    if (!material) {
      missing.push(materialName);
      continue;
    }

    if (!material.allowedSlots.includes(slotKey)) {
      log.push(`${material.name} cannot be used in the ${slotKey} slot.`);
      return { log, updatedPlayer: player };
    }

    if (!player.inventory.includes(material.name)) {
      log.push(`You do not have ${material.name}.`);
      return { log, updatedPlayer: player };
    }

    slots[slotKey] = material;
  }

  if (missing.length > 0) {
    log.push(`Materials not found: ${missing.join(", ")}`);
    return { log, updatedPlayer: player };
  }

  if (Object.keys(slots).length < 3) {
    log.push("Missing crafting components (need blade, guard, and handle).");
    return { log, updatedPlayer: player };
  }

  const crafted = craftItem(slots as Record<CraftingSlot, Material>);
  setPendingLoot(crafted);
  log.push(`You crafted ${crafted.name}! (+${crafted.damage} dmg, +${crafted.health} hp). Type "equip" to equip it.`);

  // Remove used materials from inventory
  for (const part of Object.values(slots)) {
    const index = player.inventory.indexOf(part.name);
    if (index !== -1) {
      player.inventory.splice(index, 1);
    }
  }

  return { log, updatedPlayer: player };
}