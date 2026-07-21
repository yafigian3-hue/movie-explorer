# 03 - Hero Banner Slider

## Tujuan

Membuat Hero Banner yang dapat menampilkan beberapa film secara bergantian seperti Netflix menggunakan data dari TMDB API.

---

# Yang Dipelajari

Selama membuat fitur Hero Banner, saya juga belajar bagaimana menyusun struktur project React agar lebih rapi.

Materi yang dipelajari:

- Custom Hook
- Context API
- React Router
- Promise.all()
- useMemo
- useEffect
- useLayoutEffect
- useRef
- Hero Banner Slider
- Image Preload
- Autoplay
- Manual Navigation
- Progress Indicator
- Ken Burns Animation
- Fade Animation

---

# 1. Memisahkan Logic Fetch ke Custom Hook

Sebelumnya semua proses fetch dilakukan di SearchContext.

Contoh struktur lama

```
SearchContext
    fetch popular
    fetch top rated
    fetch upcoming
    fetch now playing
```

Masalahnya:

- Context menjadi panjang
- Sulit dipelajari
- Sulit digunakan kembali

Kemudian seluruh proses fetch dipindahkan ke

```
useMovies()
```

Sehingga sekarang pembagian tugas menjadi

```
useMovies
      ↓
SearchContext
      ↓
Component
```

Tanggung jawabnya menjadi jelas.

**useMovies**

- Mengambil data dari API

**SearchContext**

- Menyimpan data
- Membagikan data ke seluruh aplikasi

---

# 2. Menggunakan Context API

Daripada mengirim props ke banyak komponen

```
Home
 ├── Navbar
 ├── HeroBanner
 ├── MovieSection
 └── MovieCard
```

Semua komponen mengambil data langsung dari Context.

```
SearchContext
      │
 ├────┼────┐
 │    │    │
Home Hero Navbar
```

Keuntungannya:

- Tidak terjadi prop drilling
- Lebih mudah dikelola

---

# 3. Menggunakan Promise.all()

Awalnya setiap kategori film diambil satu per satu.

```
Popular

↓

Top Rated

↓

Upcoming

↓

Now Playing
```

Kemudian digabung menjadi

```js
Promise.all([
    ...
])
```

Semua request dikirim secara bersamaan sehingga proses loading menjadi lebih cepat.

---

# 4. Membuat fetchAllMovies()

Daripada memanggil banyak fetch

```js
fetchPopular()

fetchTopRated()

fetchUpcoming()

fetchNowPlaying()
```

dibuat satu fungsi

```js
fetchAllMovies()
```

Keuntungannya:

- Lebih bersih
- Mudah dipanggil dari Context

---

# 5. Mengatasi Duplicate Movie

Beberapa film muncul di lebih dari satu kategori.

Contoh

Popular

Batman

Top Rated

Batman

Jika semua array digabung

```
Batman
Batman
```

React akan memberikan warning duplicate key.

Solusinya menggunakan

```js
filter()

findIndex()
```

untuk menghapus data yang memiliki id sama.

---

# 6. Membuat Home Menjadi Lebih Bersih

Home sekarang hanya bertugas menampilkan data.

Tidak lagi mengambil data dari API.

```
Home

↓

Hero Banner

↓

Movie Section
```

Semua data sudah disediakan oleh Context.

Prinsip ini disebut

**Separation of Concern**

Setiap file hanya memiliki satu tanggung jawab.

---

# 7. Membuat Hero Banner Menjadi Slider

Awalnya Hero Banner hanya menerima

```jsx
movie
```

Kemudian diubah menjadi

```jsx
movies
```

Sehingga Hero Banner dapat menampilkan beberapa film.

---

# 8. currentIndex

Konsep slider sebenarnya sederhana.

Misalnya

```
movies

0 Batman

1 Superman

2 Iron Man
```

Yang ditampilkan adalah

```js
movies[currentIndex]
```

Jika

```
currentIndex = 0
```

maka tampil Batman.

Jika

```
currentIndex = 1
```

maka tampil Superman.

Slider hanya berpindah index.

---

# 9. Autoplay

Menggunakan

```js
setInterval()
```

untuk mengubah

```
0

↓

1

↓

2

↓

0
```

setiap beberapa detik.

---

# 10. useRef

Interval disimpan menggunakan

```js
const autoPlayRef = useRef()
```

Tujuannya supaya dapat dihentikan menggunakan

```js
clearInterval(autoPlayRef.current)
```

Hal ini mencegah memory leak.

---

# 11. useMemo

Hero Banner hanya memakai beberapa film pertama.

Daripada

```js
movies.slice(...)
```

dihitung ulang setiap render

hasilnya disimpan menggunakan

```js
useMemo()
```

Sehingga React hanya menghitung ulang jika data film berubah.

---

# 12. Image Preload

Sebelum slider berpindah gambar

browser sudah diminta mengunduh gambar berikutnya.

Contoh

```js
new Image()
```

Keuntungannya

Ketika user berpindah slide

gambar langsung muncul tanpa loading.

---

# 13. useLayoutEffect

Digunakan untuk mengatur animasi sebelum browser melakukan render.

Dengan begitu efek fade terlihat lebih halus dibanding menggunakan useEffect biasa.

---

# 14. Fade Animation

State

```js
entered
```

digunakan untuk mengontrol opacity.

Awalnya

```
entered = false
opacity = 0
```

Setelah render

```
entered = true
opacity = 1
```

Sehingga muncul animasi fade.

---

# 15. Ken Burns Animation

Background gambar diberikan animasi zoom perlahan.

```
Scale 1

↓

Scale 1.1
```

Animasi ini membuat Hero Banner terlihat lebih hidup seperti Netflix.

---

# 16. Progress Indicator

Progress bar dibuat menggunakan CSS Animation.

Ketika autoplay berjalan

progress bar akan terisi selama

```
AUTOPLAY_MS
```

Jika user berpindah slide secara manual

progress langsung penuh.

---

# 17. Pembagian Tanggung Jawab Project

Setelah semua refactor, struktur project menjadi jauh lebih jelas.

```
useMovies
```

Tugas:

- Mengambil data dari API

---

```
SearchContext
```

Tugas:

- Menyimpan data
- Membagikan data

---

```
Home
```

Tugas:

- Menyusun halaman

---

```
HeroBanner
```

Tugas:

- Menampilkan slider film

---

```
MovieSection
```

Tugas:

- Menampilkan daftar film

---

```
MovieCard
```

Tugas:

- Menampilkan satu film

---

# Kesimpulan

Pelajaran terbesar dari sesi ini bukan hanya membuat Hero Banner.

Tetapi belajar bagaimana membagi sebuah aplikasi React menjadi bagian-bagian kecil yang masing-masing memiliki satu tanggung jawab.

Dengan struktur tersebut project menjadi:

- lebih mudah dibaca
- lebih mudah dirawat
- lebih mudah dikembangkan
- lebih mudah melakukan debugging

Prinsip ini akan terus digunakan di hampir semua project React selanjutnya.