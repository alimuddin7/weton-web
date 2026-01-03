export interface ArabicChar {
    char: string;
    value: number;
    unsur: "Fire" | "Air" | "Water" | "Earth";
}

export const abajadunMap: Record<string, { value: number; unsur: "Fire" | "Air" | "Water" | "Earth" }> = {
    "ا": { value: 1, unsur: "Fire" },
    "أ": { value: 1, unsur: "Fire" },
    "إ": { value: 1, unsur: "Fire" },
    "آ": { value: 1, unsur: "Fire" },
    "ء": { value: 1, unsur: "Fire" },
    "ب": { value: 2, unsur: "Air" },
    "ج": { value: 3, unsur: "Water" },
    "د": { value: 4, unsur: "Earth" },
    "ه": { value: 5, unsur: "Fire" },
    "ة": { value: 400, unsur: "Air" }, // Taa marbuta usually 400 in Jummal
    "و": { value: 6, unsur: "Air" },
    "ز": { value: 7, unsur: "Water" },
    "ح": { value: 8, unsur: "Earth" },
    "ط": { value: 9, unsur: "Fire" },
    "ي": { value: 10, unsur: "Air" },
    "ى": { value: 10, unsur: "Air" }, // Alif maqsura
    "ك": { value: 20, unsur: "Water" },
    "ل": { value: 30, unsur: "Earth" },
    "م": { value: 40, unsur: "Fire" },
    "ن": { value: 50, unsur: "Air" },
    "س": { value: 60, unsur: "Water" },
    "ع": { value: 70, unsur: "Earth" },
    "ف": { value: 80, unsur: "Fire" },
    "ص": { value: 90, unsur: "Air" },
    "ق": { value: 100, unsur: "Water" },
    "ر": { value: 200, unsur: "Earth" },
    "ش": { value: 300, unsur: "Fire" },
    "ت": { value: 400, unsur: "Air" },
    "ث": { value: 500, unsur: "Water" },
    "خ": { value: 600, unsur: "Earth" },
    "ذ": { value: 700, unsur: "Fire" },
    "ض": { value: 800, unsur: "Air" },
    "ظ": { value: 900, unsur: "Water" },
    "غ": { value: 1000, unsur: "Earth" },
};

export interface AbajadunResult {
    char: string;
    value: number;
    unsur: string;
}

export function calculateAbajadun(text: string) {
    const rawChars = text.split("");
    const details: AbajadunResult[] = [];

    for (let i = 0; i < rawChars.length; i++) {
        const c = rawChars[i];
        if (abajadunMap[c]) {
            details.push({
                char: c,
                value: abajadunMap[c].value,
                unsur: abajadunMap[c].unsur
            });
        } else if (c === "ّ") { // Tasydid / Shadda
            // Traditionally, Shadda doubles the preceding letter's value
            if (details.length > 0) {
                const prev = details[details.length - 1];
                details.push({
                    char: `ّ (${prev.char})`,
                    value: prev.value,
                    unsur: prev.unsur
                });
            }
        }
    }

    const total = details.reduce((sum, item) => sum + item.value, 0);

    // Count unsur distribution
    const unsurCounts = details.reduce((acc, item) => {
        acc[item.unsur] = (acc[item.unsur] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Determine dominant unsur
    let dominantUnsur = "None";
    let maxCount = 0;
    for (const [u, count] of Object.entries(unsurCounts)) {
        if (count > maxCount) {
            maxCount = count;
            dominantUnsur = u;
        }
    }

    return { details, total, dominantUnsur, unsurCounts };
}

export const unsurInfo = {
    Fire: {
        label: "Nar (Api)",
        desc: "Bersemangat, kreatif, namun cenderung impulsif dan tegas.",
        color: "text-error"
    },
    Air: {
        label: "Hawa (Angin)",
        desc: "Komunikatif, cerdas, suka bersosialisasi dan dinamis.",
        color: "text-secondary"
    },
    Water: {
        label: "Ma' (Air)",
        desc: "Tenang, empatik, intuitif, namun bisa sangat mendalam emosinya.",
        color: "text-info"
    },
    Earth: {
        label: "Turab (Tanah)",
        desc: "Stabil, praktis, disiplin, dan sangat teguh pada prinsip.",
        color: "text-success"
    }
};
