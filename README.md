# Movie Explorer 🎬

Movie Explorer adalah aplikasi web untuk menjelajahi film populer menggunakan **TMDB API**. Pengguna dapat mencari film, melihat detail lengkap, menonton trailer, menyimpan film favorit, membuat watchlist, serta melihat riwayat tontonan.

## 🌐 Live Demo

🔗 https://yafigian3-hue.github.io/movie-explorer/

---

# ✨ Fitur

### 🎥 Eksplorasi Film

- Menampilkan daftar film populer dari TMDB API.
- Hero Banner interaktif dengan auto slider.
- Hero Banner dapat memutar trailer YouTube langsung.
- Halaman detail film yang lengkap.
- Menampilkan film serupa (Similar Movies).
- Menampilkan daftar pemeran (Cast).
- Menampilkan platform tempat film dapat ditonton (Watch Providers).

---

### 🔍 Pencarian

- Pencarian film secara real-time.
- Hasil pencarian responsif.
- Halaman khusus hasil pencarian.

---

### ❤️ Favorite

- Menambahkan film ke Favorite.
- Menghapus film dari Favorite.
- Favorite tersimpan di database backend.

---

### 🔖 Watchlist

- Menambahkan film ke Watchlist.
- Menghapus film dari Watchlist.
- Watchlist tersimpan di database backend.

---

### 🕒 History

- Riwayat otomatis ketika pengguna:
  - Menonton trailer.
  - Menekan tombol Tonton.
- Menghapus seluruh riwayat tontonan.
- Riwayat tersimpan di database backend.

---

### 🎨 User Experience

- Skeleton Loading.
- Loading Spinner.
- Error Handling.
- Retry ketika request gagal.
- Responsive Design untuk:
  - Mobile
  - Tablet
  - Desktop
- Hero Banner yang telah dioptimalkan khusus tampilan mobile.

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon Database)

## API

- TMDB API

## Deployment

Frontend

- GitHub Pages

Backend

- Node.js Server

---

# 📂 Struktur Fitur

```
Movie Explorer
│
├── Home
│   ├── Hero Banner
│   ├── Popular Movies
│   └── Search
│
├── Detail Movie
│   ├── Trailer
│   ├── Cast
│   ├── Similar Movies
│   ├── Watch Providers
│   ├── Favorite
│   ├── Watchlist
│   └── History
│
├── Profile
│   ├── Favorite
│   ├── Watchlist
│   └── History
│
└── Backend
    ├── Favorite API
    ├── Watchlist API
    └── History API
```

---

# 📦 Menjalankan Secara Lokal

## 1. Clone Repository

```bash
git clone https://github.com/yafigian3-hue/movie-explorer.git
```

## 2. Masuk ke Folder

```bash
cd movie-explorer
```

## 3. Install Dependency

```bash
npm install
```

## 4. Buat File .env

```env
VITE_TMDB_TOKEN=YOUR_TMDB_TOKEN
```

## 5. Jalankan Frontend

```bash
npm run dev
```

---

# 🔧 Backend

Clone backend

```bash
git clone https://github.com/yafigian3-hue/movie-explorer-backend.git
```

Masuk ke folder

```bash
cd movie-explorer-backend
```

Install dependency

```bash
npm install
```

Buat file `.env`

```env
DATABASE_URL=YOUR_DATABASE_URL

```

Generate Prisma

```bash
npx prisma generate
```

Jalankan server

```bash
npm run dev
```

Server berjalan di

```
http://localhost:3000
```

---

# 📚 Yang Dipelajari

Proyek ini dibuat sebagai bagian dari proses belajar Full Stack Web Development, dengan fokus pada:

- React Hooks
  - useState
  - useEffect
  - useMemo
  - useLayoutEffect
  - Custom Hooks

- React Context

- React Router

- Component Reusability

- State Management

- API Fetching

- Error Handling

- Loading State

- Responsive Design

- Backend REST API menggunakan Express

- Database menggunakan Prisma ORM

- Integrasi Frontend & Backend

---

# 🚧 Pengembangan Selanjutnya

Beberapa fitur yang masih direncanakan:

- Authentication (Login & Register)
- User Account
- Rating Film
- Review Film
- Pagination
- Infinite Scroll
- Dark/Light Theme
- Multi User Support
- Profile Settings

---

# 👨‍💻 Author

**Yafi Gian**

GitHub

https://github.com/yafigian3-hue

Portfolio

https://yafigian3-hue.github.io/portfolio-v2/  