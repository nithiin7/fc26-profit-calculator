# FC26 Market Profit Calculator

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![FUT](https://img.shields.io/badge/FC26-Ultimate%20Team-111827?style=for-the-badge&logo=ea&logoColor=white)

A clean, fast web calculator for EA FC 26 Ultimate Team traders who want to compare buy/sell prices, account for market tax, and optimize trading decisions in seconds.

## 🚀 What it does

This app lets you enter multiple market items with buy price, sell price, quantity, and tax rate. It then instantly computes:

- total revenue
- total cost
- market tax amount
- net revenue
- profit or loss
- ROI percentage
- total item count

Plus, it provides a polished real-time dashboard with copy-to-clipboard support for quick sharing.

## ✨ Why it matters

If you trade cards or items in FC 26, every coin counts. This calculator helps you spot profitable deals faster and avoid hidden tax losses before you list items on the market.

## ✅ Key features

- Multi-item profit and loss calculation
- Tax rate support per item
- Real-time financial totals
- ROI breakdown for quick decision-making
- Responsive UI with clean dashboard layout
- Copy result button for fast sharing

## 🛠️ Tech stack

- React 19
- TypeScript
- Vite

## Getting started

### Prerequisites

- Node.js installed

### Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## 📌 Notes

- Default tax rate is set to 5% per item.
- Quantity is validated with a minimum of 1.
- The app is designed for fast, intuitive trade analysis.

## 💡 Want to contribute?

Feel free to open issues or send pull requests for new features such as trade history tracking, break-even alerts, or import/export support.
