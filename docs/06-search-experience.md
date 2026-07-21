## Milestone — Improve Search Experience

### Search

- Mengubah search agar menggunakan TMDB Search API secara realtime.
- Search suggestion kini mengambil data langsung dari API, bukan dari data Home.
- Menekan tombol Search atau Enter akan membuka halaman Search Result.
- Klik suggestion langsung menuju halaman Movie Detail.

---

### Search Result

Menambahkan halaman Search Result.

Fitur yang ditambahkan:

- Menampilkan seluruh hasil pencarian dari TMDB.
- Menggunakan HeroBanner sebagai highlight 5 hasil teratas.
- HeroBanner dibuat reusable melalui prop `variant="search"`.
- Menambahkan fitur pengurutan hasil berdasarkan:
  - Popular
  - Rating
  - Year
- Menggunakan kembali komponen `MovieSection` untuk menjaga konsistensi UI.
- Menambahkan Empty State ketika hasil pencarian kosong.

---

### Refactor

- Memindahkan seluruh proses Search API ke `useMovies`.
- Menjadikan `HeroBanner` lebih fleksibel dengan menambahkan props:
  - `variant`
  - `limit`
  - `showProgress`
- Mengurangi duplikasi kode dengan memanfaatkan komponen yang sudah ada.