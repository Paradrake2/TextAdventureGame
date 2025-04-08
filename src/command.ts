import { craftLogic, craftMaterials } from "./crafting";
import { getMaterialByName } from "./craftingmaterials";
import { Enemy, generateEnemy } from "./enemies";
import { Equipment } from "./equipment";
import { equipItem, Player } from "./player";


// Very ugly massive function, definitely could be more efficient and clean but it works
// Typically giant if/else chains are a bad idea, it's just the easiest thing right now. Eventually I might clean it up.
export function runCommand(input: string, player: Player, pendingLoot: Equipment | null, setPendingLoot: React.Dispatch<React.SetStateAction<Equipment | null>>,
  encounter: "none" | "forge" | "ore_mine",
  setEncounter: React.Dispatch<React.SetStateAction<"none" | "forge" | "ore_mine">>,
  setEnemy: React.Dispatch<React.SetStateAction<Enemy>>
): {
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
  else if (command === "leave") {
    if (encounter === "forge" || encounter === "ore_mine") {
      setEncounter("none");
      log.push("You leave the area...");
      player.forgeAvailable = false;
      setEnemy(generateEnemy(player.tier));
    } else {
      log.push("There's nothing to leave.");
    }
  }

  else if (command.startsWith("craft weapon")) {
    return craftLogic("weapon", input, player, setPendingLoot);
  }

  else if (command.startsWith("craft material")) {
    if (!player.forgeAvailable) {
      log.push("You must be at a forge to craft materials!");
      return {log, updatedPlayer: player};
    } 
    else {
      return craftMaterials(input, player);
    }
    

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
    return { log: helpLogic(input), updatedPlayer: player };
  }

  else {
    log.push("Unknown command.");
  }

  return { log, updatedPlayer: player};
}

export function helpLogic(input: string): string[] {
  const log: string[] = [];
  const parts = input.trim().toLowerCase().split(/\s+/);
  const topic = parts[1];

  if (!topic) {
    log.push("Available commands: inventory, craft [type], equip, discard, inspect");
    log.push("- help [command] for further information on each command");
  } else if (topic === "craft") {
    log.push("Crafting Weapons:");
    log.push("Command structure: craft weapon blade:<material> guard:<material> handle:<material>");
    log.push("You must have the materials in your inventory.");
    log.push("Example: craft weapon blade:rat_tooth guard:goblin_bone handle:kobold_bone");
  } else if (topic === "inspect") {
    log.push("Inspect:");
    log.push("Command structure: inspect <material_name>");
    log.push("This will return the stats of the material as well as where it can be used.");
  } else if (topic === "inventory") {
    log.push("Inventory:");
    log.push("Command structure: inventory");
    log.push("This returns all the materials you have in your inventory.");
  } else if (topic === "equip") {
    log.push("Equip:");
    log.push("Command structure: equip");
    log.push("This allows you to equip any pending equipment.");
  } else if (topic === "discard") {
    log.push("Discard:");
    log.push("Command structure: discard");
    log.push("This allows you to discard any pending equipment.");
  } else {
    log.push(`No help available for '${topic}'.`);
  }

  return log;
}