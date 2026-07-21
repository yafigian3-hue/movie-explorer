# 01 - Project Setup

## Tujuan

Membangun fondasi project React menggunakan Vite dan Tailwind CSS agar siap dikembangkan menjadi aplikasi Movie Explorer.

---

# Yang Dipelajari

- Vite
- React
- Tailwind CSS
- Folder Structure
- React Router
- Environment Variable

---

# Membuat Project

Project dibuat menggunakan

```bash
npm create vite@latest
```

Kemudian memilih template

```
React
```

---

# Install Dependency

```bash
npm install
```

---

# Install Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

---

# Install React Router

```bash
npm install react-router-dom
```

---

# Install Icon

```bash
npm install lucide-react
```

---

# Struktur Folder

```
src

components

pages

context

hooks

assets
```

Folder dipisahkan berdasarkan tanggung jawab masing-masing.

---

# Environment Variable

Token TMDB tidak ditulis langsung di source code.

Disimpan pada

```
.env
```

Contoh

```
VITE_TMDB_TOKEN=xxxxxxxx
```

Lalu diakses menggunakan

```js
import.meta.env.VITE_TMDB_TOKEN
```

---

# Kesimpulan

Tahap ini bertujuan membangun pondasi project sebelum mulai mengambil data dari API.