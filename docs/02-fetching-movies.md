# 03 - React Context

## Tujuan

Menghindari prop drilling dan membagikan data ke seluruh aplikasi.

---

# Yang Dipelajari

- Context API
- Provider
- Custom Hook
- Separation of Concern
- Custom Hook useMovies()

---

# Sebelum Context

```
Home

↓

HeroBanner

↓

MovieSection

↓

MovieCard
```

Data harus dikirim menggunakan props.

---

# Setelah Context

```
SearchContext

↓

Semua Component
```

Setiap component dapat mengambil data sendiri.

---

# Custom Hook

Semua proses fetch dipindahkan ke

```
useMovies()
```

Tugasnya

- mengambil data
- loading
- error

---

# SearchContext

Tugasnya

- menyimpan data
- membagikan data

---

# Home

Tugasnya

- menyusun tampilan halaman

---

# Prinsip

Satu file

↓

Satu tanggung jawab.

---

# Kesimpulan

Context membuat aplikasi lebih mudah dikembangkan dan mengurangi prop drilling.