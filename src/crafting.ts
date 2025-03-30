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

export function craftLogic(type: string, input: string, player: Player, setPendingLoot: (item: Equipment) => void): {log:string[]; updatedPlayer: Player} {
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

export function refineOresToIngots(player: Player) : string[] {
  const log: string[] = [];
  const refined: string[] = [];

  for (let i = player.inventory.length - 1; i >= 0; i--) {
    const mat = getMaterialByName(player.inventory[i]);
    if (mat?.type === "ore") {
      const ingotName = mat.name.replace("_ore", "_ingot");
      player.inventory.splice(i,1);
      player.inventory.push(ingotName);
      refined.push(ingotName);
    }
  }

  if (refined.length > 0) {
    log.push(`Refined ${refined.length} ores into ingots: ${refined.join(", ")}`);
  }
  else {
    log.push("No ores to refine.");
  }

  return log;
}

export function craftMaterials(input: string, player: Player): {log: string[], updatedPlayer: Player} {
  const log: string[] = [];
  const args = input.trim().split(/\s+/);

  if (args.length !== 4) {
    log.push("usage: craft material <ingot> <crafted_material>");
    return {log, updatedPlayer: player};
  }

  const ingotName = args[2];
  const craftedName = args[3];

  const ingot = getMaterialByName(ingotName);
  const crafted = getMaterialByName(craftedName);
  

  if (!ingot) {
    log.push(`Ingot ${ingotName} not found.`);
    return {log, updatedPlayer: player};
  }

  if (!crafted) {
    log.push(`Crafted material ${craftedName} not found.`);
    return {log, updatedPlayer: player};
  }

  if (crafted.type !== "crafted_material") {
    log.push(`${craftedName} is not a craftable material.`);
    return {log, updatedPlayer: player};
  }

  const ingotIndex = player.inventory.indexOf(ingotName);
  if (ingotIndex === -1) {
    log.push(`You do not have ${ingotName} in your inventory`);
    return {log, updatedPlayer: player};
  }

  const updatedPlayer = { ...player};
  updatedPlayer.inventory.splice(ingotIndex, 1);
  updatedPlayer.inventory.push(craftedName);
  log.push(`You crafted ${craftedName} from ${ingotName}`);

  return {log, updatedPlayer};
}