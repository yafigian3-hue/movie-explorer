# Hero Banner

## Tujuan

Hero Banner merupakan komponen utama yang ditampilkan pada halaman Home dan Movie Detail.

Komponen ini digunakan untuk:

- Menampilkan backdrop film.
- Menampilkan informasi utama film.
- Slider otomatis pada halaman Home.
- Memutar trailer YouTube pada halaman Detail.
- Memberikan transisi yang halus antara backdrop dan trailer.

---

# Props

| Props | Keterangan |
|--------|------------|
| movie | Film tunggal (Movie Detail) |
| movies | Daftar film (Home) |
| movieTrailer | Data trailer dari TMDB |
| limit | Jumlah film hero |
| variant | default / detail / search |
| showProgress | Menampilkan progress autoplay |
| isPlayingTrailer | Status trailer sedang diputar |
| setIsPlayingTrailer | Mengubah status trailer |

---

# Mode Hero Banner

## Home

Menggunakan props

```jsx
movies
```

Hero akan:

- autoplay setiap 6 detik
- memiliki slider
- memiliki progress indicator
- dapat berpindah film

---

## Movie Detail

Menggunakan props

```jsx
movie
```

Hero hanya menampilkan satu film.

Autoplay dimatikan.

---

# Autoplay

```jsx
const AUTOPLAY_MS = 6000;
```

Autoplay menggunakan

```jsx
setInterval()
```

dan akan berhenti ketika

- hover
- trailer diputar

---

# Image Preload

Backdrop dipreload terlebih dahulu agar perpindahan slide tidak berkedip.

```jsx
useEffect(() => {
    heroMovies.forEach(movie => {
        const img = new Image();
        img.src = ...
    });
}, []);
```

---

# Enter Animation

Perpindahan slide menggunakan state

```jsx
entered
```

dan

```jsx
requestAnimationFrame()
```

untuk menghasilkan fade yang lebih halus.

---

# Ken Burns Effect

Backdrop menggunakan animasi

```css
@keyframes heroKenBurns
```

untuk memberikan efek zoom perlahan.

---

# Trailer Playback

Trailer menggunakan YouTube Embed.

Hero Banner memiliki dua layer.

Layer pertama

```
Backdrop
```

Layer kedua

```
Trailer
```

Backdrop tidak dihapus ketika trailer diputar.

Sebagai gantinya hanya diubah menjadi

```jsx
opacity: 0
```

Sedangkan trailer melakukan

```jsx
opacity: 1
```

Pendekatan ini menghasilkan crossfade yang jauh lebih halus dibanding mengganti elemen `<img>` menjadi `<iframe>`.

---

# Trailer Loading

Saat iframe belum selesai dimuat akan muncul loading spinner.

```jsx
videoReady
```

digunakan untuk menentukan kapan spinner dihilangkan.

---

# Close Trailer

Trailer dapat ditutup menggunakan tombol Close.

```jsx
setIsPlayingTrailer(false)
```

Saat trailer ditutup Hero kembali menampilkan backdrop tanpa melakukan render ulang seluruh komponen.

---

# State

State yang digunakan

```jsx
currentIndex
```

Slide aktif.

```jsx
autoPlay
```

Status autoplay.

```jsx
entered
```

Animasi perpindahan slide.

```jsx
trailerEntered
```

Animasi fade trailer.

```jsx
videoReady
```

Status iframe selesai dimuat.

---

# Refs

```jsx
autoPlayRef
```

Menyimpan interval autoplay.

```jsx
rafRef
```

Animasi fade gambar.

```jsx
trailerRafRef
```

Animasi fade trailer.

---

# Optimisasi

- useMemo untuk heroMovies
- requestAnimationFrame untuk animasi
- preload backdrop
- autoplay dihentikan ketika trailer diputar
- crossfade menggunakan dua layer
- loading spinner sebelum iframe siap
- Hero Banner dapat digunakan kembali pada Home maupun Movie Detail

---

# Future Improvements

- Keyboard shortcut (Esc untuk menutup trailer)
- Fullscreen trailer mode
- Progress loading YouTube
- Gesture swipe pada mobile
- Picture-in-Picture (opsional)
- Skeleton Hero saat loading