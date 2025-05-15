export type Type = "Physical" | "Mental" | "Social" | "Reflective" | "Productivity";

export const ALL_TYPES: Type[] = ["Physical", "Mental", "Social", "Reflective", "Productivity"];

export const Keywords: Record<Type, string []> = {
    Physical: ["run", "walk", "eat", "drink", "exercise", "breathe", "stretch"],
    Mental: ["read", "study", "learn", "focus"],
    Social: ["call", "talk", "meet"],
    Reflective: ["meditate", "journal", "reflect"],
    Productivity: ["plan", "write", "organize", "work", "focus"]
}
