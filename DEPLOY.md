---
description: Memasukkan aplikasi ke Vercel (Deployment)
---

Karena proyek ini menggunakan SvelteKit, proses deploy ke Vercel sangatlah mudah. SvelteKit secara otomatis mendeteksi environment Vercel menggunakan `@sveltejs/adapter-auto`.

### Cara 1: Menggunakan Git (Sangat Disarankan)
Ini adalah cara terbaik karena aplikasi akan otomatis terupdate setiap kali Anda mengirim (push) kode ke GitHub/GitLab/Bitbucket.

1.  **Inisialisasi Git**:
    ```bash
    cd weton-web
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  **Push ke Repository Baru**:
    - Buat repository baru di GitHub.
    - Ikuti instruksi di GitHub untuk menghubungkan local repository Anda dan lakukan `git push`.
3.  **Hubungkan ke Vercel**:
    - Buka [Vercel Dashboard](https://vercel.com/dashboard).
    - Klik **"Add New"** -> **"Project"**.
    - Pilih repository Anda dari daftar GitHub.
    - Pada bagian **"Root Directory"**, pastikan Anda memilih folder `weton-web`.
    - Klik **"Deploy"**.

### Cara 2: Menggunakan Vercel CLI (Instan)
Jika Anda ingin cepat mendeploy tanpa harus membuat repository Git terlebih dahulu:

1.  **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```
2.  **Login**:
    ```bash
    vercel login
    ```
3.  **Deploy**:
    Mendeploy langsung dari folder proyek:
    ```bash
    cd weton-web
    vercel
    ```
    - Ikuti petunjuk di terminal (pilih "Y" untuk setup baru).
    - Lokasi folder: `./`.
    - Framework akan otomatis terdeteksi sebagai **SvelteKit**.

### Verifikasi
Setelah selesai, Vercel akan memberikan Anda URL unik (misalnya: `weton-jawa.vercel.app`).
