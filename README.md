# Movie Explorer 🎬

Aplikasi web sederhana untuk menjelajahi film-film populer yang diambil dari TMDB API. Aplikasi ini dirancang untuk memudahkan pengguna melihat daftar film populer, mencari film berdasarkan judul, dan mendapatkan pengalaman navigasi yang responsif.

## 🚀 Fitur Utama
* **Daftar Film Populer**: Menampilkan data film terkini dari TMDB API.
* **Pencarian Real-time**: Mencari film dengan mudah berdasarkan judul.
* **Error Handling**: Sistem penanganan error yang intuitif dengan tombol "Coba Lagi" jika terjadi kendala koneksi atau API.
* **Loading State**: Animasi loading yang memberikan umpan balik kepada pengguna saat data sedang diproses.
* **Responsive Design**: Tampilan yang rapi di berbagai ukuran layar menggunakan Tailwind CSS.

## 🛠 Teknologi yang Digunakan
* **Framework**: React
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **API**: TMDB API
* **Deployment**: GitHub Pages

## 📦 Cara Menjalankan Secara Lokal

1. **Clone repository ini:**
   git clone https://github.com/yafigian3-hue/movie-explorer.git

2. **Masuk ke direktori proyek:**
   cd movie-explorer

3. **Install dependencies:**
   npm install

4. **Buat file .env:**
   Buat file bernama .env di direktori utama dan tambahkan token API TMDB Anda:
   VITE_TMDB_TOKEN=token_api_anda_disini

5. **Jalankan aplikasi:**
   npm run dev

## 📝 Catatan Belajar
Proyek ini dibangun sebagai bagian dari perjalanan belajar pengembangan web, dengan fokus pada:
* Implementasi useEffect dan useState untuk manajemen state yang kompleks.
* Praktek Lifting State Up untuk komunikasi antar komponen.
* Strategi Error Handling dan User Experience (UX) dalam pengambilan data dari API.

## 👤 Penulis
yafigian3-hue