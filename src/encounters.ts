import { refineOresToIngots } from "./crafting";
import { getMaterialByTypeAndTier } from "./craftingmaterials";
import { Player } from "./player";

export function oreEncounter(player: Player): {log: string[], updatedPlayer: Player} {
    const log: string[] = [];
    const oreList = getMaterialByTypeAndTier("ore", player.tier);
    if (oreList.length === 0) {
        log.push("You search the area but find no usuable ore.");
        return {log, updatedPlayer: player};
    }
    const randomOre = oreList[Math.floor(Math.random() * oreList.length)];
    const oreNum = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < oreNum; i++) {
        player.inventory.push(randomOre.name);
    }

    log.push(`You discover and collect ${oreNum} ${randomOre.name}!`);

    return {log, updatedPlayer: player};
}

export function forgeEncounter(player: Player): {log: string[], updatedPlayer: Player} {
    const log = refineOresToIngots(player);
    player.forgeAvailable = true;
    log.push("You discovered a forge! You can now craft ingots using 'craft material <ingot> <material>. For example: craft material copper_ingot copper_blade.");
    return {log, updatedPlayer: player};

}
