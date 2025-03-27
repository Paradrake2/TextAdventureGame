import { getMaterialByName } from "./craftingmaterials";
import { Player } from "./player";

export function runCommand(input: string, player: Player): {
  log: string[];
  updatedPlayer: Player;
} {
  const log: string[] = [];
  const command = input.trim().toLowerCase();

  if (command === "inventory") {
    if (player.inventory.length === 0) {
      log.push("Your inventory is empty.");
    } else {
      const entries = player.inventory.map((item, i) => `${i + 1}. ${item}`);
      log.push("Your materials:");
      log.push(...entries);
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
    log.push("Crafting system coming soon!");
  }

  else {
    log.push("Unknown command.");
  }

  return { log, updatedPlayer: player };
}