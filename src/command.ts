import { craftWeaponLogic } from "./crafting";
import { getMaterialByName } from "./craftingmaterials";
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

  else if (command === "inspect ") {
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

  else if (command.startsWith("craft weapon")) {
    return craftWeaponLogic(input, player, setPendingLoot);
  }

  else if (command === "equip") {
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

  else if (command === "discard") {
    if (pendingLoot) {
      updatedPlayer = equipItem(player, pendingLoot);
      log.push(`You discard ${pendingLoot.name}.`);
      setPendingLoot(null);
    }
    else {
      log.push("Nothing to discard.");
    }
  }

  else if (command.startsWith("help")){

  }

  else {
    log.push("Unknown command.");
  }

  return { log, updatedPlayer: player};
}