import { form } from "$app/server";

export interface Aksara {
    latin: string;
    jawa: string;
    neptu: number;
}

export const aksaraList: Aksara[] = [
    { latin: "ha", jawa: "ꦲ", neptu: 1 },
    { latin: "na", jawa: "ꦤ", neptu: 2 },
    { latin: "ca", jawa: "ꦕ", neptu: 3 },
    { latin: "ra", jawa: "ꦫ", neptu: 4 },
    { latin: "ka", jawa: "ꦏ", neptu: 5 },
    { latin: "da", jawa: "ꦢ", neptu: 6 },
    { latin: "ta", jawa: "ꦠ", neptu: 7 },
    { latin: "sa", jawa: "ꦱ", neptu: 8 },
    { latin: "wa", jawa: "ꦮ", neptu: 9 },
    { latin: "la", jawa: "ꦭ", neptu: 10 },
    { latin: "pa", jawa: "ꦥ", neptu: 11 },
    { latin: "dha", jawa: "ꦝ", neptu: 12 },
    { latin: "ja", jawa: "ꦗ", neptu: 13 },
    { latin: "ya", jawa: "ꦪ", neptu: 14 },
    { latin: "ny", jawa: "ꦚ", neptu: 15 },
    { latin: "ma", jawa: "ꦩ", neptu: 16 },
    { latin: "ga", jawa: "ꦒ", neptu: 17 },
    { latin: "ba", jawa: "ꦧ", neptu: 18 },
    { latin: "tha", jawa: "ꦛ", neptu: 19 },
    { latin: "ng", jawa: "ꦔ", neptu: 20 },
];

export const soundRules = [
    { from: "ng", to: "ng" },
    { from: "ny", to: "ny" },
    { from: "dha", to: "dha" },
    { from: "tha", to: "tha" },
    { from: "dh", to: "dha" },
    { from: "th", to: "tha" },
    { from: "f", to: "pa" },
    { from: "v", to: "pa" },
    { from: "b", to: "ba" },
    { from: "c", to: "ca" },
    { from: "d", to: "da" },
    { from: "g", to: "ga" },
    { from: "h", to: "ha" },
    { from: "j", to: "ja" },
    { from: "k", to: "ka" },
    { from: "l", to: "la" },
    { from: "m", to: "ma" },
    { from: "n", to: "na" },
    { from: "p", to: "pa" },
    { from: "r", to: "ra" },
    { from: "s", to: "sa" },
    { from: "t", to: "ta" },
    { from: "w", to: "wa" },
    { from: "y", to: "ya" },
    { from: "a", to: "ha" },
    { from: "i", to: "ha" },
    { from: "u", to: "ha" },
    { from: "e", to: "ha" },
    { from: "o", to: "ha" },
    { from: "z", to: "ja" },
];

export const hariNeptu: Record<number, number> = {
    0: 5, // Sunday
    1: 4, // Monday
    2: 3, // Tuesday
    3: 7, // Wednesday
    4: 8, // Thursday
    5: 6, // Friday
    6: 9, // Saturday
};

export const pasaran = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];
export const pasaranNeptu: Record<string, number> = {
    Legi: 5,
    Pahing: 9,
    Pon: 7,
    Wage: 4,
    Kliwon: 8,
};

export function translateWord(word: string): { result: Aksara[]; total: number } {
    // Basic cleanup: remove everything except lowercase latin letters
    word = word.toLowerCase().replace(/[^a-z]/g, "");

    // NOTE: Rule skipping double letters removed to satisfy "Alimuddin" requirement (ꦢ꧀ꦢ)

    const res: Aksara[] = [];
    let total = 0;
    let i = 0;

    const isVowelChar = (char: string) => ["a", "i", "u", "e", "o"].includes(char);

    // Rule: vokal diawal tidak dihitung jika disandingkan dengan huruf H 
    // selain itu dihitung sebagai ha (dan tidak semua huruf awal bernilai 0)
    if (i < word.length && isVowelChar(word[i])) {
        const nextChar = word[i + 1];
        if (nextChar === 'h') {
            // Case "Ahmad": Skip 'A' entirely, processing starts from 'h'
            i++;
        } else {
            // Case "Alimuddin", "Erlang": 'A/E' becomes starting Aksara 'Ha' with full neptu
            const aksara = aksaraList.find(a => a.latin === "ha");
            if (aksara) {
                res.push({ ...aksara });
                total += aksara.neptu;
            }
            i++;
        }
    }

    while (i < word.length) {
        let matched = false;

        for (const rule of soundRules) {
            if (word.startsWith(rule.from, i)) {
                // Ignore middle/end vowels for neptu/aksara generation (they are sandhangan)
                if (isVowelChar(rule.from)) {
                    i += rule.from.length;
                    matched = true;
                    break;
                }

                // Consonant handling
                const nextIdx = i + rule.from.length;
                const hasVowelAfter = nextIdx < word.length && isVowelChar(word[nextIdx]);

                const aksara = aksaraList.find((a) => a.latin === rule.to);
                if (aksara) {
                    let neptuValue = aksara.neptu;

                    // Rule: 'n' (sigegan) tidak didampingi vokal bernilai 0
                    if (!hasVowelAfter && rule.from === "n") {
                        neptuValue = 0;
                    }

                    res.push({ ...aksara, neptu: neptuValue });
                    total += neptuValue;
                }

                i += rule.from.length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            i++;
        }
    }
    return { result: res, total };
}

export function translateName(name: string) {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const wordDetails = words.map((w) => {
        const { result, total } = translateWord(w);
        return { word: w, result, total };
    });
    const totalNama = wordDetails.reduce((sum, w) => sum + w.total, 0);
    return { wordDetails, totalNama };
}

export function hitungPasaran(date: Date): { pasaran: string; neptu: number } {
    const ref = new Date(Date.UTC(1970, 0, 1));
    const tUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const diffInMs = tUTC.getTime() - ref.getTime();
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const idx = (((days + 3) % 5) + 5) % 5;
    const p = pasaran[idx];
    return { pasaran: p, neptu: pasaranNeptu[p] };
}

export function getSiklus4(value: number) {
    const idx = ((value - 1) % 4) + 1;
    const catMap: Record<number, string> = {
        1: "Gonto",
        2: "Gembili",
        3: "Sri",
        4: "Punggul",
    };
    return { idx, label: catMap[idx] };
}

export function getSiklus5(value: number) {
    let sisa = value % 5;
    if (sisa === 0) sisa = 5;
    const catMap: Record<number, string> = {
        1: "Sri",
        2: "Lungguh",
        3: "Dunya",
        4: "Lara",
        5: "Pati",
    };
    return { idx: sisa, label: catMap[sisa] };
}

export function getSiklus7(value: number) {
    let sisa = value % 7;
    if (sisa === 0) sisa = 7;
    const catMap: Record<number, string> = {
        1: "Wasesa Segara",
        2: "Tunggak Semi",
        3: "Satriya Wibawa",
        4: "Sumur Sinaba",
        5: "Satriya Wirang",
        6: "Bumi Kepetak",
        7: "Lebu Ketiup Angin",
    };
    return { idx: sisa, label: catMap[sisa] };
}

export function getSiklus8(value: number) {
    let sisa = value % 8;
    if (sisa === 0) sisa = 8;
    const catMap: Record<number, string> = {
        1: "Pegat",
        2: "Ratu",
        3: "Jodoh",
        4: "Topo",
        5: "Tinari",
        6: "Padu",
        7: "Sujanan",
        8: "Pesthi",
    };
    return { idx: sisa, label: catMap[sisa] };
}

export function hitungKategori(totalNama: number, totalWeton: number) {
    // 1. Individual Insight (modulo 5) for name and weton individually
    const nameCat = getSiklus5(totalNama);
    const wetonCat = getSiklus5(totalWeton);

    // 2. Combined Results
    // Siklus 5: Based on Name + Weton per request (nama + weton % 5)
    // Other cycles (4, 7, 8): Based on Weton neptu for marriage (standard Primbon Jodoh)
    return {
        nameCat,
        wetonCat,
        siklus4: getSiklus4(totalWeton),
        siklus5: getSiklus5(totalNama + totalWeton),
        siklus7: getSiklus7(totalWeton),
        siklus8: getSiklus8(totalWeton),
    };
}
