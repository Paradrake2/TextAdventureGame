import { getMaterialByName } from "./craftingmaterials";
import { Equipment } from "./equipment";
import { equipItem, Player } from "./player";


// Very ugly massive function, definitely could be more efficient and clean but it works
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
    const name = input.substring(10).trim();
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
    log.push("Crafting system coming soon!");
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