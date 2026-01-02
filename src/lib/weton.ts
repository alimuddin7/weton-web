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
    { latin: "ja", "jawa": "ꦗ", neptu: 13 },
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
    word = word.toLowerCase();
    const res: Aksara[] = [];
    let total = 0;
    let i = 0;

    while (i < word.length) {
        let matched = false;
        for (const rule of soundRules) {
            if (word.startsWith(rule.from, i)) {
                const isVowel = ["a", "i", "u", "e", "o"].includes(rule.from);
                if (isVowel) {
                    const isStart = i === 0;
                    if (!isStart) {
                        i += rule.from.length;
                        matched = true;
                        break;
                    }
                }

                const aksara = aksaraList.find((a) => a.latin === rule.to);
                if (aksara) {
                    res.push(aksara);
                    total += aksara.neptu;
                    i += rule.from.length;
                    matched = true;
                    break;
                }
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

export function hitungKategori(totalNama: number, totalWeton: number) {
    let sisa = totalNama % totalWeton;
    if (sisa === 0) sisa = totalWeton;

    // Siklus 5
    const idx5 = ((sisa - 1) % 5) + 1;
    const cat5Map: Record<number, string> = {
        1: "Sri (Kemakmuran)",
        2: "Rejeki (Keberuntungan)",
        3: "Gedhong (Kemapanan)",
        4: "Loro (Rintangan)",
        5: "Pati (Kegagalan)",
    };

    // Siklus 7 (Only TotalNama % 7)
    let idx7 = totalNama % 7;
    if (idx7 === 0) idx7 = 7;

    const cat7Map: Record<number, string> = {
        1: "Wasesa segara (Pemaaf, pemurah, rezeki luas)",
        2: "Tunggak semi (Rejeki selalu ada/mengalir)",
        3: "Satriya wibawa (Mendapat kemuliaan/kebahagiaan)",
        4: "Sumur seneba (Tempat pengungsian, ilmu melimpah)",
        5: "Satria wirang (Sering mendapat malu/rintangan)",
        6: "Bumi kapetak (Tabah, kuat lahir batin)",
        7: "Lebu katiyub angin (Rejeki cepat habis, sulit cita-cita)",
    };

    return {
        sisa,
        siklus5: { idx: idx5, label: cat5Map[idx5] },
        siklus7: { idx: idx7, label: cat7Map[idx7] },
    };
}
