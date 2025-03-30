export type CraftingSlot = "blade" | "guard" | "handle" | "plate" | "none";
export type MaterialType = "ore" | "ingot" | "crafted_material" | "drop";
export interface Material {
    id: number;
    name: string;
    type: MaterialType;
    allowedSlots: CraftingSlot[];
    health: number;
    damage: number;
    tier: number;
    synergyTags?: string[];
}

export function getMaterialByName(name: string) {
    return materials.find(mat => mat.name.toLowerCase() === name.toLowerCase());
}

export function getMaterialByType(type: MaterialType) {
    return materials.filter(mat => mat.type === type);
}

export function getMaterialByTier(tier: number) {
    return materials.filter(mat => mat.tier === tier);
}

export function getMaterialByTypeAndTier(type: MaterialType, tier: number) {
    return materials.filter(mat => mat.type === type && mat.tier === tier);
}

export const materials: Material[] = [
    {
        id: 0,
        name: "orc_tooth",
        type: "drop",
        allowedSlots: ["blade", "handle"],
        health: 1,
        damage: 8,
        tier: 0,
        synergyTags: ["orc"]
    },
    {
        id: 1,
        name: "goblin_bone",
        type: "drop",
        allowedSlots: ["guard"],
        health: 1,
        damage: 1,
        tier: 0,
        synergyTags: ["goblin"]
    },
    {
        id: 2,
        name: "wolf_fang",
        type: "drop",
        allowedSlots: ["blade"],
        health: 1,
        damage: 17,
        tier: 0,
        synergyTags: ["wolf"]
    },
    {
        id: 3,
        name: "rat_tooth",
        type: "drop",
        allowedSlots: ["blade"],
        health: 0,
        damage: 3,
        tier: 0,
        synergyTags: ["rat"]
    },
    {
        id: 4,
        name: "kobold_bone",
        type: "drop",
        allowedSlots: ["guard", "handle"],
        health: 10,
        damage: 1,
        tier: 0,
        synergyTags: ["kobold"]
    },
    {
        id: 5,
        name: "orc_bone",
        type: "drop",
        allowedSlots: ["guard", "handle"],
        health: 9,
        damage: 2,
        tier: 0,
        synergyTags: ["orc"]
    },
    {
        id: 6,
        name: "wolf_bone",
        type: "drop",
        allowedSlots: ["guard", "handle"],
        health: 8,
        damage: 3,
        tier: 0,
        synergyTags: ["wolf"]
    },
    {
        id:  7,
        name: "hellhound_fang",
        type: "drop",
        allowedSlots: ["blade"],
        health: 3,
        damage: 20,
        tier: 0,
        synergyTags: ["hellhound"]
    },
    {
        id:  8,
        name: "hellhound_claw",
        type: "drop",
        allowedSlots: ["blade", "guard"],
        health: 7,
        damage: 16,
        tier: 0,
        synergyTags: ["hellhound"]
    },
    {
        id:  9,
        name: "hellhound_bone",
        type: "drop",
        allowedSlots: ["guard", "handle"],
        health: 10,
        damage: 7,
        tier: 0,
        synergyTags: ["hellhound"]
    },
    {
        id:  10,
        name: "minotaur_horn",
        type: "drop",
        allowedSlots: ["blade"],
        health: 10,
        damage: 13,
        tier: 0,
        synergyTags: ["minotaur"]
    },
    {
        id:  11,
        name: "minotaur_bone",
        type: "drop",
        allowedSlots: ["guard","handle"],
        health: 15,
        damage: 3,
        tier: 0,
        synergyTags: ["minotaur"]
    },
    {
        id:  12,
        name: "kobold_tooth",
        type: "drop",
        allowedSlots: ["blade"],
        health: 3,
        damage: 10,
        tier: 0,
        synergyTags: ["kobold"]
    },
    {
        id:  13,
        name: "iron_ingot",
        type: "ingot",
        allowedSlots: ["blade","guard", "handle", "plate", "none"],
        health: 0,
        damage: 0,
        tier: 0,
        synergyTags: ["iron"]
    },
    {
        id:  14,
        name: "iron_blade",
        type: "crafted_material",
        allowedSlots: ["blade"],
        health: 30,
        damage: 4,
        tier: 0,
        synergyTags: ["iron"]
    },
    {
        id:  15,
        name: "iron_guard",
        type: "crafted_material",
        allowedSlots: ["guard"],
        health: 20,
        damage: 1,
        tier: 0,
        synergyTags: ["iron"]
    },
    {
        id:  16,
        name: "iron_handle",
        type: "crafted_material",
        allowedSlots: ["handle"],
        health: 10,
        damage: 8,
        tier: 0,
        synergyTags: ["iron"]
    },
    {
        id:  17,
        name: "iron_plate",
        type: "crafted_material",
        allowedSlots: ["plate"],
        health: 40,
        damage: 1,
        tier: 0,
        synergyTags: ["iron"]
    },
    {
        id:  18,
        name: "iron_ore",
        type: "ore",
        allowedSlots: ["none"],
        health: 0,
        damage: 0,
        tier: 2,
        synergyTags: ["iron"]
    },
    {
        id:  19,
        name: "copper_ore",
        type: "ore",
        allowedSlots: ["none"],
        health: 0,
        damage: 0,
        tier: 1,
        synergyTags: ["copper"]
    },
    {
        id:  20,
        name: "copper_ingot",
        type: "ingot",
        allowedSlots: ["blade","guard","handle","plate","none"],
        health: 0,
        damage: 0,
        tier: 0,
        synergyTags: ["copper"]
    },
    {
        id:  21,
        name: "copper_blade",
        type: "crafted_material",
        allowedSlots: ["blade"],
        health: 2,
        damage: 20,
        tier: 1,
        synergyTags: ["copper"]
    },
    {
        id:  22,
        name: "copper_guard",
        type: "crafted_material",
        allowedSlots: ["guard"],
        health: 10,
        damage: 2,
        tier: 0,
        synergyTags: ["copper"]
    },
    {
        id:  23,
        name: "copper_handle",
        type: "crafted_material",
        allowedSlots: ["handle"],
        health: 10,
        damage: 0,
        tier: 0,
        synergyTags: ["copper"]
    },
    {
        id:  24,
        name: "copper_plate",
        type: "crafted_material",
        allowedSlots: ["plate"],
        health: 15,
        damage: 1,
        tier: 0,
        synergyTags: ["copper"]
    },
    /*
    {
        id:  ,
        name: "",
        type: "",
        allowedSlots: [""],
        health: ,
        damage: ,
        tier: ,
        synergyTags: []
    },
    */
]