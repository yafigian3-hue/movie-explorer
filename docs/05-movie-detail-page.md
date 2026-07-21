# 05 - Movie Detail Page

## Tujuan

Membuat halaman khusus yang menampilkan informasi lengkap dari sebuah film ketika user menekan tombol atau card film.

---

# Konsep yang Dipelajari

## 1. Dynamic Route

Menggunakan React Router agar setiap film mempunyai URL sendiri.

```jsx
<Route path="/movie/:id" element={<MovieDetail />} />
```

`:id` berarti nilai id akan berubah sesuai film yang dipilih.

Contoh:

```
/movie/550
/movie/299536
/movie/603
```

---

## 2. useParams()

Mengambil id dari URL.

```jsx
const { id } = useParams();
```

Jika URL adalah

```
/movie/550
```

maka

```js
id = "550"
```

---

## 3. Fetch Detail Film

Mengambil data film berdasarkan id.

```jsx
fetch(`https://api.themoviedb.org/3/movie/${id}`)
```

Berbeda dengan halaman Home.

Home mengambil banyak film.

Movie Detail hanya mengambil satu film.

---

## 4. State

Movie Detail memiliki state sendiri.

```jsx
const [movie, setMovie] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
```

Artinya halaman ini berdiri sendiri dan tidak memakai state Home.

---

## 5. Loading State

Sebelum data datang:

```jsx
setIsLoading(true);
```

Setelah selesai:

```jsx
setIsLoading(false);
```

Kemudian React akan merender ulang.

---

## 6. Error Handling

Jika fetch gagal.

```jsx
.catch(() => {
  setError("Film tidak ditemukan");
})
```

React akan menampilkan halaman error.

---

## 7. useEffect()

Data diambil saat halaman pertama kali dibuka.

```jsx
useEffect(() => {
    fetchMovie();
}, [id]);
```

Jika user membuka film lain tanpa refresh browser,
React akan mengambil data baru.

---

## 8. Conditional Rendering

Halaman mempunyai tiga kondisi.

Loading

```jsx
if (isLoading)
```

Error

```jsx
if (error)
```

Success

```jsx
return (...)
```

Ini pola yang hampir selalu dipakai di React.

---

## 9. useNavigate()

Digunakan untuk kembali ke halaman sebelumnya.

```jsx
navigate(-1)
```

Tidak perlu mengetahui URL sebelumnya.

---

## 10. clearSearch()

Ketika user kembali ke Home.

```jsx
clearSearch();
navigate(-1);
```

Search dibersihkan agar Home kembali ke kondisi awal.

---

## 11. Menampilkan Data

Semua data berasal dari TMDB.

Judul

```jsx
movie.title
```

Poster

```jsx
movie.poster_path
```

Backdrop

```jsx
movie.backdrop_path
```

Overview

```jsx
movie.overview
```

Rating

```jsx
movie.vote_average
```

Runtime

```jsx
movie.runtime
```

Genre

```jsx
movie.genres
```

Budget

```jsx
movie.budget
```

Revenue

```jsx
movie.revenue
```

Production Company

```jsx
movie.production_companies
```

Language

```jsx
movie.spoken_languages
```

---

## 12. map()

Digunakan untuk menampilkan genre.

```jsx
movie.genres.map((genre) => ...)
```

Karena jumlah genre tidak selalu sama.

---

## 13. Optional Rendering

Tidak semua film memiliki data lengkap.

Karena itu digunakan pengecekan.

```jsx
movie.runtime && (...)
```

atau

```jsx
movie.production_companies.length > 0
```

Supaya aplikasi tidak error.

---

## 14. Responsive Layout

Desktop

```
2 kolom

Poster
Informasi
```

Mobile

```
1 kolom
```

Menggunakan Tailwind Grid.

```jsx
grid-cols-1
lg:grid-cols-3
```

---

# Flow Halaman

User klik Movie Card

↓

React Router pindah ke

```
/movie/:id
```

↓

MovieDetail mendapatkan id

↓

fetch()

↓

Loading

↓

Data datang

↓

setMovie()

↓

React Render

↓

User melihat informasi lengkap film

---

# Yang Dipelajari

✅ React Router

✅ Dynamic Route

✅ useParams()

✅ useNavigate()

✅ Fetch API

✅ Loading State

✅ Error State

✅ Conditional Rendering

✅ useEffect()

✅ map()

✅ Optional Rendering

✅ Responsive Layout

---

# Catatan

Movie Detail adalah halaman pertama yang benar-benar mengambil data spesifik berdasarkan id.

Ini merupakan pola yang akan sering digunakan saat membuat:

- Detail Produk
- Detail Artikel
- Detail User
- Detail Course
- Detail Game

Karena hampir semua aplikasi modern memiliki halaman detail seperti ini.