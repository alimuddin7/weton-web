<script lang="ts">
    import { calculateAbajadun, unsurInfo } from "$lib/abajadun";
    import { slide, fade } from "svelte/transition";

    let name = $state("محمد");
    let showKeyboard = $state(false);
    let result = $derived(calculateAbajadun(name));

    const getUnsurDetails = (u: string) => {
        return (
            (unsurInfo as any)[u] || {
                label: "Unknown",
                desc: "-",
                color: "text-base-content",
            }
        );
    };

    const keyboardRows = [
        ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
        ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
        ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ", "ّ"],
    ];

    function addChar(char: string) {
        name += char;
    }

    function backspace() {
        name = name.slice(0, -1);
    }
</script>

<div class="min-h-screen bg-batik">
    <div class="container mx-auto px-4 py-8 max-w-4xl relative">
        <header class="text-center mb-16 relative wayang-corner">
            <div
                class="flex flex-col md:flex-row items-center justify-center gap-6 mb-6"
            >
                <!-- Gunungan SVG Decoration - Slightly different for Abajadun -->
                <svg
                    width="100"
                    height="120"
                    viewBox="0 0 180 220"
                    class="gunungan-decoration opacity-40 scale-x-[-1]"
                >
                    <path
                        d="M90 15 L160 180 L20 180 Z"
                        fill="currentColor"
                        class="text-primary"
                        opacity="0.3"
                    />
                    <path
                        d="M90 35 L145 175 L35 175 Z"
                        fill="currentColor"
                        class="text-primary"
                        opacity="0.5"
                    />
                </svg>

                <h1
                    class="text-5xl md:text-6xl font-normal text-primary heading-heritage text-shadow-gold m-0"
                >
                    Hisab Abajadun
                </h1>
            </div>
            <p
                class="text-lg md:text-xl text-secondary tracking-[0.25em] opacity-90 italic font-heading mb-2"
            >
                Numerologi Arab & Unsur Alamiiyah
            </p>
            <p class="text-sm opacity-60 tracking-wider">
                حساب الأبجد - Menyelaraskan Nama dengan Cahaya Huruf
            </p>
            <div class="divider-javanese mt-8"></div>
        </header>

        <div class="max-w-2xl mx-auto mb-16">
            <div
                class="card bg-base-200 shadow-2xl border-2 border-primary/30 card-premium gradient-overlay-warm"
            >
                <div class="card-body">
                    <h2
                        class="card-title text-primary uppercase text-sm tracking-widest mb-4"
                    >
                        Input Nama Arab
                    </h2>
                    <div class="form-control w-full">
                        <label class="label" for="arabName">
                            <span class="label-text opacity-70"
                                >Masukkan Nama dalam Huruf Hijaiyah</span
                            >
                        </label>
                        <input
                            id="arabName"
                            type="text"
                            bind:value={name}
                            dir="rtl"
                            class="input input-bordered input-primary w-full bg-base-300 text-3xl h-16 font-serif text-center"
                            placeholder="محمد..."
                            onfocus={() => (showKeyboard = true)}
                        />
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-[10px] opacity-50 italic">
                                *Gunakan keyboard di bawah atau keyboard fisik
                                Anda.
                            </p>
                            <button
                                class="btn btn-xs btn-ghost text-primary text-[10px] uppercase tracking-widest"
                                onclick={() => (showKeyboard = !showKeyboard)}
                            >
                                {showKeyboard ? "Sembunyikan" : "Tampilkan"} Keyboard
                            </button>
                        </div>
                    </div>

                    {#if showKeyboard}
                        <div
                            transition:slide={{ duration: 300 }}
                            class="mt-6 p-4 bg-base-300/50 rounded-2xl border border-primary/20 space-y-2 select-none"
                            dir="rtl"
                        >
                            {#each keyboardRows as row}
                                <div
                                    class="flex flex-wrap justify-center gap-1"
                                >
                                    {#each row as key}
                                        <button
                                            class="btn btn-ghost btn-md bg-base-200 border border-primary/10 text-xl font-serif min-w-[3rem] h-12 p-0 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 keyboard-key"
                                            onclick={() => addChar(key)}
                                        >
                                            {key}
                                        </button>
                                    {/each}
                                </div>
                            {/each}
                            <div class="flex justify-center gap-1 mt-2">
                                <button
                                    class="btn btn-ghost btn-md bg-base-200 border border-primary/10 text-xl font-serif h-12 p-0 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 keyboard-key w-40 text-xs"
                                    onclick={() => addChar(" ")}
                                >
                                    Spasi
                                </button>
                                <button
                                    class="btn btn-ghost btn-md h-12 p-0 flex items-center justify-center transition-all duration-200 keyboard-key w-24 text-xs bg-error/20 border-error/30 text-error hover:bg-error/30"
                                    onclick={backspace}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        {#if result.details.length > 0}
            <div class="space-y-12">
                <!-- Main Result Card -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-2 space-y-8">
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
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Analisis Huruf & Nilai
                                </h3>

                                <div
                                    class="flex flex-wrap gap-4 items-start justify-end"
                                    dir="rtl"
                                >
                                    {#each result.details as detail}
                                        <div
                                            class="flex flex-col items-center p-3 rounded-lg bg-base-300/30 border border-white/5 min-w-[60px]"
                                        >
                                            <span
                                                class="text-4xl font-serif text-accent mb-1"
                                                >{detail.char}</span
                                            >
                                            <span
                                                class="text-sm font-bold text-primary"
                                                >{detail.value}</span
                                            >
                                            <span
                                                class="text-[9px] opacity-40 uppercase tracking-tighter mt-1"
                                                >{detail.unsur}</span
                                            >
                                        </div>
                                    {/each}
                                </div>

                                <div
                                    class="mt-8 pt-6 border-t border-white/5 flex justify-between items-center"
                                >
                                    <div
                                        class="text-sm opacity-60 uppercase tracking-widest"
                                    >
                                        Jumlah Total (Jummal)
                                    </div>
                                    <div
                                        class="text-4xl font-black text-primary drop-shadow-sm"
                                    >
                                        {result.total}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Unsur Card -->
                    <div class="space-y-4">
                        <div
                            class="card bg-base-200 shadow-xl border-2 border-secondary/20 card-premium h-full"
                        >
                            <div class="card-body items-center text-center">
                                <h3
                                    class="text-xs uppercase tracking-[0.2em] opacity-50 mb-4"
                                >
                                    Dominan Unsur
                                </h3>

                                {#if result.dominantUnsur !== "None"}
                                    {@const info = getUnsurDetails(
                                        result.dominantUnsur,
                                    )}
                                    <div
                                        class="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center mb-4 relative overflow-hidden"
                                    >
                                        <div
                                            class="absolute inset-0 bg-primary/5 animate-pulse"
                                        ></div>
                                        <span class="text-5xl">
                                            {#if result.dominantUnsur === "Fire"}🔥
                                            {:else if result.dominantUnsur === "Air"}💨
                                            {:else if result.dominantUnsur === "Water"}💧
                                            {:else}🌱{/if}
                                        </span>
                                    </div>
                                    <h4 class="text-2xl font-bold {info.color}">
                                        {info.label}
                                    </h4>
                                    <p
                                        class="text-xs opacity-70 leading-relaxed mt-2"
                                    >
                                        {info.desc}
                                    </p>

                                    <div class="w-full mt-6 space-y-2">
                                        {#each Object.entries(result.unsurCounts) as [u, count]}
                                            <div
                                                class="flex justify-between items-center text-[10px] uppercase tracking-wider"
                                            >
                                                <span class="opacity-60"
                                                    >{u}</span
                                                >
                                                <div
                                                    class="flex-1 mx-2 h-1 bg-white/5 rounded-full overflow-hidden"
                                                >
                                                    <div
                                                        class="h-full bg-primary"
                                                        style="width: {(count /
                                                            result.details
                                                                .length) *
                                                            100}%"
                                                    ></div>
                                                </div>
                                                <span class="font-bold"
                                                    >{count}</span
                                                >
                                            </div>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Guidance Section -->
                <div class="my-20">
                    <div class="divider-javanese"></div>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                        <div class="space-y-4">
                            <h2
                                class="text-3xl font-heading text-primary opacity-80"
                            >
                                Tentang Abajadun
                            </h2>
                            <p class="text-sm leading-relaxed opacity-70">
                                Hisab Jummal atau sistem Abajadun adalah metode
                                numerologi kuno yang menghubungkan huruf Arab
                                dengan nilai numerik. Sistem ini telah digunakan
                                selama berabad-abad dalam berbagai tradisi
                                keilmuan untuk memahami karakter, kecocokan, dan
                                energi yang terkandung dalam sebuah nama.
                            </p>
                        </div>
                        <div
                            class="bg-base-300/50 p-6 rounded-2xl border border-white/5 space-y-4"
                        >
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold"
                                >
                                    1-1000
                                </div>
                                <div>
                                    <h4 class="font-bold text-sm">
                                        Rentang Nilai
                                    </h4>
                                    <p class="text-[10px] opacity-60">
                                        Setiap huruf memiliki bobot energi dari
                                        Alif (1) hingga Ghain (1000).
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary font-bold"
                                >
                                    4
                                </div>
                                <div>
                                    <h4 class="font-bold text-sm">
                                        Empat Anasir
                                    </h4>
                                    <p class="text-[10px] opacity-60">
                                        Api, Angin, Air, dan Tanah - elemen
                                        pembentuk karakter manusia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Styling consistency with main page */
    .heading-heritage {
        font-family: "Marcellus", serif;
    }
    .font-heading {
        font-family: "Marcellus", serif;
    }
    .text-shadow-gold {
        text-shadow: 0 2px 4px rgba(212, 175, 55, 0.2);
    }
    .card-premium {
        border-radius: 2rem;
        background: linear-gradient(
            145deg,
            var(--tw-shadow-color, rgba(0, 0, 0, 0.05)),
            transparent
        );
    }
    .bg-batik {
        background-image: url("https://www.transparenttextures.com/patterns/batik-fractal.png");
        background-color: var(--b1);
    }
    .card-lontar {
        background-color: #f4e4bc;
        color: #4a3728;
        border: 1px solid #d4c49c;
        position: relative;
    }
    :global(.dark .card-lontar) {
        background-color: #1e1b16;
        color: #d4c49c;
        border: 1px solid #3d3522;
    }
    .divider-javanese {
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--p), transparent);
        margin: 2rem 0;
        opacity: 0.3;
    }
    [dir="rtl"] {
        font-family: "Noto Sans Arabic", sans-serif;
    }

    .keyboard-key {
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
    }

    .keyboard-key:active {
        transform: translateY(2px);
        box-shadow: none;
    }
</style>
