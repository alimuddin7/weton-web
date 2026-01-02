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
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const hari = dob.getDay();
        const dayName = dayNames[hari];
        const neptuHari = hariNeptu[hari];
        const totalWeton = neptuHari + neptuPas;

        return {
            name,
            wordDetails,
            totalNama,
            dayName,
            pasaran,
            neptuHari,
            neptuPas,
            totalWeton,
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
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
    <header class="text-center mb-12">
        <h1
            class="text-5xl font-bold text-primary mb-2 tracking-widest uppercase"
        >
            Weton Jawa
        </h1>
        <p class="text-secondary tracking-widest opacity-80">
            Kawruh Primbon & Aksara Jawa Modern
        </p>
        <div class="divider divider-primary w-24 mx-auto mt-4"></div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Person 1 Card -->
        <div class="card bg-base-200 shadow-xl border border-primary/20">
            <div class="card-body">
                <h2
                    class="card-title text-primary uppercase text-sm tracking-widest mb-4"
                >
                    Orang Pertama
                </h2>
                <div class="form-control w-full">
                    <label class="label" for="name1"
                        ><span class="label-text opacity-70">Nama Lengkap</span
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
                        ><span class="label-text opacity-70">Tanggal Lahir</span
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
            class="card bg-base-200 shadow-xl border border-secondary/20 relative overflow-hidden"
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
                        onclick={() => (hasPartner = false)}>Sembunyikan</button
                    >
                </div>
                <div class="form-control w-full">
                    <label class="label" for="name2"
                        ><span class="label-text opacity-70">Nama Lengkap</span
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
                        ><span class="label-text opacity-70">Tanggal Lahir</span
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
                <div class="space-y-6">
                    <div class="card bg-neutral text-neutral-content shadow-lg">
                        <div class="card-body p-6">
                            <h3
                                class="font-bold text-primary mb-4 flex items-center gap-2"
                            >
                                <span class="badge badge-primary badge-sm"
                                ></span> Transliterasi Aksara
                            </h3>
                            <div class="space-y-4">
                                {#each p1Data.wordDetails as word}
                                    <div>
                                        <div
                                            class="text-xs opacity-50 mb-1 uppercase tracking-tighter"
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
                        class="stats stats-vertical bg-base-200 shadow border border-primary/10 w-full text-sm"
                    >
                        <div class="stat p-3">
                            <div class="stat-title text-xs">
                                Total Neptu Nama
                            </div>
                            <div class="stat-value text-xl text-primary">
                                {p1Data.totalNama}
                            </div>
                        </div>
                        <div class="stat p-3">
                            <div class="stat-title text-xs">Weton</div>
                            <div class="stat-value text-xl">
                                {p1Data.dayName}
                                {p1Data.pasaran}
                            </div>
                        </div>
                        <div class="stat p-3">
                            <div class="stat-title text-xs text-secondary">
                                Total Neptu Weton
                            </div>
                            <div class="stat-value text-xl">
                                {p1Data.totalWeton}
                            </div>
                            <div class="stat-desc opacity-40">
                                {p1Data.neptuHari} + {p1Data.neptuPas}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- P2 Details -->
                {#if p2Data}
                    <div class="space-y-6">
                        <div
                            class="card bg-neutral text-neutral-content shadow-lg"
                        >
                            <div class="card-body p-6">
                                <h3
                                    class="font-bold text-secondary mb-4 flex items-center gap-2"
                                >
                                    <span class="badge badge-secondary badge-sm"
                                    ></span> Transliterasi Aksara
                                </h3>
                                <div class="space-y-4">
                                    {#each p2Data.wordDetails as word}
                                        <div>
                                            <div
                                                class="text-xs opacity-50 mb-1 uppercase tracking-tighter"
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
                            class="stats stats-vertical bg-base-200 shadow border border-secondary/10 w-full text-sm"
                        >
                            <div class="stat p-3">
                                <div class="stat-title text-xs">
                                    Total Neptu Nama
                                </div>
                                <div class="stat-value text-xl text-secondary">
                                    {p2Data.totalNama}
                                </div>
                            </div>
                            <div class="stat p-3">
                                <div class="stat-title text-xs">Weton</div>
                                <div class="stat-value text-xl">
                                    {p2Data.dayName}
                                    {p2Data.pasaran}
                                </div>
                            </div>
                            <div class="stat p-3">
                                <div class="stat-title text-xs text-primary">
                                    Total Neptu Weton
                                </div>
                                <div class="stat-value text-xl">
                                    {p2Data.totalWeton}
                                </div>
                                <div class="stat-desc opacity-40">
                                    {p2Data.neptuHari} + {p2Data.neptuPas}
                                </div>
                            </div>
                        </div>
                    </div>
                {:else}
                    <div
                        class="hidden md:flex items-center justify-center opacity-10"
                    >
                        <div
                            class="text-8xl italic font-serif opacity-10 uppercase -rotate-12"
                        >
                            Weton
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Primbon Summary Card -->
            {#if combinedResult}
                <div
                    class="card bg-primary text-primary-content shadow-2xl relative overflow-hidden"
                >
                    <div
                        class="absolute -right-12 -top-12 opacity-10 text-[10rem] font-serif italic"
                    >
                        Primbon
                    </div>
                    <div class="card-body">
                        <h2
                            class="card-title uppercase tracking-[0.2em] text-sm opacity-80 mb-4"
                        >
                            Ramalan Primbon {hasPartner ? "Jodoh" : "Pribadi"}
                        </h2>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div
                                class="bg-black/20 p-6 rounded-box backdrop-blur-md"
                            >
                                <div class="text-xs opacity-60 uppercase mb-2">
                                    Siklus 5 (Aura Hidup)
                                </div>
                                <div
                                    class="text-3xl font-bold mb-2 text-warning"
                                >
                                    {combinedResult.siklus5.label}
                                </div>
                                <div class="text-xs font-mono opacity-50">
                                    Rumus: ({p1Data.totalNama} + {p2Data?.totalNama ??
                                        0}) % ({p1Data.totalWeton} + {p2Data?.totalWeton ??
                                        0}) = Sisa {combinedResult.sisa}
                                </div>
                            </div>

                            <div
                                class="bg-black/20 p-6 rounded-box backdrop-blur-md border border-white/5"
                            >
                                <div class="text-xs opacity-60 uppercase mb-2">
                                    Siklus 7 (Nasib Perjalanan)
                                </div>
                                <div class="text-xl font-bold mb-2 text-white">
                                    {combinedResult.siklus7.label}
                                </div>
                                <div class="text-xs font-mono opacity-50">
                                    Rumus: ({p1Data.totalNama +
                                        (p2Data?.totalNama ?? 0)} + {p1Data.totalWeton +
                                        (p2Data?.totalWeton ?? 0)}) % 7 = Sisa {combinedResult
                                        .siklus7.idx}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/if}

    <footer class="mt-20 py-8 text-center text-xs opacity-30 italic space-y-2">
        <div>
            &copy; 2026 Ahmad Fikri Alimuddin. All results are based on
            traditional Javanese Primbon cycles.
        </div>
        <div class="flex justify-center gap-4">
            <span>#SvelteKit</span>
            <span>#DaisyUI</span>
            <span>#JavaHeritage</span>
        </div>
    </footer>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,700&family=Inter:wght@400;700;900&display=swap");

    :global(:root) {
        font-family: "Inter", sans-serif;
    }

    .font-serif {
        font-family: "Cormorant Garamond", serif;
    }
</style>
