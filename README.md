# 🌟 Naell — Linktree & Social Hub

Selamat datang di repositori Linktree resmi **Naell**. Menampilkan link profil GitHub, Discord, server komunitas Stealth-X, dan TikTok dengan tampilan modern bertema gelap/terang, animasi halus, dan dukungan penuh untuk **GitHub Pages**.

[![Deploy to GitHub Pages](https://github.com/naells/naells/actions/workflows/deploy.yml/badge.svg)](https://github.com/naells/naells/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)

---

## 🔗 Daftar Tautan / Socials

- 🐙 **GitHub**: [@naells](https://github.com/naells)
- 💬 **Discord Account**: `@bytecodev`
- 🛡️ **Discord Server**: [Stealth-X Community](https://discord.gg/stealth-x-1426911756424319089)
- 🎵 **TikTok**: [@bytecodev](https://www.tiktok.com/@bytecodev)

---

## 🚀 Fitur Unggulan

- 💎 **Desain Modern & Glassmorphic**: Animasi interaktif, glow ambient, dan efek kartu interaktif.
- 🌓 **Theme Switcher**: Beralih tema gelap (*Dark Mode* / *Stealth*) dan tema terang (*Light Mode*) dengan penyimpanan otomatis di browser.
- 📋 **Copy to Clipboard Interaktif**: Tombol sekali klik untuk menyalin tag Discord `@bytecodev` dengan notifikasi toast.
- 🌐 **Mendukung Penuh GitHub Pages**: Konfigurasi path relatif (`base: './'`) sehingga gambar dan stylesheet tidak akan rusak di sub-path repositori.
- 🤖 **CI/CD Otomatis**: GitHub Actions Workflow siap pakai untuk *auto-deploy* setiap kali melakukan push ke branch `main`.

---

## 💻 Menjalankan di Komputer Lokal

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka browser di alamat `http://localhost:3000`.

3. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 🌐 Cara Deploy ke GitHub Pages

### Cara 1: Otomatis via GitHub Actions (Rekomendasi)
Repositori ini sudah dilengkapi alur kerja `.github/workflows/deploy.yml`. Cukup aktifkan GitHub Pages di repositori:
1. Buka repositori di GitHub: `https://github.com/naells/naells`
2. Masuk ke menu **Settings** > **Pages**
3. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**
4. Setiap kali push ke branch `main`, website akan otomatis ter-build dan online di:
   👉 **`https://naells.github.io/naells/`**

### Cara 2: Manual via Branch `gh-pages`
Jika ingin deploy langsung dari terminal:
```bash
npm run deploy
```

---

## ⚙️ Kustomisasi Link

Semua data link dan teks profil dapat diubah dengan mudah di file:
👉 [`src/links.config.js`](./src/links.config.js)
