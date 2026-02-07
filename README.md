# 🎨 Creative Studio Portfolio

> **Now built with Tailwind CSS!** Faster, cleaner, and fully responsive.

---

## ⚡ Quick Start

```bash
# Just open index.html in your browser
# No build step required - uses Tailwind CSS CDN
```

---

## 📁 Project Structure

```
PortfolioWebsite/
├── index.html           # Main file (HTML + Tailwind + Scripts)
├── dist/
│   ├── imgs/            # Images
│   └── font/            # Custom fonts
└── README.md            # This file
```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Tailwind CSS** | Styling via utility classes (CDN) |
| **GSAP Animations** | Smooth reveals & interactions |
| **Grid Background** | Custom grid pattern in header |
| **Glassmorphism** | Frosted glass effects on UI elements |
| **Video Gallery** | Integrated Wistia player grid |
| **Mobile First** | Fully responsive navigation & layout |

---

## 🎨 Color Theme

| Variable | Hex | Tailwind Class |
|----------|-----|----------------|
| Primary | `#e4ff00` | `bg-primary` / `text-primary` |
| Dark | `#0a0a0a` | `bg-dark` |
| Card | `#141414` | `bg-card` |

---

## 🛠️ Customization

### Changing Content
Everything is now in `index.html`. You can edit text, links, and images directly there.

### Tailwind Config
The configuration is inside the `<script>` tag in the `<head>`:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#e4ff00',
        dark: '#0a0a0a',
        // ...
      }
    }
  }
}
```

### Adding New Sections
Use standard Tailwind classes. Example:
```html
<section class="py-20 px-5 text-center">
  <h2 class="text-4xl text-primary font-bold">New Section</h2>
</section>
```

---

## 📄 License

All rights reserved © 2024
