<script lang="ts">
    import {
        translateName,
        hitungPasaran,
        hariNeptu,
        hitungKategori,
    } from "$lib/weton";

    const today = new Date().toISOString().split("T")[0];
    let name1 = $state("Fulan");
    let Dob1 = $state(today);

    let hasPartner = $state(false);
    let name2 = $state("Fulanah");
    let Dob2 = $state(today);

    const getDetails = (name: string, dobString: string) => {
        if (!name || !dobString) return null;
        const dob = new Date(dobString);
        if (isNaN(dob.getTime())) return null;

        const { wordDetails, totalNama } = translateName(name);
        const { pasaran, neptu: neptuPas } = hitungPasaran(dob);
        const dayNames = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const hari = dob.getDay();
        const dayName = dayNames[hari];
        const neptuHari = hariNeptu[hari];
        const totalWeton = neptuHari + neptuPas;
        const individualResult = hitungKategori(totalNama, totalWeton);

        return {
            name,
            wordDetails,
            totalNama,
            dayName,
            pasaran,
            neptuHari,
            neptuPas,
            totalWeton,
            individualResult,
        };
    };

    let p1Data = $derived(getDetails(name1, Dob1));
    let p2Data = $derived(hasPartner ? getDetails(name2, Dob2) : null);

    let combinedResult = $derived.by(() => {
        if (!p1Data) return null;
        if (hasPartner && !p2Data) return null;

        const totalNama = p1Data.totalNama + (p2Data?.totalNama ?? 0);
        const totalWeton = p1Data.totalWeton + (p2Data?.totalWeton ?? 0);
        return hitungKategori(totalNama, totalWeton);
    });

    const siklus4Info = [
        {
            name: "Gonto",
            desc: "Sedikit atau jarang memiliki keturunan dalam rumah tangga.",
        },
        {
            name: "Gembili",
            desc: "Akan dikaruniai banyak keturunan dalam kehidupan rumah tangganya.",
        },
        {
            name: "Sri",
            desc: "Memiliki rezeki yang melimpah dalam kehidupan rumah tangganya.",
        },
        {
            name: "Punggul",
            desc: "Bermakna salah satu di antara suami dan istri akan meninggal.",
        },
    ];

    const siklus5MarriageInfo = [
        {
            name: "Sri",
            desc: "Memiliki banyak rezeki yang berlimpah dalam rumah tangga.",
        },
        {
            name: "Lungguh",
            desc: "Mendapatkan kedudukan, kehormatan, dan derajat yang baik.",
        },
        {
            name: "Dunya",
            desc: "Dalam kehidupan rumah tangganya akan menjadi kaya raya.",
        },
        {
            name: "Lara",
            desc: "Mendapat halangan berupa penderitaan atau penyakit dalam rumah tangganya.",
        },
        {
            name: "Pati",
            desc: "Salah satu pasangan diprediksi akan mengalami kegagalan atau kesulitan besar.",
        },
    ];

    const siklus5PersonalInfo = [
        {
            name: "Sri",
            desc: "Anda akan memiliki rezeki yang berlimpah dan keberuntungan hidup.",
        },
        {
            name: "Lungguh",
            desc: "Anda akan mendapatkan jabatan, kehormatan, dan pengakuan sosial.",
        },
        {
            name: "Dunya",
            desc: "Anda akan memperoleh materi dan kekayaan yang stabil dalam hidup.",
        },
        {
            name: "Lara",
            desc: "Anda harus berhati-hati terhadap rintangan kesehatan atau cobaan hidup.",
        },
        {
            name: "Pati",
            desc: "Anda perlu waspada terhadap tantangan besar atau kegagalan besar dalam hidup.",
        },
    ];

    let currentSiklus5Info = $derived(
        hasPartner ? siklus5MarriageInfo : siklus5PersonalInfo,
    );

    const siklus8Info = [
        {
            name: "Pegat",
            desc: "Banyak menemui masalah (ekonomi, komunikasi), rawan bercerai.",
        },
        {
            name: "Ratu",
            desc: "Disegani banyak orang dan kehidupan harmonis membuat iri.",
        },
        {
            name: "Jodoh",
            desc: "Harmonis, saling menerima, dan langgeng sampai tua.",
        },
        {
            name: "Topo",
            desc: "Sulit di awal, namun akan membaik setelah memiliki anak.",
        },
        {
            name: "Tinari",
            desc: "Banyak menemui kesenangan dan keberuntungan rezeki.",
        },
        {
            name: "Padu",
            desc: "Sering pertengkaran namun tidak sampai bercerai.",
        },
        {
            name: "Sujanan",
            desc: "Sering bertengkar dan rawan terjadi perselingkuhan.",
        },
        {
            name: "Pesthi",
            desc: "Damai, rukun, dan tenteram tanpa masalah besar.",
        },
    ];

    const siklus7Info = [
        {
            name: "Wasesa Segara",
            desc: "Pemaaf, pemurah, dan memiliki rezeki yang sangat luas.",
        },
        {
            name: "Tunggak Semi",
            desc: "Rezeki selalu mengalir, meski habis akan cepat tumbuh kembali.",
        },
        {
            name: "Satriya Wibawa",
            desc: "Mendapat kemuliaan, kewibawaan, kehormatan, dan kebahagiaan.",
        },
        {
            name: "Sumur Seneba",
            desc: "Menjadi tempat rujukan ilmu, bijaksana, dan berwawasan luas.",
        },
        {
            name: "Satria Wirang",
            desc: "Sering menghadapi rasa malu, rintangan, atau cobaan sosial.",
        },
        {
            name: "Bumi Kapetak",
            desc: "Sangat tabah, pekerja keras, dan kuat lahir batin menghadapi hidup.",
        },
        {
            name: "Lebu Katiyub Angin",
            desc: "Rezeki sulit mengendap, sering berpindah tempat atau cita-cita terhambat.",
        },
    ];
</script>

<div class="min-h-screen bg-batik">
    <div class="container mx-auto px-4 py-8 max-w-4xl relative">
        <header class="text-center mb-16 relative wayang-corner">
            <div
                class="flex flex-col md:flex-row items-center justify-center gap-6 mb-6"
            >
                <!-- Gunungan SVG Decoration -->
                <svg
                    width="100"
                    height="120"
                    viewBox="0 0 180 220"
                    class="gunungan-decoration"
                >
                    <!-- Main mountain shape -->
                    <defs>
                        <linearGradient
                            id="goldGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                style="stop-color:#d4af37;stop-opacity:0.8"
                            />
                            <stop
                                offset="50%"
                                style="stop-color:#c1440e;stop-opacity:0.6"
                            />
                            <stop
                                offset="100%"
                                style="stop-color:#8b6e3d;stop-opacity:0.9"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        d="M90 15 L160 180 L20 180 Z"
                        fill="url(#goldGradient)"
                        opacity="0.3"
                    />
                    <path
                        d="M90 35 L145 175 L35 175 Z"
                        fill="url(#goldGradient)"
                        opacity="0.5"
                    />
                    <path
                        d="M90 55 L130 170 L50 170 Z"
                        fill="url(#goldGradient)"
                        opacity="0.7"
                    />
                    <!-- Decorative circles -->
                    <circle
                        cx="90"
                        cy="90"
                        r="15"
                        stroke="#d4af37"
                        stroke-width="2"
                        fill="none"
                        opacity="0.4"
                    />
                    <circle
                        cx="90"
                        cy="90"
                        r="8"
                        fill="#d4af37"
                        opacity="0.3"
                    />
                    <!-- Base -->
                    <rect
                        x="82"
                        y="180"
                        width="16"
                        height="30"
                        fill="#8b6e3d"
                        opacity="0.5"
                    />
                    <!-- Ornamental dots -->
                    <circle
                        cx="90"
                        cy="120"
                        r="3"
                        fill="#d4af37"
                        opacity="0.6"
                    />
                </svg>

                <h1
                    class="text-5xl md:text-6xl font-normal text-primary heading-heritage text-shadow-gold m-0"
                >
                    Weton Jawa
                </h1>
            </div>
            <p
                class="text-lg md:text-xl text-secondary tracking-[0.25em] opacity-90 italic font-heading mb-2"
            >
                Kawruh Primbon & Aksara Jawa Modern
            </p>
            <p class="text-sm opacity-60 tracking-wider">
                ꦮꦺꦠꦺꦴꦤ꧀ ꦗꦮ - Menyelaraskan Tradisi dengan Masa Kini
            </p>
            <div class="divider-javanese mt-8"></div>
        </header>

        <!-- Religious Disclaimer Alert - MOVED TO TOP -->
        <div class="max-w-4xl mx-auto mb-16 px-0 md:px-4">
            <div
                class="alert bg-base-200 border-2 border-primary/40 flex flex-col md:flex-row gap-4 items-center text-center md:text-left p-6 shadow-xl card-premium"
            >
                <div class="text-3xl opacity-60">⚠️</div>
                <div>
                    <h3
                        class="font-bold text-primary uppercase tracking-wider mb-1"
                    >
                        Perhatian & Pengingat
                    </h3>
                    <div
                        class="text-sm opacity-100 leading-relaxed font-medium"
                    >
                        Aplikasi ini hanyalah sarana untuk melestarikan khazanah
                        perhitungan budaya Jawa (Primbon). Hasil perhitungan ini
                        tidaklah bersifat mutlak dan tidak boleh dijadikan
                        sebagai rujukan utama dalam mengambil keputusan hidup.
                        Tetaplah meyakini bahwa segala ketetapan, nasib, dan
                        takdir hanyalah milik
                        <span
                            class="font-bold text-primary underline decoration-2 underline-offset-4"
                            >Allah Subhana Wa Ta'ala</span
                        >.
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <!-- Person 1 Card -->
            <div
                class="card bg-base-200 shadow-2xl border-2 border-primary/30 card-premium gradient-overlay-warm"
            >
                <div class="card-body">
                    <h2
                        class="card-title text-primary uppercase text-sm tracking-widest mb-4"
                    >
                        Orang Pertama
                    </h2>
                    <div class="form-control w-full">
                        <label class="label" for="name1"
                            ><span class="label-text opacity-70"
                                >Nama Lengkap</span
                            ></label
                        >
                        <input
                            id="name1"
                            type="text"
                            bind:value={name1}
                            class="input input-bordered input-primary w-full bg-base-300"
                            placeholder="Masukkan nama..."
                        />
                    </div>
                    <div class="form-control w-full mt-4">
                        <label class="label" for="dob1"
                            ><span class="label-text opacity-70"
                                >Tanggal Lahir</span
                            ></label
                        >
                        <input
                            id="dob1"
                            type="date"
                            bind:value={Dob1}
                            class="input input-bordered input-primary w-full bg-base-300"
                        />
                    </div>
                </div>
            </div>

            <!-- Person 2 Card (Optional) -->
            <div
                class="card bg-base-200 shadow-2xl border-2 border-secondary/30 relative overflow-hidden card-premium gradient-overlay-gold"
            >
                {#if !hasPartner}
                    <div
                        class="absolute inset-0 bg-base-200/80 backdrop-blur-sm z-10 flex items-center justify-center"
                    >
                        <button
                            class="btn btn-secondary btn-outline btn-wide"
                            onclick={() => (hasPartner = true)}
                        >
                            <span class="text-lg">+</span> Tambah Pasangan (Jodoh)
                        </button>
                    </div>
                {/if}
                <div class="card-body">
                    <div class="flex justify-between items-center mb-4">
                        <h2
                            class="card-title text-secondary uppercase text-sm tracking-widest"
                        >
                            Orang Kedua
                        </h2>
                        <button
                            class="btn btn-ghost btn-xs text-error"
                            onclick={() => (hasPartner = false)}
                            >Sembunyikan</button
                        >
                    </div>
                    <div class="form-control w-full">
                        <label class="label" for="name2"
                            ><span class="label-text opacity-70"
                                >Nama Lengkap</span
                            ></label
                        >
                        <input
                            id="name2"
                            type="text"
                            bind:value={name2}
                            class="input input-bordered input-secondary w-full bg-base-300"
                            placeholder="Masukkan nama..."
                        />
                    </div>
                    <div class="form-control w-full mt-4">
                        <label class="label" for="dob2"
                            ><span class="label-text opacity-70"
                                >Tanggal Lahir</span
                            ></label
                        >
                        <input
                            id="dob2"
                            type="date"
                            bind:value={Dob2}
                            class="input input-bordered input-secondary w-full bg-base-300"
                        />
                    </div>
                </div>
            </div>
        </div>

        {#if p1Data}
            <div class="space-y-12">
                <!-- Person Details Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- P1 Details -->
                    <div class="space-y-8">
                        <div class="card card-lontar shadow-xl overflow-hidden">
                            <div class="card-body p-8">
                                <h3
                                    class="font-bold text-primary mb-6 flex items-center gap-3 uppercase tracking-widest text-xs border-b border-primary/10 pb-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        ><path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        /></svg
                                    >
                                    Transliterasi Aksara
                                </h3>
                                <div class="flex flex-wrap gap-8 items-start">
                                    {#each p1Data.wordDetails as word}
                                        <div
                                            class="flex items-start gap-4 p-2 rounded-lg bg-base-300/10 border border-white/5"
                                        >
                                            <div
                                                class="text-xs opacity-50 uppercase tracking-tighter mt-2 min-w-[60px]"
                                            >
                                                {word.word}
                                            </div>
                                            <div
                                                class="flex flex-wrap gap-2 items-end"
                                            >
                                                {#each word.result as a}
                                                    <div
                                                        class="flex flex-col items-center"
                                                    >
                                                        <span
                                                            class="text-3xl font-serif text-accent"
                                                            >{a.jawa}</span
                                                        >
                                                        <span
                                                            class="text-[10px] opacity-40 leading-none"
                                                            >{a.latin}:{a.neptu}</span
                                                        >
                                                    </div>
                                                {/each}
                                                <span
                                                    class="text-sm border-l border-white/10 pl-2 ml-1 text-primary"
                                                    >= {word.total}</span
                                                >
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>

                        <div
                            class="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-base-200/50 p-4 rounded-xl border border-primary/20 shadow-sm"
                        >
                            <div class="text-center">
                                <div
                                    class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                >
                                    Neptu Nama
                                </div>
                                <div class="text-xl text-primary font-bold">
                                    {p1Data.totalNama}
                                </div>
                            </div>
                            <div class="text-center border-l border-primary/10">
                                <div
                                    class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                >
                                    Weton
                                </div>
                                <div class="text-sm font-semibold px-1">
                                    {p1Data.dayName}
                                    {p1Data.pasaran}
                                </div>
                            </div>
                            <div class="text-center border-l border-primary/10">
                                <div
                                    class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                >
                                    Neptu Weton
                                </div>
                                <div class="text-xl font-bold">
                                    {p1Data.totalWeton}
                                </div>
                                <div class="text-[9px] opacity-40 -mt-1">
                                    {p1Data.neptuHari} + {p1Data.neptuPas}
                                </div>
                            </div>
                            <div class="text-center border-l border-primary/10">
                                <div
                                    class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                >
                                    Aura Nama
                                </div>
                                <div class="text-sm text-warning font-black">
                                    {p1Data.individualResult.nameCat.label}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- P2 Details -->
                    {#if p2Data}
                        <div class="space-y-8">
                            <div
                                class="card card-lontar shadow-xl overflow-hidden"
                            >
                                <div class="card-body p-8">
                                    <h3
                                        class="font-bold text-secondary mb-6 flex items-center gap-3 uppercase tracking-widest text-xs border-b border-secondary/10 pb-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            ><path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                            /></svg
                                        >
                                        Transliterasi Aksara
                                    </h3>
                                    <div
                                        class="flex flex-wrap gap-8 items-start"
                                    >
                                        {#each p2Data.wordDetails as word}
                                            <div
                                                class="flex items-start gap-4 p-2 rounded-lg bg-base-300/10 border border-white/5"
                                            >
                                                <div
                                                    class="text-xs opacity-50 uppercase tracking-tighter mt-2 min-w-[60px]"
                                                >
                                                    {word.word}
                                                </div>
                                                <div
                                                    class="flex flex-wrap gap-2 items-end"
                                                >
                                                    {#each word.result as a}
                                                        <div
                                                            class="flex flex-col items-center"
                                                        >
                                                            <span
                                                                class="text-3xl font-serif text-accent"
                                                                >{a.jawa}</span
                                                            >
                                                            <span
                                                                class="text-[10px] opacity-40 leading-none"
                                                                >{a.latin}:{a.neptu}</span
                                                            >
                                                        </div>
                                                    {/each}
                                                    <span
                                                        class="text-sm border-l border-white/10 pl-2 ml-1 text-secondary"
                                                        >= {word.total}</span
                                                    >
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            </div>

                            <div
                                class="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-base-200/50 p-4 rounded-xl border border-secondary/20 shadow-sm"
                            >
                                <div class="text-center">
                                    <div
                                        class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                    >
                                        Neptu Nama
                                    </div>
                                    <div
                                        class="text-xl text-secondary font-bold"
                                    >
                                        {p2Data.totalNama}
                                    </div>
                                </div>
                                <div
                                    class="text-center border-l border-secondary/10"
                                >
                                    <div
                                        class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                    >
                                        Weton
                                    </div>
                                    <div class="text-sm font-semibold px-1">
                                        {p2Data.dayName}
                                        {p2Data.pasaran}
                                    </div>
                                </div>
                                <div
                                    class="text-center border-l border-secondary/10"
                                >
                                    <div
                                        class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                    >
                                        Neptu Weton
                                    </div>
                                    <div class="text-xl font-bold">
                                        {p2Data.totalWeton}
                                    </div>
                                    <div class="text-[9px] opacity-40 -mt-1">
                                        {p2Data.neptuHari} + {p2Data.neptuPas}
                                    </div>
                                </div>
                                <div
                                    class="text-center border-l border-secondary/10"
                                >
                                    <div
                                        class="text-[10px] uppercase opacity-60 font-bold mb-1"
                                    >
                                        Aura Nama
                                    </div>
                                    <div
                                        class="text-sm text-warning font-black"
                                    >
                                        {p2Data.individualResult.nameCat.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Primbon Summary Card -->
                {#if combinedResult}
                    <div
                        class="card bg-primary text-primary-content shadow-2xl relative overflow-hidden card-premium"
                    >
                        <div class="card-body">
                            <h2
                                class="card-title uppercase tracking-[0.2em] text-sm opacity-80 mb-4"
                            >
                                Ramalan Primbon {hasPartner
                                    ? "Jodoh"
                                    : "Pribadi"}
                            </h2>

                            <div
                                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                            >
                                <!-- Siklus 5 -->
                                <div
                                    class="glass-javanese p-4 rounded-box border border-white/5"
                                >
                                    <div
                                        class="text-[10px] uppercase opacity-60 mb-1"
                                    >
                                        Siklus 5
                                    </div>
                                    <div
                                        class="text-xl font-bold text-warning mb-1"
                                    >
                                        {combinedResult.siklus5.label}
                                    </div>
                                    <div
                                        class="text-[9px] font-mono opacity-50"
                                    >
                                        (N12 + W12) % 5 = {combinedResult
                                            .siklus5.idx}
                                    </div>
                                </div>

                                {#if hasPartner}
                                    <!-- Siklus 4 -->
                                    <div
                                        class="glass-javanese p-4 rounded-box border border-white/5"
                                    >
                                        <div
                                            class="text-[10px] uppercase opacity-60 mb-1"
                                        >
                                            Siklus 4
                                        </div>
                                        <div
                                            class="text-xl font-bold text-secondary mb-1"
                                        >
                                            {combinedResult.siklus4.label}
                                        </div>
                                        <div
                                            class="text-[9px] font-mono opacity-50"
                                        >
                                            W12 % 4 = {combinedResult.siklus4
                                                .idx}
                                        </div>
                                    </div>

                                    <!-- Siklus 7 -->
                                    <div
                                        class="glass-javanese p-4 rounded-box border border-white/5"
                                    >
                                        <div
                                            class="text-[10px] uppercase opacity-60 mb-1"
                                        >
                                            Siklus 7
                                        </div>
                                        <div
                                            class="text-xl font-bold text-primary mb-1"
                                        >
                                            {combinedResult.siklus7.label}
                                        </div>
                                        <div
                                            class="text-[9px] font-mono opacity-50"
                                        >
                                            W12 % 7 = {combinedResult.siklus7
                                                .idx}
                                        </div>
                                    </div>

                                    <!-- Siklus 8 -->
                                    <div
                                        class="glass-javanese p-4 rounded-box border border-white/5"
                                    >
                                        <div
                                            class="text-[10px] uppercase opacity-60 mb-1"
                                        >
                                            Siklus 8
                                        </div>
                                        <div
                                            class="text-xl font-bold text-accent mb-1"
                                        >
                                            {combinedResult.siklus8.label}
                                        </div>
                                        <div
                                            class="text-[9px] font-mono opacity-50"
                                        >
                                            W12 % 8 = {combinedResult.siklus8
                                                .idx}
                                        </div>
                                    </div>
                                {/if}
                            </div>

                            <div
                                class="mt-4 text-[10px] opacity-40 text-center font-mono italic"
                            >
                                *W12: {hasPartner ? "Gabungan" : "Total"} Neptu Weton
                                {hasPartner ? "Pasangan" : ""} ({p1Data.totalWeton}
                                {hasPartner ? " + " + p2Data?.totalWeton : ""} =
                                {p1Data.totalWeton + (p2Data?.totalWeton ?? 0)})
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Glossary Section -->
                <div class="my-20">
                    <div class="divider-javanese"></div>
                    <h2
                        class="text-center text-2xl font-heading text-primary mb-2 opacity-80"
                    >
                        Panduan Primbon
                    </h2>
                    <p
                        class="text-center text-sm opacity-50 tracking-widest mb-8"
                    >
                        KAWRUH JAWA TRADISIONAL
                    </p>
                </div>

                <div
                    class="grid grid-cols-1 {hasPartner
                        ? 'md:grid-cols-2 lg:grid-cols-4'
                        : 'max-w-md mx-auto'} gap-6 mb-20 px-2 lg:px-0"
                >
                    {#if hasPartner}
                        <!-- Card Siklus 4 -->
                        <div
                            class="card bg-base-300 shadow-xl border border-white/5 card-premium"
                        >
                            <div class="card-body p-5">
                                <h3
                                    class="text-secondary font-bold uppercase tracking-widest text-[10px] mb-3"
                                >
                                    Siklus 4 (Keturunan)
                                </h3>
                                <div class="space-y-3">
                                    {#each siklus4Info as item}
                                        <div class="flex flex-col">
                                            <div
                                                class="text-xs font-bold text-secondary"
                                            >
                                                {item.name}
                                            </div>
                                            <div
                                                class="text-[10px] opacity-50 leading-tight"
                                            >
                                                {item.desc}
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}

                    <!-- Card Siklus 5 -->
                    <div
                        class="card bg-base-300 shadow-xl border border-white/5 card-premium"
                    >
                        <div class="card-body p-5">
                            <h3
                                class="text-warning font-bold uppercase tracking-widest text-[10px] mb-3"
                            >
                                Siklus 5 (Aura Hidup)
                            </h3>
                            <div class="space-y-3">
                                {#each currentSiklus5Info as item}
                                    <div class="flex flex-col">
                                        <div
                                            class="text-xs font-bold text-warning"
                                        >
                                            {item.name}
                                        </div>
                                        <div
                                            class="text-[10px] opacity-50 leading-tight"
                                        >
                                            {item.desc}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    {#if hasPartner}
                        <!-- Card Siklus 7 -->
                        <div
                            class="card bg-base-300 shadow-xl border border-white/5 card-premium"
                        >
                            <div class="card-body p-5">
                                <h3
                                    class="text-primary font-bold uppercase tracking-widest text-[10px] mb-3"
                                >
                                    Siklus 7 (Kesejahteraan)
                                </h3>
                                <div class="space-y-3">
                                    {#each siklus7Info as item}
                                        <div class="flex flex-col">
                                            <div
                                                class="text-xs font-bold text-primary"
                                            >
                                                {item.name}
                                            </div>
                                            <div
                                                class="text-[10px] opacity-50 leading-tight"
                                            >
                                                {item.desc}
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}

                    {#if hasPartner}
                        <!-- Card Siklus 8 -->
                        <div
                            class="card bg-base-300 shadow-xl border border-white/5 card-premium"
                        >
                            <div class="card-body p-5">
                                <h3
                                    class="text-accent font-bold uppercase tracking-widest text-[10px] mb-3"
                                >
                                    Siklus 8 (Keharmonisan)
                                </h3>
                                <div class="space-y-2">
                                    {#each siklus8Info as item}
                                        <div class="flex flex-col">
                                            <div
                                                class="text-[11px] font-bold text-accent"
                                            >
                                                {item.name}
                                            </div>
                                            <div
                                                class="text-[10px] opacity-50 leading-tight"
                                            >
                                                {item.desc}
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}

        <!-- <footer
            class="mt-20 py-12 text-center text-xs opacity-40 italic space-y-4 relative"
        >
            <div class="divider w-48 mx-auto opacity-10"></div>
            <div>
                &copy; 2026 Ahmad Fikri Alimuddin. <br />
                Membangun Jembatan antara Tradisi & Teknologi.
            </div>
            <div
                class="flex justify-center gap-6 font-mono tracking-tighter uppercase opacity-60"
            >
                <span>#SvelteKit</span>
                <span>#Tailwind4</span>
                <span>#JavaHeritage</span>
            </div>
        </footer> -->
    </div>
</div>

<style>
</style>
