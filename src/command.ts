import { craftItem } from "./crafting";
import { CraftingSlot, getMaterialByName, Material } from "./craftingmaterials";
import { Equipment } from "./equipment";
import { equipItem, Player } from "./player";


// Very ugly massive function, definitely could be more efficient and clean but it works
// Typically giant if/else chains are a bad idea, it's just the easiest thing right now. Eventually I might clean it up.
export function runCommand(input: string, player: Player, pendingLoot: Equipment | null, setPendingLoot: React.Dispatch<React.SetStateAction<Equipment | null>>): {
  log: string[];
  updatedPlayer: Player;
} {
  const log: string[] = [];
  const command = input.trim().toLowerCase();

  let updatedPlayer = player;

  if (command === "inventory") {
    if (player.inventory.length === 0) {
      log.push("Your inventory is empty.");
    } else {
      log.push("Your materials:");
      log.push(player.inventory.join(", "));
    }
  }

  else if (command.startsWith("inspect ")) {
    const name = input.substring(8).trim();
    const material = getMaterialByName(name);

    if (!material) {
      log.push(`No material named '${name}' found.`);
    } else {
      log.push(`Inspecting ${material.name}:`);
      log.push(`- Health: ${material.health}`);
      log.push(`- Damage: ${material.damage}`);
      log.push(`- Slots: ${material.allowedSlots.join(", ")}`);
      if (material.synergyTags?.length) {
        log.push(`- Synergy Tags: ${material.synergyTags.join(", ")}`);
      }
    }
  }

  else if (command.startsWith("craft")) {
    const args = input.substring(6).trim().split(/\s+/); // get slot:material parts
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

  // Optional: Remove used materials
  for (const part of Object.values(slots)) {
    const index = player.inventory.indexOf(part.name);
    if (index !== -1) {
      player.inventory.splice(index, 1);
    }
  }

  return { log, updatedPlayer: player };
  }

  else if (command.startsWith("equip")) {
    if (pendingLoot) {
      const updatedPlayer = equipItem(player, pendingLoot);
      log.push(`You equipped ${pendingLoot.name}.`);
      setPendingLoot(null);
      return {log, updatedPlayer};
    }
    else {
      log.push("Nothing to equip!");
    }
  }

  else if (command.startsWith("discard")) {
    if (pendingLoot) {
      updatedPlayer = equipItem(player, pendingLoot);
      log.push(`You discard ${pendingLoot.name}.`);
      setPendingLoot(null);
    }
    else {
      log.push("Nothing to discard.");
    }
  }

  else {
    log.push("Unknown command.");
  }

  return { log, updatedPlayer: player};
}