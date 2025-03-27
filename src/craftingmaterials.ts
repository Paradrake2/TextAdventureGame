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
        name: "orc tooth",
        allowedSlots: ["blade", "handle"],
        health: 1,
        damage: 8,
        synergyTags: ["orc"]
    },
    {
        id: 1,
        name: "goblin bone",
        allowedSlots: ["guard"],
        health: 1,
        damage: 1,
        synergyTags: ["goblin"]
    },
    {
        id: 2,
        name: "wolf fang",
        allowedSlots: ["blade"],
        health: 1,
        damage: 17,
        synergyTags: ["wolf"]
    },
    {
        id: 3,
        name: "rat tooth",
        allowedSlots: ["blade"],
        health: 0,
        damage: 3,
        synergyTags: ["rat"]
    },
    {
        id: 4,
        name: "kobold bone",
        allowedSlots: ["guard", "handle"],
        health: 10,
        damage: 1,
        synergyTags: ["kobold"]
    },
    {
        id: 5,
        name: "orc bone",
        allowedSlots: ["guard", "handle"],
        health: 9,
        damage: 2,
        synergyTags: ["orc"]
    },
    {
        id: 6,
        name: "wolf bone",
        allowedSlots: ["guard", "handle"],
        health: 8,
        damage: 3,
        synergyTags: ["wolf"]
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