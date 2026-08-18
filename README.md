# 🎬 Movie Explorer

Movie Explorer adalah aplikasi web full-stack untuk menjelajahi film populer menggunakan **TMDB API**. Pengguna dapat mencari film, melihat detail lengkap, menonton trailer, menyimpan film ke Favorite dan Watchlist, melihat riwayat tontonan, serta memiliki akun pribadi dengan data yang tersimpan secara terpisah di database.

## 🌐 Live Demo

🔗 **Frontend:**
https://yafigian3-hue.github.io/movie-explorer/

🔗 **Backend API:**
https://movie-explorer-backend-1-ejl4.onrender.com

---

# ✨ Fitur

## 🎥 Eksplorasi Film

* Menampilkan daftar film populer dari TMDB API.
* Hero Banner interaktif dengan auto slider.
* Hero Banner dapat memutar trailer YouTube.
* Halaman detail film.
* Menampilkan rating film.
* Menampilkan tahun rilis.
* Menampilkan genre film.
* Menampilkan film serupa (Similar Movies).
* Menampilkan daftar pemeran (Cast).
* Menampilkan platform tempat film dapat ditonton (Watch Providers).

---

## 🔍 Pencarian

* Pencarian film menggunakan TMDB API.
* Hasil pencarian secara responsif.
* Halaman khusus hasil pencarian.
* Search state dikelola menggunakan React Context.
* Navigasi pencarian terintegrasi dengan halaman aplikasi.

---

## ❤️ Favorite

Pengguna yang sudah login dapat:

* Menambahkan film ke Favorite.
* Menghapus film dari Favorite.
* Melihat daftar Favorite melalui halaman Profile.
* Menyimpan Favorite ke database.
* Mendapatkan Favorite sesuai akun yang sedang login.

Favorite menggunakan sistem **multi-user**, sehingga data setiap pengguna tetap terpisah.

---

## 🔖 Watchlist

Pengguna yang sudah login dapat:

* Menambahkan film ke Watchlist.
* Menghapus film dari Watchlist.
* Melihat daftar Watchlist melalui halaman Profile.
* Menyimpan Watchlist ke database.
* Mendapatkan Watchlist sesuai akun yang sedang login.

---

## 🕒 History

Riwayat tontonan otomatis dibuat ketika pengguna:

* Menonton trailer.
* Menekan tombol Tonton.

Pengguna juga dapat:

* Melihat riwayat tontonan melalui Profile.
* Menghapus seluruh riwayat.
* Menyimpan history ke database.
* Memperbarui `viewedAt` ketika film ditonton kembali.

History juga bersifat **multi-user**.

---

# 🔐 Authentication

Movie Explorer sekarang memiliki sistem authentication berbasis **JWT (JSON Web Token)**.

### Register

Pengguna dapat membuat akun dengan:

* Nama
* Email
* Password
* Konfirmasi password

Setelah berhasil melakukan registrasi, pengguna mendapatkan feedback melalui Toast Notification dan dapat melanjutkan ke Login.

### Login

Pengguna dapat login menggunakan:

* Email
* Password

Setelah login berhasil:

* JWT disimpan di `localStorage`.
* Data user disimpan di `localStorage`.
* Navbar menampilkan nama pengguna.
* Profile menampilkan informasi akun.
* Favorite, Watchlist, dan History mengambil data sesuai user.

### Logout

Pengguna dapat keluar melalui:

* Navbar desktop.
* Mobile navigation.

Saat logout:

* JWT dihapus.
* Data user dihapus dari `localStorage`.
* State authentication dikembalikan ke guest.
* Muncul notifikasi bahwa pengguna berhasil logout.

### Session Expiration

Jika JWT sudah tidak valid atau sudah kedaluwarsa:

* API mengembalikan `401 Unauthorized`.
* Session otomatis dihapus.
* Token dan data user dihapus.
* Pengguna dikembalikan ke keadaan guest.
* Ditampilkan notifikasi bahwa sesi telah berakhir.
* Toast session expiration hanya ditampilkan satu kali untuk mencegah duplikasi.

---

# 👤 Profile

Pengguna yang belum login akan melihat halaman Login Gate yang menyediakan:

* Tombol Masuk.
* Tombol Buat Akun.

Pengguna yang sudah login dapat melihat:

* Nama pengguna.
* Email.
* Favorite.
* Watchlist.
* History.

Profile menggunakan tab:

```text
Favorite | Riwayat | Watchlist
```

---

# 🔔 Toast Notification

Aplikasi memiliki sistem Toast Notification global menggunakan React Context.

Toast digunakan untuk memberikan feedback seperti:

* Berhasil login.
* Berhasil register.
* Berhasil logout.
* Session telah berakhir.
* Feedback authentication lainnya.

Toast mendukung:

* Success state.
* Error state.
* Auto dismiss.
* Manual dismiss.
* Responsive positioning.

---

# 🎨 User Experience

Movie Explorer menggunakan beberapa peningkatan UX:

* Skeleton Loading.
* Loading Spinner.
* Error Handling.
* Retry ketika request gagal.
* Responsive Design.
* Mobile navigation.
* Modal Login/Register.
* Password visibility toggle.
* Contextual authentication message.
* Toast notification.
* Scroll position reset ketika berpindah halaman.
* Responsive Hero Banner.
* Touch-friendly controls.
* Accessibility improvements.
* SEO metadata.
* Custom favicon.

---

# ♿ Accessibility & SEO

Project juga telah dioptimalkan menggunakan hasil audit Lighthouse / PageSpeed.

Hasil terbaru:

```text
Performance       100
Accessibility      85
Best Practices    100
SEO               100
```

Beberapa optimasi yang sudah diterapkan:

* Accessible labels untuk tombol icon-only.
* Accessible name untuk navigation links.
* Touch target yang lebih besar.
* HTML `lang="id"`.
* Meta description.
* Theme color.
* Robots metadata.
* Custom favicon.
* Semantic `<main>` pada halaman tertentu.
* Perbaikan contrast pada beberapa komponen.

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Lucide React
* React Context
* Custom Hooks

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT
* bcrypt
* CORS

## Database

* PostgreSQL
* Neon Database

## API

* TMDB API

## Deployment

### Frontend

* GitHub Pages

### Backend

* Render

### Database

* Neon PostgreSQL

---

# 🏗 Arsitektur

Aplikasi menggunakan arsitektur terpisah antara frontend dan backend:

```text
React + Vite
     │
     │ REST API
     ▼
Express.js
     │
     │ Prisma ORM
     ▼
PostgreSQL / Neon
```

Authentication:

```text
Login / Register
       ↓
Express API
       ↓
JWT
       ↓
Frontend localStorage
       ↓
Authorization Header
       ↓
Protected API
       ↓
User-specific data
```

---

# 📂 Struktur Fitur

```text
Movie Explorer
│
├── Home
│   ├── Hero Banner
│   ├── Popular Movies
│   └── Search
│
├── Movies
│   └── Movie List
│
├── Search
│   └── Search Results
│
├── Movie Detail
│   ├── Trailer
│   ├── Cast
│   ├── Similar Movies
│   ├── Watch Providers
│   ├── Favorite
│   ├── Watchlist
│   └── History
│
├── Authentication
│   ├── Register
│   ├── Login
│   ├── Logout
│   ├── JWT
│   └── Session Expiration
│
├── Profile
│   ├── User Information
│   ├── Favorite
│   ├── Watchlist
│   └── History
│
└── Backend
    ├── Auth API
    ├── Favorite API
    ├── Watchlist API
    └── History API
```

---

# 📦 Menjalankan Frontend Secara Lokal

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

## 4. Buat File `.env`

```env
VITE_TMDB_TOKEN=YOUR_TMDB_TOKEN
```

## 5. Jalankan Frontend

```bash
npm run dev
```

Frontend akan berjalan di:

```text
http://localhost:5173
```

---

# 🔧 Menjalankan Backend Secara Lokal

## 1. Clone Repository Backend

```bash
git clone https://github.com/yafigian3-hue/movie-explorer-backend.git
```

## 2. Masuk ke Folder

```bash
cd movie-explorer-backend
```

## 3. Install Dependency

```bash
npm install
```

## 4. Buat File `.env`

```env
DATABASE_URL=YOUR_DATABASE_URL
JWT_SECRET=YOUR_JWT_SECRET
```

## 5. Generate Prisma Client

```bash
npx prisma generate
```

## 6. Jalankan Migration

```bash
npx prisma migrate deploy
```

## 7. Jalankan Backend

```bash
npm run dev
```

Backend akan berjalan di:

```text
http://localhost:3000
```

---

# 🔑 Environment Variables

## Frontend

```env
VITE_TMDB_TOKEN=YOUR_TMDB_TOKEN
```

## Backend

```env
DATABASE_URL=YOUR_DATABASE_URL
JWT_SECRET=YOUR_JWT_SECRET
```

**Jangan commit file `.env` ke repository.**

---

# 🗄 Database

Database menggunakan PostgreSQL dengan Prisma ORM.

Model utama:

```text
User
├── Favorite
├── Watchlist
└── History
```

Setiap data Favorite, Watchlist, dan History memiliki relasi dengan `User`, sehingga data antar pengguna terisolasi.

Contoh:

```text
User A
├── Favorite A
├── Watchlist A
└── History A

User B
├── Favorite B
├── Watchlist B
└── History B
```

User A tidak dapat mengakses data milik User B.

---

# 📚 Yang Dipelajari

Project ini dibuat sebagai bagian dari proses belajar Full Stack Web Development, dengan fokus pada:

## React

* `useState`
* `useEffect`
* `useMemo`
* `useLayoutEffect`
* Custom Hooks
* React Context
* Component Reusability
* Lazy Loading
* Suspense
* State Management

## Frontend

* API Fetching
* Error Handling
* Loading State
* Responsive Design
* Tailwind CSS
* Routing
* Modal
* Toast Notification
* Accessibility
* SEO
* Performance Optimization

## Backend

* Express REST API
* Middleware
* JWT Authentication
* Protected Routes
* HTTP Status Code
* Error Handling
* CORS

## Database

* PostgreSQL
* Prisma ORM
* Database Relations
* Migration
* Multi-user Data Isolation

## Deployment

* GitHub Pages
* Render
* Neon PostgreSQL
* Production Environment Variables

---

# 🚧 Pengembangan Selanjutnya

Beberapa fitur yang masih direncanakan:

* ⭐ Rating Film
* 💬 Review Film
* 📄 Pagination
* ♾️ Infinite Scroll
* 🌓 Dark / Light Theme
* ⚙️ Profile Settings
* 🔑 Password Reset
* ✏️ Edit Profile
* 👤 Avatar Upload
* 🔎 Filter dan Sorting Film

---

# 👨‍💻 Author

**Yafi Gian**

GitHub
https://github.com/yafigian3-hue

Portfolio
https://yafigian3-hue.github.io/portfolio-v2/
