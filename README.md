# 👾 CyberLex

**CyberLex** is an offline-first, cyberpunk-inspired web reader designed to transform your documents into a visually striking, distraction-free reading experience. Built with React, TypeScript, and a custom WebGL/Canvas particle engine, it runs entirely in your browser.

## ✨ Core Features

- **Universal Parsing:** Upload `.txt`, `.md`, `.docx`, or `.pdf` files. CyberLex intelligently parses headings, paragraphs, and formatting.
- **Privacy-First (Local Storage):** No servers, no tracking. Your documents are saved entirely within your browser's `localStorage`.
- **Progressive Web App (PWA):** Install CyberLex directly to your desktop or smartphone for a native-like, offline experience.
- **Cyberpunk Aesthetic:** Custom typography (Orbitron & Oxanium), neon glassmorphism UI, and an interactive particle background that reacts to your mouse movements.

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (v3)
- **File Processing:** `mammoth` (DOCX), `pdfjs-dist` (PDF), Custom Regex Parsers (TXT, MD)
- **Visuals:** Native HTML5 Canvas API (Zero heavy 3D libraries)
- **Tooling:** pnpm

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/cyberlex.git](https://github.com/yourusername/cyberlex.git)
   ```
