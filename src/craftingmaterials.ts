export type CraftingSlot = "blade" | "guard" | "handle";

export interface Material {
    id: number;
    name: string;
    allowedSlots: CraftingSlot[];
    health: number;
    damage: number;
    synergyTags?: string[];
}

export function getMaterialByName(name: string) {
    return materials.find(mat => mat.name.toLowerCase() === name.toLowerCase());
}

export const materials: Material[] = [
    {
        id: 0,
        name: "orc_tooth",
        allowedSlots: ["blade", "handle"],
        health: 1,
        damage: 8,
        synergyTags: ["orc"]
    },
    {
        id: 1,
        name: "goblin_bone",
        allowedSlots: ["guard"],
        health: 1,
        damage: 1,
        synergyTags: ["goblin"]
    },
    {
        id: 2,
        name: "wolf_fang",
        allowedSlots: ["blade"],
        health: 1,
        damage: 17,
        synergyTags: ["wolf"]
    },
    {
        id: 3,
        name: "rat_tooth",
        allowedSlots: ["blade"],
        health: 0,
        damage: 3,
        synergyTags: ["rat"]
    },
    {
        id: 4,
        name: "kobold_bone",
        allowedSlots: ["guard", "handle"],
        health: 10,
        damage: 1,
        synergyTags: ["kobold"]
    },
    {
        id: 5,
        name: "orc_bone",
        allowedSlots: ["guard", "handle"],
        health: 9,
        damage: 2,
        synergyTags: ["orc"]
    },
    {
        id: 6,
        name: "wolf_bone",
        allowedSlots: ["guard", "handle"],
        health: 8,
        damage: 3,
        synergyTags: ["wolf"]
    },
    {
        id:  7,
        name: "hellhound_fang",
        allowedSlots: ["blade"],
        health: 3,
        damage: 20,
        synergyTags: ["hellhound"]
    },
    {
        id:  8,
        name: "hellhound_claw",
        allowedSlots: ["blade", "guard"],
        health: 7,
        damage: 16,
        synergyTags: ["hellhound"]
    },
    {
        id:  9,
        name: "hellhound_bone",
        allowedSlots: ["guard", "handle"],
        health: 10,
        damage: 7,
        synergyTags: ["hellhound"]
    },
    {
        id:  10,
        name: "minotaur_horn",
        allowedSlots: ["blade"],
        health: 10,
        damage: 13,
        synergyTags: ["minotaur"]
    },
    {
        id:  11,
        name: "minotaur_bone",
        allowedSlots: ["guard","handle"],
        health: 15,
        damage: 3,
        synergyTags: ["minotaur"]
    },
    {
        id:  12,
        name: "kobold_tooth",
        allowedSlots: ["blade"],
        health: 3,
        damage: 10,
        synergyTags: ["kobold"]
    },
    /*
    {
        id:  ,
        name: "",
        allowedSlots: [""],
        health: ,
        damage: ,
        synergyTags: []
    },
    */
]