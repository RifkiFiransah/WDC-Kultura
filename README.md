# Kultura Indonesia — Jelajah Jawa Barat

Situs web statis bertema pariwisata dan budaya Jawa Barat. Berisi direktori destinasi, wisata alam, wisata budaya, kuliner khas, sejarah, budaya, dan peta panduan dalam satu pengalaman yang responsif dengan mode terang/gelap.

## Kustomisasi

- **Warna & tema:** ubah variabel CSS di bagian `:root` dan `[data-theme="dark"]` pada `css/style.css` (baris 1–67).
- **Animasi:** daftar selector yang dianimasikan ada di `js/motion.js` pada variabel `selector`.
- **Peta:** ubah parameter `bbox` pada URL iframe di `index.html` dan `peta.html` untuk menggeser area yang ditampilkan.
- **Tema awal:** skrip inline di `<head>` `index.html` menentukan tema sebelum halaman dirender (mencegah flash). Salin pola yang sama saat menambah halaman baru.

## Status

Proyek static site tanpa framework dan tanpa package manager.

## Lisensi

MIT License
