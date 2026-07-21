# Architecture

## Struktur Project

```
App

↓

BrowserRouter

↓

SearchProvider

↓

Pages

↓

Components
```

---

## Pembagian Tugas

### useMovies

Mengambil data dari API.

---

### SearchContext

Menyimpan state global.

---

### Home

Menyusun halaman.

---

### HeroBanner

Menampilkan slider.

---

### MovieSection

Menampilkan kategori film.

---

### MovieCard

Menampilkan satu film.

---

## Prinsip

Setiap component memiliki satu tanggung jawab.

Jangan mencampurkan:

- fetch
- UI
- search
- routing

dalam satu file.